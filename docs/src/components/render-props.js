let exampleId = 1;

window.customElements.define('render-props', class extends HTMLElement {
  async connectedCallback() {
    const props = [...this.querySelectorAll('code')];
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
