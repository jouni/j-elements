import StylableMixin from '../util/StylableMixin.js';
import JIcon from './JIcon.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      --j-app-layout-navbar-size: 56px;
      --j-app-layout-drawer-width: 260px;
      --j-app-layout-bottom-drawer-offset: var(--j-app-layout-bottom-drawer-offset-min);
    }

    :host([type=side]) {
      --j-app-layout-navbar-size: 64px;
    }

    :host(:not([type]))::before {
      content: "You need to specify a type for j-app-layout (top or side)";
    }

    :host(:not([type])) * {
      visibility: hidden;
    }

    .app-layout-drawer,
    .drawer,
    .navbar {
      background-color: rgba(245,245,245,1);
      z-index: 1;
    }

    /* Just for fancy :) */
    @supports (backdrop-filter: blur(1px)), (-webkit-backdrop-filter: blur(1px)) {
      .navbar,
      .drawer {
        -webkit-backdrop-filter: blur(30px);
        backdrop-filter: blur(30px);
        background-color: rgba(240,240,240,0.7);
      }
    }

    .navbar {
      position: fixed;
      z-index: 2;
      top: 0;
      left: 0;
      box-sizing: border-box;
      display: flex;
      align-items: center;
    }

    :host([type=top]) .content {
      padding-top: var(--j-app-layout-navbar-size);
    }

    :host([type=side]) .content {
      padding-left: var(--j-app-layout-navbar-size);
    }

    :host([type=top]) .navbar {
      width: 100%;
      height: var(--j-app-layout-navbar-size);
    }

    :host([type=side]) .navbar {
      flex-direction: column;
      width: var(--j-app-layout-navbar-size);
      height: 100%;
    }

    .brand,
    .support {
      display: flex;
      align-items: center;
    }

    :host([type=top]) .brand {
      flex-grow: 0.5;
      flex-basis: 0;
    }

    :host([type=side]) .brand {
      order: -1;
    }

    .navbar ::slotted([slot=menu]) {
      max-width: 100%;
      max-height: 100%;
    }

    .support {
      justify-content: flex-end;
    }

    :host([type=top]) .support {
      flex-grow: 0.5;
      flex-basis: calc(var(--j-app-layout-navbar-size));
    }

    :host([type=side]) .brand,
    :host([type=side]) .support {
      flex-direction: column;
      flex-shrink: 0;
    }

    :host([type=side]) .support {
      margin-top: auto;
    }

    @media (max-width: 800px) {
      :host([type=top].has-menu) .brand {
        display: none;
      }
    }

    .content {
      box-sizing: border-box;
      min-height: 50vh;
    }

    /* Drawer styles */

    .drawer-toggle {
      width: var(--j-app-layout-navbar-size);
      height: var(--j-app-layout-navbar-size);
      flex: none;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      -webkit-tap-highlight-color: transparent;
    }

    .drawer-toggle j-icon {
      --viewbox: 0 0 24 24;
      --svg: <path d="M4 7c0-.552285.44463-1 1.000872-1h13.998256C19.551895 6 20 6.443865 20 7c0 .552285-.44463 1-1.000872 1H5.000872C4.448105 8 4 7.556135 4 7zm0 5c0-.552285.44463-1 1.000872-1h13.998256C19.551895 11 20 11.443865 20 12c0 .552285-.44463 1-1.000872 1H5.000872C4.448105 13 4 12.556135 4 12zm0 5c0-.552285.44463-1 1.000872-1h13.998256C19.551895 16 20 16.443865 20 17c0 .552285-.44463 1-1.000872 1H5.000872C4.448105 18 4 17.556135 4 17z"/>;
    }

    .drawer {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      width: var(--j-app-layout-drawer-width);
      max-width: 100%;
      box-sizing: border-box;
      transform: translateX(-100%);
      transition: transform 160ms;
      overflow: auto;
    }

    .drawer,
    .navbar,
    .content {
      padding-left: constant(safe-area-inset-left);
      padding-left: env(safe-area-inset-left);
    }

    :host([type=top]) .drawer {
      top: var(--j-app-layout-navbar-size);
    }

    :host([type=side]) .drawer {
      left: var(--j-app-layout-navbar-size);
      max-width: calc(100% - var(--j-app-layout-navbar-size));
    }

    :host(.drawer-visible) .drawer {
      transform: translateX(0%);
    }

    @media (min-width: 1000px) {
      .drawer {
        background: transparent;
      }

      :host([type=top].drawer-visible) .content {
        padding-left: var(--j-app-layout-drawer-width);
      }

      :host([type=top].drawer-visible) .brand {
        flex-basis: var(--j-app-layout-drawer-width);
      }

      :host([type=side].drawer-visible) .content {
        padding-left: calc(var(--j-app-layout-navbar-size) + var(--j-app-layout-drawer-width));
      }
    }

    .drawer-backdrop {
      display: none;
    }

    :host(:not(.has-drawer)) .drawer,
    :host(:not(.has-drawer)) .drawer-toggle {
      display: none;
    }

    @media (max-width: 1000px) {
      .drawer-backdrop {
        display: block;
        content: "";
        position: fixed;
        z-index: 3;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: #000;
        opacity: 0;
        transition: opacity 160ms 40ms;
        pointer-events: none;
      }

      :host([type]) .drawer {
        top: 0;
        z-index: 3;
      }

      :host([type=side]) .drawer {
        left: 0;
      }

      :host(.drawer-visible) .drawer-backdrop {
        opacity: 0.2;
        pointer-events: auto;
      }
    }

    /* Small touch devices */
    @media (pointer: coarse) and (max-width: 750px) {
      :host([type]) {
        --j-app-layout-navbar-size: 56px;
      }

      :host([type]) .content {
        padding: 0;
        padding-bottom: var(--j-app-layout-bottom-drawer-offset-min);
      }

      .drawer-backdrop {
        display: none;
      }

      .app-layout-drawer {
        position: fixed;
        top: 100%;
        left: 0;
        width: 100%;
        height: auto;
        max-height: calc(100% - 20px);
        max-height: calc(100% - 20px - constant(safe-area-inset-bottom));
        max-height: calc(100% - 20px - env(safe-area-inset-bottom));
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transform: translateY(calc(var(--j-app-layout-bottom-drawer-offset) * -1));
        box-shadow: inset 0 1px 0 0 rgba(0,0,0,0.04);
      }

      .app-layout-drawer:not(.no-anim) {
        transition: transform 170ms cubic-bezier(0.38, 0.85, 0.81, 1.11);
      }

      @supports (backdrop-filter: blur(1px)), (-webkit-backdrop-filter: blur(1px)) {
        .app-layout-drawer {
          -webkit-backdrop-filter: blur(30px);
          backdrop-filter: blur(30px);
          background-color: rgba(240,240,240,0.7);
        }
      }

      :host(:not(.has-menu)) .drawer-toggle {
        order: -1;
      }

      :host([type]) .navbar,
      .drawer {
        position: static;
        background: transparent;
        color: inherit;
        width: 100%;
        height: auto;
        -webkit-backdrop-filter: none;
        backdrop-filter: none;
      }

      :host([type]) .navbar {
        flex: none;
        flex-direction: row;
        align-items: center;
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
      }

      :host(.has-menu) .navbar {
        flex-direction: column;
        align-items: stretch;
      }

      :host([type]) .menu {
        order: -1;
        width: 100%;
      }

      :host([type]) .brand,
      :host([type]) .support {
        flex-direction: row;
        flex-grow: 0.5;
        flex-basis: auto;
      }

      :host([type]) .support {
        margin: 0;
      }

      .navbar ::slotted([slot=menu]) {
        flex: none;
      }

      :host(.has-menu) .drawer-toggle {
        display: none;
      }

      :host([type]) .drawer {
        display: block;
        transform: none;
        max-width: none;
        overflow: hidden;
        padding-top: 0;
      }

      :host([type]) .app-layout-drawer.full .drawer {
        overflow: auto;
        -webkit-overflow-scrolling: touch;
      }

      :host(.input-focused) .content {
        padding-bottom: 0;
      }

      :host(.input-focused) .app-layout-drawer {
        display: none;
      }
    }
  </style>

  <div class="drawer-backdrop"></div>

  <div class="app-layout-drawer">
    <div class="navbar">
      <div class="drawer-toggle">
        <j-icon></j-icon>
      </div>

      <div class="brand">
        <slot name="brand"></slot>
      </div>

      <slot name="menu"></slot>

      <div class="support">
        <slot name="support"></slot>
      </div>
    </div>

    <div class="drawer">
      <slot name="drawer"></div>
    </div>
  </div>

  <div class="content">
    <slot></slot>
  </div>
