import NativeElementWrapper from './NativeElementWrapper.js';

export default class NativeInputElementWrapper extends NativeElementWrapper {
  static get observedAttributes() {
    return super.observedAttributes.concat([
      'autocomplete',
      'autocorrect',
      'autocapitalize',
      'max',
      'maxlength',
      'min',
      'minlength',
      'name',
      'pattern',
      'placeholder',
      'readonly',
      'required',
      'step',
      'type',
      'value'
    ]);
  }

  static get observedProperties() {
    return super.observedProperties.concat([
      'validity',
      'validationMessage',
      'willValidate'
    ]);
  }

  static get template() {
    const template = super.template;
    template.innerHTML += `
      <div class="container">
        <input type="text" native-element>
      </div>`;
    return template;
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      super.connectedCallback();

      this._nativeElement.addEventListener('change', e => {
        this._propagateEvent(e);
      });
    }
  }
}

NativeInputElementWrapper.prototype.checkValidity = function() {
  return this._nativeElement.checkValidity();
}
