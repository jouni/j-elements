import bemToShadow from './bemToShadow.js';

export const PortalMixin = superClass => class Portal extends superClass  {
  constructor() {
    super();

    setTimeout(() => {
      if (!this.__isPortalOrigin && this.portalInitiallyEnabled !== undefined && this.portalEnabled !== this.portalInitiallyEnabled) {
        this.portalEnabled = this.portalInitiallyEnabled;
      }
    });
  }

  connectedCallback() {
    if (this.__isPortalOrigin) return;

    if (this.__portalEnabled) {
      this.removeAttribute('portal-disabled');
    } else {
      this.setAttribute('portal-disabled', '');
    }
  }

  set portalEnabled(value) {
    if (this.__isPortalOrigin) return;

    if (Boolean(value) && !this.__portalEnabled) {
      this.__portalEnabled = true;
      this._enablePortal();
    } else if (!Boolean(value) && this.__portalEnabled) {
      this.__portalEnabled = false;
      this._disablePortal();
    }
  }

  get portalEnabled() {
    return this.__portalEnabled;
  }

  _ensureHasPortalOrigin() {
    if (!this.__isPortalOrigin && !this.__portalOrigin) {
      this.__portalOrigin = document.createElement(this.localName);
      this.__portalOrigin.setAttribute('portal-origin', '');
      this.__portalOrigin.setAttribute('portal-enabled', '');
      this.__portalOrigin.__isPortalOrigin = true;
      this.__portalOrigin.style.display = 'none';
    }
  }

  _isPortalScoped(lightScoped) {
    const shadowScoped = this.getRootNode() != document;
    if ((lightScoped || shadowScoped) && !this.__portalDestinationContainer) {
      this.__portalDestinationContainer = document.createElement(this.localName + '-scope');
      if (shadowScoped) {
        this.__portalDestinationContainer.attachShadow({mode: 'open'});
      }
    } else if (!this.__portalDestinationContainer) {
      this.__portalDestinationContainer = document.body;
    }
    return shadowScoped;
  }

  _enablePortal() {
    if (this.__isPortalOrigin) return;

    this._ensureHasPortalOrigin();

    if (this._isPortalScoped()) {
      // TODO: should also handle adoptedStyleSheets
      Array.from(this.getRootNode().querySelectorAll('style')).forEach(style => {
        const clone = style.cloneNode(true);
        clone.innerHTML = bemToShadow(clone.innerHTML, this.__portalDestinationContainer.localName);
        this.__portalDestinationContainer.shadowRoot.appendChild(clone);
      });

      // TODO: this only works one shadow level upwards. If some of the assigned nodes is a <slot> element, the assigned nodes of that would not be picked up
      Array.from(this.querySelectorAll('slot')).forEach(slot => {
        slot.assignedNodes().forEach(node => {
          if (node.localName != this.localName + '-placeholder') {
            node.__portalPlaceholder = document.createElement(this.localName + '-placeholder');
            node.parentNode.insertBefore(node.__portalPlaceholder, node);
            this.__portalDestinationContainer.appendChild(node);
          }
        });
      });
    }

    this.parentNode.insertBefore(this.__portalOrigin, this);

    if (this._isPortalScoped()) {
      this.__portalDestinationContainer.shadowRoot.appendChild(this);
    } else {
      this.__portalDestinationContainer.appendChild(this);
    }

    if (!this.__portalDestinationContainer.parentNode) {
      document.body.appendChild(this.__portalDestinationContainer);
    }
  }

  _disablePortal() {
    if (this.__isPortalOrigin || !this.__portalOrigin) return;

    if (this._isPortalScoped()) {
      Array.from(this.__portalDestinationContainer.childNodes).forEach(node => {
        if (node != this) {
          if (node.__portalPlaceholder) {
            node.__portalPlaceholder.parentNode.insertBefore(node, node.__portalPlaceholder);
            node.__portalPlaceholder.parentNode.removeChild(node.__portalPlaceholder);
            delete node.__portalPlaceholder;
          }
        }
      });
    }

    if (this.__portalDestinationContainer && this.__portalDestinationContainer != document.body) {
      document.body.removeChild(this.__portalDestinationContainer);
      this.__portalDestinationContainer.innerHTML = '';
      if (this.__portalDestinationContainer.shadowRoot) {
        this.__portalDestinationContainer.shadowRoot.innerHTML = '';
      }
    }

    if (this.__portalOrigin.parentNode) {
      this.__portalOrigin.parentNode.insertBefore(this, this.__portalOrigin);
      this.__portalOrigin.parentNode.removeChild(this.__portalOrigin);
    }
  }
}
