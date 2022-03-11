import { DefineElementMixin } from '../util/DefineElementMixin.js';

const styles = `
  :host {
    display: inline-flex;
    vertical-align: middle;
    align-items: center;
    gap: 0.5rem;
  }

  svg {
    font: var(--avatar-font, inherit);
    flex: none;
  }

  .background {
    fill: var(--avatar-background, #eee);
  }

  svg,
  rect,
  image {
    width: var(--avatar-size, 2.5rem);
    height: var(--avatar-size, 2.5rem);
  }

  rect {
    rx: var(--avatar-border-radius, 50%);
  }

  .clip {
    y: calc(var(--avatar-gap, 2px) / -1);
    x: calc(100% - var(--avatar-overlap, 0px));
    width: calc(var(--avatar-size, 2.5rem) + var(--avatar-gap, 2px) * 2);
    height: calc(var(--avatar-size, 2.5rem) + var(--avatar-gap, 2px) * 2);
    rx: calc(var(--avatar-border-radius, 50%) + var(--avatar-gap, 2px));
    fill: var(--avatar-clip-fill, none);
  }

  :host([theme~=avatar-only]) {
    border-radius: var(--avatar-border-radius, 50%);
  }

  slot {
    display: block;
  }

  :host([theme~=avatar-only]) {
    width: var(--avatar-size, 2.5rem);
    height: var(--avatar-size, 2.5rem);
  }

  :host([theme~=avatar-only]) slot:not([name=avatar]),
  [hidden],
  :host([src]) image:not([hidden]) + text {
    display: none;
  }

  text {
    line-height: 1;
  }
`;

export class Avatar extends DefineElementMixin(HTMLElement) {
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({mode: 'open'});
      this.shadowRoot.innerHTML = `
        <style>${styles}</style>
        <svg fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <mask id="mask">
              <rect width="100%" height="100%" rx="100%" fill="white" />
              <rect class="clip" width="100%" height="100%" rx="100%" fill="none" />
            </mask>
          </defs>
          <rect width="100%" height="100%" rx="100%" class="background" mask="url(#mask)" />
          <image xlink:href="" width="100%" height="100%" mask="url(#mask)" preserveAspectRatio="xMidYMid slice" />
          <text y="50%" x="50%" text-anchor="middle" fill="currentColor" dominant-baseline="central" mask="url(#mask)"></text>
        </svg>
        <div>
          <slot></slot>
          <slot name="details"></slot>
        </div>
      `;
    }

    if (!this.__mutationObserver) {
      this.__mutationObserver = new MutationObserver(this._onMutation.bind(this));
    }

    this.__mutationObserver.observe(this, { childList: true });

    this._onMutation();
  }

  disconnectedCallback() {
    this.__mutationObserver.disconnect();
  }

  _onMutation() {
    const main = this.shadowRoot.querySelector('slot');
    const detail = this.shadowRoot.querySelector('slot[name="detail"]');
    const image = this.shadowRoot.querySelector('image');
    const text = this.shadowRoot.querySelector('text');

    if (this.hasAttribute('src')) {
      image.onerror = () => {
        image.setAttribute('hidden', '');
      }
      image.setAttribute('xlink:href', this.getAttribute('src'));
      image.removeAttribute('hidden');
    }

    text.textContent = [...this.childNodes]
        .filter(c => c.nodeType===3 || !c.hasAttribute('slot'))
        .map(c => c.textContent)
        .join('')
        .split(' ')
        .map((word) => word.charAt(0))
        .join('');
  }
}

Avatar.defineElement();
