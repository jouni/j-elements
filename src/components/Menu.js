import { PopupMixin } from '../util/PopupMixin.js';

const styles = `
    :host {
      --popup-min-width: var(--anchor-width);
    }

    [part=popup] {
      min-width: var(--popup-min-width);
      width: fit-content;
    }

    [part=popup],
    ::slotted([role=group]) {
      display: flex;
      flex-direction: column;
    }

    :is(slot:not([name]), slot[name=""]),
    ::slotted([role=group]) {
      gap: inherit;
    }

    ::slotted(hr) {
      all: unset;
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
      --_p1: initial;
      --_p2: initial;
      --_p3: initial;
    }

    ::slotted(j-menu)::after {
      content: "";
      position: absolute;
      z-index: 1;
      inset: var(--_p1);
      clip-path: polygon(var(--_p2), var(--_p3));
    }
  `;

export class Menu extends PopupMixin(HTMLElement) {
  connectedCallback() {
    super.connectedCallback();

    if (!this._popup.hasAttribute('role')) {
      this._popup.setAttribute('role', 'menu');

      const style = document.createElement('style');
      style.textContent = styles;
      this.shadowRoot.appendChild(style);

      if (window.matchMedia('(any-hover: hover)').matches) {
        this._popup.addEventListener('mousemove', this._onPopupMouseMove.bind(this));
      }
      this.addEventListener('keydown', this._onKeydown.bind(this));

      const popupSlot = this.shadowRoot.querySelector('slot:not([name]), slot[name=""]');
      popupSlot.onslotchange = () => {
        this._menuItems = popupSlot.assignedElements({ flatten: true }).reduce((items, el) => {
          if (el.matches('button, option, [role=menuitem], [role=option]')) return items.concat([el]);
          else if (el.localName == this.localName) return items.concat([el.querySelector('[slot=trigger]')]);
          else return items.concat([...el.querySelectorAll('button, option, [role=menuitem], [role=option]')]);
        }, []);
        this._menuItems.forEach(menuitem => {if (!menuitem.hasAttribute('role')) menuitem.setAttribute('role', 'menuitem')});
        this._updateItemTabIndexes();
      }
    }
  }

  _onPopupClick(e) {
    super._onPopupClick(e);
    const menuitem = e.target.closest('[role=menuitem], [role=option], option');
    if (menuitem) {
      if (menuitem.disabled || menuitem.getAttribute('aria-disabled') === 'true') {
        e.stopPropagation();
      } else {
        // Clicked on a menu item. Close the popup, and allow the event to propagate.
        this.closePopup();
      }
    } else if (e.target === this._popup || (e.target.assignedSlot || e.target).closest('[part=popup]')) {
      // Clicked inside the popup element. Consume the event.
      e.stopPropagation();
    }
  }

