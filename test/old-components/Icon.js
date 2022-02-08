import {DefineElementMixin} from '../util/DefineElementMixin.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: inline-block;
      vertical-align: middle;
      width: var(--j-icon-width, var(--j-icon-size, 1.5em));
      height: var(--j-icon-height, var(--j-icon-size, 1.5em));
      fill: currentColor;
      stroke: currentColor;
      stroke-width: 0;
    }

    svg {
      width: 100%;
      height: 100%;
      vertical-align: top;
    }
  </style>
`;

export class Icon extends DefineElementMixin(HTMLElement) {
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    // Need to defer so that polyfilled browsers can catch up
    requestAnimationFrame(this.updateIcon.bind(this));
  }

  updateIcon() {
    if (this.hasAttribute('icon')) {
      this.style.setProperty('--svg', `var(--${ this.getAttribute('icon') }-icon)`);
    }

    const style = getComputedStyle(this, null);
    const svgPath = style.getPropertyValue('--svg');
    const viewBox = style.getPropertyValue('--viewbox');

    // Firefox can't use innerHTML on an <svg> element, so we use this workaround
    const oldSvg = this.shadowRoot.querySelector('svg');
    if (oldSvg) {
      this.shadowRoot.removeChild(oldSvg);
    }
    const temp = document.createElement('div');

    if (svgPath.indexOf('<svg') === -1) {
      temp.innerHTML = `<svg>${svgPath.trim()}</svg>`;
    } else {
      temp.innerHTML = svgPath.trim();
    }

    if (viewBox) {
      temp.firstChild.setAttribute('viewBox', viewBox.trim());
    }

    // Prevent bugs in Edge when the icon appears in tab-order
    temp.firstChild.setAttribute('focusable', 'false');

    this.shadowRoot.appendChild(temp.firstChild);

    if (svgPath.trim() == '') {
      console.warn('No SVG path defined', this);
    }
  }
}

Icon.defineElement();
