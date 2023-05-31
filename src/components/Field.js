import { MutationsMixin } from '../util/MutationsMixin.js';

let fieldId = 0;

/**
 * Adds label and validation features to an input element.
 *
 * Sets the `invalid` attribute on itself and shows a validation message if the contained input
 * element fails the checkValidity test.
 *
 * TODO: sets aria-invalid on the input element
 */
export class Field extends MutationsMixin(HTMLElement) {
  observedMutations = { childList: true, attributes: true, subtree: true };

  constructor() {
    super();
    this.__id = `${this.localName}-${fieldId++}__`;
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener('focusout', this._onFocusOut);
    this.addEventListener('change', this._onChange);
    this.addEventListener('input', this._onInput);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener('focusout', this._onFocusOut);
    this.removeEventListener('change', this._onChange);
    this.removeEventListener('input', this._onInput);
  }

  _onFocusOut(e) {
    requestAnimationFrame(this._checkValidity.bind(this));
  }

  _onChange(e) {
    this._checkValidity(e);
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

  handleMutations() {
    this._updateState();
  }

  _updateState() {
    const labelElement = this.querySelector('label');

    if (this._isGroup()) {
      if (labelElement && labelElement.closest(`${this.localName}`) == this) {
        labelElement.id = this.__id + 'label';
        this.setAttribute('aria-labelledby', labelElement.id);
      }
    } else {
      const inputElement = this.querySelector('input, textarea, select');
      if (inputElement) {
        let type = inputElement.getAttribute('type');
        if (inputElement.localName == 'select') {
          type = 'select';
        }
        this.setAttribute('type', type);

        if (!inputElement.id) {
          inputElement.id = this.__id + 'input';
        }

        labelElement?.setAttribute('for', inputElement.id);
      }
    }

    if (this._isGroup() || !this._isInGroup()) {
      const inputElements = [...this.querySelectorAll('input, textarea, select')];
      const descriptions = [...this.querySelectorAll('[validation-message], [description]')];
      inputElements.forEach(inputElement=> {
        // TODO the public API is hard to decide (should it be class names, should it be attributes, should it be slots?)
        descriptions.forEach((desc, i) => {
          desc.id = this.__id + 'description-' + i;
        });
        inputElement.setAttribute('aria-describedby', descriptions.reduce((acc, desc) => acc + ' ' + desc.id, ''));
      });

      // TODO no way to mark a checkbox group as required at the moment ("choose at least one")
      let indicatorElement = labelElement?.querySelector('[required-indicator], [error-indicator]') || document.createElement('span');
      if (labelElement && this.querySelector(':required') || this.hasAttribute('invalid')) {
        indicatorElement.setAttribute(this.hasAttribute('invalid') ? 'error-indicator' : 'required-indicator', '');
        indicatorElement.removeAttribute(this.hasAttribute('invalid') ? 'required-indicator' : 'error-indicator', '');
        indicatorElement.setAttribute('aria-hidden', 'true');
        labelElement.appendChild(indicatorElement);
      } else if (labelElement && indicatorElement.parentNode == labelElement) {
        labelElement.removeChild(indicatorElement);
      }
    }

  }

  _checkValidity(e) {
    let invalid = false;
    let validationMessages = [];
    const inputElements = [...this.querySelectorAll('input, textarea, select')];

    inputElements.forEach(inputElement => {
      if (inputElement && inputElement.validity) {
        // Clear custom validity, because that makes validity always report false
        inputElement.setCustomValidity('');

        invalid = !inputElement.validity.valid;

        if (invalid && this.hasAttribute('validation-message')) {
          inputElement.setCustomValidity(this.getAttribute('validation-message'));
        }

        // Don't add the same validation message twice
        if (!validationMessages.includes(inputElement.validationMessage)) {
          validationMessages.push(inputElement.validationMessage);
        }
      }
    });

    if (this._isGroup() || !this._isInGroup()) {
      const validationMessageElement = this.querySelector(':scope > [validation-message]') || document.createElement('p');
      if (this.querySelector(':invalid')) {
        validationMessageElement.setAttribute('validation-message', '');
        validationMessageElement.setAttribute('aria-live', 'assertive');
        validationMessageElement.textContent = validationMessages.join('. ');
        this.appendChild(validationMessageElement);
      } else if (validationMessageElement.parentNode == this) {
        this.removeChild(validationMessageElement);
      }
    }

    this.toggleAttribute('invalid', invalid);
  }

  _isGroup() {
    return this.getAttribute('role')?.includes('group');
  }

  _isInGroup() {
    return this.parentNode.closest('[role*="group"]') != null;
  }

  setAttribute(name, val) {
    // Avoid unnecessary mutation events
    if (this.getAttribute(name) != val) {
      super.setAttribute(name, val);
    }
  }
}

customElements.define('j-field', Field);
