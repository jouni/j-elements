/**
 * # PortalElement
 *
 * A portal element, when enabled, moves itself and its child elements under the `<body>` element.
 *
 * Figuratively speaking, it “opens a portal” from one DOM location to another place in the DOM.
 *
 * ## Limitations:
 *
 * ### Additional connected/disconnected callbacks
 *
 * The portal element and its child elements will get detached/attached every time the portal is
 * enabled or disabled.
 *
 * ### CSS selector limitations
 *
 * CSS selectors that match the portal or its child elements from higher in the DOM hierarchy don’t work.
 *
 * For example:
 * ```
 * <style>
 *   .parent portal-element {
 *     border: 1px solid;
 *   }
 *
 *   .parent .child {
 *     color: red;
 *   }
 * </style>
 * <div class="parent">
 *   <portal-element>
 *     There should be a border around this element, but there isn’t (unless the portal is disabled).
 *     <div class="child">I should be red, but I’m not (unless the portal is disabled).</div>
 *   </portal-element>
 * </div>
 *
 * To mitigate this, avoid selectors that match across the portal boundary.
 * ```
 *
 * @extends HTMLElement
 */
export default class PortalElement extends HTMLElement {
  static get observedAttributes() {
    return ['disabled'];
  }

  connectedCallback() {
    if (!this.disabled) {
      this._enable();
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.isTarget) return;
    if (oldValue == newValue) return;
    const hasValue = newValue !== null;

    switch (name) {
      case 'disabled':
        if (hasValue) {
          this._disable();
        } else {
          this._enable();
        }
        break;
    }
  }

  set disabled(value) {
    if (this.target) return;

    if (Boolean(value) && !this.hasAttribute('disabled')) {
      this.setAttribute('disabled', '');
    } else if (!Boolean(value) && this.hasAttribute('disabled')) {
      this.removeAttribute('disabled');
    }
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  _ensureHasTarget() {
    if (!this.isTarget && !this._target) {
      this._target = document.createElement(this.localName);
      this._target.setAttribute('target', '');
      this._target.isTarget = true;
      this._target.style.display = 'none';
      // this.setAttribute('source', '');
      this._target._source = this;
    }
  }

  _isScoped() {
    const scoped = this.getRootNode() != document;
    if (scoped && !this.__scopeContainer) {
      this.__scopeContainer = document.createElement(this.localName + '-scope');
      this.__scopeContainer.attachShadow({mode: 'open'});
    }
    return scoped;
  }

  _enable() {
    if (this.parentNode == document.body) {
      return;
    }

    if (this.isTarget || this.__enabled) return;
    this.__enabled = true;

    this._ensureHasTarget();

    if (this._isScoped()) {
      let scopeCssText = Array.from(this.getRootNode().querySelectorAll('style'))
        .reduce((result, style) => result + style.textContent, '');

      // TODO: the `all` property doesn't work in Edge. Would need to list all relevant properties explicitly.
      scopeCssText += `
        :host {
          all: initial !important;
        }
      `;

      const style = document.createElement('style');
      style.textContent = scopeCssText;
      this.__scopeContainer.shadowRoot.appendChild(style);

      // TODO: this only works one shadow level upwards. If some of the assigned nodes is a <slot> element, the assigned nodes of that would not be picked up
      Array.from(this.querySelectorAll('slot')).forEach(slot => {
        slot.assignedNodes().forEach(node => {
          if (node.localName != this.localName + '-placeholder') {
            node.__placeholder = document.createElement(this.localName + '-placeholder');
            node.parentNode.insertBefore(node.__placeholder, node);
            this.__scopeContainer.appendChild(node);
          }
        });
      });
    }

    // Array.from(this.childNodes).forEach(child => {
    //   this._target.appendChild(child);
    // });

    this.parentNode.insertBefore(this._target, this);
    // TODO: could make it configurable where the portal is moved (instead of always under body)
    if (this._isScoped()) {
      this.__scopeContainer.shadowRoot.appendChild(this);
      document.body.appendChild(this.__scopeContainer);
    } else {
      document.body.appendChild(this);
    }

    // this.style.display = 'none';
  }

  _disable() {
    if (!this._target) {
      return;
    }

    if (this.isTarget || !this.__enabled) return;
    this.__enabled = false;

    if (this._isScoped()) {
      Array.from(this.__scopeContainer.childNodes).forEach(node => {
        if (node != this) {
          if (node.__placeholder) {
            node.__placeholder.parentNode.insertBefore(node, node.__placeholder);
            node.__placeholder.parentNode.removeChild(node.__placeholder);
            delete node.__placeholder;
          }
        }
      });
      document.body.removeChild(this.__scopeContainer);
      this.__scopeContainer.innerHTML = '';
      this.__scopeContainer.shadowRoot.innerHTML = '';
    } else {
      // document.body.removeChild(this._target);
    }
    this._target.parentNode.insertBefore(this, this._target);
    this._target.parentNode.removeChild(this._target);

    // Array.from(this._target.childNodes).forEach(child => {
    //   this.appendChild(child);
    // });

    // this.style.display = '';
  }
}
