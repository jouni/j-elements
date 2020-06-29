let collectionEl;

export class Icon {
  constructor() {
    this.name = arguments[0];
    this.svg = arguments[1];

    if (!collectionEl) {
      collectionEl = document.createElement('style');
      document.head.appendChild(collectionEl);
      collectionEl.sheet.addRule('html');
    }

    const htmlRule = collectionEl.sheet.cssRules[0];

    htmlRule.style.setProperty(`--${this.name}-icon`, this.svg);
  }
}
