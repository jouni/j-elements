const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host(:not([visible])) {
      display: none !important;
    }
  </style>
`;

/**
 * Add the capability to 'teleport' the element under the `<body>` element when the `visible`
 * property is set (to escape all parent stacking contexts). When the `visible` property is not set
 * the element is hidden.
 */
export class TeleportingElement extends HTMLElement {
  static get observedAttributes() {
    return ['visible'];
  }

  constructor() {
    super();

    if (!this._isPlaceholder) {
      this._upgradeProperty('visible');
    }
  }

  _upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  connectedCallback() {
    if (!this._isPlaceholder && !this.shadowRoot) {
      if (ShadyCSS && !ShadyCSS.nativeShadow) {
        // ShadyCSS "consumes" the style element from the template, so we need to duplicate it
        ShadyCSS.prepareTemplate(template.cloneNode(true), this.nodeName.toLowerCase());
        ShadyCSS.styleElement(this);
      }

      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }

  set visible(value) {
    if (this._isPlaceholder) return;

    const isVisible = Boolean(value);
    if (isVisible) {
      this.setAttribute('visible', '');
    } else {
      this.removeAttribute('visible');
    }
  }

  get visible() {
    return this.hasAttribute('visible');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this._isPlaceholder) return;

    const hasValue = newValue !== null;

    if (oldValue == newValue) return;

    switch (name) {
      case 'visible':
        if (hasValue) {
          this._openAndInsertPlaceholder();
        } else {
          this._closeAndRemovePlaceholder();
        }
        break;
    }
  }

  _isScoped() {
    return this.getRootNode() != document;
  }

  _openAndInsertPlaceholder() {
    if (this._isScoped()) {
      if (!this.__scopeContainer) {
        this.__scopeContainer = document.createElement(this.nodeName + '-scope-container');
        this.__scopeContainer.attachShadow({mode: 'open'});
      }

      // Collect scoped styles
      let scopeCssText = Array.from(this.getRootNode().querySelectorAll('style:not([type=module])'))
        .reduce((result, style) => result + style.textContent, '');

      // The element root’s :host styles should not apply inside the element
      scopeCssText = scopeCssText.replace(/:host/g, ':host-nomatch');

      if (scopeCssText) {
        const style = document.createElement('style');
        style.textContent = scopeCssText;
        this.__scopeContainer.shadowRoot.appendChild(style);
      }
    }

    // TODO place for optimization: don't create a placeholder if the element is already directly under the body element
    if (!this.__placeholder) {
      this.__placeholder = document.createElement(this.nodeName);
      // Mark this as a placeholder
      this.__placeholder._isPlaceholder = true;
      // Copy attributes so that querySelectors still match in the parent scope
      Array.from(this.attributes).forEach(attr => {
        this.__placeholder.setAttribute(attr.name, attr.value);
      });
      // Hide the placeholder
      this.__placeholder.style.display = 'none';

      // Proxy a subset of the DOM API from the placeholder to the real element
      const self = this;
      Object.defineProperty(this.__placeholder, 'visible', {
        get() {
          return self.visible;
        },
        set(value) {
          self.visible = value;
        }
      });
      Object.defineProperty(this.__placeholder, 'shadowRoot', {
        get() {
          return self.shadowRoot;
        }
      });
      Object.defineProperty(this.__placeholder, 'children', {
        get() {
          return self.children;
        }
      });
      Object.defineProperty(this.__placeholder, 'childNodes', {
        get() {
          return self.childNodes;
        }
      });

      Object.defineProperty(this.__placeholder, 'innerHTML', {
        get() {
          return self.innerHTML;
        },
        set(value) {
          self.innerHTML = value;
        }
      });
      this.__placeholder.show = function() {
          return self.show();
      };
      this.__placeholder.hide = function() {
          return self.hide();
      };
      this.__placeholder.destroy = function() {
          return self.destroy();
      };
      this.__placeholder.querySelector = function(arg) {
          return self.querySelector(arg);
      };
      this.__placeholder.querySelectorAll = function(arg) {
          return self.querySelectorAll(arg);
      };
      this.__placeholder.appendChild = function(arg) {
          return self.appendChild(arg);
      };
      this.__placeholder.insertBefore = function(arg) {
          return self.insertBefore(arg);
      };
      this.__placeholder.removeChild = function(arg) {
          return self.removeChild(arg);
      };

      // Proxy the root node back to the placeholder
      this.__originalRootNode = this.getRootNode();
      this.getRootNode = function() {
        return this.__placeholder.getRootNode();
      }
    }

    this.parentNode.insertBefore(this.__placeholder, this);

    if (this._isScoped()) {
      this.__scopeContainer.shadowRoot.appendChild(this);
      document.body.appendChild(this.__scopeContainer);
    } else {
      document.body.appendChild(this);
    }
  }

  _closeAndRemovePlaceholder() {
    if (this.__placeholder) {
      // Restore the element back to original scope and remove the placeholder
      this.__placeholder.parentNode.insertBefore(this, this.__placeholder);
      this.__placeholder.parentNode.removeChild(this.__placeholder);

      // FIXME For some reason the element doesn't end up in the correct DOM scope when
      // ShadyDOM is used (this.getRootNode() now returns document). Seems like a ShadyDOM issue.
      // Happens only in Chrome, not in Safari or Firefox, with ShadyDOM = {force: true}

      if (this.__scopeContainer && this.__scopeContainer.parentNode) {
        // Remove global scope container
        document.body.removeChild(this.__scopeContainer);
        this.__scopeContainer.shadowRoot.innerHTML = '';
      }

      // Restore root node reference
      this.getRootNode = function() {
        return this.__originalRootNode;
      }
    }
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  destroy() {
    this.visible = false;
    this.parentNode.removeChild(this);
  }
}
