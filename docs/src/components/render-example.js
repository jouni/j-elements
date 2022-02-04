let exampleId = 1;

window.customElements.define('render-example', class extends HTMLElement {
  connectedCallback() {
    const origin = this.closest('main > *');
    const originClass = 'example-' + exampleId++;
    origin.classList.add(originClass);
    const example = document.querySelector(`.${originClass} ~ pre[class*=language]`);
    if (example) {
      const snippet = example.textContent;

      const template = document.createElement('template');
      template.innerHTML = snippet;

      Array.from(template.content.querySelectorAll('script')).forEach(function(el) {
        let newEl = document.createElement('script');
        if (el.type) newEl.type = el.type;
        newEl.appendChild(document.createTextNode(el.innerHTML));
        template.content.replaceChild(newEl, el);
      });

      this.appendChild(template.content.cloneNode(true));
    }
  }
});
