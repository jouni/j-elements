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
    }

    const sizes = calcSize(this._json, modules);

    // TODO extract a method for getting the size string

    let fullSize = `${Math.ceil(sizes.size / 1024)} KB (${Math.ceil(sizes.compressed / 1024)} KB compressed)`;

    if (modules && modules.length > 1) {
      this.innerHTML = `
        <details>
          <summary>${modules.length} requests, ${fullSize}</summary>
          <dl>
            ${modules.map(module => {
              const mod = this._json.find(item => item.path == module);
              return `<dt>${module}</dt><dd>${(mod?.size / 1024).toFixed(2)} KB (${(mod?.compressed / 1024).toFixed(2)} KB compressed)</dd>`
            }).join('')}
          </dl>
        </details>
      `;
    } else {
      this.innerHTML = fullSize;
    }
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
