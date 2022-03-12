import { OverflowMenu } from './OverflowMenu.js';

export class AvatarGroup extends OverflowMenu {
  _updateOverflowingItems() {
    super._updateOverflowingItems();
    this.shadowRoot.querySelector('[part="menu-button"]').textContent = '+' + this.querySelectorAll('[slot="menu"]').length;
  }
}

AvatarGroup.defineElement();
