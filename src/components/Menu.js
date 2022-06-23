import { DefineElementMixin } from '../util/DefineElementMixin.js';
import { HasPopup } from './HasPopup.js';

export class Menu extends DefineElementMixin(HasPopup) {
  styles = `
    [part="popup"] {
      min-width: var(--anchor-width);
    }

    [part="popup"],
    ::slotted([role="group"]) {
      display: flex;
      flex-direction: column;
    }

    slot:not([name]),
    ::slotted([role="group"]) {
      gap: inherit;
    }

    ::slotted(hr) {
      margin: 0 !important;
      width: 100%;
    }
  `;

  connectedCallback() {
    super.connectedCallback();

    if (!this._popup.hasAttribute('role')) {
      this._popup.setAttribute('role', 'menu');
      this._popup.addEventListener('click', this._onClick.bind(this));

      const popupSlot = this.shadowRoot.querySelector('slot:not([name])');
      popupSlot.onslotchange = () => {
        this._menuItems = popupSlot.assignedNodes({ flatten: true }).reduce((items, el) => {
          if (el.localName == 'button') return items.concat([el]);
          else if (el.nodeType == 1) return items.concat([...el.querySelectorAll('button')]);
          return items;
        }, []);
        this._menuItems.forEach(button => button.setAttribute('role', 'menuitem'));
      }
    }
  }

  _onTriggerSlotChange() {
    super._onTriggerSlotChange();
    this._triggerElement.setAttribute('aria-haspopup', 'menu');
  }

  _onOpen() {
    super._onOpen();
    this._menuItems.find(button => !button.hasAttribute('disabled'))?.focus();
  }

  _onClick(e) {
    const button = e.target.closest('button');
    if (this._menuItems.includes(button) && !button?.hasAttribute('aria-haspopup')) {
      this.closePopup();
      button.dispatchEvent(new CustomEvent('item-click', { bubbles: true, composed: true }));
    }
  }
}

Menu.defineElement();
