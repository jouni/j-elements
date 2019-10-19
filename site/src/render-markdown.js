import 'marked/marked.min.js';

export function renderMarkdown(pathToMarkdownFile, target) {
  target.innerHTML = '';
  target.className = 'loading';

  fetch(pathToMarkdownFile).then(response => {
    if (response.status == 404) {
      target.className = '';
      target.innerHTML = '<h1>Page not found</h1><p>Sorry, this page was not found. <small>(Error 404)</small></p><p><a href="/">Home &rsaquo;</a></p>'
    } else {

      let filename = pathToMarkdownFile.split('/');
      filename = filename[filename.length - 1].split('.')[0];

      response.text().then(text => {

        // Handle dynamic imports first
        const importPattern = /<!--imports\n([\s\S]*?(?=\n-->))/gm;
        let imports = importPattern.exec(text);
        if (imports) {
          imports = imports[1].split('\n');
          const promises = [];
          imports.forEach(path => {
            promises.push(import(path));
          });

          Promise.all(promises).then((modules) => {
            target.className = filename;
            renderStaticParts(target, text);
          })
        } else {
          target.className = filename;
          renderStaticParts(target, text);
        }
      });
    }
  }).catch(error => {
    target.className = '';
    target.innerHTML = '<h1>Error</h1><p>There was an error loading the page. Please check your internet connection.</p>';
    console.error(error);
  });
}

function renderStaticParts(target, text) {
  // marked is too eager to insert <p> tags, and adds those inside <demo-snippet> as well
  // so we need to gather and remove the HTML snippets from the markdown, then run marked
  // and then restore the HTML snippets in the original locations.
  // Also, scripts inserted with innerHTML are not executed, so we need to work around that as well.

  const pattern = /```html,live(.*)\n([\s\S]*?(?=<\/a>|$))\n```/gm;
  const htmlSnippets = [];
  let html = text.replace(pattern, (match, mode, snippet, index) => {
    htmlSnippets.push(snippet);
    return `<div data-mode="${mode}" data-snippet="${htmlSnippets.length - 1}"></div>`;
  });

  html = marked(html);

  // Render the final markdown
  target.innerHTML = html;

  // Restore HTML snippets
  htmlSnippets.forEach((snippet, i) => {
    const placeholder = target.querySelector(`[data-snippet="${i}"]`);
    const template = document.createElement('template');
    template.innerHTML = snippet;

    // Avoid script security limitations (allow execution)
    Array.from(template.content.querySelectorAll('script')).forEach(function(el) {
      let newEl = document.createElement('script');
      if (el.type) {
        newEl.type = el.type;
      } else {
        // Run the scripts in isolated scopes
        newEl.type = 'module';
      }
      newEl.appendChild(document.createTextNode(el.innerHTML));
      template.content.replaceChild(newEl, el);
    });

    const demo = document.createElement('div');
    demo.classList.add('demo-snippet');

    const mode = placeholder.getAttribute('data-mode');

    if (mode.indexOf('center') > -1) {
      demo.classList.add('center-preview');
    }

    if (mode.indexOf('resize') > -1) {
      demo.classList.add('resize-preview');
    }

    const render = document.createElement('div');
    render.classList.add('demo-snippet__render');
    render.innerHTML = '<div></div>';
    render.firstChild.appendChild(template.content.cloneNode(true));
    demo.appendChild(render);

    const pre = document.createElement('pre');
    pre.classList.add('demo-snippet__code');
    const code = document.createElement('code');
    code.textContent = snippet;
    pre.appendChild(code);
    demo.appendChild(pre);

    target.replaceChild(demo, placeholder);
  });

  // Style code blocks
  Array.from(target.querySelectorAll('pre code')).forEach(block => {
    hljs.highlightBlock(block);
  });

  // Insert TOC
  const toc = document.createElement('table-of-contents');
  let reference = target.querySelector('h1 + *');
  if (!reference) reference = target.querySelector('p:first-of-type');
  target.insertBefore(toc, reference);

  // TODO use scroll restoration API
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  // Scroll-into-view
  if(document.location.hash) {
    const heading = document.querySelector(document.location.hash);
    if (heading) {
      heading.setAttribute('target', '');
      setTimeout(function() {
        heading.removeAttribute('target');
      }, 1000);
      heading.scrollIntoView();
    }
  }
}
