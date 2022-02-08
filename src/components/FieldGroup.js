import { Field } from './Field.js';

/**
 * Adds label and validation features to a group of input/field elements. For example, a radio group.
 *
 * Applies the `required` attribute to itself if any of the contained inputs have that attribute.
 *
 * Sets the `invalid` attribute on itself and shows a validation message if any of the contained
 * input elements fail the checkValidity test.
 */
export class FieldGroup extends Field {
  _updateState() {
    // This needs to happen before calling super, as it is used to determine if the element is a
    // field group or a single field
    this.setAttribute('role', 'group');

    super._updateState();

    // Add a generated name for radio buttons if not specified already
    const radios = this.querySelectorAll(`input[type=radio]`);
    if (radios.length > 1) {
      this.setAttribute('role', 'radiogroup');

      [...radios].forEach(radio => {
        if (!radio.hasAttribute('name')) {
          radio.setAttribute('name', this.__id);
        }
      });
    }
  }
}

FieldGroup.defineElement();
