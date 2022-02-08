import { DefineElementMixin } from '../util/DefineElementMixin.js';

const styles = `
  :host {
    display: inline-grid;
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
    pointer-events: none;
  }

  slot[name=suffix] {
    margin-inline-start: auto;
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

    const prefixRect = prefix.getBoundingClientRect();
    const suffixRect = suffix.getBoundingClientRect();
    input.style.paddingInline = `${prefixRect.width}px ${suffixRect.width}px`;
  }
}

InputDecorator.defineElement();
