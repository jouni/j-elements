// Works with <link rel="stylesheet" href="theme.css" media="x-button">

// Needed for ShadyCSS
// Module identifier
let moduleCounter = 0;
// Module class prefix
const MODULE_CLASS_PREFIX = '_smod_';

const themes = {};

export const StylableMixin = superClass => class JStylableMixin extends superClass {
  constructor() {
    super();

    // Do only once per component type (not for every instance)
    if (!themes[this.nodeName]) {
      // document.querySelectorAll is faster than document.styleSheets in the common case where
      // there is only one stylesheet per component. And we get to remove the link element from the
      // DOM after processing (probably reduces memory consumption)
      Array.prototype.forEach.call(document.querySelectorAll(`link[media="${this.nodeName.toLowerCase()}"]`), link => {
        themes[this.nodeName] = document.createElement('style');
        Array.prototype.forEach.call(link.sheet.cssRules, rule => {
          themes[this.nodeName].innerHTML += rule.cssText;
        });
        link.parentNode.removeChild(link);
      });
    }
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    if (typeof ShadyCSS != 'undefined' && !ShadyCSS.nativeShadow) {
      ShadyCSS.styleElement(this);
    }
    this._gatherStyleModules();
  }

  _gatherStyleModules() {
    if (themes[this.nodeName] && !this._themeApplied) {
      const theme = themes[this.nodeName].cloneNode(true);
      this.shadowRoot.appendChild(theme);
      this._themeApplied = true;
    }

    // Gather style modules (scoped and global)
    let styleModules = Array.from(this.getRootNode().querySelectorAll(`style[type=scoped]`));
    styleModules = styleModules.concat(Array.from(document.querySelectorAll(`style[type=global]`)));

    styleModules.forEach(style => {
      if (!matches(this, style.getAttribute('for'))) return;

      const clone = style.cloneNode(true);
      clone.removeAttribute('for');
      clone.removeAttribute('type');
      clone.setAttribute('module', '');

      if (typeof ShadyCSS != 'undefined' && !ShadyCSS.nativeShadow) {
        if (style.__moduleId === undefined) {
          style.__moduleId = moduleCounter++;
        }
        if (style.__scopedFor === undefined) {
          // List of elements + module that this module has already been applied to
          // This is needed because ScopingShim always wants to scope based on a tag selector,
          // so we need separately scoped styles for each element type
          style.__scopedFor = [];
        }

        // F.e. 'x-foo._smod_0' (element-name + class-prefix + module-id)
        const scope = this.nodeName.toLowerCase() + '.' + MODULE_CLASS_PREFIX + style.__moduleId;

        if (style.__scopedFor.indexOf(scope) == -1) {
          style.__scopedFor.push(scope);
          const template = document.createElement('template');
          template.content.appendChild(clone);
          ShadyCSS.ScopingShim.prepareTemplate(template, scope);
          ShadyCSS.styleElement(this);
        }
        const scopeClass = MODULE_CLASS_PREFIX + style.__moduleId;
        this.classList.add(scopeClass);
        // TODO would like to use some method from ScopingShim but I can't find a suitable one
        // This should be recursive as well, not just the first level of children
        Array.from(this.shadowRoot.querySelectorAll('*')).forEach(child => {
          child.classList.add(scopeClass);
        });
      } else {
        this.shadowRoot.appendChild(clone);
      }
    });
  }

  _removeStyleModuleClasses(el) {
    el.classList.forEach(c => {
      if (c.indexOf(MODULE_CLASS_PREFIX) == 0) {
        el.classList.remove(c);
      }
    });
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) super.disconnectedCallback();

    this._removeStyleModuleClasses(this);

    if (typeof ShadyCSS != 'undefined' && !ShadyCSS.nativeShadow) {
      Array.from(this.shadowRoot.querySelectorAll('*')).forEach(child => {
        this._removeStyleModuleClasses(child);
      });
    } else {
      Array.from(this.shadowRoot.querySelectorAll('style[module]')).forEach(style => {
        this.shadowRoot.removeChild(style);
      });
    }
  }
}

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
