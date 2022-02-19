let exampleId = 1;

/* TODO rerun this after color-scheme changes */
window.customElements.define('render-props', class extends HTMLElement {
  async connectedCallback() {
    const props = [...this.querySelectorAll(':scope > p > code:first-child')];
    const style = window.getComputedStyle(document.documentElement)
    props.forEach(prop => {
      const val = style.getPropertyValue(prop.textContent).trim();
      const preview = document.createElement('span');
      preview.classList.add('preview');
      preview.style.setProperty('--value', val);
      preview.innerHTML = `<span></span>${val}`;
      if (val.startsWith('#')) {
        preview.classList.add('color');
      }
      prop.parentNode.insertBefore(preview, prop.nextElementSibling);
    });
  }
});
