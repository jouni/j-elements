import {LightStyleElement} from 'j-elements';

export class MaturityBadge extends LightStyleElement {
  connectedCallback() {
    const temp = this.innerHTML;
    this.innerHTML = `
      <a href="/maturity">${temp.replace(/[\(\)]/g, '')}</a>
    `;
  }
}

window.customElements.define('maturity-badge', MaturityBadge);
