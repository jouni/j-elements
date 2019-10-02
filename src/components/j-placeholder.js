const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      width: 100px;
      height: 100px;
      overflow: hidden;
      color: inherit;
      font-size: 0.875em;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
    }

    svg {
      display: block;
      stroke-width: 1px;
      stroke: currentColor;
      width: 100%;
      height: 100%;
      opacity: 0.5;
      border: 1px solid currentColor;
      box-sizing: border-box;
    }

    .j-placeholder-content {
      transform: translateY(-100%);
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  </style>
  <svg viewBox="0 0 100 100" preserveAspectRatio="none">
    <path d="M0,100 L100,0" vector-effect="non-scaling-stroke"></path>
    <path d="M100,100 L0,0" vector-effect="non-scaling-stroke"></path>
  </svg>
  <div class="j-placeholder-content">
    <slot></slot>
  </div>
`;

export class JPlaceholder extends HTMLElement {

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }

}

window.customElements.define('j-placeholder', JPlaceholder);
