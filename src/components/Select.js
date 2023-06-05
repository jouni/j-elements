import { Menu } from './Menu.js';
import { MutationsMixin } from '../util/MutationsMixin.js';

export class Select extends MutationsMixin(Menu) {

  observedMutations = { childList: true }

  connectedCallback() {
    super.connectedCallback();
    this._popup.removeAttribute('role');
    this._popup.querySelector('[part="popup"]').setAttribute('role', 'listbox');
    this.addEventListener('click', (e) => {
      this.querySelectorAll('button').forEach(button => {
        button.removeAttribute('selected');
        button.setAttribute('aria-selected','false');
      });
      const selected = e.target.closest('[role="option"]');
      selected.setAttribute('selected', '');
      selected.setAttribute('aria-selected', 'true');
      this.handleMutations();
      this.closePopup();
      this.dispatchEvent(new CustomEvent('change', { detail: {
        value: selected.hasAttribute('value') ? selected.getAttribute('value') : selected.textContent
      }}));
    })
  }

  handleMutations(e) {
    this.querySelectorAll('button').forEach(button => {
      button.setAttribute('role', 'option');
      button.setAttribute('aria-selected', 'false');
    });

    let trigger = this.querySelector('[slot="trigger"]');
    if (trigger) {
      this.removeChild(trigger);
    }
    const selected = this.querySelector('[selected]');
    if (selected) {
      trigger = selected.cloneNode(true);
      selected.setAttribute('aria-selected', 'true');
    } else {
      trigger = document.createElement('button');
      trigger.textContent = "Select option";
    }
    trigger.setAttribute('slot', 'trigger');
    trigger.removeAttribute('selected');
    trigger.removeAttribute('aria-selected');
    trigger.removeAttribute('role');
    this.appendChild(trigger);
  }
}

customElements.define('j-select', Select);
