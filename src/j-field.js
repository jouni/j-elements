import { StylableMixin, bemToShadow } from './stylable-mixin.js';
import style from './styles/field-style.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    [part="label"] ::slotted(*),
    [part="error-message"] ::slotted(*) {
      font: inherit !important;
      color: inherit !important;
      letter-spacing: inherit !important;
      text-transform: inherit !important;
      display: inline-block !important;
    }

    :host(:not([invalid])) [part="error-message"] {
      display: none !important;
    }
  </style>
  ${ bemToShadow(style, '.j-field') }
  <div part="label"><slot name="label"></slot></div>
  <slot></slot>
  <div part="error-message"><slot name="error-message"></slot></div>
`;

let fieldId = 0;

/**
 * Adds label, invalid and error message features to an element.
 *
 * The element applies the `required` property to itself if any of the contained elements have that
 * attribute.
 *
 * The element sets the `invalid` property on itself if any of the contained elements fails the
 * checkValidity test and send an `invalid` event.
 */
class JField extends HTMLElement {
  constructor() {
    super();

    this._id = `__${ this.nodeName.toLowerCase() }-${ fieldId++ }__`;

    this.__boundSlotChangeListener = this._onSlotChange.bind(this);
    this.__boundFocusInListener = this._onFocusIn.bind(this);
    this.__boundFocusOutListener = this._onFocusOut.bind(this);
  }

  connectedCallback() {
    this.__attachShadow();

    Array.from(this.shadowRoot.querySelectorAll('slot')).forEach(slot => {
      slot.addEventListener('slotchange', this.__boundSlotChangeListener);
    });

    this.addEventListener('focusin', this.__boundFocusInListener);
    this.addEventListener('focusout', this.__boundFocusOutListener);
    this.addEventListener('change', this.checkValidity);
    this.addEventListener('click', this._onClick);

    // Safari needs this
    this._labelSlotChange();
    this._slotChange();
  }

  disconnectedCallback() {
    Array.from(this.shadowRoot.querySelectorAll('slot')).forEach(slot => {
      slot.removeEventListener('slotchange', this.__boundSlotChangeListener);
    });

    this.removeEventListener('focusin', this.__boundFocusInListener);
    this.removeEventListener('focusout', this.__boundFocusOutListener);
    this.removeEventListener('change', this.checkValidity);
    this.removeEventListener('click', this._onClick);
  }

  __attachShadow() {
    if (!this.shadowRoot) {
      if (typeof ShadyCSS != 'undefined' && !ShadyCSS.nativeShadow) {
        // ShadyCSS "consumes" the style element from the template, so we need to clone it, to allow
        // extending this class with another element name
        ShadyCSS.prepareTemplate(template.cloneNode(true), this.nodeName.toLowerCase());
        ShadyCSS.styleElement(this);
      }

      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }

  _labelSlotChange() {
    const labelElement = this.querySelector('[slot="label"]');

    if (labelElement) {
      this.shadowRoot.querySelector('[part="label"]').removeAttribute('hidden');
    } else {
      this.shadowRoot.querySelector('[part="label"]').setAttribute('hidden', '');
    }

    const inputElements = this._queryInputElements();

    const nativeTextInput = inputElements.find(input => {
      if (input.nodeName == 'INPUT') {
        if (!input.hasAttribute('type')) {
          return input;
        }

        switch (input.getAttribute('type')) {
          case 'text':
          case 'date':
          case 'time':
          case 'datetime':
          case 'datetime-local':
            return input;
        }
      } else if (input.nodeName == 'TEXTAREA') {
        return input;
      }
    });

    if (nativeTextInput && labelElement && labelElement.nodeName == 'LABEL') {
      // Use native label + input behavior (clicking the label will focus the text input)
      labelElement.setAttribute('for', this._id);
      nativeTextInput.setAttribute('id', this._id);
    } else if (inputElements.length > 0 && labelElement) {
      // TODO need to ignore elements that have their label already defined (like a checkbox or a radio button)
      labelElement.setAttribute('id', this._id);
      inputElements[0].setAttribute('aria-labelledby', this._id);
    }
  }

  _slotChange() {
    // If input is required, add the attribute to the host
    const isRequired = this.querySelector('[required]');
    if (isRequired) {
      this.setAttribute('required', '');
    } else {
      this.removeAttribute('required');
    }

    // Native radio buttons need to have the same name. Add a generated one if not specified already.
    Array.from(this.querySelectorAll('input[type=radio]')).forEach(radio => {
      if (!radio.hasAttribute('name')) {
        radio.setAttribute('name', this._id);
      }
    });
  }

  _onSlotChange(e) {
    // The slot that changed
    const target = e.target || e.path[0];

    // Label slot
    if (target.getAttribute('name') == 'label') {
      this._labelSlotChange();

    // Unnamed slot, where the input control should be placed
    } else if (!target.hasAttribute('name')) {
      this._slotChange();
    }
  }

  checkValidity() {
    let valid = true;
    this._queryInputElements().forEach(input => {
      if (input.checkValidity && !input.checkValidity()) {
        valid = false;
      }
    });

    if (valid) {
      this.removeAttribute('invalid');
    } else {
      this.setAttribute('invalid', '');
    }

    // Safari has an issue with repainting shadow root element styles when a host attribute changes.
    // Need this workaround (toggle any inline css property on and off) until the issue gets fixed.
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
      const WEBKIT_PROPERTY = '-webkit-backface-visibility';
      this.querySelectorAll('*').forEach(el => {
        el.style[WEBKIT_PROPERTY] = 'visible';
        el.style[WEBKIT_PROPERTY] = '';
      });
    }
  }

  _onClick(e) {
    let target = e.target || e.path[0];

    do {
      // Only consider clicks on the label element
      if (target.getAttribute('slot') == 'label') {
        const inputElements = this._queryInputElements();
        if (inputElements[0]) {
          inputElements[0].focus();
        }
        return;
      }

      target = target.parentNode;
    } while (target.parentNode);
  }

  _onFocusIn(e) {
    this.setAttribute('focused', '');
  }

  _onFocusOut(e) {
    this.checkValidity();
    this.removeAttribute('focused');
  }

  _queryInputElements() {
    let inputElements = [];
    inputElements = inputElements.concat(Array.from(this.querySelectorAll('input, textarea')));
    // 3. Try to find an element with a tabindex (assume a custom input element will have tabindex=0 so it is focusable)
    inputElements = inputElements.concat(Array.from(this.querySelectorAll('[tabindex="0"]')));
    // 4. Find any slotted element as a fallback (not label or error-message slot)
    inputElements = inputElements.concat(Array.from(this.querySelector(':not([slot])')));
    return inputElements;
  }
}

customElements.define('j-field', JField);

export { JField };
