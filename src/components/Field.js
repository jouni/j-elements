import { DefineElementMixin } from '../util/DefineElementMixin.js';

let fieldId = 0;

/**
 * Adds label and validation features to an input element.
 *
 * Applies the `required` attribute to itself if any of the contained elements have that attribute.
 *
 * Sets the `invalid` attribute on itself and shows a validation message if the contained input
 * element fails the checkValidity test.
 */
export class Field extends DefineElementMixin(HTMLElement) {
  constructor() {
    super();
    this.__id = `${this.localName}-${fieldId++}__`;
  }

  connectedCallback() {
    this.addEventListener('focusout', this._onFocusOut);
    this.addEventListener('change', this._onChange);
    this.addEventListener('input', this._onInput);

    if (!this.__mutationObserver) {
      this.__mutationObserver = new MutationObserver(this._onMutation.bind(this));
    }

    this.__mutationObserver.observe(this, { childList: true, attributes: true, subtree: true });

    this._onMutation();
  }

  disconnectedCallback() {
    this.removeEventListener('focusout', this._onFocusOut);
    this.removeEventListener('change', this._onChange);
    this.removeEventListener('input', this._onInput);
    this.__mutationObserver.disconnect();
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

  _onMutation(e) {
    if (!this.__processingMutations) {
      clearTimeout(this.__mutationsDebounce);
      this.__mutationsDebounce = setTimeout(() => {
        this.__processingMutations = true;
        this._updateState();
        requestAnimationFrame(() => this.__processingMutations = false);
      }, 1);
    }
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

        // if (!this._isInGroup()) {
        //   // TODO the public API is hard to decide (should it be class names, should it be attributes, should it be slots?)
        //   const descriptions = [...this.querySelectorAll('[validation-message], [description]')];
        //   descriptions.forEach((desc, i) => {
        //     desc.id = this.__id + 'description-' + i;
        //   });
        //   inputElement.setAttribute('aria-describedby', descriptions.reduce((acc, desc) => acc + ' ' + desc.id, ''));
        // }
      }
    }

    if (this._isGroup() || !this._isInGroup()) {
      const inputElements = [...this.querySelectorAll('input, textarea, select')];
      const descriptions = [...this.querySelectorAll('[validation-message], [description]')];
      inputElements.forEach(inputElement=> {
        // TODO the public API is hard to decide (should it be class names, should it be attributes, should it be slots?)
        descriptions.forEach((desc, i) => {
          desc.id = this.__id + 'description-' + i;
        });
        inputElement.setAttribute('aria-describedby', descriptions.reduce((acc, desc) => acc + ' ' + desc.id, ''));
      });

      let requiredIndicatorElement = labelElement?.querySelector('[required-indicator]') || document.createElement('span');
      if (this.querySelector(':required')) {
        requiredIndicatorElement.setAttribute('required-indicator', '');
        requiredIndicatorElement.setAttribute('aria-hidden', 'true');
        labelElement.appendChild(requiredIndicatorElement);
      } else if (labelElement && requiredIndicatorElement.parentNode == labelElement) {
        labelElement.removeChild(requiredIndicatorElement);
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
      const validationMessageElement = this.querySelector(':scope > [validation-message]') || document.createElement('p');
      if (this.querySelector(':invalid')) {
        validationMessageElement.setAttribute('validation-message', '');
        validationMessageElement.setAttribute('aria-live', 'assertive');
        validationMessageElement.textContent = validationMessages.join('. ');
        this.appendChild(validationMessageElement);
      } else if (validationMessageElement.parentNode == this) {
        this.removeChild(validationMessageElement);
      }
    }
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

Field.defineElement();
