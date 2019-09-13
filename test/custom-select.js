import { PortalElement } from '../src/util/PortalElement';

class CustomSelectPopup extends PortalElement {
  constructor() {
    super();
    this.attachShadow({mode:'open'}).innerHTML = `
      <style>
        :host {
          display: block;
          box-sizing: border-box;
          background: #fff;
          box-shadow: 0 2px 4px;
          cursor: pointer;
        }

        :host([disabled]) {
          visibility: hidden;
          height: 0;
          overflow: hidden;
        }

        :host(:not([disabled]):not([target])) {
          position: fixed;
        }

        ::slotted([item]) {
          padding: 8px 16px;
        }

        ::slotted([item]:hover) {
          background-color: #eee;
        }
      </style>
      <slot></slot>
    `;

    this.addEventListener('click', e => {
      const item = e.target.closest('[item]');
      if (item) {
        this.disabled = true;
        this.dispatchEvent(new CustomEvent('item-selected', { bubbles: true, detail: item }));
        this.parentNode.host.focus();
      }
    });
  }
}
window.customElements.define('custom-select-popup', CustomSelectPopup);

class CustomSelect extends HTMLElement {
  constructor() {
    super();
    this.setAttribute('tabindex', '0');
    this.attachShadow({mode:'open'}).innerHTML = `
      <style>
        :host {
          display: inline-block;
          background: #ddd;
          cursor: pointer;
          box-sizing: border-box;
          border-radius: .25em;
        }

        div {
          display: inline-flex;
          align-items: center;
          height: 100%;
        }

        ::slotted([item]),
        .placeholder {
          padding: 8px 16px;
        }

        .placeholder {
          opacity: 0.6;
        }
      </style>
      <div>
        <slot name="selected"><span class="placeholder">Select something</span></slot>
      </div>
      <custom-select-popup disabled tabindex="0">
        <slot></slot>
      </custom-select-popup>
    `;

    this.addEventListener('click', e => {
      Array.from(this.children).filter(node => node.hasAttribute('item')).forEach(item => {
        item.removeAttribute('slot');
      });
      const popup = this.shadowRoot.querySelector('custom-select-popup');

      if (popup.isTarget) {
        popup._source.disabled = true;
        return;
      }

      const coords = this.getBoundingClientRect();
      popup.style.top = (coords.y + coords.height) + 'px';
      popup.style.left = coords.x + 'px';
      popup.disabled = false;
      if (popup.__scopeContainer) {
        popup.__scopeContainer.className = this.className;
      }
      popup.focus();
      popup._target.style.width = popup.offsetWidth + 'px';
      popup._target.style.display = 'block';
      e.stopPropagation();
    });

    this.shadowRoot.addEventListener('item-selected', e => {
      e.detail.setAttribute('slot', 'selected');
    });
  }
}
window.customElements.define('custom-select', CustomSelect);
