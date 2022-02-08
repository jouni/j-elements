import { DefineElementMixin } from '../util/DefineElementMixin.js';

const styles = `
/*
 Alternative way of positioning the prefix and suffix elements
 No need to set the padding on the input element, or the height of the slots, but makes the host
 "vulnerable" to global styling.
*/
/*
  :host {
    display: grid;
    width: max-content;
  }

  slot[name],
  ::slotted(input) {
    grid-column: 1;
    grid-row: 1;
  }

  slot[name] {
    display: block;
    z-index: 1;
    align-self: center;
    width: max-content;
  }

  slot[name=suffix] {
    margin-inline-start: auto;
  }
*/

  :host {
    display: contents;
  }

  slot[name] {
    display: inline-flex;
    align-items: center;
    position: absolute;
    pointer-events: none;
  }

  slot[name]::slotted(:is(button, a, select, input)) {
    pointer-events: auto;
  }
`;

export class InputDecorator extends DefineElementMixin(HTMLElement) {
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({mode: 'open'});
      this.shadowRoot.innerHTML = `
        <style>${styles}</style>
        <slot name="prefix"></slot>
        <slot></slot>
        <slot name="suffix"></slot>
      `;
    }
    if (!this.__mutationObserver) {
      this.__mutationObserver = new MutationObserver(this._onMutation.bind(this));
    }

    this.__mutationObserver.observe(this, { childList: true });

    this._onMutation();
  }

  disconnectedCallback() {
    this.__mutationObserver.disconnect();
  }

  _onMutation() {
    const prefix = this.shadowRoot.querySelector('slot[name="prefix"]');
    const suffix = this.shadowRoot.querySelector('slot[name="suffix"]');
    const input = this.querySelector('input');
    // input.style.paddingInlineStart = input.style.paddingInlineEnd = '';

    const prefixRect = prefix.getBoundingClientRect();
    const suffixRect = suffix.getBoundingClientRect();
    const inputRect = input.getBoundingClientRect();
    // const inputComputedStyle = window.getComputedStyle(input);
    // const inputPaddingInlineStart = parseInt(inputComputedStyle.getPropertyValue('padding-inline-start'));
    // const inputPaddingInlineEnd = parseInt(inputComputedStyle.getPropertyValue('padding-inline-end'));
    input.style.paddingInlineStart = prefixRect.width + 'px';
    input.style.paddingInlineEnd = suffixRect.width + 'px';

    prefix.style.height = suffix.style.height = inputRect.height + 'px';
    suffix.style.marginInlineStart = -suffixRect.width + 'px';
  }
}

InputDecorator.defineElement();
