import {DefineElementMixin} from '../util/DefineElementMixin.js';
import {NativeElementWrapper} from '../util/NativeElementWrapper';

export class Button extends DefineElementMixin(NativeElementWrapper) {
  static get template() {
    const template = super.template;
    template.innerHTML += `
      <style>
        :host {
          position: relative;
          -webkit-appearance: var(--j-button-appearance, button);
          -moz-appearance: var(--j-button-appearance, button);
          -ms-appearance: var(--j-button-appearance, button);
          appearance: var(--j-button-appearance, button);
          padding: 0 0.3em;
        }

        button {
          opacity: 0;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        :host {
          display: inline-flex;
          cursor: default;
        }
      </style>
      <button native-element></button>
      <slot></slot>`;
    return template;
  }

  constructor() {
    super();
    this.__boundFocusInListener = this._onFocusIn.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('focusin', this.__boundFocusInListener);
  }

  _onFocusIn() {
    if (!this.hasAttribute('aria-label')) {
      this._nativeElement.setAttribute('aria-label', this.textContent.trim());
    }
  }

  focus() {
    super.focus();
    this.setAttribute('focus-visible', '');
  }
}

Button.asCustomElement();
