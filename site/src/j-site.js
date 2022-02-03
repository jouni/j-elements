import {Router} from '@vaadin/router';
import {Icon} from 'j-elements/src/components/Icon.js';
import {AppLayout} from 'j-elements/src/components/AppLayout.js';
import {Drawer} from 'j-elements/src/components/Drawer.js';
import {View} from 'j-elements/src/components/View.js';
import './maturity-badge.js';
import './table-of-contents.js';
import './module-size.js';
import {renderMarkdown} from './render-markdown.js';

// Needed for docs examples
import {LightStyleMixin} from 'j-elements/src/util/LightStyleMixin.js';
class StyledElement extends LightStyleMixin(HTMLElement) {
  static get styles() {
    return `
      :host {
        color: red;
        font-weight: bold;
      }
    `;
  }
}
window.customElements.define('styled-element', StyledElement);

import {MutationAnimationMixin} from 'j-elements/src/util/MutationAnimationMixin.js';
class MyList extends MutationAnimationMixin(HTMLElement) {}
window.customElements.define('my-list', MyList);

import {AnimationPerformance} from 'j-elements/src/util/AnimationPerformance.js';
window.AnimationPerformance = AnimationPerformance;
AnimationPerformance.measure().then(({fps, duration}) => {
  window._animationPerformanceAtStartup = `FPS: ${fps} — Duration: ${duration}ms`;
  const startup = document.querySelector('.performance-at-startup');
  if (startup) {
    startup.textContent = window._animationPerformanceAtStartup;
  }
});

class JSite extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <j-app-layout>
        <j-drawer>
          <h3>JElements</h3>

          <h6>Introduction</h6>
          <ul>
            <li><a href="/">About</a></li>
            <li><a href="/howto">Get started</a></li>
            <li><a href="/maturity">Maturity levels</a></li>
          </ul>
          <h6>Foundation</h6>
          <ul>
            <li><a href="/foundation/color">Color palette</a></li>
            <li><a href="/foundation/typography">Typography</a></li>
          </ul>
          <h6>Components</h6>
          <ul>
            <li><a href="/component/app-layout">App Layout</a></li>
            <li><a href="/component/avatar">Avatar</a></li>
            <li><a href="/component/card">Card</a></li>
            <li><a href="/component/dialog">Dialog</a></li>
            <li><a href="/component/field">Field</a></li>
            <li><a href="/component/icon">Icon</a></li>
            <li><a href="/component/input">Input</a></li>
            <li><a href="/component/placeholder">Placeholder</a></li>
            <li><a href="/component/tooltip">Tooltip</a></li>
          </ul>
          <h6>Utilities</h6>
          <ul>
            <li><a href="/util/animation-performance">Animation performance</a></li>
            <li><a href="/util/light-style">Light style</a></li>
            <li><a href="/util/mutation-animation">Mutation animation</a></li>
            <li><a href="/util/portal">Portal</a></li>
            <li><a href="/util/stylable">Stylable</a></li>
          </ul>
          <h6>Articles</h6>
          <ul>
            <li><a href="/articles/when-to-use-shadow-dom">When to use Shadow DOM</a></li>
            <li><a href="/articles/traversing-stylesheets">Traversing style sheets</a></li>
            <li><a href="/articles/themable-icons">Themable icons</a></li>
            <li><a href="/articles/theming-and-styling-web-components">Theming and styling web components</a></li>
          </ul>
        </j-drawer>

        <j-view>
          <main>
            <div class="content"></div>
            <hr>
            <footer>
              <p>Everything licensed under Apache 2.0</p>
              <a href="https://github.com/jouni/j-elements" title="View on GitHub" class="github-link">
                <j-icon class="github-icon"></j-icon> View on GitHub
              </a>
            </footer>
          </main>
        </j-view>
      </j-app-layout>
    `;
  }

  connectedCallback() {
    const outlet = this.querySelector('.content');
    this._router = new Router(outlet);
    this._router.setRoutes([{
        path: '/(.*)', action: (context, commands) => {
          // TODO redirect old urls
          context.next();
        }
      },{
        path: '(.*)', action: (context, commands) => {
          // Needed for Router to not fail unexpectedly
          return commands.component('div');
        }
    }]);

    window.addEventListener('vaadin-router-location-changed', e => {
      const location = e.detail.location;
      if (!outlet._location || outlet._location.pathname != location.pathname) {
        const page = location.pathname == '/' ? '/src/about.md' : `/node_modules/j-elements/docs${location.pathname}.md`;
        renderMarkdown(page, outlet);
      }
      outlet._location = location;
    });

    this.classList.remove('loading');
  }
}

window.customElements.define('j-site', JSite);
