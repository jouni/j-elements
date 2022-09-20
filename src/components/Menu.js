import { DefineElementMixin } from '../util/DefineElementMixin.js';
import { PopupMixin } from '../util/PopupMixin.js';

const styles = `
    :host {
      --popup-min-width: var(--anchor-width);
    }

    [part="popup"] {
      width: var(--popup-min-width);
      min-width: fit-content;
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
      margin: 0 !important;
      width: 100%;
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

  _onOpenPopup() {
    super._onOpenPopup();
    this._menuItems.find(button => !button.hasAttribute('disabled'))?.focus();
  }

  _onClick(e) {
    const button = e.target.closest('button');
    if (this._menuItems.includes(button) && !button?.hasAttribute('aria-haspopup')) {
      button.dispatchEvent(new CustomEvent('item-click', { bubbles: true, composed: true }));
    }
  }
}

Menu.defineElement();
