export const DefineElementMixin = superClass => class DefineElement extends superClass {
  static asCustomElement() {
    const prefixAndName = arguments[0] || {};
    const prefix = prefixAndName.prefix || 'j';
    const name = prefixAndName.name || this.prototype.constructor.name.split(/(?=[A-Z])/).join('-').toLowerCase();
    window.customElements.define(prefix + '-' + name, this);
  }
}
