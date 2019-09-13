const StylableMixin = superClass => class JStylableMixin extends superClass {
  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this._gatherStyleModules();
  }

  _gatherStyleModules() {
    // Gather global style modules
    let styleModules = Array.from(document.querySelectorAll(`style[media]`));

    if (this.getRootNode() != document) {
      // Gather scoped style modules
      styleModules = styleModules.concat(Array.from(this.getRootNode().querySelectorAll(`style[media]`)));
    }

    styleModules.forEach(style => {
      if (!matches(this, style.getAttribute('media'))) return;

      const clone = style.cloneNode(true);
      clone.removeAttribute('media');
      clone.setAttribute('module', '');
      this.shadowRoot.appendChild(clone);
    });
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) super.disconnectedCallback();

    Array.from(this.shadowRoot.querySelectorAll('style[module]')).forEach(style => {
      this.shadowRoot.removeChild(style);
    });
  }
}

export default StylableMixin;

// Extended CSS selector matching, to support `parent::(child)`
// TODO does not work work multi-level shadow roots, e.g. `parent1::(parent2::(child))`
function matches(el, selector) {
  const regexp = /(.*)::\((.*)\)/g;
  const parts = regexp.exec(selector);

  if (parts) {
    selector = `:host(${parts[1]}) ${parts[2]}`;
  }

  return el.msMatchesSelector ? el.msMatchesSelector(selector) : el.matches(selector)
}
