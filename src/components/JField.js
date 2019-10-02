import LightStyleElement from '../util/LightStyleElement.js';

let fieldId = 0;

/**
 * Adds label and validation features to an element.
 *
 * The element applies the `required` attribute to itself if any of the contained elements have that
 * attribute.
 *
 * The element sets the `invalid` attribute on itself if any of the contained elements fails the
 * checkValidity test.
 */
export class JField extends LightStyleElement {
  constructor() {
    const styles = `
      j-field {
        display: flex;
        flex-direction: column;
        --j-field-required-indicator: "(Required)";
        --j-field-optional-indicator: "(Optional)";
      }

      j-field[required] > [label]::after {
        content: " " var(--j-field-required-indicator);
      }

      j-field:not([required]) > [label]::after {
        content: " " var(--j-field-optional-indicator);
      }
    `;
    super(styles);

    this._id = `__${ this.nodeName.toLowerCase() }-${ fieldId++ }__`;

    this.__boundFocusInListener = this._onFocusIn.bind(this);
    this.__boundFocusOutListener = this._onFocusOut.bind(this);
    this.__boundInputListener = this._onInput.bind(this);
    this.__boundMutationListener = this.__mutations.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener('focusin', this.__boundFocusInListener);
    this.addEventListener('focusout', this.__boundFocusOutListener);
    this.addEventListener('change', this._checkValidity);
    this.addEventListener('input', this.__boundInputListener);
    this.addEventListener('click', this._onClick);

    if (!this.__mutationObserver) {
      this.__mutationObserver = new MutationObserver(this.__boundMutationListener);
    }

    this.__mutationObserver.observe(this, {childList: true});

    this.__mutations();
  }

  disconnectedCallback() {
    this.removeEventListener('focusin', this.__boundFocusInListener);
    this.removeEventListener('focusout', this.__boundFocusOutListener);
    this.removeEventListener('change', this._checkValidity);
    this.removeEventListener('input', this.__boundInputListener);
    this.removeEventListener('click', this._onClick);
    this.__mutationObserver.disconnect();
  }

  __mutations() {
    const labelElement = this.querySelector('[label], label');
    if (labelElement) {
      labelElement.setAttribute('id', this._id + 'label');
      labelElement.setAttribute('label', '');
    }

    const inputElements = this._queryInputElements();
    if (inputElements.length > 0 && labelElement) {
      // TODO should preserve existing values
      inputElements[0].setAttribute('aria-labelledby', this._id + 'label');
    }

    // Native radio buttons need to have the same name. Add a generated one if not specified already.
    this.removeAttribute('role');
    Array.from(this.querySelectorAll('input[type=radio]')).forEach(radio => {
      // Set a radiogroup role if the field contains radio buttons and let the group be labelled by the field labelElement
      this.setAttribute('role', 'radiogroup');
      // TODO should preserve existing values
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
      this.setAttribute('required', '');
    } else {
      this.removeAttribute('required');
    }
  }

  _checkValidity() {
    let valid = true;
    let validationMessage = '';
    const inputElements = this._queryInputElements();

    inputElements.forEach(input => {
      if (input.checkValidity && !input.checkValidity()) {
        valid = false;
        validationMessage += input.getAttribute('error-message') || input.validationMessage;
      }
    });

    if (!this._validationMessage) {
      this._validationMessage = document.createElement('p');
      this._validationMessage.setAttribute('validation-message', '');
      this._validationMessage.setAttribute('aria-live', 'polite');
      this._validationMessage.id = this._id + 'description';
    }

    this._validationMessage.innerHTML = validationMessage;

    if (valid) {
      this.removeAttribute('invalid');
      if (this._validationMessage.parentNode) {
        this.removeChild(this._validationMessage);
        // TODO should make sure to only remove the one entry by j-field
        inputElements[0].setAttribute('aria-describedby', '');
      }
    } else {
      this.setAttribute('invalid', '');
      this.appendChild(this._validationMessage);
      // TODO should make sure to preserve existing values
      inputElements[0].setAttribute('aria-describedby', this._id + 'description');
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
    this.setAttribute('focus', '');
  }

  _onFocusOut(e) {
    this._checkValidity();
    this.removeAttribute('focus');
  }

  _onInput(e) {
    if (this.__inputDebounce) {
      clearTimeout(this.__inputDebounce);
    }
    if (this.hasAttribute('invalid')) {
      this._checkValidity();
    } else {
      this.__inputDebounce = setTimeout(this._checkValidity.bind(this), 1000);
    }
  }

  _queryInputElements() {
    if (!this.__inputElements){
      this.__inputElements = [];
      this.__inputElements = this.__inputElements.concat(Array.from(this.querySelectorAll('input, textarea, select')));
      // 3. Try to find an element with a tabindex (assume a custom input element will have tabindex=0 so it is focusable)
      this.__inputElements = this.__inputElements.concat(Array.from(this.querySelectorAll('[tabindex="0"]')));
      // 4. Find any slotted element as a fallback (not label or error-message slot)
      this.__inputElements = this.__inputElements.concat(Array.from(this.querySelectorAll(`:not(input):not(textarea):not(select):not(label):not(.j-field__validation-message)`)));
    }
    return this.__inputElements;
  }
}

window.customElements.define('j-field', JField);

export default JField;
