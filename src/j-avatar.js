
import { StylableMixin, bemToShadow } from './stylable-mixin.js';
import { style } from './styles/avatar-style.js';
import './j-tooltip.js';

const template = document.createElement('template');
template.innerHTML = `
  <div part="abbr"></div>
  <div part="image"></div>
`;

// TODO need a nicer way to inject the styles
template.innerHTML += bemToShadow(style, '.avatar');

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
      if (ShadyCSS && !ShadyCSS.nativeShadow) {
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
        if (hasValue) {
          if (!this._tooltip) {
            this._tooltip = document.createElement('j-tooltip');
            this.shadowRoot.appendChild(this._tooltip);
          }
          this._tooltip.innerHTML = newValue;
          if (!this.hasAttribute('abbr')) {
            this.shadowRoot.querySelector('[part=abbr]').innerHTML = newValue.match(/\b\S/g).join('');
          }
        } else {
          if (this._tooltip) {
            this.shadowRoot.removeChild(this._tooltip);
          }
          if (!this.hasAttribute('abbr')) {
            this.shadowRoot.querySelector('[part=abbr]').innerHTML = '';
          }
        }
        break;
      case 'abbr':
        if (hasValue) {
          this.shadowRoot.querySelector('[part=abbr]').innerHTML = newValue;
        } else {
          this.shadowRoot.querySelector('[part=abbr]').innerHTML = '';
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


















// <dom-module id="j-avatar-group">
//   <template>
//     <style>
//       :host {
//         display: inline-flex;
//         padding: 2px;
//         align-items: center;
//       }
//
//       :host ::slotted(j-avatar[theme~="x-small"]:not(:last-child)) {
//         margin-right: calc(var(--lumo-size-xs) * -0.25);
//       }
//
//       :host ::slotted(j-avatar[theme~="small"]:not(:last-child)) {
//         margin-right: calc(var(--lumo-size-s) * -0.25);
//       }
//
//       :host ::slotted(j-avatar:not(:last-child)) {
//         margin-right: calc(var(--lumo-size-m) * -0.25);
//       }
//
//       :host ::slotted(j-avatar[theme~="large"]:not(:last-child)) {
//         margin-right: calc(var(--lumo-size-l) * -0.25);
//       }
//
//       :host ::slotted(j-avatar[theme~="x-large"]:not(:last-child)) {
//         margin-right: calc(var(--lumo-size-xl) * -0.25);
//       }
//     </style>
//     <slot></slot>
//   </template>
//   <script>
//     (function() {
//       class AvatarGroupElement extends Vaadin.ThemableMixin(Polymer.Element) {
//         static get is() {
//           return 'j-avatar-group';
//         }
//
//         static get properties() {
//           return {
//           }
//         }
//
//       }
//
//       customElements.define(AvatarGroupElement.is, AvatarGroupElement);
//
//       /**
//        * @namespace Jouni
//        */
//       window.Jouni = window.Jouni || {};
//       Jouni.AvatarGroupElement = AvatarGroupElement;
//     })();
//   </script>
// </dom-module>
