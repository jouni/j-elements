import StylableMixin from '../util/StylableMixin.js';
import bemToShadow from '../util/bemToShadow.js';
import style from '../styles/card-style.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    [part="title"] ::slotted(*) {
      font: inherit !important;
      color: inherit !important;
      letter-spacing: inherit !important;
      text-transform: inherit !important;
      margin: 0 !important;
      padding: 0 !important;
    }
  </style>
  ${ bemToShadow(style, '.j-card') }

  <div part="header">
    <slot name="header"></slot>
  </div>

  <div part="title">
    <slot name="title"></slot>
    <slot name="title-suffix"></slot>
  </div>

  <div part="content">
    <slot></slot>
  </div>

  <div part="footer">
    <slot name="footer"></slot>
  </div>
`;

export class JCard extends StylableMixin(HTMLElement) {
  constructor() {
    super();
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
}

window.customElements.define('j-card', JCard);

























// <dom-module id="j-card">
//   <script>
//     (function() {
//       class CardElement extends Vaadin.ThemableMixin(Polymer.Element) {
//         static get is() {
//           return 'j-card';
//         }
//
//         static get properties() {
//           return {
//             /* The main image for the card */
//             image: {
//               type: String,
//               value: null
//             },
//
//             /* The aspect ratio for the card image - e.g. 16:9 aspect is computed as `9/16` */
//             imageAspect: {
//               type: Number,
//               value: 0.5625 // 16:9
//             }
//           }
//         }
//
//         ready() {
//           super.ready();
//
//           this.shadowRoot.querySelector('slot[name="header"]').addEventListener('slotchange', this._onSlotChange.bind(this));
//           this.shadowRoot.querySelector('slot[name="footer"]').addEventListener('slotchange', this._onSlotChange.bind(this));
//           this.shadowRoot.querySelector('slot[name="title"]').addEventListener('slotchange', this._onSlotChange.bind(this));
//
//           this._updatePartVisibility('header');
//           this._updatePartVisibility('footer');
//           this._updatePartVisibility('title');
//         }
//
//         _updatePartVisibility(slot) {
//           const slotHasContent = this.shadowRoot.querySelector(`slot[name="${slot}"]`).assignedNodes().length > 0;
//
//           let part;
//           switch(slot) {
//             case 'header':
//             case 'footer':
//               part = this.shadowRoot.querySelector(`[part="${slot}"]`);
//               break;
//             case 'title':
//               part = this.shadowRoot.querySelector('.j-card-title');
//           }
//
//           if (slotHasContent) {
//             part.removeAttribute('hidden')
//           } else {
//             part.setAttribute('hidden', '');
//           }
//         }
//
//         _onSlotChange(e) {
//           this._updatePartVisibility('header');
//           this._updatePartVisibility('footer');
//           this._updatePartVisibility('title');
//         }
//       }
//
//       customElements.define(CardElement.is, CardElement);
//
//       /**
//        * @namespace Jouni
//        */
//       window.Jouni = window.Jouni || {};
//       Jouni.CardElement = CardElement;
//     })();
//   </script>
// </dom-module>
