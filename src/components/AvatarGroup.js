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

  /* TODO the reverse variant can't apply the correct clip/mask on the overflow button */
  /* Arguably, reverse stacking should not be used togethet with collapsing, as it can obscure the '+4' label */
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

  button[part^="menu-button"] {
    border-radius: var(--avatar-border-radius, 50%) !important;
    width: var(--avatar-size, 2.5rem) !important;
    height: var(--avatar-size, 2.5rem) !important;
    background-color: var(--avatar-background-color, #ddd) !important;
    color: var(--avatar-color, inherit) !important;
    border-style: solid !important;
    border-width: var(--avatar-border-width, 2px) !important;
    border-color: var(--avatar-border-color, transparent) !important;
    padding: 0 !important;
    font: inherit !important;
  }
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
    this.shadowRoot.querySelector('[part="menu-button"]').textContent = '+' + this.querySelectorAll('[slot="menu"]').length;
  }
}

AvatarGroup.defineElement();
