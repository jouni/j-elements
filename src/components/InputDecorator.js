import { MutationsMixin } from '../util/MutationsMixin.js';

const styles = `
  :host {
    display: inline-grid;
    vertical-align: middle;
  }

  slot[name],
  slot:not([name])::slotted(:is(input, textarea, select)) {
    grid-area: 1/1;
    box-sizing: border-box;
    resize: none !important;
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

  :host([style*=prefix-width]) slot:not([name])::slotted(:is(input:not([type=range]), textarea, select)) {
    padding-inline-start: var(--prefix-width) !important;
  }

  :host([style*=suffix-width]) slot:not([name])::slotted(:is(input:not([type=range]), textarea)) {
    padding-inline-end: var(--suffix-width) !important;
  }

  :host([style*=prefix-width]) slot:not([name])::slotted(input[type=range]) {
    margin-inline-start: var(--prefix-width) !important;
  }

  :host([style*=suffix-width]) slot:not([name])::slotted(input[type=range]) {
    margin-inline-end: var(--suffix-width) !important;
  }
`;

export class InputDecorator extends MutationsMixin(HTMLElement) {
  observedMutations = { childList: true, characterData: true, subtree: true };

  connectedCallback() {
    super.connectedCallback();

    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>${styles}</style>
        <slot name="prefix"></slot>
        <slot></slot>
        <slot name="suffix"></slot>
      `;
    }

    this.addEventListener('input', this._updateSize);
  }

  disconnectedCallback() {
    this.removeEventListener('input', this._updateSize);
    super.disconnectedCallback();
  }

  handleMutations() {
    const prefix = this.shadowRoot.querySelector('slot[name="prefix"]');
    const suffix = this.shadowRoot.querySelector('slot[name="suffix"]');

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

    this._updateSize();
  }

  // TODO should use a ResizeObserver as well to call it
  _updateSize() {
    this.pauseMutations();

    const input = this.querySelector('input, textarea, select');
    const dimension = input.localName == 'textarea' ? 'Height' : 'Width';

    if (this.hasAttribute('autosize')) {
      if (input.localName == 'select') {
        this.style.width = '0'; // Needed for Safari
        input.style.width = '';
        const options = [...input.querySelectorAll('option')].map((option, i) => { return { option, i } });
        options.forEach(({ option, i }) => !option.selected && input.removeChild(option));
        // Safari fails to re-layout/paint the select even when reading offsetWidth
        requestAnimationFrame(() => {
          this.style.width = '';
          this.style.width = input.offsetWidth + 'px';
          input.style.width = '100%';
          options.forEach(({ option, i }) => input.insertBefore(option, input.children[i]));
        });
      } else {
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
        // Text input caret needs 1px extra to be visible if a suffix element is used
        this.style[dimension.toLowerCase()] = (input['scroll' + dimension] + borderWidth * 2 + paddingInlineStart + paddingInlineEnd + (dimension == 'Width' ? 1 : 0)) + 'px';
        input.style.padding = '';
        input.style.removeProperty('--prefix-width');
        input.style.removeProperty('--suffix-width');
        input.style[dimension.toLowerCase()] = '100%';
      }
    } else {
      this.style[dimension.toLowerCase()] = '';
      input.style[dimension.toLowerCase()] = '';
    }

    this.resumeMutations();
  }
}

customElements.define('j-input-decorator', InputDecorator);
