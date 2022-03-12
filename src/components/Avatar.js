import { DefineElementMixin } from '../util/DefineElementMixin.js';

const styles = `
  :host {
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
  }

  svg,
  rect,
  image {
    flex: none;
    width: var(--avatar-size, 2.5rem);
    height: var(--avatar-size, 2.5rem);
  }

  mask rect {
    rx: var(--avatar-border-radius, 50%);
  }

  .clip {
    y: calc(var(--avatar-gap, 2px) / -1);
    x: calc(100% - var(--avatar-overlap, 0px));
    width: calc(var(--avatar-size, 2.5rem) + var(--avatar-gap, 2px) * 2);
    height: calc(var(--avatar-size, 2.5rem) + var(--avatar-gap, 2px) * 2);
    rx: calc(var(--avatar-border-radius, 50%) + var(--avatar-gap, 2px));
  }

  :host([slot=menu]) .clip {
    fill: none;
  }

  [hidden],
  :host([src]) image:not([hidden]) + text {
    display: none;
  }

  slot {
    display: block;
    position: var(--full, absolute);
    pointer-events: var(--full, none);
    height: var(--full, 1px);
    width: var(--full, 1px);
    overflow: var(--full, hidden);
    clip: var(--full, rect(1px, 1px, 1px, 1px));
  }

  :host(:hover) slot {
    height: var(--full, auto);
    width: var(--full, auto);
    clip: var(--full, none);
    top: var(--full, 100%);
    left: var(--full, 50%);
    transform: var(--full, translateX(-50%));
    background: var(--full, var(--avatar-tooltip-background, transparent));
    color: var(--full, var(--avatar-tooltip-color, inherit));
    box-shadow: var(--full, var(--avatar-tooltip-box-shadow, none));
    font: var(--full, var(--avatar-tooltip-font, inherit));
    padding: var(--full, var(--avatar-tooltip-padding, 0));
    border-radius: var(--full, var(--avatar-tooltip-border-radius, 0));
    border: var(--full, var(--avatar-tooltip-border, none));
    pointer-events: var(--full, auto);
    white-space: var(--full, nowrap);
    animation: var(--full, show-tooltip 200ms 1s both);
  }

  :host {
    position: var(--full, relative);
  }

  :host(:not([minimal])) {
    --full: 1;
  }

  @keyframes show-tooltip {
    0% {
      opacity: 0;
    }
  }
`;

export class Avatar extends DefineElementMixin(HTMLElement) {
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({mode: 'open'});
      this.shadowRoot.innerHTML = `
        <style>${styles}</style>
        <svg fill="none" xmlns="http://www.w3.org/2000/svg">
          <g part="avatar" mask="url(#mask)">
            <defs>
              <mask id="mask">
                <rect width="100%" height="100%" rx="100%" fill="white" />
                <rect width="100%" height="100%" rx="100%" fill="black" class="clip" />
              </mask>
            </defs>
            <rect width="100%" height="100%" />
            <image xlink:href="" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
            <text y="50%" x="50%" text-anchor="middle" fill="currentColor" dominant-baseline="central"></text>
          </g>
        </svg>
        <slot part="content"></slot>
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
    const image = this.shadowRoot.querySelector('image');
    const text = this.shadowRoot.querySelector('text');

    if (this.hasAttribute('src')) {
      image.onerror = () => {
        image.setAttribute('hidden', '');
      }
      image.setAttribute('xlink:href', this.getAttribute('src'));
      image.removeAttribute('hidden');
    }

    if (this.hasAttribute('abbr')) {
      text.textContent = this.getAttribute('abbr')
    } else {
      text.textContent = [...this.childNodes]
        .map(c => c.textContent)
        .join('')
        .split(' ')
        .map((word) => word.charAt(0))
        .join('');
    }
  }
}

Avatar.defineElement();
