import {Router} from '@vaadin/router/dist/vaadin-router.js';
import '@vaadin/vaadin-tabs';
import './index-page.js';
import './avatar-demo.js';
import {JAppLayout, JPlaceholder} from 'j-elements';

class JSite extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <j-app-layout type="top" class="drawer-visible">
        <h1 slot="brand">j-elements</h1>
        <j-placeholder slot="menu"></j-placeholder>

        <vaadin-tabs slot="drawer" orientation="vertical">
          <vaadin-tab><a href="/">Getting started</a></vaadin-tab>
          <h4>Components</h4>
          <vaadin-tab><a href="/avatar">Avatar</a></vaadin-tab>
          <vaadin-tab><a href="/card">Card</a></vaadin-tab>
          <vaadin-tab><a href="/dialog">Dialog</a></vaadin-tab>
          <vaadin-tab><a href="/field">Field</a></vaadin-tab>
          <vaadin-tab><a href="/icon">Icon</a></vaadin-tab>
          <vaadin-tab><a href="/placeholder">Placeholder</a></vaadin-tab>
          <vaadin-tab><a href="/tooltip">Tooltip</a></vaadin-tab>
          <h4>Utilities</h4>
          <vaadin-tab><a href="/stylable-mixin">Stylable mixin</a></vaadin-tab>
          <vaadin-tab><a href="/teleporting-element">Teleporting element</a></vaadin-tab>
        </vaadin-tabs>

        <div class="content"></div>
      </j-app-layout>

      <style>
        .content {
          margin: 0 auto;
          max-width: 800px;
        }
      </style>
    `;
  }

  connectedCallback() {
    const router = new Router(this.querySelector('j-app-layout .content'));
    router.setRoutes([
      {path: '/', component: 'index-page'},
      {path: '/avatar', component: 'avatar-demo'},
      {path: '/card', component: 'card-demo'}
    ]);
  }
}

window.customElements.define('j-site', JSite);
