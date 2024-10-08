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
          width: fit-content;
          display: block;
        }

        dialog {
          box-sizing: border-box;
          margin: var(--popup-margin, 2px);
          overflow: visible;
          background: transparent;
          border: 0;
          padding: 0;
          max-width: 100%;
          max-height: 100%;
          outline: none;
          display: flex;
          top: var(--_popup-inset, 0);
          left: var(--_popup-inset, 0);
          z-index: 100;
        }

        dialog:not([open]) {
          display: none;
        }

        dialog::backdrop {
          opacity: 0;
        }

        [part=popup] {
          overscroll-behavior: contain;
          overflow: auto;
          display: block;
          box-sizing: border-box;
        }

        /* Needed to support backdrop filter: https://stackoverflow.com/questions/60997948/backdrop-filter-not-working-for-nested-elements-in-chrome) */
        [part=popup]::before {
          content: "";
          position: absolute;
          z-index: -1;
          inset: 0;
          border-radius: inherit;
          -webkit-backdrop-filter: var(--backdrop-filter);
          backdrop-filter: var(--backdrop-filter);
        }
      </style>
      <slot name=trigger></slot>
      <dialog role=none>
        <div part=popup tabindex=-1 role=dialog>
          <slot name=""></slot>
        </div>
        <slot name=tooltip></slot>
      </dialog>
    `;

    this.shadowRoot.append(template.content.cloneNode(true));

    this._popup = this.shadowRoot.querySelector('dialog');
    this._visiblePopup = this.shadowRoot.querySelector('[part=popup]');

    this._triggerElement = this;
    this.shadowRoot.querySelector('slot[name=trigger]').onslotchange = this._onTriggerSlotChange.bind(this);

    // TODO listen for click events on the document level for modeless popups ("close on outside click")
    this._onPopupClick = this._onPopupClick.bind(this);
    this._onPopupKeydown = this._onPopupKeydown.bind(this);
    this._positionPopup = this._positionPopup.bind(this);
    this._onTriggerClick = this._onTriggerClick.bind(this);

    this._popup.addEventListener('close', this._onClosePopup.bind(this));
    this._popup.addEventListener('click', this._onPopupClick);
    this._popup.addEventListener('keydown', this._onPopupKeydown);

    // Clicking on the host should not trigger regular click handlers
    this.addEventListener('click', (e) => {
      if (e.target == this && !this._popup.open) {
        e.stopPropagation();
      }
    }, { capture: true });
  }

  _onTriggerSlotChange() {
    // Clean up old trigger element
    if (this._triggerElement) {
      this._triggerElement.removeAttribute('aria-haspopup');
      this._triggerElement.removeAttribute('aria-expanded');
      this._triggerElement.removeEventListener('click', this._onTriggerClick);
    }
    this._triggerElement = this.shadowRoot.querySelector('slot[name=trigger]').assignedElements({ flatten: true })[0] || this;
    this._triggerElement.setAttribute('aria-haspopup', this._visiblePopup.getAttribute('role') || 'dialog');
    this._triggerElement.setAttribute('aria-expanded', 'false');
    this._triggerElement.addEventListener('click', this._onTriggerClick);
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
    this._triggerElement.setAttribute('aria-expanded', 'true');
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
    }
  }

  _onClosePopup() {
    this._triggerElement.setAttribute('aria-expanded', 'false');
    this._triggerElement.focus({ preventScroll: true });
    window.removeEventListener('scroll', this._positionPopup, { capture: true, passive: true });
    window.visualViewport.removeEventListener('resize', this._positionPopup);
  }

  _positionPopup() {
    this.style.setProperty('--trigger-width', `${Math.round(this._triggerElement.offsetWidth)}px`);
    this.style.setProperty('--trigger-height', `${Math.round(this._triggerElement.offsetHeight)}px`);
    positionPopup(this._popup, this._triggerElement, this.isModal);
  }
}
