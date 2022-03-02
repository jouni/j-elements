import { DefineElementMixin } from '../util/DefineElementMixin.js';

const styles = `
  :host {
    display: flex;
    align-items: center;
    --overflow-button-size: 2rem;
    --align: start;
    justify-content: var(--align);
  }

  ::slotted(*) {
    flex-shrink: 0;
  }

  .overflow-container {
    display: flex;
    align-self: stretch;
    justify-content: var(--align);
    /* align-items: end; */ /* Show above the button */
  }

  button {
    align-self: stretch;
    -webkit-appearance: none;
    width: var(--overflow-button-size);
    min-height: var(--overflow-button-size);
    margin: 0;
    font: inherit;
    color: inherit;
    border: 0;
    background: transparent;
  }

  :host(:not([overflow])) button {
    display: none;
  }

  .overflow-menu {
    position: absolute;
    display: flex;
    flex-direction: column;
    margin-block: var(--overflow-button-size);
  }

  .overflow-menu:not(.open) {
    display: none;
  }
`;

export class OverflowMenu extends DefineElementMixin(HTMLElement) {
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({mode: 'open'});
      this.shadowRoot.innerHTML = `
        <style>${styles}</style>
        <slot></slot>
        <div class="overflow-container">
          <button aria-label="toggle menu">···</button>
          <!-- <dialog class="overflow-menu" part="menu"> -->
            <slot name="overflow" class="overflow-menu" part="menu"></slot>
          <!-- </dialog> -->
        </div>
      `;
      this.shadowRoot.querySelector('button').onclick = this._toggleMenu.bind(this);
    }

    if (!this.__mutationObserver) {
      this.__resizeObserver = new ResizeObserver(this._onResize.bind(this));
    }

    this.__resizeObserver.observe(this);

    this.__rtl = getComputedStyle(this).getPropertyValue('direction') == 'rtl';
  }

  disconnectedCallback() {
    this.__resizeObserver.disconnect();
  }

  _onResize() {
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].removeAttribute('slot');
    }
    this.removeAttribute('overflow');

    const overflowButton = this.shadowRoot.querySelector('button');

    for (let i = this.children.length - 1; i >= 0; i--) {
      const child = this.children[i];
      // Checks:
      // is the overflow button outside the container (if it is visible)?
      // "start aligned": is the last visible item outside the container?
      // "end aligned" is the first item outside the container - this is for "end" alignment
      const overflows = this.__rtl ?
        (overflowButton.offsetWidth > 0 && overflowButton.offsetLeft < this.offsetLeft) || child.offsetLeft < this.offsetLeft || this.children[0].offsetLeft + this.children[0].offsetWidth > this.offsetLeft + this.offsetWidth
       : (overflowButton.offsetWidth > 0 && overflowButton.offsetLeft + overflowButton.offsetWidth > this.offsetLeft + this.clientWidth) || child.offsetLeft + child.offsetWidth > this.offsetLeft + this.clientWidth || this.children[0].offsetLeft < this.offsetLeft;
      if (overflows) {
        child.setAttribute('slot', 'overflow');
        this.setAttribute('overflow', '');
      } else {
        break;
      }
    }

    const overflowingChildren = this.querySelectorAll('[slot]').length;
    this.shadowRoot.querySelector('.overflow-container').classList.toggle('overflow-all', overflowingChildren == this.children.length);
  }

  _toggleMenu(e) {
    this.shadowRoot.querySelector('.overflow-menu').classList.toggle('open');
    // this.shadowRoot.querySelector('.overflow-menu').showModal();
    document.body.addEventListener('click', this._closeMenu.bind(this), { once: true });
    e.stopPropagation();
  }

  _closeMenu() {
    this.shadowRoot.querySelector('.overflow-menu').classList.remove('open');
    // this.shadowRoot.querySelector('.overflow-menu').close();
  }
}

OverflowMenu.defineElement();
