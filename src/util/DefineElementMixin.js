export const DefineElementMixin = superClass => class extends superClass {
  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) super.disconnectedCallback();
  }

  static defineElement() {
    const prefixAndName = arguments[0] || {};
    const prefix = prefixAndName.prefix || 'j';
    const name = prefixAndName.name || this.prototype.constructor.name.split(/(?=[A-Z])/).join('-').toLowerCase();
    window.customElements.define(prefix + '-' + name, this);
  }
}
