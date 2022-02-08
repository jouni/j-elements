import {DefineElementMixin} from '../util/DefineElementMixin.js';
import {Portal} from '../util/Portal.js';
import {LightStyleMixin} from '../util/LightStyleMixin.js';
import {css} from '../util/css.js';

export class Dialog extends LightStyleMixin(Portal(DefineElementMixin(HTMLElement))) {
  static get styles() {
    return css`
      :host {
        /* White-label styles */
        background-color: #fff;
        box-shadow: 0 8px 24px -8px rgba(0, 0, 0, 0.4);
        padding: 1.5em;
        border-radius: 0.25em;
        max-width: calc(100% - 1em);
        box-sizing: border-box;
      }

      :host([portal-disabled]) {
        pointer-events: none;
        position: absolute;
        visibility: hidden;
        width: 0;
        height: 0;
        overflow: hidden;
      }

      /* Weird selector, but it will be converted to something like j-dialog-scope */
      :host(-scope) {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: var(--j-dialog-z-index, 100);
        display: flex !important;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: rgba(0,0,0,0.2);
      }

      /* Optical vertical centering */
      :host(-scope)::before,
      :host(-scope)::after {
        content: "";
        flex: 1;
      }

      :host(-scope)::after {
        flex: 1.2;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('tabindex', '0');
  }

  _isPortalScoped() {
    // Always create a container for the dialog, allowing better viewport centering
    return super._isPortalScoped(true);
  }

  show() {
    this.__activeElement = this.getRootNode().activeElement;
    this.portalEnabled = true;
    this.focus();
  }

  hide() {
    this.portalEnabled = false;
    this.__activeElement.focus();
  }

  destroy() {
    this.hide();
    this.parentNode.removeChild(this);
  }
}

Dialog.defineElement();
