---
title: Overflow Menu
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

## Aligned to Start
<render-example></render-example>
```html
<j-overflow-menu>
  <button>Button 1</button>
  <button>Button 2</button>
  <button>Button 3</button>
  <button>Button 4</button>
  <button>Button 5</button>
  <button>Button 6</button>
  <button>Button 7</button>
  <button>Button 8</button>
</j-overflow-menu>
```

## Aligned to End
<render-example></render-example>
```html
<j-overflow-menu class="align-end">
  <button>Button 1</button>
  <button>Button 2</button>
  <button>Button 3</button>
  <button>Button 4</button>
  <button>Button 5</button>
  <button>Button 6</button>
  <button>Button 7</button>
  <button>Button 8</button>
</j-overflow-menu>

<style>
  j-overflow-menu.align-end {
    justify-content: flex-end;
  }
</style>
```

## Dividers
<render-example></render-example>
```html
<j-overflow-menu>
  <button>Button 1</button>
  <button>Button 2</button>
  <button>Button 3</button>
  <button>Button 4</button>
  <hr>
  <button>Button 5</button>
  <button>Button 6</button>
  <button>Button 7</button>
  <button>Button 8</button>
  <hr>
  <button>Button 9</button>
  <button>Button 10</button>
  <button>Button 11</button>
  <button>Button 12</button>
</j-overflow-menu>

```


## Forced Overflow, Custom Overflow Button
<render-example></render-example>
```html
<j-overflow-menu>
  <button>Button 1</button>
  <button class="overflow-menu">Button 2</button>
  <button class="overflow-menu">Button 3</button>
  <button class="overflow-menu">Button 4</button>
  <button class="overflow-menu">Button 5</button>
  <button slot="overflow-button">
    <icon chevron-down>More buttons</icon>
  </button>
</j-overflow-menu>
```


## Custom Items
<render-example></render-example>
```html
<j-overflow-menu>
  <!-- Item with a sub-menu -->
  <j-menu>
    <button slot="trigger">Sub-items</button>
    <button>Sub-item 1</button>
    <button>Sub-item 2</button>
     <j-menu>
      <button slot="trigger">More items <icon chevron-right directional></icon></button>
      <button>Sub-item 3</button>
      <button>Sub-item 4</button>
    </j-menu>
  </j-menu>

  <!-- Plain text item -->
  <div style="padding: 0.5rem 1rem;">Plain text</div>

  <!-- Text input item -->
  <input value="Text input">

  <!-- Icon button item -->
  <button class="icon" tooltip="Icon button">
    <icon calendar>calendar</icon>
    <span>Icon button</span>
  </button>
</j-overflow-menu>

<style>
  /* Hide icon button label when not inside the overflow menu */
  button.icon:not([slot=menu]) span {
    display: none;
  }
</style>
```
