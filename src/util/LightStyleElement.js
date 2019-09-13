export default class LightStyleElement extends HTMLElement {
  constructor(style) {
    super();

    if (style && typeof style == 'string') {
      // TODO Improve detection
      if (style.indexOf('{') === -1) {
        style = `${this.nodeName.toLowerCase()} { ${style} }`;
      }

      if (style.indexOf('<style>') === -1) {
        style = `<style>${style}</style>`;
      }
    }

    this._style = style;
  }

  connectedCallback() {
    if (this._style) {
      const root = this.getRootNode();

      if (!root.__lse_styles) {
        root.__lse_styles = {};
      }

      if (!root.__lse_styles[this.nodeName]) {
        root.__lse_styles[this.nodeName] = true;

        let styleSheet;
        if (typeof this._style == 'string') {
          const temp = document.createElement('div');
          temp.innerHTML = this._style;
          styleSheet = temp.firstElementChild;
        } else if (this._style.nodeName == 'STYLE') {
          styleSheet = this._style;
        }

        if (styleSheet) {
          if (root == document) {
            document.body.appendChild(styleSheet);
          } else {
            root.appendChild(styleSheet);
          }
        }
      }
    }
  }

  // TODO should remove the <style> element when the last instance is disconnected
}
