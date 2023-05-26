import { DefineElementMixin } from '../util/DefineElementMixin.js';
import { PopupMixin } from '../util/PopupMixin.js';

const styles = `
    :host {
      --popup-min-width: var(--anchor-width);
    }

    [part="popup"] {
      min-width: var(--popup-min-width);
      width: fit-content;
    }

    [part="popup"],
    ::slotted([role="group"]) {
      display: flex;
      flex-direction: column;
    }

    :is(slot:not([name]), slot[name=""]),
    ::slotted([role="group"]) {
      gap: inherit;
    }

    ::slotted(hr) {
      all: unset !important;
      height: var(--divider-height, 1px) !important;
      margin: var(--divider-margin, 0.5rem 0.25rem) !important;
      background: var(--divider-color, currentColor) !important;
      flex: none !important;
      align-self: stretch !important;
    }

    :is(slot:not([name]), slot[name=""])::slotted(*) {
      --popup-align: horizontal;
      --popup-min-width: fit-content;
    }
  `;

export class Menu extends DefineElementMixin(PopupMixin(HTMLElement)) {
  connectedCallback() {
    super.connectedCallback();

    const style = document.createElement('style');
    style.textContent = styles;
    this.shadowRoot.appendChild(style);

    if (!this._popup.hasAttribute('role')) {
      this._popup.setAttribute('role', 'menu');
      this._popup.addEventListener('click', this._onClick.bind(this));
      this._popup.addEventListener('item-click', this.closePopup.bind(this));
      this._popup.addEventListener('keydown', this._onKeyDown.bind(this));
      this._popup.addEventListener('mousemove', this._onMouseOver);

      const popupSlot = this.shadowRoot.querySelector('slot:not([name]), slot[name=""]');
      popupSlot.onslotchange = () => {
        if (this._menuItems) {
          this._menuItems.forEach(button => button.removeAttribute('role'));
        }
        this._menuItems = popupSlot.assignedElements({ flatten: true }).reduce((items, el) => {
          if (el.localName == 'button') return items.concat([el]);
          else if (el.localName == this.localName) return items.concat([el.querySelector('[slot="trigger"]')]);
          else return items.concat([...el.querySelectorAll('button')]);
        }, []);
        this._menuItems.forEach(button => button.setAttribute('role', 'menuitem'));
      }
    }
  }

  _onTriggerSlotChange() {
    super._onTriggerSlotChange();
    this._triggerElement.setAttribute('aria-haspopup', 'menu');
  }

  _onClick(e) {
    const button = e.target.closest('button');
    if (this._menuItems.includes(button) && !button?.hasAttribute('aria-haspopup')) {
      button.dispatchEvent(new CustomEvent('item-click', { bubbles: true, composed: true }));
      e.stopPropagation();
    }
  }

  _onKeyDown(e) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      e.stopPropagation();
      const activeItems = this._menuItems.filter(item => !item.hasAttribute('disabled'));
      let index = activeItems.indexOf(document.activeElement);
      index += (e.key === 'ArrowDown') ? 1 : -1;
      if (index < 0) index = activeItems.length - 1;
      if (index >= activeItems.length) index = 0;
      activeItems[index].focus();
    }
  }

  _onMouseOver(e) {
    if (e.target.getAttribute('role') === 'menuitem' && !e.target.hasAttribute('disabled')) {
      e.target.focus({ preventScroll: true, focusVisible: false });
    }
  }
}

Menu.defineElement();
