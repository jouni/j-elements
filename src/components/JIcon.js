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
      --viewbox: 0 0 24 24;
      --svg: <path d="M0,0 L24,0 L24,24 L0,24 L0,0" stroke="currentColor" stroke-width="1px" fill="none"></path><path d="M0,24 L24,0" stroke="currentColor" stroke-width="0.6px"></path><path d="M24,24 L0,0" stroke="currentColor" stroke-width="0.6px"></path>;
    }

    svg {
      width: 100%;
      height: 100%;
      vertical-align: top;
    }
  </style>
`;

export class JIcon extends HTMLElement {
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    // Need to defer so that polyfilled browsers can catch up
    requestAnimationFrame(this.updateIcon.bind(this));
  }

  updateIcon() {
    const style = getComputedStyle(this, null);
    const svgPath = style.getPropertyValue('--svg');
    const viewBox = style.getPropertyValue('--viewbox');

    if (!viewBox) return;

    // Firefox can't use innerHTML on an <svg> element, so we use this workaround
    const oldSvg = this.shadowRoot.querySelector('svg');
    if (oldSvg) {
      this.shadowRoot.removeChild(oldSvg);
    }
    const temp = document.createElement('div');
    temp.innerHTML = `<svg viewBox="${viewBox.trim()}">${svgPath.trim()}</svg>`;
    this.shadowRoot.appendChild(temp.firstChild);

    if (svgPath.trim() == '') {
      console.warn('No SVG path defined', this);
    }
  }
}

window.customElements.define('j-icon', JIcon);

export default JIcon;
