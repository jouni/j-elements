import {renderMarkdown} from './render-markdown.js';

class Page extends HTMLElement {
  get route() {
    return this._route;
  }

  set route(route) {
    const page = route.pathname == '/' ? '/node_modules/j-elements/README.md' : `/node_modules/j-elements/docs${route.pathname}.md`;
    renderMarkdown(page, this);
    this._route = route;
  }
}

window.customElements.define('index-page', Page);
