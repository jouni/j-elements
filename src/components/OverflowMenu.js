import { MutationsMixin } from '../util/MutationsMixin.js';
import './Menu.js';

const FORCED_COLLAPSE_CLASS = 'overflow-menu';

const styles = `
  :host {
    display: flex;
    align-items: center;
    /* Allow the host to shrink smaller children */
    min-width: 0;
  }

  ::slotted(*) {
    flex-shrink: 0;
  }

  :host(:not([overflow])) slot[name="overflow-button"] {
    display: none;
  }

  ::slotted(hr:not([slot="menu"])) {
      all: unset !important;
      height: auto !important;
      align-self: stretch !important;
      width: var(--divider-width, 1px) !important;
      margin: 0 !important;
      padding: var(--divider-margin, 0.5rem 0.25rem) !important;
      background: var(--divider-color, currentColor) content-box !important;
      flex: none !important;
    }
`;

export class OverflowMenu extends MutationsMixin(HTMLElement) {
  observedMutations = { childList: true };

  connectedCallback() {
    super.connectedCallback();

    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>${styles}</style>
        <slot></slot>
        <j-menu exportparts="popup">
          <slot name="overflow-button" slot="trigger"></slot>
          <slot name="menu"></slot>
          <slot name="tooltip" slot="tooltip"></slot>
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
    }

    this.__resizeObserver.observe(this);
  }

  disconnectedCallback() {
    this.__resizeObserver.disconnect();
    super.disconnectedCallback();
  }

  handleMutations() {
    this._requestUpdate();
  }

  _requestUpdate() {
    if (this.__updateTimeout) {
      clearTimeout(this.__updateTimeout);
    }
    this.__updateTimeout = setTimeout(() => this._updateOverflowingItems(), 20);
  }

  _updateOverflowingItems() {
    for (let i = 0; i < this.children.length; i++) {
      const item = this.children[i];
      if (item.slot !== 'overflow-button' && item.slot !== 'tooltip') {
        if (item.classList.contains(FORCED_COLLAPSE_CLASS)) {
          item.setAttribute('slot', 'menu');
        } else {
          item.removeAttribute('slot');
        }
      }
    }

    // Force the overflow button visible so we can measure its width
    this.setAttribute('overflow', '');
    const overflowButtonWidth = this._overflowButton.offsetWidth;

    // Without this, at least Chrome is sometimes unwilling to render the child items that are
    // no longer within it (unslotted), and reports 0x0 size for them
    const popup = this.shadowRoot.querySelector('j-menu')._popup;
    popup.style.setProperty('display', 'block');

    // Make this.scrollWidth report a different value than this.offsetWidth
    if (getComputedStyle(this).getPropertyValue('justify-content') == 'flex-end') {
      this.style.setProperty('justify-content', 'flex-start');
    }

    const visibleItems = this.querySelectorAll(`:scope > :not(.${FORCED_COLLAPSE_CLASS}):not([slot="overflow-button"],[slot="tooltip"])`);
    const forcedOverflowItems = this.querySelectorAll(`:scope > .${FORCED_COLLAPSE_CLASS}`);
    const itemRects = [];
    const groupRect = this.getBoundingClientRect();
    let firstOverflowItemIndex = visibleItems.length;
    const isRtl = getComputedStyle(this).getPropertyValue('direction') == 'rtl';

    for (let i = 0; i < visibleItems.length; i++) {
      itemRects[i] = visibleItems[i].getBoundingClientRect();

      // Handles both LTR and RTL cases
      if (itemRects[i].right > groupRect.right || itemRects[i].left < groupRect.left) {
        firstOverflowItemIndex = i;
        break;
      }
    }

    if (firstOverflowItemIndex < visibleItems.length || forcedOverflowItems) {
      // Make sure the overflow button has space
      let spaceAvailable = 0;
      const prop = isRtl ? 'left' : 'right';

      while (firstOverflowItemIndex > 0) {
        spaceAvailable = Math.abs(groupRect[prop] - itemRects[firstOverflowItemIndex - 1][prop]);
        if (spaceAvailable < overflowButtonWidth) {
          firstOverflowItemIndex--;
        } else {
          break;
        }
      }

      // All items after this index need to be moved to the overflow menu
      [...visibleItems].slice(firstOverflowItemIndex).forEach(item => {
        item.setAttribute('slot', 'menu');
      });
    } else if (!this.querySelector('.' + FORCED_COLLAPSE_CLASS)) {
      // No overflowing items
      this.removeAttribute('overflow', '');
    }

    // Clear workaround styles
    popup.style.removeProperty('display');
    this.style.removeProperty('justify-content');
  }
}

customElements.define('j-overflow-menu', OverflowMenu);
