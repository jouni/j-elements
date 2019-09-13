import NativeElementWrapper from '../util/NativeElementWrapper';
import bemToShadow from '../util/bemToShadow';
import style from '../styles/button.css';

export class JButton extends NativeElementWrapper {
  static get template() {
    const template = super.template;
    template.innerHTML += `
      <style>
        :host {
          position: relative;
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
        ${bemToShadow(style, '.j-button')}
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
}

window.customElements.define('j-button', JButton);

export default JButton;
