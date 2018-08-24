/* TODO How to style the normal/secondary style button without affecting all the other button styles? */

import LightStyleElement from './light-style-element.js';
import style from './styles/button-style.js';

export class JButton extends LightStyleElement {
  constructor() {
    super(style);
    this.setAttribute('role', 'button');
    this.setAttribute('tabindex', '0');
    this.classList.add('j-button');
  }
}

window.customElements.define('j-button', JButton);
