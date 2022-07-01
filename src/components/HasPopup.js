const styles = `
  :host {
    display: contents;
  }

  dialog {
    box-sizing: border-box;
    overscroll-behavior: contain;
    overflow: auto;
    margin: 0;
  }

  dialog:not([open]) {
    display: none;
  }

  dialog::backdrop {
    opacity: 0;
  }
`;

export class HasPopup extends HTMLElement {
  styles = '';

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          ${styles}
          ${this.styles};
        </style>
        <slot name="trigger"></slot>
        <dialog part="popup">
          <slot></slot>
        </dialog>
      `;

      this._popup = this.shadowRoot.querySelector('dialog');

      this._triggerElement = this;
      this.shadowRoot.querySelector('slot[name="trigger"]').onslotchange = this._onTriggerSlotChange.bind(this);

      this.__boundClosePopup = this.closePopup.bind(this);
      this._popup.addEventListener('close', this._onClose.bind(this));

      this.__boundOnScroll = this._onScroll.bind(this);
      this.__boundPositionPopup = this._positionPopup.bind(this);

      this._popup.addEventListener('click', this.closePopup.bind(this));
    }

    this.__rtl = getComputedStyle(this).getPropertyValue('direction') == 'rtl';
  }

  disconnectedCallback() {
    this.closePopup();
  }

  _onTriggerSlotChange() {
    this._triggerElement = this.shadowRoot.querySelector('slot[name="trigger"]').assignedElements({ flatten: true })[0] || this;
    this._triggerElement.setAttribute('aria-haspopup', 'dialog');
    this._triggerElement.addEventListener('click', this.openPopup.bind(this));
  }

  openPopup() {
    if (!this._popup.open) {
      this._popup.showModal();
      this._onOpen();
    }
  }

  _onOpen() {
    // TODO consider using a class name instead (faster CSS selector)
    this._triggerElement.setAttribute('active', '');
    this._positionPopup();
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
    if (e.pointerId === -1) {
      return;
    }

    var rect = this._popup.getBoundingClientRect();
    var isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height
      && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
    if (!isInDialog) {
      this._popup.close();
    }

    // e.stopPropagation();
  }

  _onClose() {
    this._triggerElement.removeAttribute('active');
    this._triggerElement.focus();
    window.removeEventListener('scroll', this.__boundOnScroll, { capture: true, passive: true });
    window.visualViewport.removeEventListener('resize', this.__boundPositionPopup);
  }

  _onScroll() {
    this._positionPopup();
  }

  _positionPopup() {
    this._popup.style.removeProperty('width');
    this._popup.style.removeProperty('height');
    this._popup.style.removeProperty('transform');

    const anchor = this._triggerElement.getBoundingClientRect();
    this.style.setProperty('--anchor-width', `${Math.round(anchor.width)}px`);
    this.style.setProperty('--anchor-height', `${Math.round(anchor.height)}px`);

    const horizontal = getComputedStyle(this).getPropertyValue('--popup-align').trim().toLowerCase() == 'horizontal';
    const popup = this._popup.getBoundingClientRect();
    // TODO this assumes a uniform margin around the popup
    const popupMargin = parseInt(getComputedStyle(this._popup).getPropertyValue('margin'));
    let popupRequiredHeight = popup.height + popupMargin * 2;
    let popupRequiredWidth = popup.width + popupMargin * 2;

    const pageWidth = visualViewport.width;
    const pageHeight = visualViewport.height;
    // TODO take zoom into account somehow

    const spaceAboveAnchor = anchor.top;
    const spaceBelowAnchor = pageHeight - anchor.top - (horizontal ? 0 : anchor.height);
    const spaceBeforeAnchor = this.__rtl ? pageWidth - anchor.left - anchor.width : anchor.left;
    const spaceAfterAnchor = this.__rtl ? anchor.left : pageWidth - anchor.left - (horizontal ? anchor.width : 0);

    let x = 0, y = 0;

    if (spaceBeforeAnchor > spaceAfterAnchor && (popupRequiredWidth > pageWidth / 2 || popupRequiredWidth > spaceAfterAnchor)) {
      // Place before anchor
      if (this.__rtl) {
        x = anchor.left + (horizontal ? anchor.width : -popupMargin) + popupRequiredWidth - pageWidth;
      } else {
        x = anchor.left + (horizontal ? 0 : anchor.width + popupMargin) - popupRequiredWidth;
      }
    } else {
      // Place after anchor
      if (this.__rtl) {
        x = anchor.left + (horizontal ? 0 : anchor.width + popupMargin) - pageWidth;
      } else {
        x = anchor.left + (horizontal ? anchor.width : -popupMargin);
      }
    }

    if (spaceAboveAnchor > spaceBelowAnchor && (popupRequiredHeight > pageHeight / 2 || popupRequiredHeight > spaceBelowAnchor)) {
      // Place popup above anchor
      if (popupRequiredHeight > spaceAboveAnchor) {
        this._popup.style.height = (spaceAboveAnchor - popupMargin * 2) + 'px';
        popupRequiredHeight = spaceAboveAnchor;
      }
      y = anchor.top - popupRequiredHeight + (horizontal ? anchor.height + popupMargin : 0);
    } else {
      // Place popup below anchor
      if (popupRequiredHeight > spaceBelowAnchor) {
        this._popup.style.height = (spaceBelowAnchor - popupMargin * 2) + 'px';
      }
      y = anchor.top + (horizontal ? -popupMargin : anchor.height);
    }

    // In Safari, the visual viewport offset affects the transform/translate
    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x += visualViewport.offsetLeft;
      y += visualViewport.offsetTop;
    }

    // Keep inside the browser viewport
    if (this.__rtl) {
      if (popupRequiredWidth - x > pageWidth) {
        x -= pageWidth - popupRequiredWidth + x;
      }
      x = Math.min(x, 0);
    } else {
      if (x + popupRequiredWidth > pageWidth) {
        x -= x + popupRequiredWidth - pageWidth;
      }
      x = Math.max(x, 0);
    }

    this._popup.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;
  }
}