  _onPopupKeydown(e) {
    super._onPopupKeydown(e);
    if (this._menuItems.length > 0 && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      e.preventDefault();
      e.stopPropagation();

      const activeItems = this._menuItems.filter(item => !item.hasAttribute('disabled'));
      let index = activeItems.indexOf(document.activeElement);
      index += (e.key === 'ArrowDown') ? 1 : -1;
      if (index < 0) index = activeItems.length - 1;
      if (index >= activeItems.length) index = 0;

      // If the keyboard navigation causes the popup to scroll, that triggers
      // a mousemove event in Safari if the mouse cursor is over the popup
      clearTimeout(this.__preventMouseMoveListenerTimeout);
      this.__preventMouseMoveListenerTimeout = setTimeout(() => this.__preventMouseMoveListenerTimeout = null, 300);

      activeItems[index].focus({ preventScroll: true });
      activeItems[index].scrollIntoView({ block: 'nearest' });

      this._updateItemTabIndexes();
    } else if (e.target.matches('[role=menuitem]:not([aria-haspopup])') && (e.key == 'ArrowLeft' || e.key == 'ArrowRight')) {
      e.preventDefault();
      e.stopPropagation();
      this.closePopup();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      e.target.closest('[role=menuitem], [role=option]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  }

  _onPopupMouseMove(e) {
    if (this.__preventMouseMoveListenerTimeout) {
      return;
    }

    // Don't let the event pass to parent menus
    e.stopPropagation();

    let menuitem = e.target.closest(`[role=menuitem], [role=option], ${this.localName}`);
    if (menuitem?.localName === this.localName && menuitem != this) menuitem = menuitem._triggerElement;

    // Close the current submenu if mouse is over some other element than the currently open submenu, or if the mouse is over the root level popup.
    if (
      e.target.closest(this.localName) != this.__currentSubmenu && e.target.closest('dialog') != this._popup
      ||
      e.target.closest('[part=popup]') == this._popup.querySelector('[part=popup]')
      ) {
      this._closeSubMenu();
    }

    // Open submenus on mouse hover, and provide an additional tracking surface
    // (the ::after pseudo-element) to move the cursor diagonally over other menu items towards the submenu
    if (menuitem && e.target != this.__currentSubmenu) {
      if (menuitem.hasAttribute('aria-haspopup')) {
        this.__currentSubmenu = menuitem.closest(this.localName);
        if (this.__currentSubmenu) {
          this.__currentSubmenu.openPopup();

          const origo = this._popup.getBoundingClientRect();
          const menu = this.__currentSubmenu._popup.getBoundingClientRect();
          const clipX = (origo.x > menu.x) ? menu.right - origo.x : menu.x - origo.x;
          const mouse = { x: e.clientX - origo.x, y: e.clientY - menu.y};

          // inset
          this.__currentSubmenu.style.setProperty('--_p1', `${menu.y - origo.y}px 0 ${origo.bottom - menu.bottom}px 0`);
          // clip-path
          this.__currentSubmenu.style.setProperty('--_p2', `${clipX}px 0, ${clipX}px 100%`);
          // clip-path, part 2
          this.__currentSubmenu.style.setProperty('--_p3', `${mouse.x}px ${mouse.y}px`);

          clearTimeout(this.__submenuTimeout);
          this.__submenuTimeout = setTimeout(() => {
            this.__currentSubmenu?.style.removeProperty('--_p1');
            this.__currentSubmenu?.style.removeProperty('--_p2');
            this.__currentSubmenu?.style.removeProperty('--_p3');
          }, 1000);
        }
      }

      menuitem.focus({ preventScroll: true });

      this._updateItemTabIndexes();
    } else if (e.target.closest('dialog') == this._popup) {
      // Mouse outside popup
      this._focusPopup({ preventScroll: true });
    }
  }

  _onOpenPopup(withKeyboard) {
    super._onOpenPopup(withKeyboard);
    if (withKeyboard) {
      const firstItem = this._menuItems.filter(menuitem => (!menuitem.hasAttribute('disabled') && !menuitem.hasAttribute('aria-disabled')))[0];
      firstItem?.focus();
    }
    this._updateItemTabIndexes(true);
  }

  closePopup() {
    if (this._popup.open) {
      this._closeSubMenu();
      super.closePopup();
    }
  }

  _closeSubMenu() {
    if (this.__currentSubmenu) {
      this.__currentSubmenu.closePopup();
      this.__currentSubmenu.style.removeProperty('--_p1');
      this.__currentSubmenu.style.removeProperty('--_p2');
      this.__currentSubmenu.style.removeProperty('--_p3');
      delete this.__currentSubmenu;
    } else {
      this.querySelectorAll('j-menu').forEach(menu => menu.closePopup());
    }
  }

  _updateItemTabIndexes(makeFirstFocusable) {
    const activeItems = this._menuItems.filter(item => !item.hasAttribute('disabled'));
    activeItems.forEach((menuitem, i) => {
      menuitem.setAttribute('tabindex', ((makeFirstFocusable && i == 0) || menuitem === document.activeElement) ? '0' : '-1');
    });
  }

  _onKeydown(e) {
    if (this._triggerElement.matches('[role=menuitem][aria-haspopup]') && (e.key == 'ArrowLeft' || e.key == 'ArrowRight')) {
      e.preventDefault();
      e.stopPropagation();
      this.openPopup(true);
    }
  }

  _focusPopup(opts) {
    if (this.__currentSubmenu) {
      this.__currentSubmenu._focusPopup(opts);
    } else {
      this._popup.querySelector('[part="popup"]').focus(opts);
    }
  }
}

customElements.define('j-menu', Menu);
