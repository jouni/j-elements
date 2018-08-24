import LightStyleElement from './light-style-element.js';
import bemToShadow from './bem-to-shadow.js';
import style from './styles/field-style.js';

let fieldId = 0;

/**
 * Adds label, invalid and error message features to an element.
 *
 * The element applies the `required` attribute to itself if any of the contained elements have that
 * attribute.
 *
 * The element sets the `invalid` attribute on itself if any of the contained elements fails the
 * checkValidity test and send an `invalid` event.
 */
class JField extends LightStyleElement {
  constructor() {
    super(style);

    this._id = `__${ this.nodeName.toLowerCase() }-${ fieldId++ }__`;

    this.__boundFocusInListener = this._onFocusIn.bind(this);
    this.__boundFocusOutListener = this._onFocusOut.bind(this);
    this.__mutationObserver = new MutationObserver(this.__mutations.bind(this));

    this.classList.add('j-field');
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener('focusin', this.__boundFocusInListener);
    this.addEventListener('focusout', this.__boundFocusOutListener);
    this.addEventListener('change', this.checkValidity);
    this.addEventListener('click', this._onClick);
    this.__mutationObserver.observe(this, {childList: true});

    this.__mutations();
  }

  disconnectedCallback() {
    this.removeEventListener('focusin', this.__boundFocusInListener);
    this.removeEventListener('focusout', this.__boundFocusOutListener);
    this.removeEventListener('change', this.checkValidity);
    this.removeEventListener('click', this._onClick);
    this.__mutationObserver.disconnect();
  }

  __mutations() {
    const labelElement = this.querySelector('[label], label');
    if (labelElement) {
      labelElement.setAttribute('id', this._id + 'label');
    }

    const inputElements = this._queryInputElements();
    if (inputElements.length > 0 && labelElement) {
      inputElements[0].setAttribute('aria-labelledby', this._id + 'label');
    }

    const errorMessage = this.querySelector('[error-message]');
    if (errorMessage) {
      errorMessage.classList.add('j-field__error-message');
    }


    // Native radio buttons need to have the same name. Add a generated one if not specified already.
    this.removeAttribute('role');
    Array.from(this.querySelectorAll('input[type=radio]')).forEach(radio => {
      // Set a radiogroup role if the field contains radio buttons and let the group be labelled by the field labelElement
      this.setAttribute('role', 'radiogroup');
      this.setAttribute('aria-labelledby', this._id);

      // Remove extra labelled by from the radio buttons, expect them to have their own labels defined by the developer
      radio.removeAttribute('aria-labelledby');
      if (!radio.hasAttribute('name')) {
        radio.setAttribute('name', this._id);
      }
    });

    // If input is required, add the attribute to the host
    const isRequired = this.querySelector('[required]');
    if (isRequired) {
      this.classList.add('j-field--required');
    } else {
      this.classList.remove('j-field--required');
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
      this.classList.remove('j-field--invalid');
    } else {
      this.classList.add('j-field--invalid');
    }
  }

  _onClick(e) {
    let target = e.target || e.path[0];

    do {
      // Only consider clicks on the label element
      if (target.id == this._id + 'label') {
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
    inputElements = inputElements.concat(Array.from(this.querySelector(':not(label):not([error-message])')));
    return inputElements;
  }
}

customElements.define('j-field', JField);

export { JField };
