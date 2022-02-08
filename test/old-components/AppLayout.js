import {DefineElementMixin} from '../util/DefineElementMixin.js';
import {LightStyleMixin} from '../util/LightStyleMixin.js';
import {css} from '../util/css.js';

export class AppLayout extends LightStyleMixin(DefineElementMixin(HTMLElement)) {
  static get styles() {
    return css`
      :host {
        display: flex;
      }

      /* Fixed background layer (make it independent of the page background color) */
      :host::before {
        content: "";
        position: fixed;
        z-index: -1;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: inherit;
      }
    `;
  }
}

AppLayout.defineElement();
