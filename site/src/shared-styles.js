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
      }

      h1[slot=brand] {
        margin: 0;
        font-size: var(--lumo-font-size-l);
        color: inherit;
      }

      [slot=drawer] h6 {
        margin-top: var(--lumo-space-l);
        margin-bottom: var(--lumo-space-m);
      }

      [slot=drawer] vaadin-tab a {
        font: inherit;
        color: inherit;
        text-decoration: none;
        flex: auto;
        text-align: left;
        margin: -0.25em -1em;
        padding: 0.25em 1em;
      }

      .content {
        margin: 0 auto;
        padding: 0 var(--lumo-space-l) var(--lumo-space-xl);
        max-width: 800px;
      }

      .github-link {
        display: inline-block;
        padding: 8px;
        margin: 8px;
        color: inherit;
      }

      .github-link j-icon {
        display: block;
        --viewbox: 0 0 16 16;
        --svg: <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>;
      }

      demo-snippet {
        box-shadow: var(--lumo-box-shadow-s);
        box-shadow: none;
        border: 1px solid var(--lumo-contrast-10pct);
        border-radius: var(--lumo-border-radius);
        overflow: hidden;

        --demo-snippet-code: {
          padding: 0.5em;
        }
      }

      /* button {
        font: inherit;
        background-color: var(--lumo-contrast-5pct);
        color: var(--lumo-primary-text-color);
        font-weight: 500;
        border: 0;
        padding: 0.3em 1em;
        border-radius: var(--lumo-border-radius);
        margin: 0;
        outline: none;
      }

      button:hover,
      button:focus {
        background-color: var(--lumo-primary-color-10pct);
      }

      button:active {
        background-color: var(--lumo-primary-color-50pct);
      } */
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
