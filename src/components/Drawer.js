import {DefineElementMixin} from '../util/DefineElementMixin.js';
import {LightStyleMixin} from '../util/LightStyleMixin.js';
import {Portal} from '../util/Portal.js';
import {css} from '../util/css.js';

// The number of pixels you need to drag before the bottom drawer moving
const DRAG_THRESHOLD = 10;

// Media query for triggering touch optimized version (bottom drawer)
const touchOptimizedMedia = '(pointer: coarse) and (max-width: 800px) and (min-height: 500px)';
const touchOptimizedMediaQuery = window.matchMedia(touchOptimizedMedia);

export class Drawer extends LightStyleMixin(Portal(DefineElementMixin(HTMLElement))) {
  static get styles() {
    return css`
      :host {
        display: block;
        max-width: 100vw;
        max-height: 100vh;
        box-sizing: border-box;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: contain;
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        z-index: var(--j-drawer-z-index, 10);
        flex: none;
        background-color: #fff;
      }

      :host(:not([portal-disabled])) {
        position: fixed;
        top: 0;
      }

      :host(:not(.touch-optimized)) {
        height: 100vh;
      }

      :host(.touch-optimized) {
        width: 100%;
      }
    `;
  }

  constructor() {
    super();
    this.__boundIsTouchOptimized = this._isTouchOptimized.bind(this);
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    touchOptimizedMediaQuery.addListener(this.__boundIsTouchOptimized);
    this._isTouchOptimized(touchOptimizedMediaQuery);
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) super.disconnectedCallback();
    touchOptimizedMediaQuery.removeListener(this.__boundIsTouchOptimized);
  }

  _isTouchOptimized(query) {
    this.overlay = query.matches;
    this.classList.toggle('touch-optimized', query.matches);
  }

  set overlay(value) {
    this.portalEnabled = value;
  }

  get overlay() {
    return this.portalEnabled;
  }
}

Drawer.asCustomElement();
