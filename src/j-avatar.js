import {StylableMixin} from './stylable-mixin.js';
import bemToShadow from './bem-to-shadow.js';
import style from './styles/avatar-style.js';
import './j-icon.js';
import './j-tooltip.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      --viewbox: 0 0 24 24;
      --svg: <path d="M12 12c-1.656854 0-3-1.343146-3-3s1.343146-3 3-3 3 1.343146 3 3-1.343146 3-3 3zm-7 7c0-2.761424 3.134007-5 7-5s7 2.238576 7 5H5z">;
    }

    svg {
      font: inherit;
      fill: currentColor;
      width: 100%;
      height: 100%;
    }

    [part="icon"] {
      width: 100%;
      height: 100%;
      padding: 0.0625em;
      box-sizing: border-box;
      --viewbox: inherit;
      --svg: inherit;
    }
  </style>
  ${ bemToShadow(style, '.j-avatar') }
  <j-icon part="icon"></j-icon>
  <svg part="abbr" viewBox="-50 -50 100 100" preserveAspectRatio="xMidYMid meet">
    <text dy=".31em" text-anchor="middle"></text>
  </svg>
  <div part="image"></div>
`;

export class JAvatar extends StylableMixin(HTMLElement) {
  static get observedAttributes() {
    return ['name', 'abbr', 'image'];
  }

  constructor() {
    super();
    this._upgradeProperty('name');
    this._upgradeProperty('abbr');
    this._upgradeProperty('image');
  }

  connectedCallback() {
    this.__attachShadow();
    if (super.connectedCallback) super.connectedCallback();
  }

  __attachShadow() {
    if (!this.shadowRoot) {
      if (typeof ShadyCSS != 'undefined' && !ShadyCSS.nativeShadow) {
        ShadyCSS.prepareTemplate(template, this.nodeName.toLowerCase());
        ShadyCSS.styleElement(this);
      }
      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.__attachShadow();
    const hasValue = newValue !== null;
    switch (name) {
      case 'name':
        if (hasValue && !this.hasAttribute('no-tooltip')) {
          if (!this._tooltip) {
            this._tooltip = document.createElement('j-tooltip');
            this.shadowRoot.appendChild(this._tooltip);
          }
          this._tooltip.innerHTML = newValue;
          if (!this.hasAttribute('abbr')) {
            this.shadowRoot.querySelector('[part=abbr] text').innerHTML = newValue.match(/\b\S/g).join('');
          }
        } else {
          if (this._tooltip) {
            this.shadowRoot.removeChild(this._tooltip);
          }
          if (!this.hasAttribute('abbr')) {
            this.shadowRoot.querySelector('[part=abbr] text').innerHTML = '';
          }
        }
        break;
      case 'abbr':
        if (hasValue) {
          this.shadowRoot.querySelector('[part=abbr] text').innerHTML = newValue;
        } else {
          this.shadowRoot.querySelector('[part=abbr] text').innerHTML = '';
        }
        break;
      case 'image': {
        if (hasValue) {
          this.shadowRoot.querySelector('[part=image]').style.backgroundImage = `url(${newValue})`;
        } else {
          this.shadowRoot.querySelector('[part=image]').style.backgroundImage = '';
        }
        break;
      }
    }
  }

}

window.customElements.define('j-avatar', JAvatar);
