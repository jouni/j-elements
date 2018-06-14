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
      html {
        background-image: linear-gradient(var(--lumo-contrast-5pct), var(--lumo-contrast-5pct));
        padding: var(--lumo-space-l);
      }

      body {
        max-width: 660px;
        margin: 0 auto;
      }

      demo-snippet {
        box-shadow: var(--lumo-box-shadow-s);
        border-radius: var(--lumo-border-radius);
        overflow: hidden;

        --demo-snippet-code: {
          padding: 0 0.75em;
        }
      }

      button {
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
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
