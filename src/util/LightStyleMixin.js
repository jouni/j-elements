export const LightStyleMixin = superClass => class LightStyle extends superClass {
  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();

    const name = this.nodeName.toLowerCase();
    let root = this.getRootNode();
    const ctr = this.constructor;

    if (ctr.styles && !root.querySelector('style.' + name)) {
      if (!ctr.__styleSheet) {
        ctr.__styleSheet = document.createElement('style');
        ctr.__styleSheet.innerHTML = ctr.__shadowToLight(name);
        ctr.__styleSheet.classList.add(name);
      }

      if (ctr.__styleSheet) {
        if (root == document) {
          root = document.head;
        }
        // The stylesheet is considered the lowest priority default styles for the component
        const existingStyleSheet = root.querySelector('link[rel="stylesheet"], style');
        if (existingStyleSheet) {
          root.insertBefore(ctr.__styleSheet, existingStyleSheet);
        } else {
          root.appendChild(ctr.__styleSheet);
        }
      }
    }
  }

  // disconnectedCallback() {
  //   if (this._style) {
  //     const name = this.nodeName.toLowerCase();
  //
  //     var root = this.__rootNode;
  //     if (root == document) {
  //       root = document.head;
  //     }
  //
  //     // Are there no other instances of this component in this scope?
  //     if (this.__rootNode && !this.__rootNode.querySelector(name) && root.querySelector('.' + name)) {
  //       root.removeChild(root.querySelector('.' + name));
  //       delete this.__rootNode;
  //     }
  //   }
  //   if (super.disconnectedCallback) super.disconnectedCallback();
  // }

  static __shadowToLight(name) {
    let styles = this.styles;

    styles = styles.replace(/:host\((.*)\)/gm, `${name}$1`);
    styles = styles.replace(/:host/gm, name);

    return styles;
  }
}
