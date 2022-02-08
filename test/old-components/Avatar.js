import {DefineElementMixin} from '../util/DefineElementMixin.js';
import {Stylable} from '../util/Stylable.js';
import './Icon.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      --viewbox: 0 0 24 24;
      --svg: <path d="M12 12c-1.656854 0-3-1.343146-3-3s1.343146-3 3-3 3 1.343146 3 3-1.343146 3-3 3zm-7 7c0-2.761424 3.134007-5 7-5s7 2.238576 7 5H5z">;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
      flex: none;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      overflow: hidden;
      background-color: rgba(0, 0, 0, 0.4);
      color: #fff;
      font-weight: 500;
      cursor: default;
    }

    :host([hidden]) {
      display: none !important;
    }

    :host([image]) {
      background: transparent;
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
      padding: 12.5%;
      box-sizing: border-box;
      --viewbox: inherit;
      --svg: inherit;
    }

    [part="abbr"] {
      text-transform: uppercase;
      line-height: 1;
      font-size: 3em;
    }

    [part="image"] {
      width: 100%;
      height: 100%;
      border-radius: inherit;
      background-size: cover;
    }

    :host(:not([image])) [part="image"],
    :host([image]) [part="abbr"],
    :host([image]) [part="icon"],
    :host([name]) [part="icon"],
    :host(:not([name])) [part="abbr"] {
      display: none;
    }
  </style>
  <j-icon part="icon"></j-icon>
  <svg part="abbr" viewBox="-50 -50 100 100" preserveAspectRatio="xMidYMid meet">
    <text dy=".31em" text-anchor="middle"></text>
  </svg>
  <div part="image"></div>
`;

export class Avatar extends Stylable(DefineElementMixin(HTMLElement)) {
  static get observedAttributes() {
    return ['name', 'abbr', 'image'];
  }

  constructor() {
    super();
    this._upgradeProperty('name');
    this._upgradeProperty('abbr');
    this._upgradeProperty('image');
  }

  _upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  connectedCallback() {
    this.__attachShadow();
    if (super.connectedCallback) super.connectedCallback();
  }

  __attachShadow() {
    if (!this.shadowRoot) {
      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.__attachShadow();
    const hasValue = newValue !== null;
    switch (name) {
      case 'name':
        if (hasValue) {
          if (!this.hasAttribute('abbr') && newValue.length > 0) {
            this.shadowRoot.querySelector('[part=abbr] text').innerHTML = newValue.match(/\b\S/g).join('');
          }
        } else {
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

Avatar.defineElement();
