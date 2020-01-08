class ModuleSize extends HTMLElement {
  async connectedCallback() {
    this.update(await getJson());
  }

  update(json) {
    let modules = this.getAttribute('modules');

    if (modules) {
      modules = modules.split(',');
    }

    const sizes = calcSize(json, modules);

    // TODO extract a method for getting the size string

    let fullSize = `${Math.ceil(sizes.size / 1024)} KB (${Math.ceil(sizes.compressed / 1024)} KB compressed)`;

    if (modules && modules.length > 1) {
      this.innerHTML = `
        <details>
          <summary>${modules.length} requests, ${fullSize}</summary>
          ${modules.map(module => `${module}, ${(json.find(item => item.path == module).size / 1024).toFixed(2)} KB (${(json.find(item => item.path == module).compressed / 1024).toFixed(2)} KB compressed)`).join('<br>')}
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

let json;

async function getJson() {
  if (json) return json;

  return new Promise((resolve, reject) => {
    fetch('/src/module-size.json').then(response => {
      response.text().then(text => {
        json = JSON.parse(text);
        resolve(json);
      });
    });
  });
}