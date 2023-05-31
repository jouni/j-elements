import { OverflowMenu } from './OverflowMenu.js';

const styles = `
  /* Custom properties copied from Avatar.js styles */
  :host {
    gap: var(--avatar-group-gap, 2px);
    max-width: calc(var(--avatar-size, 2.5rem) * var(--avatar-group-max-items) + var(--avatar-group-gap, 2px) * (var(--avatar-group-max-items) - 1) - var(--avatar-group-overlap, 0px) * (var(--avatar-group-max-items) - 1));
  }

  ::slotted(:not([slot=menu], :last-child)) {
    margin-inline-end: calc(var(--avatar-group-overlap, 0px) * -1);
  }

  ::slotted([slot="overflow-button"]) {
    --button-min-width: var(--avatar-size, 2.5rem);
    --button-min-height: var(--avatar-size, 2.5rem);
  }

  /* TODO the reverse variant can't apply the correct clip/mask on the overflow button */
  /* Arguably, reverse stacking should not be used together with collapsing, as it can obscure the overflow label (e.g. '+4') */
  :host(:not([theme~=reverse])) ::slotted(:not([slot=menu], :last-child)),
  :host([theme~=reverse]) ::slotted(:not([slot=menu], :first-child)) {
    --avatar-clip-fill: black;
  }

  /*
  j-avatar-group[theme~=reverse] j-avatar:not([slot=menu], :first-child) {
    --avatar-clip-x-origin: calc(-100% - var(--avatar-group-gap, 2px) * 2);
    --avatar-group-overlap-dir: -1;
  }
  */

`;

export class AvatarGroup extends OverflowMenu {
  connectedCallback() {
    super.connectedCallback();
    const style = document.createElement('style');
    style.innerHTML = styles;
    this.shadowRoot.append(style);
  }
  _updateOverflowingItems() {
    super._updateOverflowingItems();
    this.shadowRoot.querySelector('slot[name="overflow-button"]').assignedElements({ flatten: true })[0].textContent = '+' + this.querySelectorAll('[slot="menu"]').length;
  }
}

customElements.define('j-avatar-group', AvatarGroup);
