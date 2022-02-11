import { DefineElementMixin } from '../util/DefineElementMixin.js';

const styles = `
  :host {
    display: inline-grid;
  }

  slot[name],
  ::slotted(:is(input, textarea)) {
    grid-area: 1/1;
  }

  slot[name] {
    z-index: 1;
    display: flex;
    align-items: center;
    width: max-content;
    pointer-events: none;
  }

  slot[name=suffix] {
    margin-inline-start: auto;
    flex-direction: row-reverse;
  }

  slot[name]::slotted(:is(button, a, select, input)) {
    pointer-events: auto;
  }

  ::slotted(:is(input, textarea)) {
    min-width: calc(var(--prefix-width, 0px) + var(--suffix-width, 0px) + 2em);
  }

  :host([style*=prefix-width]) ::slotted(:is(input, textarea)) {
    padding-inline-start: var(--prefix-width) !important;
  }

  :host([style*=suffix-width]) ::slotted(:is(input, textarea)) {
    padding-inline-end: var(--suffix-width) !important;
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
    const input = this.querySelector('input, textarea');

    const prefixRect = prefix.getBoundingClientRect();
    if (prefix.assignedElements().length > 0 && prefixRect.width > 0) {
      this.style.setProperty('--prefix-width', `${prefixRect.width}px`);
    } else {
      this.style.removeProperty('--prefix-width');
    }

    const suffixRect = suffix.getBoundingClientRect();
    if (suffix.assignedElements().length > 0 && suffixRect.width > 0) {
      this.style.setProperty('--suffix-width', `${suffixRect.width}px`);
    } else {
      this.style.removeProperty('--suffix-width');
    }
  }
}

InputDecorator.defineElement();
