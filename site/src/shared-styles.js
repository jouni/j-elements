import '../node_modules/@vaadin/vaadin-lumo-styles/color.js';
import '../node_modules/@vaadin/vaadin-lumo-styles/sizing.js';
import '../node_modules/@vaadin/vaadin-lumo-styles/spacing.js';
import '../node_modules/@vaadin/vaadin-lumo-styles/style.js';
import '../node_modules/@vaadin/vaadin-lumo-styles/typography.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style include="lumo-typography lumo-color">
      body {
        margin: 0;
        letter-spacing: -0.005em;
      }

      h1,
      h2 {
        letter-spacing: -0.01em;
        font-weight: 700;
      }

      h1[slot=brand] {
        margin: 0;
        font-size: var(--lumo-font-size-l);
        color: inherit;
      }

      .logo {
        color: var(--lumo-primary-contrast-color);
        background-color: var(--lumo-primary-color);
        display: inline-block;
        border-radius: 0.25em;
        padding: 0.4em 0.4em 0.5em;
        font-family: monospace;
        font-size: 0.8em;
        letter-spacing: -0.1em;
        line-height: 1.4;
        vertical-align: 0.2em;
        margin-right: 0.5em;
      }

      .hero {
        position: relative;
        height: 260px;
        background-color: var(--lumo-primary-color);
        border-radius: 9px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: var(--lumo-space-l);
      }

      .hero j-icon {
        position: relative;
        z-index: 0;
        width: 232px;
        height: 127px;
        color: #fff;
        --viewbox: 0 0 232 127;
        --svg: <path d="M58.234375,37.1591797 L11.9101562,62.4150391 L11.9101562,63.4619141 L58.234375,88.7177734 L58.234375,100.887695 L0.65625,67.5839844 L0.65625,58.2929688 L58.234375,24.9892578 L58.234375,37.1591797 Z M124.12207,122.086914 L114.176758,122.086914 L148.854492,3.46289062 L158.799805,3.46289062 L124.12207,122.086914 Z M173.456055,37.1591797 L173.456055,24.9892578 L231.03418,58.2929688 L231.03418,67.5839844 L173.456055,100.887695 L173.456055,88.7177734 L219.780273,63.4619141 L219.780273,62.4150391 L173.456055,37.1591797 Z" fill-opacity="0.5"></path><path d="M105.082031,29.1767578 L105.082031,103.766602 C105.082031,118.619141 95.2021484,126.732422 77.4707031,126.732422 C75.4423828,126.732422 71.9746094,126.536133 70.7314453,126.405273 L70.7314453,109.851562 C71.3203125,109.916992 72.6289062,109.982422 73.4794922,109.982422 C79.5644531,109.982422 81.9199219,107.888672 81.9199219,102.916016 L81.9199219,29.1767578 L105.082031,29.1767578 Z M93.5009766,20.7363281 C85.3876953,20.7363281 80.4804688,16.6142578 80.4804688,10.4638672 C80.4804688,4.24804688 85.3876953,0.125976562 93.5009766,0.125976562 C101.679688,0.125976562 106.586914,4.24804688 106.586914,10.4638672 C106.586914,16.6142578 101.679688,20.7363281 93.5009766,20.7363281 Z"></path>;
      }

      .ingress {
        font-size: var(--lumo-font-size-xl);
      }

      [slot=drawer] h6 {
        margin-top: var(--lumo-space-l);
        margin-bottom: var(--lumo-space-m);
      }

      [slot=drawer] vaadin-tab + h6 {
        margin-top: var(--lumo-space-xl);
      }

      vaadin-tabs[slot=drawer] {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: var(--lumo-space-m) 0;
      }

      [slot=drawer] vaadin-tab a {
        font: inherit;
        color: inherit;
        text-decoration: none;
        flex: auto;
        text-align: left;
        margin: -0.25em -1em;
        padding: 0.25em 1em;
        outline: none;
        pointer-events: none;
      }

      @media (pointer: fine) {
        [slot=drawer] vaadin-tab {
          min-height: var(--lumo-size-s);
        }
      }

      .content {
        margin: 0 auto;
        padding: 0 var(--lumo-space-l) calc(var(--lumo-space-xl) * 2);
        max-width: 800px;
      }

      .github-link {
        display: inline-block;
        padding: 8px;
        margin: 8px;
        color: inherit;
      }

      .github-link:hover,
      .github-link:focus {
        color: var(--lumo-primary-text-color);
      }

      .github-link j-icon {
        display: block;
        --viewbox: 0 0 16 16;
        --svg: <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />;
      }

      blockquote {
        border-left: 3px solid var(--lumo-primary-color);
        background-color: var(--lumo-primary-color-10pct);
        margin: var(--lumo-space-l) 0;
        padding: var(--lumo-space-xs) var(--lumo-space-l) 0.1em;
        font-size: var(--lumo-font-size-s);
      }

      .hljs {
        margin: var(--lumo-space-l) 0;
        padding: var(--lumo-space-s) var(--lumo-space-m);
      }

      .demo-snippet {
        border: 1px solid var(--lumo-contrast-10pct);
        border-radius: var(--lumo-border-radius);
        overflow: hidden;
        padding: 1rem;
      }

      .demo-snippet__code {
        margin: 1rem 0 0;
        background: transparent;
      }

      .demo-snippet__code .hljs {
        border-radius: 0;
        margin: 0 -1rem -1rem;
        max-height: 14.5em;
        overflow: auto;
      }

      maturity-badge a {
        color: inherit;
        text-decoration: none !important;
        font-size: var(--lumo-font-size-s);
        font-weight: 500;
        letter-spacing: 0;
        background-color: var(--lumo-contrast-10pct);
        color: var(--lumo-contrast-70pct);
        display: inline-block;
        padding: 0.2em 0.4em;
        border-radius: 0.25em;
        vertical-align: middle;
        margin-left: 0.5em;
        cursor: pointer;
      }

      maturity-badge[poc] a {
        background-color: var(--lumo-error-color-10pct);
        color: var(--lumo-error-text-color);
      }

      maturity-badge[preview] a {
        background-color: rgb(255,241,214);
        color: rgb(184,121,0);
      }

      maturity-badge[beta] a {
        background-color: var(--lumo-success-color-10pct);
        color: var(--lumo-success-text-color);
      }

      maturity-badge[stable] a {
        background-color: var(--lumo-primary-color-10pct);
        color: var(--lumo-primary-text-color);
      }

      maturity-badge[deprecated] a {
        background-color: var(--lumo-error-color);
        color: var(--lumo-error-contrast-color);
      }

      code {
        font-family: "Source Code Pro", monospace;
        font-size: 0.875em;
        font-weight: 500;
        border-radius: 0.3em;
        background-color: var(--lumo-contrast-5pct);
        padding: 0.1em 0.3em;
        color: var(--lumo-secondary-text-color);
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
