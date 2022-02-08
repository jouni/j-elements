import {DefineElementMixin} from '/src/util/DefineElementMixin.js';
import {Stylable} from '/src/util/Stylable.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: flex;
      flex-direction: column;
      background-color: #fff;
      border: 1px solid rgba(0, 0, 0, 0.1);
      padding: 1em;
      border-radius: 0.25em;
      box-sizing: border-box;
    }

    [part="content"] {
      flex: auto;
    }

    [part="title"] {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  </style>

  <div part="header">
    <slot name="header"></slot>
  </div>

  <div part="title">
    <slot name="title"></slot>
  </div>

  <div part="content">
    <slot></slot>
  </div>

  <div part="footer">
    <slot name="footer"></slot>
  </div>
`;

export class Card extends Stylable(DefineElementMixin(HTMLElement)) {
  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    if (super.connectedCallback) super.connectedCallback();
  }
}

Card.defineElement();
