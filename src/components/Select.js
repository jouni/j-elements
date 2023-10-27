import { Menu } from './Menu.js';
import { MutationsMixin } from '../util/MutationsMixin.js';

export class Select extends MutationsMixin(Menu) {

  observedMutations = { childList: true }

  connectedCallback() {
    super.connectedCallback();
    // TODO should not run multiple times if detached and reattached (moved in the DOM)
    this._popup.setAttribute('role', 'listbox');
    this.addEventListener('click', (e) => {
      this.querySelectorAll('button, option, [role=option]').forEach(option => {
        option.removeAttribute('selected');
        option.setAttribute('aria-selected', 'false');
      });
      const selected = e.target.closest('[role=option], option');
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
    this.querySelectorAll('button:not([slot=trigger]), option, [role=option]').forEach(option => {
      option.setAttribute('role', 'option');
      if (!option.matches('[selected], [aria-selected=true]')) {
        option.removeAttribute('selected');
        option.setAttribute('aria-selected', 'false');
      }
    });

    let trigger = this.querySelector('[slot=trigger]');
    if (!trigger) {
      trigger = document.createElement('button');
      trigger.setAttribute('slot', 'trigger');
      this.appendChild(trigger);
    }
    const selected = this.querySelector('[selected], [aria-selected=true]');
    if (selected) {
      trigger.innerHTML = selected.innerHTML;
      trigger.setAttribute('value', selected.hasAttribute('value') ? selected.getAttribute('value') : selected.textContent);
    } else {
      trigger.textContent = "Select option";
      trigger.removeAttribute('value');
    }
  }
}

customElements.define('j-select', Select);
