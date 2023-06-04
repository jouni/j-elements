import { positionPopup } from "./positionPopup.js";

/**
 * A mixin class that provides an easy way to add a popup to a component
 */
export const PopupMixin = superClass => class extends superClass {
  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();

    if (!this.shadowRoot?.querySelector('dialog[part="popup"]')) {
      this.__initDom();
    }
  }

  disconnectedCallback() {
    this.closePopup();
    if (super.disconnectedCallback) super.disconnectedCallback();
  }

  __initDom() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open', delegatesFocus: true });
    }

    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        :host {
          --popup-mode: modal;
        }

        dialog {
          box-sizing: border-box;
          margin: 0;
          overflow: visible;
          background: transparent;
          border: 0;
          padding: 0;
          max-width: 100%;
          max-height: 100%;
          outline: none;
          display: flex;
          top: 0;
          left: 0;
        }

        dialog:not([open]) {
          display: none;
        }

        dialog::backdrop {
          opacity: 0;
        }

        [part="popup"] {
          overscroll-behavior: contain;
          overflow: auto;
          display: block;
          box-sizing: border-box;
        }
      </style>
      <slot name="trigger"></slot>
      <dialog>
        <div part="popup" tabindex="-1">
          <slot name=""></slot>
        </div>
        <slot name="tooltip"></slot>
      </dialog>
    `;

    this.shadowRoot.append(template.content.cloneNode(true));

    this._popup = this.shadowRoot.querySelector('dialog');

    this._triggerElement = this;
    this.shadowRoot.querySelector('slot[name="trigger"]').onslotchange = this._onTriggerSlotChange.bind(this);

    this._onPopupClick = this._onPopupClick.bind(this);
    this._onPopupKeydown = this._onPopupKeydown.bind(this);
    this._positionPopup = this._positionPopup.bind(this);

    this._popup.addEventListener('close', this._onClosePopup.bind(this));
    this._popup.addEventListener('click', this._onPopupClick);
    this._popup.addEventListener('keydown', this._onPopupKeydown);
  }

  _onTriggerSlotChange() {
    this._triggerElement = this.shadowRoot.querySelector('slot[name="trigger"]').assignedElements({ flatten: true })[0] || this;
    this._triggerElement.setAttribute('aria-haspopup', 'dialog');
    this._triggerElement.addEventListener('click', this._onTriggerClick.bind(this));
  }

  openPopup(withKeyboard) {
    this.isModal = getComputedStyle(this._popup).getPropertyValue('--popup-mode').trim().toLowerCase() === 'modal';

    if (!this._popup.open) {
      if (this.isModal) {
        this._popup.showModal();
      } else {
        this._popup.show();
      }
      this._onOpenPopup(withKeyboard);
    }
  }

  _onOpenPopup(withKeyboard) {
    // TODO consider using a class name instead (faster CSS selector)
    this._triggerElement.setAttribute('active', '');
    this._positionPopup();
    window.addEventListener('scroll', this._positionPopup, { capture: true, passive: true });
    window.visualViewport.addEventListener('resize', this._positionPopup);
  }

  closePopup() {
    this._popup.close();
  }

  _onTriggerClick(e) {
    if (this._popup.open) {
      this.closePopup();
    } else {
      this.openPopup(e.detail === 0);
    }
    // Consume the click event
    e.stopPropagation();
  }

  _onPopupClick(e) {
    // Ignore click events from keyboard
    if (e.detail === 0) return;
    var rect = this._popup.getBoundingClientRect();
    var isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height
      && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
    if (!isInDialog) {
      this.closePopup();
    }
  }

  _onPopupKeydown(e) {
    if (!this.isModal && e.key === 'Escape' && this._popup.open) {
      e.stopPropagation();
      e.preventDefault();
      this.closePopup();
      this._triggerElement.focus();
    }
  }

  _onClosePopup() {
    this._triggerElement.removeAttribute('active');
    this._triggerElement.focus();
    window.removeEventListener('scroll', this._positionPopup, { capture: true, passive: true });
    window.visualViewport.removeEventListener('resize', this._positionPopup);
  }

  _positionPopup() {
    this.style.setProperty('--anchor-width', `${Math.round(this._triggerElement.offsetWidth)}px`);
    this.style.setProperty('--anchor-height', `${Math.round(this._triggerElement.offsetHeight)}px`);
    positionPopup(this._popup, this._anchorElement || this._triggerElement, this.isModal);
  }
}
