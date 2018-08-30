import 'marked';
import '@polymer/iron-demo-helpers/demo-snippet';

export function renderMarkdown(pathToMarkdownFile, target) {
  fetch(pathToMarkdownFile).then(response => {
    if (response.status == 404) {
      target.innerHTML = '<h1>404</h1><p>Sorry, this page was not found.</p>'
    } else {
      response.text().then(text => {

        // marked is too eager to insert <p> tags, and adds those inside <demo-snippet> as well
        // so we need to gather and remove the HTML snippets from the markdown, then run marked
        // and then restore the HTML snippets in the original locations.
        // Also, scripts inserted with innerHTML are not executed, so we need to work around that as well.

        const pattern = /```html,live\n([\s\S]*?(?=<\/a>|$))\n```/gm;
        const htmlSnippets = [];
        let html = text.replace(pattern, (match, snippet, index) => {
          htmlSnippets.push(snippet);
          return `<div data-snippet="${htmlSnippets.length - 1}"></div>`;
        });

        html = marked(html);

        // Render the final markdown
        target.innerHTML = html;

        // Restore HTML snippets
        htmlSnippets.forEach((snippet, i) => {
          const placeholder = target.querySelector(`[data-snippet="${i}"]`);
          const template = document.createElement('template');
          template.innerHTML = snippet;

          Array.from(template.content.querySelectorAll('script')).forEach(function(el) {
            let newEl = document.createElement('script');
            if (el.type) newEl.type = el.type;
            newEl.appendChild(document.createTextNode(el.innerHTML));
            template.content.replaceChild(newEl, el);
          });

          const demo = document.createElement('demo-snippet');
          demo.appendChild(template);

          target.replaceChild(demo, placeholder);
        });

        // Style any non-live code block
        Array.from(target.querySelectorAll('pre code')).forEach(block => {
          hljs.highlightBlock(block);
        });
      });
    }
  }).catch(error => {
    target.innerHTML = '<h1>Error</h1><p>There was an error loading the page. Please check your internet connection.</p>';
    console.error(error);
  });
}
