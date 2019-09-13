const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      font-size: 2em;
    }

    [part="lorem"] {
      color: blue;
    }
  </style>
  <p>Foo bar</p>
  <p part="lorem">Lorem</p>
`;

export class Foobar extends HTMLElement {
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }
}

export default Foobar;
window.customElements.define('foo-bar', Foobar)
