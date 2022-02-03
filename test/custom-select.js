import {Portal} from '../src/util/PortalMixin.js';

class CustomSelectPopup extends Portal(HTMLElement) {
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
          position: fixed;
        }

        :host([portal-disabled]) {
          visibility: hidden;
          height: 0;
          overflow: hidden;
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
        this.portalEnabled = false;
        this.dispatchEvent(new CustomEvent('item-selected', { bubbles: true, detail: item }));
        this.parentNode.host.focus();
      }
    });
  }

  _getScope() {
    let scope = this.getRootNode();
    if (scope.host) {
      scope = scope.host.getRootNode();
    }
    return scope;
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
      <custom-select-popup tabindex="0">
        <slot></slot>
      </custom-select-popup>
    `;

    this._popup = this.shadowRoot.querySelector('custom-select-popup');

    this.addEventListener('click', e => {
      Array.from(this.children).filter(node => node.hasAttribute('item')).forEach(item => {
        item.removeAttribute('slot');
      });


      const coords = this.getBoundingClientRect();
      this._popup.style.top = (coords.y + coords.height) + 'px';
      this._popup.style.left = coords.x + 'px';
      // TODO this would probably make sense to move to PortalMixin, so that it copies all attributes from its shadow host to the scope container
      this._popup.className = this.className;
      this._popup.portalEnabled = !this._popup.portalEnabled;
      this._popup.focus();
      e.stopPropagation();
    });

    this.shadowRoot.addEventListener('item-selected', e => {
      e.detail.setAttribute('slot', 'selected');
    });
  }
}
window.customElements.define('custom-select', CustomSelect);
