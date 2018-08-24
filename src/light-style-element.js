let count = 0;

export default class LightStyleElement extends HTMLElement {
  constructor(style) {
    super();

    if (style && typeof style == 'string') {
      // TODO Improve detection
      if (style.indexOf('{') === -1) {
        // Generate a classname
        const className = `__lse__${count++}`;
        this.classList.add(className);
        style = `.${className} { ${style} }`;
      }

      if (style.indexOf('<style>') === -1) {
        style = `<style>${style}</style>`;
      }
    }

    this._style = style;
  }

  connectedCallback() {
    if (this._style) {
      if (!this.getRootNode().__lse_styles) {
        this.getRootNode().__lse_styles = {};
      }

      if (!this.getRootNode().__lse_styles[this.nodeName]) {
        this.getRootNode().__lse_styles[this.nodeName] = true;

        let styleSheet;
        if (typeof this._style == 'string') {
          const temp = document.createElement('div');
          temp.innerHTML = this._style;
          styleSheet = temp.firstElementChild;
        } else if (this._style.nodeName == 'STYLE') {
          styleSheet = this._style;
        }

        if (styleSheet) {
          if (this.getRootNode() == document) {
            document.body.appendChild(styleSheet);
          } else {
            this.getRootNode().appendChild(styleSheet);
          }
        }
      }
    }
  }
}
