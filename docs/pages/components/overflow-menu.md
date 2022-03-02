---
title: Overflow menu
layout: page
imports:
  /src/components/OverflowMenu.js
  /src/theme/colors.css
  /src/theme/tokens.css
  /src/theme/components.css
permalink: /overflow-menu/
eleventyNavigation:
  key: Overflow menu
  parent: Components
---

Thinking of ways to implement a general purpose overflow menu component, which doesn't care about the type of components that are placed inside it. Any component which doesn't visually fit, will be placed in the overflow menu.

<render-example></render-example>
```html
<!--
<j-overflow-menu>
  <button>Button 1</button>
  <button>Button 2</button>
  <input type="text" value="Text input">
  <button>Button 3</button>
  <div class="divider"></div>
  <button>Button 4</button>
</j-overflow-menu>

<j-overflow-menu class="align-end">
  <button>Button 1</button>
  <button>Button 2</button>
  <input type="text" value="Text input">
  <button>Button 3</button>
  <div class="divider"></div>
  <button>Button 4</button>
</j-overflow-menu>
-->
<div class="layout">
  <j-overflow-menu>
    <button>Button 1</button>
    <button>Button 2</button>
    <input type="text" value="Text input">
    <button>Button 3</button>
    <div class="divider"></div>
    <button>Button 4</button>
  </j-overflow-menu>
  <j-overflow-menu class="align-end">
    <button>Button 1</button>
    <input type="text" value="Text input">
    <button>Button 2</button>
    <div class="divider"></div>
    <button>Button 3</button>
    <button>Button 4</button>
  </j-overflow-menu>
</div>

<style>
j-overflow-menu {
  gap: 0.25rem;
}

j-overflow-menu.align-end {
  --align: flex-end;
}

.layout {
  display: flex;
  align-items: center;
}

.layout j-overflow-menu {
  flex: 1;
}

.divider {
  width: 1px;
  align-self: stretch;
  background-color: var(--border-color-low-contrast);
  margin: 0.25rem;
}

.divider[slot="overflow"] {
  width: auto;
  height: 1px;
}
</style>
```

The implementation is far from ideal. Accessibility has barely been considered, or any other intricacies with modal overlay menus. Also, since the overflow menu is not placed directly under the `<body>` element, any clipping stacking context issues are just waiting to happen. The menu position is also not taking into account if it's outside the browser viewport.
