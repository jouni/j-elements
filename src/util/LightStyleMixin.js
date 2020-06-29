export const LightStyleMixin = superClass => class LightStyle extends superClass {
  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();

    const name = this.localName;
    let root = this.getRootNode();
    this.__rootNode = root;
    const ctr = this.constructor;

    if (ctr.styles && !root.querySelector('style.' + name)) {
      if (!ctr.__styleSheet) {
        ctr.__styleSheet = document.createElement('style');
        ctr.__styleSheet.innerHTML = ctr.__shadowToLight(name);
        ctr.__styleSheet.classList.add(name);
      }

      if (root == document) {
        root = document.head;
      }
      // The stylesheet is considered the lowest priority default styles for the component
      let existingStyleSheet = root.querySelector('link[rel="stylesheet"], style');
      if (existingStyleSheet) {
        while (existingStyleSheet.parentNode != root) {
          existingStyleSheet = existingStyleSheet.parentNode;
        }
        root.insertBefore(ctr.__styleSheet.cloneNode(true), existingStyleSheet);
      } else {
        root.appendChild(ctr.__styleSheet.cloneNode(true));
      }
    }
  }

  disconnectedCallback() {
    const name = this.localName;
    let root = this.__rootNode;
    const ctr = this.constructor;

    if (root == document) {
      root = document.head;
    }

    // Are there no other instances of this component in this scope?
    if (!this.__rootNode.querySelector(name) && root.querySelector('style.' + name)) {
      root.removeChild(root.querySelector('style.' + name));
    }

    delete this.__rootNode;

    if (super.disconnectedCallback) super.disconnectedCallback();
  }

  static __shadowToLight(name) {
    let styles = this.styles;

    styles = styles.replace(/:host\((.*)\)/gm, `${name}$1`);
    styles = styles.replace(/:host/gm, name);

    return styles;
  }
}
