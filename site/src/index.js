import {renderMarkdown} from './render-markdown.js';

class Page extends HTMLElement {
  get location() {
    return this._location;
  }

  set location(location) {
    const page = location.pathname == '/' ? '/node_modules/j-elements/README.md' : `/node_modules/j-elements/docs${location.pathname}.md`;
    renderMarkdown(page, this);
    this._location = location;
  }
}

window.customElements.define('index-page', Page);
