let exampleId = 1;

const isSafari = navigator.vendor.match(/apple/i);

window.customElements.define('render-example', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
    <style>
    ${isSafari ?
      `:host {
        display: flex;
      }
      slot {
        display: var(--display, block);
        flex-direction: var(--flex-direction);
        align-items: var(--align-items);
        padding: var(--padding, 0);
        gap: var(--gap, 0);
        overflow: auto;
        flex: 1;
      }
      .resizer {
        resize: horizontal;
        overflow: hidden;
        width: 8px;
        flex: none;
        transform: scaleX(-1);
        max-width: calc(100% - 0.5em - var(--padding) * 2);
        background: #eee;
      }`
      :
      `:host {
        display: var(--display, block);
        flex-direction: var(--flex-direction);
        align-items: var(--align-items);
        gap: var(--gap, 0);
        overflow: auto;
        resize: horizontal;
        min-width: 0;
        min-height: 0;
        box-sizing: border-box;
        padding: var(--padding, 0);
      }`
    }
    :host:not(.full) {
      --padding: 2rem;
    }
    </style>
    <slot></slot>
    <div class="resizer"></div>
    `;

    const origin = this.closest('main > *');
    const originClass = 'example-' + exampleId++;
    origin.classList.add(originClass);
    const example = document.querySelector(`.${originClass} ~ pre[class*=language]`);
    if (example) {
      const template = document.createElement('template');
      template.innerHTML = example.textContent;

      Array.from(template.content.querySelectorAll('script')).forEach(function(el) {
        let newEl = document.createElement('script');
        if (el.type) newEl.type = el.type;
        newEl.appendChild(document.createTextNode(el.innerHTML));
        template.content.replaceChild(newEl, el);
      });

      this.appendChild(template.content.cloneNode(true));
    }
  }
});
