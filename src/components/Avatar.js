const styles = `
  :host {
    --border-radius: var(--avatar-border-radius, 50%);
    --size: var(--avatar-size, 2.5rem);
    --background-color: var(--avatar-background-color, #ddd);
    color: var(--avatar-color, inherit);
    --border-width: var(--avatar-border-width, 2px);
    --border-color: var(--avatar-border-color, transparent);
    --gap: var(--avatar-group-gap, 2px);
    --overlap: var(--avatar-group-overlap, 0px);

    display: inline-block;
    vertical-align: middle;
    width: var(--size);
    height: var(--size);
    flex: none;
    overflow: hidden;
    border-radius: var(--border-radius);
  }

  svg,
  rect,
  foreignobject,
  ::slotted(img) {
    width: var(--size);
    height: var(--size);
  }

  ::slotted(img) {
    object-fit: cover;
  }

  .bg {
    fill: var(--background-color);
    stroke: var(--border-color);
    stroke-width: calc(var(--border-width) * 2);
    rx: var(--border-radius);
  }

  .clip {
    y: calc(var(--gap) / -1);
    /* TODO RTL support */
    x: calc(100% - var(--overlap));
    width: calc(var(--size) + var(--gap) * 2);
    height: calc(var(--size) + var(--gap) * 2);
    rx: calc(var(--border-radius) + var(--gap));
    fill: var(--avatar-clip-fill, none);
  }

  [hidden] {
    display: none;
  }

  slot {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }

  slot svg {
    width: 50%;
    height: 50%;
  }
`;

export class Avatar extends HTMLElement {
  connectedCallback() {
    if (!this.shadowRoot) {
      this.setAttribute('role', 'figure');
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>${styles}</style>
        <svg xmlns="http://www.w3.org/2000/svg" part="avatar">
          <defs>
            <mask id="mask">
              <rect width="100%" height="100%" fill="white" />
              <rect width="100%" height="100%" rx="100%" fill="black" class="clip" />
            </mask>
          </defs>
          <rect width="100%" height="100%" rx="100%" class="bg" mask="url(#mask)" />
          <foreignobject width="100%" height="100%" mask="url(#mask)">
            <slot>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </slot>
          </foreignobject>
        </svg>
      `;
    }
  }
}

customElements.define('j-avatar', Avatar);
