class Page extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <h1>Index</h1>
    `;
  }
}

window.customElements.define('index-page', Page);
