export class MaturityBadge extends HTMLElement {
  connectedCallback() {
    const name = this.innerHTML.replace(/[\(\)]/g, '');
    this.innerHTML = `
      <a href="/maturity#${name.replace(/ /g, '-').toLowerCase()}">${name}</a>
    `;
  }
}

window.customElements.define('maturity-badge', MaturityBadge);
