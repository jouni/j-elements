import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

import '../src/j-dialog.js';
import '../src/j-tooltip.js';

class XScoped extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          border: 1px dotted;
          padding: 10px;
          font-weight: bold;
        }

        j-dialog {
          border: 2px solid orange;
          background-color: papayawhip;
        }

        j-dialog h3 {
          color: orange;
          margin: 0;
        }

        h3 {
          color: red;
        }

        .data-binding {
          cursor: pointer;
        }
      </style>

      <p>This is a Polymer element, inside which all text is bold, including inside j-dialog.</p>

      <button>
        Open scoped overlay
        <j-tooltip class="opens">Opens the dialog</j-tooltip>
      </button>
      <j-dialog class="custom-class">
        <h3>Scoped</h3>
        <p>This overlay is inside another style scope.</p>
        <p class="data-binding">Polymer data binding value: [[foobar]]</p>
        <button>
          Close
          <j-tooltip class="closes">Closes the dialog</j-tooltip>
        </button>
      </j-dialog>
    `;
  }

  static get properties() {
    return {
      foobar: {
        type: String,
        value: 'Foobar (click to update)',
        notify: true
      },
      count: {
        type: Number,
        value: 1
      }
    };
  }

  ready() {
    super.ready();

    const overlay = this.shadowRoot.querySelector('.custom-class');
    const button = this.shadowRoot.querySelector('button');

    button.addEventListener('click', e => {
      overlay.visible = true;
    });

    // NOTE here is one of the main caveats of this approach: you must first get a reference to
    // the overlay element before querying the contained elements inside it
    overlay.querySelector('button').addEventListener('click', e => {
      overlay.visible = false;
    });
    overlay.querySelector('.data-binding').addEventListener('click', e => {
      this.foobar = this.count++;
    });

    // Polymer is too eager and combines all style tags in the template into one. So we create another one here.
    const style = document.createElement('style');
    style.setAttribute('type', 'module');
    style.setAttribute('for', '.custom-class');
    style.innerHTML = `
      :host {
        outline: 10px solid green;
        border-radius: 0;
      }
    `;
    this.shadowRoot.appendChild(style);
  }
}

window.customElements.define('x-scoped', XScoped);
