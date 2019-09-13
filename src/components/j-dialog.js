import StylableMixin from '../util/StylableMixin.js';
import bemToShadow from '../util/bemToShadow.js';
import PortalElement from '../util/PortalElement.js';
import style from '../styles/dialog-style.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      position: fixed;
      z-index: var(--j-dialog-z-index, 100);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    :host([disabled]) {
      visibility: hidden;
      height: 0;
      overflow: hidden;
    }
  </style>
  ${ bemToShadow(style, '.j-dialog') }
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
