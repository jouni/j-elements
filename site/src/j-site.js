import {Router} from '@vaadin/router/dist/vaadin-router.js';
import '@vaadin/vaadin-tabs';
import '@vaadin/vaadin-text-field';
import './index-page.js';
import './avatar-demo.js';
import {JAppLayout, JPlaceholder} from 'j-elements';
import '@vaadin/vaadin-lumo-styles/color.js';
import '@vaadin/vaadin-lumo-styles/typography.js';

class JSite extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <custom-style>
        <style include="lumo-typography lumo-color"></style>
      </custom-style>

      <style>
        body {
          margin: 0;
        }

        h1[slot=brand] {
          margin: 0;
          font-size: var(--lumo-font-size-l);
          color: inherit;
        }

        [slot=drawer] h6 {
          margin-top: var(--lumo-space-l);
          margin-bottom: var(--lumo-space-m);
        }

        [slot=drawer] vaadin-tab a {
          font: inherit;
          color: inherit;
          text-decoration: none;
        }

        .content {
          margin: 0 auto;
          padding: 0 var(--lumo-space-l);
          max-width: 800px;
        }

        .github-link {
          display: inline-block;
          padding: 8px;
          margin: 8px;
          color: inherit;
        }

        .github-link j-icon {
          display: block;
          --viewbox: 0 0 16 16;
          --svg: <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>;
        }
      </style>

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
            <vaadin-tab><a href="/">Getting started</a></vaadin-tab>
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
            <vaadin-tab><a href="/stylable-mixin">Stylable mixin</a></vaadin-tab>
            <vaadin-tab><a href="/teleporting-element">Teleporting element</a></vaadin-tab>
          </vaadin-tabs>
        </div>

        <div class="content"></div>
      </j-app-layout>
    `;
  }

  connectedCallback() {
    const router = new Router(this.querySelector('j-app-layout .content'));
    router.setRoutes([
      {path: '/', component: 'index-page'},
      {path: '/avatar', component: 'avatar-demo'},
      {path: '/card', component: 'card-demo'}
    ]);

    window.addEventListener('vaadin-router-route-changed', e => {
      // Update the selected tab
      Array.from(this.querySelectorAll('[slot=drawer] vaadin-tab')).find((tab, i) => {
        if (tab.querySelector('a').getAttribute('href') == e.detail.pathname) {
          this._programmaticTabChange = true;
          tab.parentNode.selected = i;
          delete this._programmaticTabChange;
          return true;
        }
      });
    });

    this.querySelector('vaadin-tabs').addEventListener('selected-changed', e => {
      if (this._programmaticTabChange) return;
      setTimeout(() => {
        this.querySelector('j-app-layout').closeDrawer();
      }, 100);
    });
  }
}

window.customElements.define('j-site', JSite);
