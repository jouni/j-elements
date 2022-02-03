export class TableOfContents extends HTMLElement {
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({mode: 'open'}).innerHTML = `<slot></slot>`;
    }

    this.updateTOC();
  }

  updateTOC() {
    this.innerHTML = '<h6>Contents</h6><ol></ol>';

    let currentOl;

    Array.from(this.parentNode.querySelectorAll('h2[id], h3[id]')).forEach(heading => {
      if (heading.nodeName == "H2") {
        const li = this.createLink(heading);
        this.querySelector('ol').appendChild(li);
        currentOl = document.createElement('ol');
        li.appendChild(currentOl);
      } else if (heading.nodeName == "H3" && currentOl) {
        const li = this.createLink(heading);
        currentOl.appendChild(li);
      }
    });
  }

  createLink(heading) {
    var li = document.createElement("li");
    li.innerHTML = `<a href="#${heading.id}">${heading.innerText}</a>`;
    return li;
  }
}

window.customElements.define('table-of-contents', TableOfContents);
