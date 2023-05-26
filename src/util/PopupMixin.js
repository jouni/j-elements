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
      this.attachShadow({ mode: 'open' });
    }

    const template = document.createElement('template');
    template.innerHTML = `
      <style>
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
        <div part="popup">
          <slot name=""></slot>
        </div>
        <slot name="tooltip"></slot>
      </dialog>
    `;

    this.shadowRoot.append(template.content.cloneNode(true));

    this._popup = this.shadowRoot.querySelector('dialog');

    this._triggerElement = this;
    this.shadowRoot.querySelector('slot[name="trigger"]').onslotchange = this._onTriggerSlotChange.bind(this);

    this._popup.addEventListener('close', this._onClosePopup.bind(this));

    this.__boundOnScroll = this._onScroll.bind(this);
    this.__boundPositionPopup = this._positionPopup.bind(this);

    this._popup.addEventListener('click', this.closePopup.bind(this));
  }

  _onTriggerSlotChange() {
    this._triggerElement = this.shadowRoot.querySelector('slot[name="trigger"]').assignedElements({ flatten: true })[0] || this;
    this._triggerElement.setAttribute('aria-haspopup', 'dialog');
    this._triggerElement.addEventListener('click', this.openPopup.bind(this));
  }

  openPopup() {
    if (!this._popup.open) {
      this._popup.showModal();
      this._onOpenPopup();
    }
  }

  _onOpenPopup() {
    // TODO consider using a class name instead (faster CSS selector)
    this._triggerElement.setAttribute('active', '');
    this._positionPopup();
    this._popup.focus();
    window.addEventListener('scroll', this.__boundOnScroll, { capture: true, passive: true });
    window.visualViewport.addEventListener('resize', this.__boundPositionPopup);
  }

  closePopup(e) {
    // No event: programmatically closed
    if (!e) {
      this._popup.close();
      return;
    }

    // Ignore click events that are triggered with the keyboard
    if (e.detail === 0) {
      return;
    }

    var rect = this._popup.getBoundingClientRect();
    var isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height
      && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
    if (!isInDialog) {
      this._popup.close();
    }
  }

  _onClosePopup() {
    this._triggerElement.removeAttribute('active');
    this._triggerElement.focus();
    window.removeEventListener('scroll', this.__boundOnScroll, { capture: true, passive: true });
    window.visualViewport.removeEventListener('resize', this.__boundPositionPopup);
  }

  _onScroll() {
    this._positionPopup();
  }

  _positionPopup() {
    this.style.setProperty('--anchor-width', `${Math.round(this._triggerElement.offsetWidth)}px`);
    this.style.setProperty('--anchor-height', `${Math.round(this._triggerElement.offsetHeight)}px`);
    positionPopup(this._popup, this._anchorElement || this._triggerElement);
  }
}
