import {Router} from '@vaadin/router';
import '@vaadin/vaadin-tabs';
import '@vaadin/vaadin-text-field';
import 'j-elements';
import './maturity-badge.js';

// Needed for docs example
import {MutationAnimationMixin} from 'j-elements';
class MyList extends MutationAnimationMixin(HTMLElement) {}
window.customElements.define('my-list', MyList);

// Pages
import './index.js';

class JSite extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <j-app-layout type="top">
        <h1 slot="brand">JElements</h1>

        <a href="https://github.com/jouni/j-elements" slot="support" title="View on GitHub" class="github-link">
          <j-icon class="github-icon"></j-icon>
        </a>

        <vaadin-tabs orientation="vertical" slot="drawer">
          <h6>Introduction</h6>
          <vaadin-tab><a tabindex="-1" href="/">About</a></vaadin-tab>
          <vaadin-tab><a tabindex="-1" href="/howto">Get Started</a></vaadin-tab>
          <vaadin-tab><a tabindex="-1" href="/maturity">Maturity Levels</a></vaadin-tab>
          <h6>Foundation</h6>
          <vaadin-tab><a tabindex="-1" href="/foundation/color">Color palette</a></vaadin-tab>
          <h6>Components</h6>
          <vaadin-tab><a tabindex="-1" href="/app-layout">App Layout</a></vaadin-tab>
          <vaadin-tab><a tabindex="-1" href="/avatar">Avatar</a></vaadin-tab>
          <vaadin-tab><a tabindex="-1" href="/card">Card</a></vaadin-tab>
          <vaadin-tab><a tabindex="-1" href="/dialog">Dialog</a></vaadin-tab>
          <vaadin-tab><a tabindex="-1" href="/field">Field</a></vaadin-tab>
          <vaadin-tab><a tabindex="-1" href="/icon">Icon</a></vaadin-tab>
          <vaadin-tab><a tabindex="-1" href="/input">Input</a></vaadin-tab>
          <vaadin-tab><a tabindex="-1" href="/placeholder">Placeholder</a></vaadin-tab>
          <vaadin-tab><a tabindex="-1" href="/tooltip">Tooltip</a></vaadin-tab>
          <h6>Utilities</h6>
          <vaadin-tab><a tabindex="-1" href="/light-style-element">Light Style Element</a></vaadin-tab>
          <vaadin-tab><a tabindex="-1" href="/mutation-animation">Mutation Animation Mixin</a></vaadin-tab>
          <vaadin-tab><a tabindex="-1" href="/portal-element">Portal Element</a></vaadin-tab>
          <vaadin-tab><a tabindex="-1" href="/stylable-mixin">Stylable Mixin</a></vaadin-tab>
          <vaadin-tab><a tabindex="-1" href="/teleporting-element">Teleporting Element</a></vaadin-tab>
        </vaadin-tabs>

        <div class="content"></div>
      </j-app-layout>
    `;
  }

  connectedCallback() {
    const tabs = this.querySelector('vaadin-tabs[slot=drawer]');
    // Let router choose which tab to select
    tabs.selected = -1;

    this._router = new Router(this.querySelector('j-app-layout .content'));
    this._router.setRoutes({
      path: '(.*)', component: 'index-page'
    });

    window.addEventListener('vaadin-router-location-changed', e => {
      // Update the selected tab
      Array.from(tabs.querySelectorAll('vaadin-tab')).find((tab, i) => {
        if (tab.querySelector('a').getAttribute('href') == e.detail.location.pathname) {
          this._updateTitle(tab.textContent);
          if (this._blockLocationChangeListener) {
            this._blockLocationChangeListener = false;
            // Finish Array.find
            return true;
          }

          this._blockTabChangeListener = true;
          tab.parentNode.selected = i;

          // Finish Array.find
          return true;
        }
      });
    });

    tabs.addEventListener('selected-changed', e => {
      if (this._blockTabChangeListener) {
        this._blockTabChangeListener = false;
        return;
      }

      // Possibly triggered by keyboard navigation, so we need to update the URL just in case
      const tab = tabs.items[e.detail.value];
      const path = tab.querySelector('a').getAttribute('href');
      this._blockLocationChangeListener = true;
      this._router.render(path, true);
      this._updateTitle(tab.textContent);

      // Close drawer
      setTimeout(() => {
        this.querySelector('j-app-layout').closeDrawer();
      }, 100);
    });
  }

  _updateTitle(pageTitle) {
    document.title = `JElements: ${pageTitle}`;
    // Update navbar text
    this.querySelector('h1[slot=brand]').innerHTML = '<span class="logo">j</span> ' + pageTitle;
  }
}

window.customElements.define('j-site', JSite);
