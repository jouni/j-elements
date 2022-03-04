import { DefineElementMixin } from '../util/DefineElementMixin.js';

const styles = `
  :host {
    display: flex;
    align-items: center;
  }

  ::slotted(*) {
    flex-shrink: 0;
  }

  button {
    align-self: stretch;
    flex: none;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    width: var(--menu-button-size, 2rem);
    min-height: var(--menu-button-size, 2rem);
    margin: 0;
    font: inherit;
    color: inherit;
    border: 0;
    padding: 0;
    background: transparent;
  }

  :host(:not([overflow])) button {
    display: none;
  }

  dialog {
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
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

export class OverflowMenu extends DefineElementMixin(HTMLElement) {
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({mode: 'open'});
      this.shadowRoot.innerHTML = `
        <style>${styles}</style>
        <slot></slot>
        <button aria-label="open menu" part="menu-button">···</button>
        <dialog part="menu">
          <slot name="menu"></slot>
        </dialog>
      `;
      this._menu = this.shadowRoot.querySelector('dialog');
      this._menuButton = this.shadowRoot.querySelector('button');
      this._menuButton.onclick = this._openMenu.bind(this);

      this.__resizeObserver = new ResizeObserver(this._onResize.bind(this));

      this.__boundCloseMenu = this._closeMenu.bind(this);
      this._menu.addEventListener('close', this._onClose.bind(this));

      this.__boundOnScroll = this._onScroll.bind(this);
    }

    this.__resizeObserver.observe(this);

    this.__rtl = getComputedStyle(this).getPropertyValue('direction') == 'rtl';
  }

  disconnectedCallback() {
    this.__resizeObserver.disconnect();
    this._closeMenu();
  }

  _openMenu(e) {
    e?.stopPropagation();
    this._menu.showModal();
    this._positionMenu();
    this._menuButton.setAttribute('part', 'menu-button menu-button-active');
    document.body.addEventListener('click', this.__boundCloseMenu);
    window.addEventListener('scroll', this.__boundOnScroll, { capture: true, passive: true });
  }

  _closeMenu(e) {
    if (!e || e.composedPath()[0] == this._menu) {
      this._menu.close();
    }
  }

  _onClose() {
    this._menuButton.setAttribute('part', 'menu-button');
    document.body.removeEventListener('click', this.__boundCloseMenu);
    window.removeEventListener('scroll', this.__boundOnScroll, { capture: true, passive: true });
    this._menuButton.focus();
  }

  _onResize() {
    if(this.__resizeTimeout) {
      clearTimeout(this.__resizeTimeout);
    }
    this.__resizeTimeout = setTimeout(() => this._updateOverflowingItems(), 20);
  }

  _updateOverflowingItems() {
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].removeAttribute('slot');
    }
    this.removeAttribute('overflow');

    const btn = this._menuButton;

    for (let i = this.children.length - 1; i >= 0; i--) {
      const child = this.children[i];
      // Checks:
      // - is the overflow button outside the container (if it is visible)?
      // - "start aligned": is the last visible item outside the container?
      // - "end aligned": is the first item outside the container?
      const overflows = this.__rtl ?
        (btn.offsetWidth > 0 && btn.offsetLeft < this.offsetLeft) || child.offsetLeft < this.offsetLeft || this.children[0].offsetLeft + this.children[0].offsetWidth > this.offsetLeft + this.offsetWidth
       : (btn.offsetWidth > 0 && btn.offsetLeft + btn.offsetWidth > this.offsetLeft + this.clientWidth) || child.offsetLeft + child.offsetWidth > this.offsetLeft + this.clientWidth || this.children[0].offsetLeft < this.offsetLeft;
      if (overflows) {
        child.setAttribute('slot', 'menu');
        this.setAttribute('overflow', '');
      } else {
        break;
      }
    }
  }

  _onScroll(e) {
    this._positionMenu();
  }

  _positionMenu() {
    this._menu.style.removeProperty('width');
    this._menu.style.removeProperty('height');
    this._menu.style.removeProperty('top');
    this._menu.style.removeProperty('left');
    this._menu.style.removeProperty('right');

    const btn = this._menuButton.getBoundingClientRect();
    const menu = this._menu.getBoundingClientRect();
    const menuMargin = parseInt(getComputedStyle(this._menu).getPropertyValue('margin'));
    let menuRequiredHeight = menu.height + menuMargin * 2;
    let menuRequiredWidth = menu.width + menuMargin * 2;

    const spaceAboveButton = btn.top;
    const spaceBelowButton = visualViewport.height - btn.top - btn.height;
    const spaceBeforeButton = this.__rtl ? visualViewport.width - btn.left - btn.width : btn.left;
    const spaceAfterButton = this.__rtl ? btn.left + btn.width : visualViewport.width - btn.left;

    if (spaceAboveButton > spaceBelowButton && (menuRequiredHeight > visualViewport.height / 2 || menuRequiredHeight > spaceBelowButton)) {
      // Place menu above button
      if (menuRequiredHeight > spaceAboveButton) {
        this._menu.style.height = (spaceAboveButton - menuMargin * 2) + 'px';
        menuRequiredHeight = spaceAboveButton;
      }
      this._menu.style.top = (btn.top - menuRequiredHeight) + 'px';
    } else {
      // Place menu below button
      if (menuRequiredHeight > spaceBelowButton) {
        this._menu.style.height = (spaceBelowButton - menuMargin * 2) + 'px';
      }
      this._menu.style.top = (btn.top + btn.height) + 'px';
    }

    if (spaceBeforeButton > spaceAfterButton && (menuRequiredWidth > visualViewport.width / 2 || menuRequiredWidth > spaceAfterButton)) {
      // Place before button
      if (menuRequiredWidth > spaceBeforeButton) {
        this._menu.style.width = (spaceBeforeButton - menuMargin * 2) + 'px';
      }
      if (this.__rtl) {
        this._menu.style.right = (visualViewport.width - btn.left - menuRequiredWidth + menuMargin) + 'px';
      } else {
        this._menu.style.left = (btn.left + btn.width - menuRequiredWidth + menuMargin) + 'px';
      }
    } else {
      // Place after button
      if (this.__rtl) {
        this._menu.style.right = (spaceBeforeButton - menuMargin) + 'px';
      } else {
        this._menu.style.left = (btn.left - menuMargin) + 'px';
      }
    }
  }
}

OverflowMenu.defineElement();
