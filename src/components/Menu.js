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
      --popup-mode: modeless;
    }

    ::slotted(j-menu) {
      display: contents;
    }
  `;

export class Menu extends PopupMixin(HTMLElement) {
  connectedCallback() {
    super.connectedCallback();

    const style = document.createElement('style');
    style.textContent = styles;
    this.shadowRoot.appendChild(style);

    if (!this._popup.hasAttribute('role')) {
      this._popup.setAttribute('role', 'menu');
      this._popup.addEventListener('mousemove', this._onPopupMouseMove.bind(this));

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

  _onPopupClick(e) {
    super._onPopupClick(e);
    if (e.target.closest('button')?.getAttribute('role').match(/menuitem|option/)) {
      if (e.target.getAttribute('aria-disabled') === 'true') {
        e.stopPropagation();
      } else {
        // Clicked on a menu item. Close the popup, and allow the event to propagate.
        this.closePopup();
      }
    } else if (e.target === this._popup || (e.target.assignedSlot || e.target).closest('[part="popup"]')) {
      // Clicked inside the popup element. Consume the event.
      e.stopPropagation();
    }
  }

  _onPopupKeydown(e) {
    super._onPopupKeydown(e);
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

  _onPopupMouseMove(e) {
    if (this._menuItems.includes(e.target) && (!e.target.hasAttribute('disabled') || !e.target.hasAttribute('aria-disabled'))) {
      if (!e.target.hasAttribute('aria-haspopup')) {
        this.closeSubMenus();
      }
      e.target.focus({ preventScroll: true, focusVisible: false });
    }
  }

  _onOpenPopup(withKeyboard) {
    super._onOpenPopup(withKeyboard);
    if (withKeyboard) {
      const firstItem = this._menuItems.filter(item => (!item.hasAttribute('disabled') && !item.hasAttribute('aria-disabled')))[0];
      firstItem.focus({ focusVisible: true });
    }
  }

  closePopup() {
    if (this._popup.open) {
      this.closeSubMenus();
      super.closePopup();
    }
  }

  closeSubMenus() {
    this._menuItems.forEach(button => {
      if (button.hasAttribute('aria-haspopup')) {
        button.parentElement.closePopup();
      }
    });
  }
}

customElements.define('j-menu', Menu);
