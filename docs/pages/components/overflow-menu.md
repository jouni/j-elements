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

The main element needs be allowed to shrink and grow based on the available space in the surrounding layout, as a `ResizeObserver` is used on that element to react when to collapse and expand items.

> ##### Depends on the native dialog element
> The native `<dialog>` element is used internally for the overflow menu. When shown as "modal", it escapes any parent stacking contexts, and prevents keyboard focus from going to other parts of the page. The Escape key also automatically closes the dialog element.
>
> No polyfill is loaded automatically. Polyfills unfortunately can't overcome the "clipping stacking context" issue.
>
> <p class="dialog-not-supported">Your browser does not support the native <code>&lt;dialog&gt;</code> element.</p>

<render-example></render-example>
```html

<h5>Start and end aligned</h5>
<div class="layout">
  <j-overflow-menu>
    <button>Button 1</button>
    <button>Button 2</button>
    <span>Plain text</span>
    <input value="Text input">
    <button>Button 3</button>
  </j-overflow-menu>

  <j-overflow-menu class="align-end">
    <button>Button 3</button>
    <input value="Text input">
    <span>Plain text</span>
    <button>Button 2</button>
    <button>Button 1</button>
  </j-overflow-menu>
</div>
<p>Items are in reverse order in the source and not reversed by "end alignment".</p>

<h5>30 items</h5>
<j-overflow-menu class="many-items"></j-overflow-menu>

<style>
  j-overflow-menu {
    gap: 0.25rem;
  }

  j-overflow-menu span {
    margin: 0.5em;
  }

  j-overflow-menu input {
    width: 6em;
  }

  j-overflow-menu.align-end {
   justify-content: flex-end;
  }

  .layout {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .layout j-overflow-menu {
    flex: 1;
  }

  /* Style the buttons differently when they are in the overflow menu */

  button[slot=menu] {
    font: inherit;
    text-align: start;
  }

  button[slot=menu]:not(:hover):not(:active) {
    background: transparent;
  }
</style>

<script>
  for (let i = 1; i <= 30; i++) {
    const button = document.createElement('button');
    button.textContent = 'Button ' + i;
    document.querySelector('.many-items').appendChild(button);
  }
</script>
```

<script>
if (typeof HTMLDialogElement !== 'undefined') {
  document.querySelector('.dialog-not-supported').style.display = 'none';
}
</script>

<style>
.dialog-not-supported {
  color: var(--red-600);
}
</style>
