class ModuleSize extends HTMLElement {
  async connectedCallback() {
    if (!this._json) {
      this._json = await getJson();
    }
    this.update();
  }

  update() {
    let modules = this.getAttribute('modules');

    if (modules) {
      modules = modules.split(' ');
    } else {
      modules = this._json.map(m => m.path);
    }

    const sizes = calcSize(this._json, modules);

    // TODO extract a method for getting the size string

    let fullSize = `${Math.ceil(sizes.size / 1024)} KB (${Math.ceil(sizes.compressed / 1024)} KB compressed)`;

    this.innerHTML = `
      <details>
        <summary>${modules.length} ${modules.length > 1 ? 'requests' : 'request'}, ${fullSize}</summary>
        <dl>
          <dt>Module</dt><dd>File size</dd><dd>Compressed</dd>
          ${modules.map(module => {
            const mod = this._json.find(item => item.path == module);
            return `<dt>${module}</dt><dd>${(mod?.size / 1024).toFixed(2)} KB</dd><dd>${(mod?.compressed / 1024).toFixed(2)} KB</dd>`
          }).join('')}
        </dl>
      </details>
    `;
  }
}

window.customElements.define('module-size', ModuleSize);

function calcSize(json, path) {
  const sizes = json.reduce((acc, cur) => {
    if (path) {
      if (typeof path == 'string') {
        if (cur.path.indexOf(path) === 0) {
          return {
            size: acc.size + cur.size,
            compressed: acc.compressed + cur.compressed
          };
        } else {
          return acc;
        }
      } else if (path instanceof Array) {
        if (path.find(p => p == cur.path)) {
          return {
            size: acc.size + cur.size,
            compressed: acc.compressed + cur.compressed
          };
        } else {
          return acc;
        }
      } else {
        return acc;
      }
    } else {
      return {
        size: acc.size + cur.size,
        compressed: acc.compressed + cur.compressed
      };
    }
  }, {size: 0, compressed: 0});

  return sizes;
}

async function getJson() {
  const res = await fetch('/docs/src/module-size.json');
  return await res.json();
}