`;

const DRAG_THRESHOLD = 10;

export class JAppLayout extends StylableMixin(HTMLElement) {
  connectedCallback() {
    if (!this.__jAppLayoutTemplateStamped) {
      this.__jAppLayoutTemplateStamped = true;

      if (typeof ShadyCSS != 'undefined' && !ShadyCSS.nativeShadow) {
        ShadyCSS.prepareTemplate(template, 'j-app-layout');
        ShadyCSS.styleElement(this);
      }

      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.$ = {};
      this.$.navbar = this.shadowRoot.querySelector('.navbar');
      this.$.support = this.shadowRoot.querySelector('.support');
      this.$.drawer = this.shadowRoot.querySelector('.drawer');
      this.$.drawerToggle = this.shadowRoot.querySelector('.drawer-toggle');
      this.$.drawerBackdrop = this.shadowRoot.querySelector('.drawer-backdrop');
      this.$.content = this.shadowRoot.querySelector('.content');
      this.$.bottomDrawer = this.shadowRoot.querySelector('.app-layout-drawer');

      this.$.drawerToggle.addEventListener('click', e => {
        this.classList.toggle('drawer-visible');
        if (this._getDrawerOffset() == this._minOffset) {
          this._setDrawerOffset(this._maxOffset / 2);
        } else {
          this._setDrawerOffset(this._minOffset);
        }
      });

      this.$.drawerBackdrop.addEventListener('click', e => {
        this.classList.remove('drawer-visible');
      });

      this.$.content.addEventListener('touchstart', this._touchStart.bind(this));
      this.$.bottomDrawer.addEventListener('touchstart', this._touchStart.bind(this));
      this.$.bottomDrawer.addEventListener('touchmove', this._touchMove.bind(this));
      this.$.bottomDrawer.addEventListener('touchend', this._touchEnd.bind(this));

      this.addEventListener('focusin', this._focusIn.bind(this));
      this.addEventListener('focusout', this._focusOut.bind(this));
    }

    // Get a reference to the slotted menu element
    this.$.menu = this.querySelector('[slot=menu]');
    this.classList.toggle('has-menu', this.$.menu);

    // Wait for any elements inside the menu to upgrade and be styled before measuring
    requestAnimationFrame(() => {
      this._minOffset = this.$.menu ? this.$.menu.offsetHeight : Math.max(this.$.navbar.offsetHeight, 20);
      this.style.setProperty('--j-app-layout-bottom-drawer-offset-min', this._minOffset + 'px');
      this._setDrawerOffset(this._minOffset);
    });

    // If there’s a drawer, show some of that initially
    if (this.querySelector('[slot=drawer]')) {
      this.classList.add('has-drawer');

      // Open the drawer on wide screens by default
      if (window.innerWidth >= 1000) {
        this.classList.add('drawer-visible');
      }
      // Wait for any elements inside the drawer to upgrade and be styled before measuring
      requestAnimationFrame(() => {
        this._setDrawerOffset(this.$.bottomDrawer.offsetHeight / 2);
      });
    } else {
      this.classList.remove('has-drawer');
      this.classList.remove('drawer-visible');
    }

    super.connectedCallback();
  }

  _setDrawerOffset(offset) {
    if (typeof offset == 'number') {
      offset = offset + 'px';
    }
    this.style.setProperty('--j-app-layout-bottom-drawer-offset', offset);
  }

  _getDrawerOffset() {
    const offset = window.getComputedStyle(this).getPropertyValue('--j-app-layout-bottom-drawer-offset');
    if (offset.indexOf('%') > -1) {
      return parseInt(offset) * this.$.bottomDrawer.offsetHeight / 100;
    }
    return parseInt(offset);
  }

  _contains(e, container) {
    if (e.path) {
      return e.path.indexOf(container) > -1;
    }

    let inside = container.contains(e.target);
    if (!inside) {
      inside = Array.from(container.querySelectorAll('slot[name]')).find(slot => {
        return slot.assignedNodes({flatten: true}).find(slotted => {
          return slotted.contains(e.target);
        });
      });
    }

    return inside;
  }

  _touchStart(e) {
    if (this._contains(e, this.$.bottomDrawer)) {
      if (this.__startTouch) {
        const touch = Array.from(e.touches).find(t => {
          return this.__startTouch.identifier == t.identifier;
        });
        if (!touch) {
          delete this.__startTouch;
        }
      } else {
        this.__startTouch = e.targetTouches[0];
        this.__touchQueue = [this.__startTouch];
        this.__startOffset = this._getDrawerOffset();
        this.__offset = this.__startOffset;
        this._maxOffset = this.$.bottomDrawer.offsetHeight;
        this.$.bottomDrawer.classList.add('no-anim');
        this.__potentiallyScrollDrawer = this.$.bottomDrawer.classList.contains('full') && this._contains(e, this.$.drawer);
        this.__startDrawerScrollTop = this.$.drawer.scrollTop;
      }
    } else {
      this.$.bottomDrawer.classList.remove('no-anim');
      this.$.drawer.classList.remove('scroll');
      this._setDrawerOffset(this._minOffset);
    }
  }

  _touchMove(e) {
    if (this.__startTouch) {
      // Only process the same touch point as started the touch
      const touch = Array.from(e.targetTouches).find(t => {
        return this.__startTouch.identifier == t.identifier;
      });

      if (touch) {
        let dy = this.__startTouch.clientY - touch.clientY;

        let scrollDrawer = false;
        if (this.__potentiallyScrollDrawer) {
          scrollDrawer = true;
          if ((dy < 0 && this.$.drawer.scrollTop == 0)
              || (dy > 0 && this.$.drawer.scrollTop == this.$.drawer.scrollHeight - this.$.drawer.offsetHeight)) {
            scrollDrawer = false;
          } else if (this.$.drawer.scrollTop < 0) {
            scrollDrawer = false;
            this.$.drawer.scrollTop = 0;
          }
        }

        if (!scrollDrawer) {
          if (this.$.drawer.scrollTop > 0) {
            this.$.drawer.scrollTop = this.__startDrawerScrollTop + dy;
          } else {
            if (Math.abs(dy) > DRAG_THRESHOLD) {
              dy -= dy < 0 ? -DRAG_THRESHOLD : DRAG_THRESHOLD;

              const newOffset = this.__startOffset + this.__startDrawerScrollTop + dy;
              if (newOffset > this._minOffset && newOffset < this._maxOffset) {
                this.__offset = newOffset;
                this._setDrawerOffset(this.__offset);
              }
            }
          }

          this.__touchQueue.push(touch);

          e.preventDefault();
        }
      }
    }
  }

  _touchEnd(e) {
    // No active drawer drag going on
    if (!this.__startTouch) return;

    if (e.changedTouches[0].identifier == this.__startTouch.identifier) {
      this.$.bottomDrawer.classList.remove('no-anim');

      let dy = 0;
      if (this.__touchQueue.length >= 2) {
        dy = this.__touchQueue[this.__touchQueue.length - 2].clientY - e.changedTouches[0].clientY;
      }

      delete this.__startTouch;
      delete this.__touchQueue;

      const full = this._maxOffset;
      const half = full / 2;

      if (dy >= 0 && this.__offset > this._minOffset + DRAG_THRESHOLD) {
        // Swipe up and above the threshold
        if (this.__offset < half + DRAG_THRESHOLD * 2) {
          this.__offset = Math.max(half, this._minOffset);
        } else if (this.__offset <= full && this.__offset > half + DRAG_THRESHOLD * 2) {
          this.__offset = full;
        }

        // Quick swipe up
        if (dy >= 60) {
          this.__offset = full;
        }
      } else {
        if (this.__offset < half - DRAG_THRESHOLD * 2) {
          this.__offset = this._minOffset;
        } else {
          this.__offset = Math.max(half, this._minOffset);
        }

        // Quick swipe down
        if (dy <= -60) {
          this.__offset = this._minOffset;
        }
      }

      this.$.bottomDrawer.classList.toggle('full', this.__offset == full);
      this._setDrawerOffset(this.__offset);
      delete this.__offset;

      if (Math.abs(dy) > DRAG_THRESHOLD) {
        e.preventDefault();
      }
    }
  }

  _focusIn(e) {
    // If the focused element is inside the bottom drawer, don't hide it
    if (this._contains(e, this.$.bottomDrawer)) {
      return;
    }

    // TODO check if it's an input that forces a keyboard
    // switch (e.target.nodeName) {
    //   case expression:
    //
    //     break;
    //   default:
    //
    // }
    this.classList.add('input-focused');
  }

  _focusOut(e) {
    this.classList.remove('input-focused');
  }

  closeDrawer() {
    if (window.innerWidth < 1000) {
      this.classList.remove('drawer-visible');
    }
    this._setDrawerOffset(this._minOffset);
  }
}

window.customElements.define('j-app-layout', JAppLayout);
