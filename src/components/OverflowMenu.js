import { DefineElementMixin } from '../util/DefineElementMixin.js';
import './Menu.js';

const FORCED_COLLAPSE_CLASS = 'overflow-menu';

const styles = `
  :host {
    display: flex;
    align-items: center;
  }

  ::slotted(*) {
    flex-shrink: 0;
  }

  :host(:not([overflow])) slot[name="overflow-button"] {
    display: none;
  }
`;

export class OverflowMenu extends DefineElementMixin(HTMLElement) {
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>${styles}</style>
        <slot></slot>
        <j-menu exportparts="popup">
          <slot name="overflow-button" slot="trigger"></slot>
          <slot name="menu"></slot>
        </j-menu>
      `;

      // TODO check if overflow button is already present, use that instead
      this._overflowButton = document.createElement('button');
      this._overflowButton.textContent = '···';
      this._overflowButton.setAttribute('aria-label', 'open menu');
      this._overflowButton.setAttribute('aria-haspopup', 'menu');
      this.append(this._overflowButton);
      this._overflowButton.setAttribute('slot', 'overflow-button');

      this.__resizeObserver = new ResizeObserver(this._requestUpdate.bind(this));
      this.__mutationObserver = new MutationObserver(this._requestUpdate.bind(this));
    }

    this.__resizeObserver.observe(this);
    this.__mutationObserver.observe(this, { childList: true });

    this.__rtl = getComputedStyle(this).getPropertyValue('direction') == 'rtl';
  }

  disconnectedCallback() {
    this.__resizeObserver.disconnect();
    this.__mutationObserver.disconnect();
  }

  _requestUpdate() {
    if (this.__updateTimeout) {
      clearTimeout(this.__updateTimeout);
    }
    this.__updateTimeout = setTimeout(() => this._updateOverflowingItems(), 20);
  }

  _updateOverflowingItems() {
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      if (child.getAttribute('slot') != 'overflow-button') {
        if (child.classList.contains(FORCED_COLLAPSE_CLASS)) {
          child.setAttribute('slot', 'menu');
        } else {
          child.removeAttribute('slot');
        }
      }
    }

    if (this.querySelector('.' + FORCED_COLLAPSE_CLASS)) {
      this.setAttribute('overflow', '');
    } else {
      this.removeAttribute('overflow');
    }

    const btn = this._overflowButton;
    const popup = this.shadowRoot.querySelector('j-menu')._popup;

    const visibleItems = this.querySelectorAll(`:scope > :not(.${FORCED_COLLAPSE_CLASS}):not([slot="overflow-button"])`);

    // Without this, at least Chrome is sometimes unwilling to render the child items that are no
    // longer within it (unslotted), and reports 0x0 size for them
    popup.style.display = 'block';

    for (let i = visibleItems.length - 1; i >= 0; i--) {
      const child = visibleItems[i];

      // is the overflow button outside the container (if it is visible)?
      const buttonOverflowing = this.__rtl ?
        btn.offsetWidth > 0 && btn.offsetLeft < this.offsetLeft :
        btn.offsetWidth > 0 && btn.offsetLeft + btn.offsetWidth > this.offsetLeft + this.clientWidth + 1; // Chrome sometimes reports the button 1px outside the container
      // "start aligned": is the last visible item outside the container?
      const lastItemOverflowing = this.__rtl ?
        child.offsetLeft < this.offsetLeft :
        child.offsetLeft + child.offsetWidth > this.offsetLeft + this.clientWidth;
      // "end aligned": is the first item outside the container?
      const firstItemOverflowing = this.__rtl ?
        visibleItems[0].offsetLeft + visibleItems[0].offsetWidth > this.offsetLeft + this.offsetWidth :
        visibleItems[0].offsetLeft < this.offsetLeft;

      if (buttonOverflowing || lastItemOverflowing || firstItemOverflowing) {
        child.setAttribute('slot', 'menu');
        this.setAttribute('overflow', '');
      } else {
        break;
      }
    }

    // Clear the workaround style
    popup.style.display = '';
  }
}

OverflowMenu.defineElement();
