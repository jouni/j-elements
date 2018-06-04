// Needed for ShadyCSS
let moduleCounter = 0;

export const StylableMixin = superClass => class JStylableMixin extends superClass {
  _upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();

    // Store the first scope as the style scope. A teleporting element will have it's scope
    // change during its lifecycle (when moved under the body) and we always want to refer to the
    // original scope.
    // if (!this._stylableElementScope) {
    //   this._stylableElementScope = this.getRootNode();
    // }

    // Style modules should be the last ones appened in the template
    requestAnimationFrame(() => {
      // Is the element still attached to the DOM?
      if (this.parentNode) {
        this._gatherStyleModules();
      }
    });
  }

  _gatherStyleModules() {
    const styleModules = this.getRootNode().querySelectorAll(`style[type=module]`);

    if (styleModules.length > 0) {
      Array.from(styleModules).forEach(style => {
        if (Array.from(this.parentNode.querySelectorAll(style.getAttribute('for'))).indexOf(this) > -1) {
          const clone = style.cloneNode(true);
          clone.removeAttribute('for');
          clone.removeAttribute('type');
          clone.setAttribute('module', '');

          if (ShadyCSS && !ShadyCSS.nativeShadow) {
            if (style.__moduleId === undefined) {
              style.__moduleId = moduleCounter++;
              const template = document.createElement('template');
              template.content.appendChild(clone);
              ShadyCSS.ScopingShim.prepareTemplate(template, '.style-module-' + style.__moduleId);
            }
            const scopeClass = 'style-module-' + style.__moduleId;
            this.classList.add(scopeClass);
          } else {
            this.shadowRoot.appendChild(clone);
          }
        }
      });
    }
  }

  disconnectedCallback() {
    if (ShadyCSS && !ShadyCSS.nativeShadow) {
      this.classList.forEach(c => {
        if (c.indexOf('style-module-') == 0) {
          this.classList.remove(c);
        }
      });
    } else {
      Array.from(this.shadowRoot.querySelectorAll('style[module]')).forEach(style => {
        this.shadowRoot.removeChild(style);
      });
    }

    if (super.disconnectedCallback) super.disconnectedCallback();
  }
}

/**
 * Transform a string of CSS from BEM style to shadow DOM style:
 *
 * - .block -> :host
 * - .block__element -> [part="element"]
 * - .block--modifier -> :host([modifier])
 * - .block--modifier-value -> :host([modifier~="value"])
 *
 * @param  {String} bemCss     BEM style CSS to transform
 * @param  {String} hostSelector Block selector which is used in the original CSS (e.g. `.button`)
 * @return {String}              Shadow DOM style CSS
 */
export function bemToShadow(bemCss, hostSelector) {
  // Interpret the dot as a literal dot in the regexp
  const escapedHost = hostSelector.replace(/\./gm, '\\.');

  let shadowCss = bemCss;

  // Block-only and block pseudo elements:
  // .block -> :host
  // .block::before -> :host::before
  let regexp = new RegExp(escapedHost + '(\\s|:{2})', 'gm');
  shadowCss = shadowCss.replace(regexp, ':host$1');

  // Block modifiers:
  // .block--modifier-value -> :host([modifier~="value"])
  regexp = new RegExp(escapedHost + '--([^\\s(?=::|\\s|,|\\-)]+)-([^\\s(?=::|\\s|,|\\{|\\[)]+)', 'gm');
  shadowCss = shadowCss.replace(regexp, hostSelector + '[$1~="$2"]');
  // .block--modifier -> :host([modifier])
  regexp = new RegExp(escapedHost + '--([^\\s(?=::|\\s|,|\\-|\\{|\\[)]+)[(?=\\-)]*', 'gm');
  shadowCss = shadowCss.replace(regexp, hostSelector + '[$1]');

  // Elements:
  // .block__element -> [part="element"]
  regexp = new RegExp(escapedHost + '__([^\\s(?=::|\\s|,|\\{|\\[)]+)', 'gm');
  shadowCss = shadowCss.replace(regexp, '[part="$1"]');

  // Other block selector combinators, for example:
  // .block:hover -> :host(:hover)
  // .block[attribute] -> :host([attribute])
  regexp = new RegExp(escapedHost + '(\\S*?(?=::|\\s|,|\\{))', 'gm');
  shadowCss = shadowCss.replace(regexp, ':host($1)');

  return shadowCss;
}
