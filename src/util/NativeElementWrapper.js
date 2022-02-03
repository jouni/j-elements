export class NativeElementWrapper extends HTMLElement {
  static register(elementName) {
    window.customElements.define(elementName, this);
  }

  static get observedAttributes() {
    return [
      'aria-label',
      'aria-labelledby',
      'aria-describedby',
      'disabled'
    ];
  }

  static get observedProperties() {
    return this.observedAttributes.concat([]);
  }

  static toCamelCase(str) {
    return str.replace(/-(.)/g, function(match, group1) {
      return group1.toUpperCase();
    });
  }

  static get template() {
    const template = document.createElement('template');
    template.innerHTML = '<style>[hidden] {display:none !important;}</style>';
    return template;
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      if (!this.constructor.template) {
        console.error('No template defined');
        return;
      }

      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(this.constructor.template.content.cloneNode(true));

      this._nativeElement = this.shadowRoot.querySelector('[native-element]');
      if (!this._nativeElement) {
        console.error('Native element not found in the template');
        return;
      }

      this._initNativeElementAttributes();
      this._observeProperties();

      this.addEventListener('click', e => {
        if (e.composedPath()[0] != this._nativeElement) {
          this._nativeElement.focus();
        }
      });

      this.addEventListener('focusin', e => {
        this.setAttribute('focus', '');
        if (this.__tabPressed) {
          this.setAttribute('focus-visible', '');
        }
        this._propagateEvent(e);
      });

      this.addEventListener('focusout', e => {
        this.removeAttribute('focus');
        this.removeAttribute('focus-visible');
        this._propagateEvent(e);
      });

      this._boundKeydownListener = this._bodyKeydownListener.bind(this);
      this._boundKeyupListener = this._bodyKeyupListener.bind(this);
    }

    document.body.addEventListener('keydown', this._boundKeydownListener, true);
    document.body.addEventListener('keyup', this._boundKeyupListener, true);
  }

  disconnectedCallback() {
    document.body.removeEventListener('keydown', this._boundKeydownListener, true);
    document.body.removeEventListener('keyup', this._boundKeyupListener, true);
  }

  _observeProperties() {
    this.constructor.observedProperties.forEach(attrOrProp => {
      const prop = NativeElementWrapper.toCamelCase(attrOrProp);
      Object.defineProperty(this, prop, {
        get() {
          return this._nativeElement[prop];
        },
        set(val) {
          if (this.constructor.observedAttributes.indexOf(attrOrProp) > -1) {
            if (val !== null && val !== undefined && val !== false) {
              this.setAttribute(attrOrProp, val === true ? '' : val);
            } else {
              this.removeAttribute(attrOrProp);
            }
          }
          this._nativeElement[prop] = val;
        }
      });
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this._nativeElement && this.constructor.observedAttributes.indexOf(name) > -1 && oldValue != newValue) {
      if (newValue !== null) {
        this._nativeElement.setAttribute(name, newValue);
      } else {
        this._nativeElement.removeAttribute(name);
      }

      if (name == 'aria-labelledby' || name == 'aria-describedby' && oldValue != newValue) {
        // Remove existing label elements
        Array.from(this.shadowRoot.querySelectorAll('.' + name)).forEach(label => {
          this._nativeElement.parentNode.removeChild(label);
        });

        if (newValue !== null) {
          newValue.split(' ').forEach(labelId => {
            if (!this.shadowRoot.getElementById(labelId)) {
              let label = this.getRootNode().getElementById(labelId);
              if (label) {
                label = label.cloneNode(true);
                label.classList.add(name);
                label.setAttribute('hidden', '');
                this._nativeElement.parentNode.insertBefore(label, this._nativeElement);
              }
            }
          });
        }
      }
    }
  }

  _initNativeElementAttributes() {
    this.constructor.observedAttributes.forEach(attr => {
      this.attributeChangedCallback(attr, null, this.getAttribute(attr));
    });
  }

  _bodyKeydownListener(e) {
    this.__tabPressed = e.keyCode === 9;
  }

  _bodyKeyupListener() {
    this.__tabPressed = false;
  }

  _propagateEvent(e) {
    if (e.isTrusted) {
      e.stopPropagation();
      this.dispatchEvent(new CustomEvent(e.type, {
        bubbles: true,
        composed: true
      }));
    }
  }
}

NativeElementWrapper.prototype.focus = function() {
  return this._nativeElement.focus();
}

NativeElementWrapper.prototype.blur = function() {
  return this._nativeElement.blur();
}
