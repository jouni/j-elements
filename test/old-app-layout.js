import Stylable from '../util/Stylable.js';
import Icon from './Icon.js';

const touchOptimizedMediaQuery = '(pointer: coarse) and (max-width: 800px) and (min-height: 500px)';
const pointerOptimizedMediaQuery = '(pointer: fine)';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
    }

    :host(:not([type]))::before {
      content: "You need to specify a type for j-app-layout (top or side)";
    }

    :host(:not([type])) * {
      visibility: hidden;
    }

    .content {
      box-sizing: border-box;
      min-height: 50vh;
      padding-left: constant(safe-area-inset-left);
      padding-left: env(safe-area-inset-left);
      padding-right: constant(safe-area-inset-right);
      padding-right: env(safe-area-inset-right);
    }

    .navbar {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 8px;
      padding-left: calc(8px + constant(safe-area-inset-left));
      padding-left: calc(8px + env(safe-area-inset-left));
      padding-right: calc(8px + constant(safe-area-inset-right));
      padding-right: calc(8px + env(safe-area-inset-right));
    }

    .brand,
    .support {
      display: flex;
      align-items: center;
    }

    .support {
      justify-content: flex-end;
    }

    .drawer-backdrop {
      content: "";
      position: fixed;
      z-index: 2;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: #000;
      opacity: 0;
      transition: opacity 160ms 40ms;
      pointer-events: none;
    }

    @media ${pointerOptimizedMediaQuery} {
      :host {
        --j-app-layout-navbar-size: 56px;
        --j-app-layout-drawer-width: 260px;
      }

      :host([type=side]) {
        --j-app-layout-navbar-size: 64px;
      }

      .drawer,
      .navbar {
        background-color: var(--surface);
        z-index: 1;
      }

      @supports (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)) {
        .navbar,
        .drawer {
          -webkit-backdrop-filter: blur(30px);
          backdrop-filter: blur(30px);
          background-color: hsla(var(--surface-hsl), 0.8);
        }
      }

      .navbar {
        position: fixed;
        z-index: 2;
        top: 0;
        left: 0;
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

      :host([type=top]) .brand {
        flex-grow: 0.5;
        flex-basis: 0;
      }

      :host([type=side]) .brand {
        order: -1;
      }

      .navbar .menu {
        max-width: 100%;
        max-height: 100%;
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

      .drawer-toggle {
        width: calc(var(--j-app-layout-navbar-size) - 16px);
        height: calc(var(--j-app-layout-navbar-size) - 16px);
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
        /* transform: translateX(-100%); */
        transition: transform 160ms;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
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

      .drawer-visible .drawer {
        transform: translateX(0%);
      }

    }

    @media ${pointerOptimizedMediaQuery} and (max-width: 800px) {
      :host([type=top]) .has-menu .brand {
        display: none;
      }
    }

    @media ${pointerOptimizedMediaQuery} and (min-width: 1001px) {
      .drawer {
        background: transparent;
      }

      :host([type=top]) .drawer-visible ~ .content {
        padding-left: calc(var(--j-app-layout-drawer-width) + constant(safe-area-inset-left));
        padding-left: calc(var(--j-app-layout-drawer-width) + env(safe-area-inset-left));
      }

      :host([type=top]) .drawer-visible .brand {
        flex-basis: var(--j-app-layout-drawer-width);
      }

      :host([type=side]) .drawer-visible ~ .content {
        padding-left: calc(var(--j-app-layout-navbar-size) + var(--j-app-layout-drawer-width) + constant(safe-area-inset-left));
        padding-left: calc(var(--j-app-layout-navbar-size) + var(--j-app-layout-drawer-width) + env(safe-area-inset-left));
      }
    }

    @media ${pointerOptimizedMediaQuery} and (max-width: 1000px) {
      :host([type]) .drawer {
        top: 0;
        z-index: 3;
      }

      :host([type=side]) .drawer {
        left: 0;
      }

      .drawer-visible ~ .drawer-backdrop {
        opacity: 0.2;
        pointer-events: auto;
      }
    }

    @media ${touchOptimizedMediaQuery} {
      :host {
        display: block;
        /* --j-app-layout-bottom-drawer-offset: var(--j-app-layout-bottom-drawer-offset-min); */
        --_drawer-offset: 0;
        --j-app-layout-navbar-size: 44px;
      }

      .content {
        padding-bottom: var(--j-app-layout-navbar-size);
      }

      .has-menu ~ .content {
        padding-bottom: calc(var(--j-app-layout-navbar-size) * 2);
      }

      .drawer-backdrop {
        z-index: 1;
        transform: translateY(calc(var(--j-app-layout-bottom-drawer-offset) * -1));
      }

      .menu.has-menu {
        position: fixed;
        z-index: 3;
        left: 0;
        bottom: 0;
        height: var(--j-app-layout-navbar-size);
        width: 100%;
        background: white;
      }

      .navbar,
      .drawer {
        position: fixed;
        z-index: 2;
        bottom: calc(-100vh + var(--j-app-layout-navbar-size));
        left: 0;
        height: var(--j-app-layout-navbar-size);
        box-sizing: border-box;
      }

      .drawer {
        width: 100vw;
        height: 100vh;
        padding-top: var(--j-app-layout-navbar-size);
        /* padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom); */

        box-shadow: 0 0 4px 0 rgba(0,0,0,0.4);
        /* The combination of border-radius, outer box-shadow and backdrop-filter makes iOS Safari render weirdly */
        /* border-radius: 8px 8px 0 0; */
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        background: white;
        transform: translateY(calc((
                     var(--j-app-layout-navbar-size) +
                     (100vh - var(--j-app-layout-navbar-size)) * var(--_drawer-offset)
                   ) * -1));
      }

      /* .drawer.full {
        transform: translateY(calc(var(--j-app-layout-bottom-drawer-offset) * -1));
      } */

      :host(:not(.touch-active)) .drawer {
        transition: transform 250ms cubic-bezier(.215, .61, .355, 1);
      }

      /* .app-layout-drawer:not(.no-anim) ~ .drawer-backdrop {
        transition: all 250ms cubic-bezier(.215, .61, .355, 1);
      } */

      /* @supports (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)) {
        .drawer {
          -webkit-backdrop-filter: blur(30px);
          backdrop-filter: blur(30px);
          background-color: rgba(250,250,250,0.5);
        }
      } */

      /* .navbar {
        flex-wrap: wrap;
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
      } */

      /* .menu {
        width: 100%;
      } */

      /* .brand,
      .support {
        flex-grow: 0.5;
        order: 1;
      } */

      .has-drawer .drawer-toggle {
        width: 100%;
        height: auto;
      }

      .has-drawer .drawer-toggle j-icon {
        display: block;
        margin: 0 auto;
        width: 44px;
        height: 6px;
        border-radius: 3px;
        background-color: #000;
        opacity: 0.2;
      }

      /* .app-layout-drawer:not(.full) ~ .drawer-backdrop {
        opacity: 0;
      } */

      /* :host(.input-focused) .content {
        padding-bottom: 0;
      } */

      /* :host(.input-focused) {
        --j-app-layout-bottom-drawer-offset: 0px !important;
      } */

      /* :host::before {
        content: "";
        position: fixed;
        z-index: 3;
        bottom: calc(-100vh + env(safe-area-inset-bottom));
        left: 0;
        width: 10vw;
        height: calc(100vh - 32px);
        background: red;
        transform: translateY(calc((
                     var(--j-app-layout-bottom-drawer-offset-min) +
                     (100vh - 32px - var(--j-app-layout-bottom-drawer-offset-min)) * var(--ratio)
                   ) * -1));
        transition: transform 250ms cubic-bezier(.215, .61, .355, 1);
      } */
    }
  </style>

  <!-- <div class="app-layout-drawer"> -->
    <div class="navbar">
      <div class="drawer-toggle">
        <j-icon></j-icon>
      </div>

      <div class="brand">
        <slot name="brand"></slot>
      </div>

      <div class="menu">
        <slot name="menu"></slot>
      </div>

      <div class="support">
        <slot name="support"></slot>
      </div>
    </div>

    <div class="drawer">
      <slot name="drawer"></div>
    </div>
  <!-- </div> -->

  <div class="content">
    <slot></slot>
  </div>

  <div class="drawer-backdrop"></div>
`;

// The number of pixels you need to drag before the bottom drawer starts moving
const DRAG_THRESHOLD = 10;

const touchOptimizedMedia = window.matchMedia(touchOptimizedMediaQuery);

export class JAppLayout extends Stylable(HTMLElement) {
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.$ = {};
      this.$.navbar = this.shadowRoot.querySelector('.navbar');
      this.$.menu = this.shadowRoot.querySelector('.menu');
      this.$.drawer = this.shadowRoot.querySelector('.drawer');
      this.$.drawerToggle = this.shadowRoot.querySelector('.drawer-toggle');
      this.$.drawerBackdrop = this.shadowRoot.querySelector('.drawer-backdrop');
      this.$.content = this.shadowRoot.querySelector('.content');
      // this.$.bottomDrawer = this.shadowRoot.querySelector('.app-layout-drawer');

      this.$.drawerToggle.addEventListener('click', e => {
        this.toggleDrawer();
      });

      this.$.drawerBackdrop.addEventListener('click', e => {
        this.closeDrawer();
      });

      this.$.drawerBackdrop.addEventListener('touchstart', e => {
        this.closeDrawer();
      });

      this.__boundTouchMoveListener = this._touchMove.bind(this);
      this.__boundTouchEndListener = this._touchEnd.bind(this);

      // this.$.content.addEventListener('touchstart', this._touchStart.bind(this));
      this.addEventListener('touchstart', this._touchStart.bind(this));
      // this.$.bottomDrawer.addEventListener('touchmove', this._touchMove.bind(this));
      // this.$.bottomDrawer.addEventListener('touchend', this._touchEnd.bind(this));

      this.addEventListener('focusin', this._focusIn.bind(this));
      this.addEventListener('focusout', this._focusOut.bind(this));
    }

    this.$.menu.classList.toggle('has-menu', this.querySelector('[slot=menu]'));
    this.$.drawer.classList.toggle('has-drawer', this.querySelector('[slot=drawer]'));

    // Wait for any elements inside the menu to upgrade and be styled before measuring
    // TODO this probably fails if some of the contained elements are custom elements that are initialized later than this app layout
    requestAnimationFrame(() => {
      this._updateMinAndMaxOffset();
      this._setDrawerOffset(this._minOffset);
    });

    // touchOptimizedMedia.addListener(this._isTouchOptimized.bind(this));
    // this._isTouchOptimized(touchOptimizedMedia);

    super.connectedCallback();
  }

  _updateMinAndMaxOffset() {
    const cs = getComputedStyle(this);
    this._minOffset = cs.getPropertyValue('--j-app-layout-navbar-size');
    this._maxOffset = document.documentElement.clientHeight;
    // this._minOffset = Math.max(this.$.navbar.offsetHeight, 20);
    // this._maxOffset = this.$.bottomDrawer.offsetHeight;
    // this.style.setProperty('--j-app-layout-bottom-drawer-offset-min', this._minOffset + 'px');
    // this.style.setProperty('--full-range', this._maxOffset - this._minOffset);
  }

  // _isTouchOptimized(query) {
  //   this.$.bottomDrawer.classList.toggle('touch', query.matches);
  // }

  // DOM contains check that goes across slot boundaries
  _contains(e, container) {
    if (e.composedPath) {
      return e.composedPath().indexOf(container) > -1;
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
    if (!this._contains(e, this.$.navbar) && !this._contains(e, this.$.drawer)) {
      return;
    }

    // console.log(this.__firstTouch)
    // // Only track a single touch point at a time
    // if (this.__firstTouch) {
    //   // Check if we are already tracking this touch
    //   const activeTouch = Array.from(e.touches).find(t => {
    //     return this.__firstTouch.identifier == t.identifier;
    //   });
    //   // If not, clear the previously stored value (cleanup)
    //   if (!activeTouch) {
    //     delete this.__firstTouch;
    //     this.classList.remove('touch-active');
    //   }
    // } else {
      console.log('start touch tracking');
      // Start tracking a new touch
      this.__firstTouch = e.targetTouches[0];
      this.__touchQueue = [this.__firstTouch];
      this.__startOffset = this._offset || 0;
      // this.__startDrawerScrollTop = this.$.drawer.scrollTop;

      this.classList.add('touch-active');
      this.addEventListener('touchmove', this.__boundTouchMoveListener);
      this.addEventListener('touchend', this.__boundTouchEndListener);
    // }
  }

  _touchMove(e) {
    if (!this.__firstTouch) {
      return;
    }

    console.log('touch move');

    // if (this.__activeTouch) {
      // Only process the same touch point as started the touch
      const activeTouch = Array.from(e.changedTouches).find(t => {
        return this.__firstTouch.identifier == t.identifier;
      });

      if (activeTouch) {
        this.__touchQueue.push(activeTouch);

        // Positive == swipe up
        let dy = this.__firstTouch.clientY - activeTouch.clientY;

        // let scrollDrawer = true;
        // if ((dy < 0 && this.$.bottomDrawer.scrollTop == 0)
        //     || (dy > 0 && this.$.bottomDrawer.scrollTop == this.$.bottomDrawer.scrollHeight - this.$.bottomDrawer.offsetHeight)) {
        //   scrollDrawer = false;
        // } else if (this.$.bottomDrawer.scrollTop < 0) {
        //   scrollDrawer = false;
        //   this.$.bottomDrawer.scrollTop = 0;
        // }

        // if (!scrollDrawer) {

        const offsetIncrement = dy + (dy < 0 ? DRAG_THRESHOLD : -DRAG_THRESHOLD);
        if (Math.abs(dy) > DRAG_THRESHOLD) {
          const newOffset = this.__startOffset + offsetIncrement;
          this._offset = Math.max(Math.min(newOffset, this._maxOffset), this._minOffset);
          this._setDrawerOffset(this._offset);
        }
          //
          // if (dy < 0 && this.$.bottomDrawer.scrollTop > 0) {
          //   this.$.bottomDrawer.scrollTop = this.__startDrawerScrollTop + offsetIncrement;
          // } else if (dy > 0 && this._offset >= this._maxOffset) {
          //   this.$.bottomDrawer.scrollTop = this.__startDrawerScrollTop + (offsetIncrement - (this._maxOffset - this.__startOffset));
          // }
          // }


          // const offsetChange = this.__startOffset - this._offset;

          // if (offsetChange == 0) {
          //   return;
          // }

          if (dy > 0 && this._offset < this._maxOffset) {
            e.preventDefault();
          }

          if (dy < 0 && this._offset > this._minOffset) {
            e.preventDefault();
          }

          // e.preventDefault();
        // }
      }
    // } else if (this._contains(e, this.$.bottomDrawer)) {
    //   e.preventDefault();
    // }
  }

  _touchEnd(e) {
    if (!this.__firstTouch) {
      return;
    }

    console.log('touch end')

    // Only process the same touch point as started the touch
    const activeTouch = Array.from(e.changedTouches).find(t => {
      return this.__firstTouch.identifier == t.identifier;
    });

    console.log(activeTouch)

    if (activeTouch) {
      this.classList.remove('touch-active');
      this.removeEventListener('touchmove', this.__boundTouchMoveListener);
      this.removeEventListener('touchend', this.__boundTouchEndListener);

      // Get the swipe distance (roughly the velocity)
      let dy = 0;
      if (this.__touchQueue.length >= 2) {
        dy = this.__touchQueue[this.__touchQueue.length - 2].clientY - activeTouch.clientY;
      }

      const min = this._minOffset;
      const full = this._maxOffset;
      const half = full / 2;

      const offsetChange = this.__startOffset - this._offset;

      if (offsetChange == 0) {
        return;
      }

      if (dy >= 0 && this._offset > min + DRAG_THRESHOLD) {
        // Swipe up and above the threshold
        if (this._offset < half + DRAG_THRESHOLD * 2) {
          this._offset = Math.max(half, min);
        } else if (this._offset <= full && this._offset > half + DRAG_THRESHOLD * 2) {
          this._offset = full;
        }

        // Quick swipe up
        if (dy >= 60) {
          this._offset = full;
        }
      } else {
        if (this._offset < half - DRAG_THRESHOLD * 2) {
          this._offset = min;
        } else {
          this._offset = Math.max(half, min);
        }

        // Quick swipe down
        if (dy <= -60) {
          this._offset = min;
        }
      }

      this._setDrawerOffset(this._offset);

      if (this._offset < this._maxOffset) {
        this.$.drawer.scrollTop = 0;
      }

      if (Math.abs(dy) > DRAG_THRESHOLD) {
        e.preventDefault();
      }

      delete this.__firstTouch;
      delete this.__touchQueue;
      delete this.__startOffset;
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

  _setDrawerOffset(offset) {
    this._offset = offset;
    // this.$.bottomDrawer.classList.toggle('full', offset >= this._maxOffset);
    const ratio = (offset - this._minOffset) / (this._maxOffset - this._minOffset);
    this.style.setProperty('--_drawer-offset', ratio);
    // const ratio = (offset - this._minOffset) / (this._maxOffset - this._minOffset);
    // this.style.setProperty('--ratio', ratio);
    // this.style.setProperty('--ratio-based-offset', ratio * (this._maxOffset - this._minOffset) + this._minOffset);
  }

  closeDrawer() {
    if (touchOptimizedMedia.matches) {
      this._offset = this._minOffset;
      this._setDrawerOffset(this._offset);
      this.$.bottomDrawer.scrollTop = 0;
    } else {
      this.$.bottomDrawer.classList.remove('drawer-visible');
    }
  }

  openDrawer() {
    if (touchOptimizedMedia.matches) {
      this._offset = this._maxOffset / 2;
      this._setDrawerOffset(this._offset);
    } else {
      this.$.bottomDrawer.classList.add('drawer-visible');
    }
  }

  toggleDrawer() {
    if (this.$.bottomDrawer.classList.contains('drawer-visible') || this._offset > this._minOffset) {
      this.closeDrawer();
    } else {
      this.openDrawer();
    }
  }
}

window.customElements.define('j-app-layout', JAppLayout);
