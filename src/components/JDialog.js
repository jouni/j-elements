import StylableMixin from '../util/StylableMixin.js';
import PortalElement from '../util/PortalElement.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      position: fixed;
      z-index: var(--j-dialog-z-index, 100);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      /* White-label styles */
      background-color: #fff;
      box-shadow: 0 8px 24px -8px rgba(0, 0, 0, 0.4);
      padding: 1.5em;
      border-radius: 0.25em;
      width: 16em;
    }

    :host([disabled]) {
      visibility: hidden;
      height: 0;
      overflow: hidden;
    }
  </style>
  <slot></slot>
`;

export class JDialog extends StylableMixin(PortalElement) {
  connectedCallback() {
    if (!this.__jdialogTemplateStamped) {
      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.__jdialogTemplateStamped = true;
      this.disabled = true;
    }

    super.connectedCallback();
  }

  show() {
    if (!this.disabled) {
      return;
    }
    this.disabled = false;
  }

  hide() {
    this.disabled = true;
  }

  _disconnectedListener() {
    this._hide();
  }

  destroy() {
    this.hide();
    this.parentNode.removeChild(this);
  }
}

window.customElements.define('j-dialog', JDialog);
