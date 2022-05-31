import bemToShadow from './bemToShadow.js';

export const Portal = superClass => class extends superClass  {
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
    if (!this.__portalOrigin) {
      this.__portalOrigin = document.createElement(this.localName);
      this.__portalOrigin.__isPortalOrigin = true;
      this.__portalOrigin.setAttribute('portal-origin', '');
      this.__portalOrigin.setAttribute('portal-enabled', '');
      this.__portalOrigin.style.display = 'none';
    }
  }

  _isPortalScoped(lightScoped) {
    const shadowScoped = this.getRootNode() != document;
    if ((lightScoped || shadowScoped) && !this.__portalDestinationContainer) {
      this.__portalDestinationContainer = document.createElement(this.localName + '-scope');
      this.__portalDestinationContainer.style.display = 'block';
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
      Array.from(this._getScope().querySelectorAll('style')).forEach(style => {
        const clone = style.cloneNode(true);
        // TODO this is an ugly fix for a workaround in Dialog, that depends on a weird :host(-scope) selector
        clone.innerHTML = bemToShadow(clone.innerHTML, this.__portalDestinationContainer.localName);
        clone.innerHTML = clone.innerHTML.replace(':host', ':host-nomatch');
        this.__portalDestinationContainer.shadowRoot.appendChild(clone);
      });

      // TODO: this only works one shadow level upwards. If some of the assigned nodes is a <slot> element, the assigned nodes of that would not be picked up
      // TODO should introduce yet another shadow root level if there are slotted elements, if the slotted elements are not on the document level
      Array.from(this.querySelectorAll('slot')).forEach(slot => {
        // if (slot.assignedNodes().length > 0) {
        //   var assignedNodeRoot = slot.assignedNodes()[0].getRootNode();
        //   // TODO: should also handle adoptedStyleSheets
        //   Array.from(assignedNodeRoot.querySelectorAll('style')).forEach(style => {
        //     const clone = style.cloneNode(true);
        //     clone.innerHTML = bemToShadow(clone.innerHTML, this.__portalDestinationContainer.localName);
        //     this.__portalDestinationContainer.shadowRoot.appendChild(clone);
        //   });
        // }

        slot.assignedNodes().forEach(node => {
          if (node.localName != this.localName + '-placeholder') {
            node.__portalContentPlaceholder = document.createElement(this.localName + '-placeholder');
            node.parentNode.insertBefore(node.__portalContentPlaceholder, node);
            // this.__portalDestinationContainer.appendChild(node);
            slot.parentNode.insertBefore(node, slot);
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
      Array.from(this.querySelectorAll('slot')).forEach(slot => {
        Array.from(slot.parentNode.childNodes).forEach(node => {
          if (node != this) {
            if (node.__portalContentPlaceholder) {
              node.__portalContentPlaceholder.parentNode.insertBefore(node, node.__portalContentPlaceholder);
              node.__portalContentPlaceholder.parentNode.removeChild(node.__portalContentPlaceholder);
              delete node.__portalContentPlaceholder;
            }
          }
        });
      });

      // Array.from(this.__portalDestinationContainer.childNodes).forEach(node => {
      //   if (node != this) {
      //     if (node.__portalContentPlaceholder) {
      //       node.__portalContentPlaceholder.parentNode.insertBefore(node, node.__portalContentPlaceholder);
      //       node.__portalContentPlaceholder.parentNode.removeChild(node.__portalContentPlaceholder);
      //       delete node.__portalContentPlaceholder;
      //     }
      //   }
      // });
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

  _getScope() {
    return this.getRootNode();
  }
}
