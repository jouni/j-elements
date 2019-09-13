// By using "var innerHTML" we allow IDEs (at least Atom) to use correct syntax highlighting and code completion
let innerHTML = `
  <style>
    button {
      display: inline-flex;
      border: 2px solid;
      border-radius: 6px;
      padding: 0.4em 0.8em;
      background: transparent;
      font: inherit;
    }
  </style>
`;

export default innerHTML;

export function scopeFor(themeName, tagName) {
  const temp = document.createElement('div');
  temp.innerHTML = innerHTML;
  temp.firstElementChild.setAttribute('type', 'global');
  temp.firstElementChild.setAttribute('for', `.${themeName} ${tagName}, :host(.${themeName}) ${tagName}`);
  document.body.appendChild(temp.firstElementChild);
}
