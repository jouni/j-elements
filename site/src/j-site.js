import {Router} from '@vaadin/router/dist/vaadin-router.js';
import '@vaadin/vaadin-tabs';
import '@vaadin/vaadin-text-field';
import 'j-elements';
import '@vaadin/vaadin-lumo-styles/color.js';
import '@vaadin/vaadin-lumo-styles/typography.js';
import './shared-styles.js';

// Pages
import './index.js';

class JSite extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <custom-style>
        <style include="shared-styles"></style>
      </custom-style>

      <style type="scoped" for="j-app-layout">
        /* Uncomment this to have a colored navbar */
        /* .navbar.navbar.navbar.navbar {
          background-color: var(--lumo-primary-color);
          color: var(--lumo-primary-contrast-color);
          margin-bottom: 1em;
        } */
      </style>

      <j-app-layout type="top">
        <h1 slot="brand">j-elements</h1>

        <a href="https://github.com/jouni/j-elements" slot="support" title="View on GitHub" class="github-link">
          <j-icon class="github-icon"></j-icon>
        </a>

        <div slot="drawer">
          <vaadin-tabs orientation="vertical">
          <vaadin-tab><a href="/">About</a></vaadin-tab>
          <vaadin-tab><a href="/howto">Get Started</a></vaadin-tab>
          <h6>Components</h6>
          <vaadin-tab><a href="/app-layout">App Layout</a></vaadin-tab>
          <vaadin-tab><a href="/avatar">Avatar</a></vaadin-tab>
          <vaadin-tab><a href="/card">Card</a></vaadin-tab>
          <vaadin-tab><a href="/dialog">Dialog</a></vaadin-tab>
          <vaadin-tab><a href="/field">Field</a></vaadin-tab>
          <vaadin-tab><a href="/icon">Icon</a></vaadin-tab>
          <vaadin-tab><a href="/placeholder">Placeholder</a></vaadin-tab>
          <vaadin-tab><a href="/tooltip">Tooltip</a></vaadin-tab>
          <h6>Utilities</h6>
          <vaadin-tab><a href="/stylable-mixin">Stylable Mixin</a></vaadin-tab>
          <vaadin-tab><a href="/teleporting-element">Teleporting Element</a></vaadin-tab>
          </vaadin-tabs>
        </div>

        <div class="content"></div>
      </j-app-layout>
    `;
  }

  connectedCallback() {
    const tabs = this.querySelector('[slot=drawer] vaadin-tabs');
    // Let router choose which tab to select
    tabs.selected = -1;

    const router = new Router(this.querySelector('j-app-layout .content'));
    router.setRoutes({
      path: '(.*)',
      component: 'index-page',
    });

    window.addEventListener('vaadin-router-route-changed', e => {
      // Update the selected tab
      Array.from(tabs.querySelectorAll('vaadin-tab')).find((tab, i) => {
        if (tab.querySelector('a').getAttribute('href') == e.detail.pathname) {
          this._programmaticTabChange = true;
          tab.parentNode.selected = i;
          delete this._programmaticTabChange;

          // Update navbar text
          this.querySelector('h1').innerHTML = tab.textContent;

          // Finish Array.find
          return true;
        }
      });
    });

    tabs.addEventListener('selected-changed', e => {
      if (!this._programmaticTabChange) {
        // Possibly triggered by keyboard navigation, so we need to update the URL just in case
        const tab = tabs.items[e.detail.value];
        const path = tab.querySelector('a').getAttribute('href');
        router.render(path);

        // Close drawer
        setTimeout(() => {
          this.querySelector('j-app-layout').closeDrawer();
        }, 100);
      }
    });
  }
}

window.customElements.define('j-site', JSite);
