import { DefineElementMixin } from '../util/DefineElementMixin.js';

const styles = `
  :host {
    display: inline-grid;
    vertical-align: middle;
  }

  slot[name],
  ::slotted(:is(input, textarea)) {
    grid-area: 1/1;
    box-sizing: border-box;
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

  :host([style*=prefix-width]) ::slotted(:is(input, textarea)) {
    padding-inline-start: var(--prefix-width) !important;
  }

  :host([style*=suffix-width]) ::slotted(:is(input, textarea)) {
    padding-inline-end: var(--suffix-width) !important;
  }

  ::slotted(textarea) {
    resize: none !important;
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

    this.addEventListener('input', this._updateSize);

    if (!this.__mutationObserver) {
      this.__mutationObserver = new MutationObserver(this._onMutation.bind(this));
    }

    this.__mutationObserver.observe(this, { childList: true });

    this._onMutation();
    this._updateSize();
  }

  disconnectedCallback() {
    this.removeEventListener('input', this._updateSize);
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

  // TODO should use a ResizeObserver as well to call it
  _updateSize() {
    const input = this.querySelector('input, textarea');
    const dimension = input.localName == 'textarea' ? 'Height' : 'Width';

    if (this.hasAttribute('autosize')) {
      const borderWidth = parseInt(window.getComputedStyle(input)['border-width']);

      // Safari reports scrollWidth the same regardless of the padding, so we need to handle that
      // manually to get it consistent in all browsers
      let paddingInlineStart = 0, paddingInlineEnd = 0;
      if (dimension == 'Width') {
        paddingInlineStart = parseInt(window.getComputedStyle(input)['padding-inline-start']);
        paddingInlineEnd = parseInt(window.getComputedStyle(input)['padding-inline-end']);
        input.style.setProperty('--prefix-width', '0');
        input.style.setProperty('--suffix-width', '0');
        input.style.padding = '0';
      }

      input.style[dimension.toLowerCase()] = '0';
      this.style[dimension.toLowerCase()] = (input['scroll' + dimension] + borderWidth * 2 + paddingInlineStart + paddingInlineEnd) + 'px';
      input.style.padding = '';
      input.style.removeProperty('--prefix-width');
      input.style.removeProperty('--suffix-width');
      input.style[dimension.toLowerCase()] = '100%';
    } else {
      this.style[dimension.toLowerCase()] = '';
      input.style[dimension.toLowerCase()] = '';
    }
  }
}

InputDecorator.defineElement();
