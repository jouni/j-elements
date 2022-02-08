---
title: Light style
layout: page
eleventyNavigation:
  key: Light style
  parent: Utilities
permalink: /light-style/
---

```javascript
import {LightStyleMixin} from 'j-elements/src/util/LightStyleMixin.js';
```
<module-size modules="util/LightStyleMixin.js"></module-size>

## Problem

Shadow DOM has a non-negligible [impact on browser performance](https://bitworking.org/news/2018/02/shadow-dom-and-css). It might be better to avoid using Shadow DOM for custom elements which are used dozens of times in an app like buttons and list items.

But how do you package the built-in styling for those custom elements? The `LightStyleMixin` explores one option while we wait for [the W3C standard which allows us to do this natively](https://github.com/w3c/webcomponents/issues/468).

## Solution

Provide a lightweight mechanism to add styles to a custom element which dynamically injects them into the same scope as the element is used in.

## Example

```javascript
import {LightStyleMixin} from 'j-elements';

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
```

<render-example></render-example>
```html
<styled-element>Red and bold</styled-element>
```
