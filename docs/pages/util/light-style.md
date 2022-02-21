---
title: Light style
layout: page
eleventyNavigation:
  key: Light style
  parent: Utilities
permalink: /light-style/
imports: /src/util/LightStyleMixin.js
---

## Problem

Shadow DOM has a non-negligible [impact on browser performance](https://bitworking.org/news/2018/02/shadow-dom-and-css). It might be better to avoid using Shadow DOM for custom elements which are used dozens of times in an app like buttons and list items.

But how do you package the built-in styling for those custom elements? The `LightStyleMixin` explores one option while we wait for [the W3C standard which allows us to do this natively](https://github.com/w3c/webcomponents/issues/468).

## Solution

Provide a lightweight mechanism to add styles to a custom element which dynamically injects them into the same scope as the element is used in.

## Example
<render-example></render-example>
```html
<script type="module">
  import { LightStyleMixin } from '/src/util/LightStyleMixin.js';

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
</script>

<styled-element>Red and bold</styled-element>
```
