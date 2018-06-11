import { StylableMixin, bemToShadow } from './stylable-mixin.js';
import { TeleportingElement } from './teleporting-element.js';
import style from './styles/tooltip-style.js';

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
  </style>
  ${ bemToShadow(style, '.j-tooltip') }
  <slot></slot>
`;

export class JTooltip extends StylableMixin(TeleportingElement) {
  constructor() {
    super();

    this._showListener = this._show.bind(this);
    this._hideListener = this._hide.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.__jtooltipTemplateStamped) {
      if (ShadyCSS && !ShadyCSS.nativeShadow) {
        ShadyCSS.prepareTemplate(template, 'j-tooltip');
        ShadyCSS.styleElement(this);
      }

      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.__jtooltipTemplateStamped = true;
    }

    if (!this.visible) {
      this._parentNode = this.parentNode;
      this._parentNode.addEventListener('mousemove', this._showListener);
      this._parentNode.addEventListener('mouseout', this._hideListener);
      this._parentNode.addEventListener('mousedown', this._hideListener);
    }
  }

  disconnectedCallback() {
    if (!this.visible && this._parentNode) {
      this._parentNode.removeEventListener('mousemove', this._showListener);
      this._parentNode.removeEventListener('mouseout', this._hideListener);
      this._parentNode.removeEventListener('mousedown', this._hideListener);
      delete this._parentNode;
    }
    if (super.disconnectedCallback) super.disconnectedCallback();
  }

  _show(e) {
    if (this.visible) {
      return;
    }
    if (this._openTimeout) {
      clearTimeout(this._openTimeout);
    }
    this._openTimeout = setTimeout(() => {
      this.style.top = e.clientY + 'px';
      this.style.left = e.clientX + 'px';
      this.visible = true;
    }, 800);
  }

  _hide() {
    if (this._openTimeout) {
      clearTimeout(this._openTimeout);
    }
    this.visible = false;
  }

  _disconnectedListener() {
    this._hide();
  }
}

window.customElements.define('j-tooltip', JTooltip);
