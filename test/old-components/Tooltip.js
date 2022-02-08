import {DefineElementMixin} from '../util/DefineElementMixin.js';
import {Portal} from '../util/Portal.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      position: fixed;
      z-index: var(--j-tooltip-z-index, 999);
      background-color: rgba(0, 0, 0, 0.9);
      color: #fff;
      border-radius: 2px;
      padding: 0.3em;
      line-height: 1;
      /* Prevent tooltip from getting mouse events */
      pointer-events: none;
      /* Shift so the cursor doesn't block it */
      margin-left: 10px;
    }

    :host([portal-disabled]) {
      visibility: hidden;
      height: 0;
      overflow: hidden;
    }
  </style>
  <slot></slot>
`;

export class Tooltip extends Portal(DefineElementMixin(HTMLElement)) {
  constructor() {
    super();

    this.__boundShow = this.show.bind(this);
    this.__boundHide = this.hide.bind(this);
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    super.connectedCallback();

    if (!this.portalEnabled) {
      this._parentNode = this.parentNode;
      this._parentNode.addEventListener('mousemove', this.__boundShow);
      this._parentNode.addEventListener('mouseout', this.__boundHide);
    }
  }

  disconnectedCallback() {
    if (!this.portalEnabled && this._parentNode) {
      this._parentNode.removeEventListener('mousemove', this.__boundShow);
      this._parentNode.removeEventListener('mouseout', this.__boundHide);
      delete this._parentNode;
    }
  }

  show(e) {
    if (this.portalEnabled) {
      return;
    }
    if (this._openTimeout) {
      clearTimeout(this._openTimeout);
    }
    this._openTimeout = setTimeout(() => {
      this.style.top = e.clientY + 'px';
      this.style.left = e.clientX + 'px';
      this.portalEnabled = true;
    }, 800);
  }

  hide() {
    if (this._openTimeout) {
      clearTimeout(this._openTimeout);
    }
    this.portalEnabled = false;
  }
}

Tooltip.defineElement();
