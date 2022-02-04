import {DefineElementMixin} from '../util/DefineElementMixin.js';
import {NativeInputElementWrapper} from '../util/NativeInputElementWrapper.js';

export class Input extends DefineElementMixin(NativeInputElementWrapper) {
  static get template() {
    const template = super.template;
    template.innerHTML += `
      <style>
        :host {
          display: inline;
          cursor: text;
          box-sizing: border-box;
          resize: none;
          overflow: hidden;
          line-height: initial;

          /* White-label theme */
          background-color: #fff;
          color: #000;
          border: 1px solid #ccc;
          padding: 0.3em;
        }

        :host([multiline]:not([autosize])) {
          height: 3em;
          resize: both;
        }

        .container {
          display: inline-flex;
          align-items: baseline;
        }

        :host([multiline]) {
          display: inline-block;
        }

        :host([multiline]) .container {
          display: flex;
        }

        .container,
        input,
        textarea {
          cursor: inherit;
          text-align: inherit;
          line-height: inherit;
          xwidth: 100%;
          xheight: 100%;
          xmax-height: 100%;
          xmax-width: 100%;
        }

        :host([multiline]) .container,
        textarea {
          width: 100%;
          height: 100%;
          max-height: 100%;
          max-width: 100%;
        }

        input,
        textarea {
          font: inherit;
          color: inherit;
          background: transparent;
          box-shadow: none;
          margin: 0;
          padding: 0;
          border: 0;
          min-width: 1em;
          min-height: 1em;
          outline: none;
          resize: none;
        }

        /* Number input */

        :host([type=number]) {
          text-align: right;
          text-align: end;
          -webkit-font-feature-settings: 'tnum';
          -moz-font-feature-settings: 'tnum';
          font-feature-settings: 'tnum';
        }

        .container ::slotted([slot]) {
          text-align: initial;
        }

        input::-webkit-inner-spin-button {
          display: var(--j-input-spin-buttons, none);
        }

        input[type=number] {
          -moz-appearance: var(--j-input-spin-buttons, textfield);
        }

        :host([focus]) {
          outline: 1px dotted #212121;
          outline: 5px auto -webkit-focus-ring-color;
        }

        /* Safari only */
        @supports (-webkit-backdrop-filter: blur(1px)) {
          :host([focus]) {
            outline-offset: -3px;
          }
        }

        :host([readonly]) {
          cursor: default;
        }

        :host([disabled]) {
          opacity: 0.3;
        }
      </style>
    `;
    const container = template.content.querySelector('.container');
    let slot = document.createElement('slot');
    slot.setAttribute('name', 'start');
    container.insertBefore(slot, container.firstElementChild);
    slot = document.createElement('slot');
    slot.setAttribute('name', 'end');
    container.appendChild(slot);
    return template;
  }

  static get observedAttributes() {
    return super.observedAttributes.filter(attr => attr != 'value');
  }

  get value() {
    return this._nativeElement.value;
  }

  set value(val) {
    if (val) {
      val = this.multiline ? val.replace(/\\n/g, '\n') : val.replace(/\n\r|\n/g, ' ');
    }
    this._nativeElement.value = val;
    this._updateSize();
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      super.connectedCallback();

      // Force the internal input to change to textarea if multiline
      this.multiline = this.hasAttribute('multiline');
      // Update label only after internal input is the correct element (e.g. textarea) to preserve newlines
      this.value = this.getAttribute('value');

      this._nativeElement.addEventListener('input', e => {
        this._updateSize();
        this._propagateEvent(e);
      });

      // Prevent screen readers from announcing the host element
      this.setAttribute('aria-hidden', 'true');
    }
  }

  get multiline() {
    return this.hasAttribute('multiline');
  }

  set multiline(val) {
    if (Boolean(val)) {
      this.setAttribute('multiline', '');
      if (this._nativeElement && this._nativeElement.nodeName == 'INPUT') {
        const textarea = document.createElement('textarea');
        this.shadowRoot.querySelector('.container').replaceChild(textarea, this._nativeElement);
        textarea.value = this._nativeElement.value;
        this._nativeElement = textarea;
        this._initNativeElementAttributes();
        textarea.setAttribute('rows', '1');
      }
    } else {
      this.removeAttribute('multiline');
      if (this._nativeElement && this._nativeElement.nodeName == 'TEXTAREA') {
        const input = document.createElement('input');
        this.shadowRoot.querySelector('.container').replaceChild(input, this._nativeElement);
        input.value = this._nativeElement.value;
        this._nativeElement = input;
        this._initNativeElementAttributes();
      }
    }
  }

  get autosize() {
    return this.hasAttribute('autosize');
  }

  set autosize(val) {
    if (Boolean(val)) {
      this.setAttribute('autosize', '');
    } else {
      this.removeAttribute('autosize');
    }
  }

  _updateSize() {
    const dimension = this.multiline ? 'Height' : 'Width';
    if (this.autosize) {
      this._nativeElement.style[dimension.toLowerCase()] = '0';
      this._nativeElement.style[dimension.toLowerCase()] = this._nativeElement['scroll' + dimension] + 'px';
    } else {
      this._nativeElement.style[dimension.toLowerCase()] = '';
    }
  }

  checkValidity() {
    const valid = super.checkValidity();

    if (valid) {
      this.removeAttribute('invalid');
    } else {
      this.setAttribute('invalid', '');
    }

    return valid;
  }
}

Input.asCustomElement();
