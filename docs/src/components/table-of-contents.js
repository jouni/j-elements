export class TableOfContents extends HTMLElement {
  connectedCallback() {
    this.updateTOC();
  }

  updateTOC() {
    this.innerHTML = '<h6>Contents</h6><ol></ol>';

    let currentOl;

    Array.from(document.querySelectorAll(':is(main, [role="main"]) :is(h2, h3)')).forEach(heading => {
      if (heading.localName == "h2") {
        const li = this.createLink(heading);
        this.querySelector('ol').appendChild(li);
        currentOl = document.createElement('ol');
        li.appendChild(currentOl);
      } else if (heading.localName == "h3" && currentOl) {
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
