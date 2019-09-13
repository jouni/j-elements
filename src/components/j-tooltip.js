import bemToShadow from '../util/bemToShadow.js';
import PortalElement from '../util/PortalElement.js';
import style from '../styles/tooltip-style.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      position: fixed;
      z-index: var(--j-tooltip-z-index, 999);
      /* Prevent tooltip from getting mouse events */
      pointer-events: none;
      /* Shift so the cursor doesn't block it */
      margin-left: 10px;
    }

    :host([disabled]) {
      visibility: hidden;
      height: 0;
      overflow: hidden;
    }
  </style>
  ${ bemToShadow(style, '.j-tooltip') }
  <slot></slot>
`;

export class JTooltip extends PortalElement {
  constructor() {
    super();

    this._showListener = this._show.bind(this);
    this._hideListener = this._hide.bind(this);
  }

  connectedCallback() {
    if (!this.__jtooltipTemplateStamped) {
      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.__jtooltipTemplateStamped = true;
      this.disabled = true;
    }

    super.connectedCallback();

    if (this.disabled) {
      this._parentNode = this.parentNode;
      this._parentNode.addEventListener('mousemove', this._showListener);
      this._parentNode.addEventListener('mouseout', this._hideListener);
    }
  }

  disconnectedCallback() {
    if (this.disabled && this._parentNode) {
      this._parentNode.removeEventListener('mousemove', this._showListener);
      this._parentNode.removeEventListener('mouseout', this._hideListener);
      delete this._parentNode;
    }
  }

  _show(e) {
    if (!this.disabled) {
      return;
    }
    if (this._openTimeout) {
      clearTimeout(this._openTimeout);
    }
    this._openTimeout = setTimeout(() => {
      this.style.top = e.clientY + 'px';
      this.style.left = e.clientX + 'px';
      this.disabled = false;
    }, 800);
  }

  _hide() {
    if (this._openTimeout) {
      clearTimeout(this._openTimeout);
    }
    this.disabled = true;
  }

  _disconnectedListener() {
    this._hide();
  }
}

window.customElements.define('j-tooltip', JTooltip);
