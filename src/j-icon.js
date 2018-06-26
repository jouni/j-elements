const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: inline-block;
      vertical-align: middle;
      width: var(--j-icon-width, var(--j-icon-size, 24px));
      height: var(--j-icon-height, var(--j-icon-size, 24px));
      --viewbox: 0 0 24 24;
    }

    svg {
      width: 100%;
      height: 100%;
      fill: currentColor;
    }
  </style>
`;

export class JIcon extends HTMLElement {
  connectedCallback() {
    if (!this.__jIconTemplateStamped) {
      this.attachShadow({mode: 'open'});

      if (typeof ShadyCSS != 'undefined' && !ShadyCSS.nativeShadow) {
        ShadyCSS.prepareTemplate(template, this.nodeName.toLowerCase());
        ShadyCSS.styleElement(this);
      }

      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.__jIconTemplateStamped = true;
    }

    // Need to defer so that polyfilled browsers can catch up
    requestAnimationFrame(this.updateIcon.bind(this));
  }

  updateIcon() {
    const style = getComputedStyle(this, null);
    const svgPath = style.getPropertyValue('--svg');
    const viewBox = style.getPropertyValue('--viewbox');

    // Firefox can't use innerHTML on an <svg> element, so we use this workaround
    const oldSvg = this.shadowRoot.querySelector('svg');
    if (oldSvg) {
      this.shadowRoot.removeChild(oldSvg);
    }
    const temp = document.createElement('div');
    temp.innerHTML = `<svg viewBox="${viewBox}">${svgPath.trim()}</svg>`;
    this.shadowRoot.appendChild(temp.firstChild);

    if (svgPath.trim() == '') {
      console.warn('No SVG path defined', this);
    }
  }
}

window.customElements.define('j-icon', JIcon);
