---
title: Portal
layout: page
eleventyNavigation:
  key: Portal
  parent: Utilities
permalink: /portal/
---

```javascript
import {Portal} from 'j-elements/src/util/Portal.js';
```
<module-size modules="util/Portal.js,util/bemToShadow.js"></module-size>

## Problem

Showing an element on top of all other content on the page regardless of its position in the element hierarchy is sometimes tricky.

Unless you know the full element hierarchy “above” the element that needs to be shown on top of all others, you have to be prepared that there might be a clipping stacking context somewhere in the hierarchy which ends up clipping your element.

The problem is most apparent when creating a reusable overlay element.

## Solution

Most often, this problem is solved by declaring such elements directly under the `<body>` element, which guarantees they are inside the topmost stacking context on the page. This makes it tricky to manage the elements when building modular applications.

`Portal` allows you to define an element anywhere in the hierarchy and, when enabled, move itself (and its contents) under the `<body>` element.

`Portal` supports one level of nested `<slot>` elements, making it suitable for compositions.

<!--
## Examples

See the [Dialog](/dialog) and [Tooltip](/tooltip) components.
-->

---

## Limitations

### Additional/unexpected lifecycle callbacks
When the `portalEnabled` property is toggled the `disconnectedCallback` and `connectedCallback` are called on the element as well as on any contained custom elements.

### Styles for an enabled portal can not be scoped by the parent
CSS selectors that use their original HTML context to target the portal element or its children do not work when the portal is enabled.

```html
<div class="parent">
  <!-- Assuming we have created a custom portal-element using Portal -->
  <portal-element>
    <p>I will be red</p>
  </portal-element>

  <portal-element enabled>
    <p>I will not be red</p>
  </portal-element>
</div>

<style>
  .parent portal-element {
    color: red;
  }
</style>
```

### DOM hierarchy changes for an enabled portal
`querySelector` and `querySelectorAll` do not work across the element boundary when the portal is enabled.

```javascript
document.querySelector('.parent portal-element p'); // Returns <p> element
portal.portalEnabled = true;
document.querySelector('.parent portal-element p'); // Returns null
```

You need to get a reference to the element before enabling the portal, and access any child elements through that reference. For example:
```javascript
const portal = querySelector('.parent portal-element');
portalEnabled = true;
portal.querySelector('p'); // Returns <p> element
```
