---
title: Overflow menu
layout: page
imports:
  /src/components/OverflowMenu.js
    /src/components/Menu.js
      /src/util/PopupMixin.js
        /src/util/positionPopup.js
eleventyNavigation:
  key: Overflow menu
  parent: Prototypes
  order: 60
---

A general purpose overflow menu component which supports any content elements. Elements which don't visually fit, are shown in the overflow menu. Uses [Menu](/prototypes/menu) internally.

The main element needs be allowed to shrink and grow based on the available space in the surrounding layout, as a `ResizeObserver` is used on that element to react when to collapse and expand items.

The overflowing items are placed in the menu by setting the `slot` attribute on the them dynamically. The benefit of this approach is that the items are not disconnected/reconnected from/to the DOM when they move to and from the menu.

<render-example></render-example>
```html
<h5>Start and end aligned</h5>
<div class="layout">
  <j-overflow-menu>
    <button>Button 1</button>
    <j-menu>
      <button slot="trigger">With sub-items</button>
      <button>Sub-item 1</button>
      <button>Sub-item 2</button>
    </j-menu>
    <button>Button 2</button>
    <div>Plain text</div>
    <input value="Text input">
    <button class="icon" tooltip="Icon button">
      <icon calendar>calendar</icon>
      <span>Icon button</span>
    </button>
    <button>Button 3</button>
  </j-overflow-menu>

  <j-overflow-menu class="align-end">
    <button>Button 3</button>
    <button class="icon" tooltip="Icon button">
      <icon calendar>calendar</icon>
      <span>Icon button</span>
    </button>
    <input value="Text input">
    <div>Plain text</div>
    <button>Button 2</button>
     <j-menu>
      <button slot="trigger">With sub-items</button>
      <button>Sub-item 1</button>
      <button>Sub-item 2</button>
    </j-menu>
    <button>Button 1</button>
  </j-overflow-menu>
</div>

<h5>30 items, with dividers</h5>
<j-overflow-menu class="many-items"></j-overflow-menu>

<style>
  j-overflow-menu.align-end {
    justify-content: flex-end;
  }

  .layout {
    display: flex;
    gap: 1rem;
  }

  .layout j-overflow-menu {
    flex: 1;
  }

  button {
    white-space: nowrap;
  }

  button.icon span {
    display: none;
  }

  button[slot=menu].icon span {
    display: inline;
  }

  /* Demo styles */
  j-overflow-menu div {
    padding: 0.5rem 1rem;
  }

  j-overflow-menu input {
    width: 6em;
  }

  /* TODO styles for the case when there is only one button visible */
</style>

<script>
  for (let i = 1; i <= 30; i++) {
    const button = document.createElement('button');
    button.textContent = 'Button ' + i;
    document.querySelector('.many-items').appendChild(button);
    if (i < 30 && i % 3 === 0) {
      document.querySelector('.many-items').appendChild(document.createElement('hr'));
    }
  }
</script>
```
