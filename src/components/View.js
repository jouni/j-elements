import {DefineElementMixin} from '../util/DefineElementMixin.js';
import {StylableMixin} from '../util/StylableMixin.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      flex: auto;
      min-width: 0;
      --j-view-header-height: 44px;
    }

    header {
      position: -webkit-sticky;
      position: sticky;
      z-index: 1;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: var(--j-view-header-height);
      padding: var(--space-s);
      box-sizing: border-box;
    }

    .header-middle {
      flex: auto;
      font-weight: 600;
      font-size: var(--font-size-l);
    }

    header slot[name="header"] *,
    header slot[name="header"]::slotted(*) {
      transition: opacity .12s;
    }

    header:not(.show) slot[name="header"] *,
    header:not(.show) slot[name="header"]::slotted(*) {
      opacity: 0;
    }

    /* TODO move to theme */
    header::before {
      content: "";
      position: absolute;
      z-index: -1;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      opacity: 0;
      background-color: var(--surface);
      transition: opacity .2s;
      box-shadow: 0 1px 0 0 var(--contrast-10);
    }

    header.show::before {
      opacity: 1;
    }

    @supports (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)) {
      header::before {
        -webkit-backdrop-filter: blur(30px);
        backdrop-filter: blur(30px);
        background-color: hsla(var(--surface-hsl), 0.8);
        box-shadow: none;
      }
    }
  </style>
  <header>
    <slot name="header-start"></slot>
    <div class="header-middle">
      <slot name="header">
        <span></span>
      </slot>
    </div>
    <slot name="header-end"></slot>
  </header>
  <slot></slot>
`;

// const touchOptimizedMedia = '(pointer: coarse) and (max-width: 800px) and (min-height: 500px)';
// const touchOptimizedMediaQuery = window.matchMedia(touchOptimizedMedia);

export class View extends StylableMixin(DefineElementMixin(HTMLElement)) {
  // constructor() {
  //   super();
  //   this.__boundIsTouchOptimized = this._isTouchOptimized.bind(this);
  // }

  constructor() {
    super();
    if (window.IntersectionObserver) {
      this.__intersectionObserver = new IntersectionObserver(e => {
        const header = this.shadowRoot.querySelector('header');
        // if (this.hasAttribute('exit') ||
        //   this.hasAttribute('enter') ||
        //   (this.hasAttribute('permanent') && this.getAttribute('permanent') == 'hidden')) {
        //   return;
        // }
        header.classList.toggle('show', !e[0].isIntersecting);
        // if (e[0].isIntersecting) {
        //   header.removeAttribute('show');
        // } else {
        //   header.setAttribute('show', '');
        // }
      }, {
        rootMargin: "0px 0px 0px 0px"
      });
    }

    this.__mutationObserver = new MutationObserver(e => {
      this._contentUpdated();
    });
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    if (super.connectedCallback) super.connectedCallback();
    // touchOptimizedMediaQuery.addListener(this.__boundIsTouchOptimized);
    // this._isTouchOptimized(touchOptimizedMediaQuery);

    this.__mutationObserver.observe(this, {subtree: true, childList: true});
    this._contentUpdated();
  }

  disconnectedCallback() {
    if (this.__intersectionObserver) {
      this.__intersectionObserver.disconnect();
    }

    this.__mutationObserver.disconnect();

    if (super.disconnectedCallback) super.disconnectedCallback();
    // touchOptimizedMediaQuery.removeListener(this.__boundIsTouchOptimized);
  }

  // _isTouchOptimized(query) {
    // this.classList.toggle('touch-optimized', query.matches);
  // }

  _contentUpdated() {
    if (this.__intersectionObserver) {
      this.__intersectionObserver.disconnect();
      const header = this.querySelector('.view-header, header, h1');
      if (header) {
        this.__intersectionObserver.observe(header);
        const title = this.querySelector('[data-view-title]');
        this.shadowRoot.querySelector('slot[name="header"] span').textContent = title ? title.getAttribute("data-view-title") : header.textContent;
      } else {
        this.shadowRoot.querySelector('slot[name="header"] span').textContent = '';
        this.shadowRoot.querySelector('header').classList.toggle('show', false);
      }
    }
  }
}

View.asCustomElement();
