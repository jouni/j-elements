let exampleId = 1;

/* TODO rerun this after color-scheme changes */
customElements.define('render-props', class extends HTMLElement {
  async connectedCallback() {
    this.updatePreviews();
  }

  updatePreviews() {
    const props = [...this.querySelectorAll(':scope > p > code:first-child')];
    const style = getComputedStyle(document.documentElement)
    props.forEach(prop => {
      const val = style.getPropertyValue(prop.textContent).trim();
      let preview = prop.parentNode.querySelector('.preview');
      if (!preview) {
        preview = document.createElement('span');
        preview.classList.add('preview');
      }
      preview.style.setProperty('--value', val);
      preview.innerHTML = `<span>${val}</span>`;
      preview.classList.toggle('color', val.match(/#|rgb|hsl|hwb|lch|lab|color/));
      prop.parentNode.insertBefore(preview, prop.nextElementSibling);
    });
  }
});
