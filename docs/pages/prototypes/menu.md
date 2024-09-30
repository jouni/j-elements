---
title: Menu
layout: page
imports:
  /src/theme/body.css
  /src/components/Menu.js
    /src/util/PopupMixin.js
      /src/util/positionPopup.js
eleventyNavigation:
  key: Menu
  parent: Prototypes
  order: 55
---

The menu component is based on [Popup](/prototypes/popup).

<render-example></render-example>

```html
<j-menu id="example">
  <button slot="trigger">Open menu</button>
  <button><icon plus></icon> Action 1</button>
  <button>Action 2</button>
  <j-menu>
    <button slot="trigger">Additional actions</button>
    <button>Action 6</button>
    <j-menu>
      <button slot="trigger">More actions</button>
      <button>Action 9</button>
      <button>Action 10</button>
    </j-menu>
    <button>Action 7</button>
    <hr role=none>
    <button disabled>Action 8</button>
  </j-menu>
  <hr role=none>
  <button>Action 3</button>
  <button aria-disabled="true" tooltip="This action is not available at the moment">Action 4</button>
  <button disabled>Action 5</button>
</j-menu>

<p class="clicked"></p>

<script>
  document.querySelector('#example').addEventListener('click', (e) => {
    document.querySelector('.clicked').textContent = 'Clicked: ' + e.target.textContent;
  });
</script>
```

## Accessibility

### Graceful Mouse Navigation

When navigating to sub-menus with the mouse, you can move the mouse cursor diagonally towards the items in the sub-menu, across other items in the parent menu.

<b>In the following example, the helper areas for sub-menu navigation are visible.</b>

<j-menu class="show-helper-areas">
  <button slot="trigger">Open menu</button>
  <button><icon plus></icon> Action 1</button>
  <button>Action 2</button>
  <j-menu>
    <button slot="trigger">Additional actions</button>
    <button>Action 6</button>
    <j-menu>
      <button slot="trigger">More actions</button>
      <button>Action 9</button>
      <button>Action 10</button>
    </j-menu>
    <button>Action 7</button>
    <hr role=none>
    <button disabled>Action 8</button>
  </j-menu>
  <hr role=none>
  <button>Action 3</button>
  <button aria-disabled="true" tooltip="This action is not available at the moment">Action 4</button>
  <button disabled>Action 5</button>
</j-menu>

<style>
  .show-helper-areas j-menu::after {
    background: var(--fg);
    opacity: 0.5;
  }
</style>

### Known Issues
<b>Update</b>: This doesn't seem to be the case anymore in Safari 18, and possibly some earlier versions also.
~~VoiceOver on Safari fails to recognize any of the elements inside the menu. I assume there's a bug in the way it handles elements that are slotted inside a modal `<dialog>` element.~~

<!-- Added a workaround in Tooltip.js that moves the focus back to a focused element that triggers a tooltip, for the issue described below -->
<!-- Using a `tooltip` (the attribute) inside the menu is also problematic on Safari, as it seems to break keyboard navigation inside the menu. I assume Safari's focus management gets messed up or reset when elements are added or removed from the `<slot>` inside the `<dialog>`. In the example on this page, you can't navigate past the "Action 3" item, unless you keep an arrow key pressed down, which makes it seem like a timing issue related to the timeout for hiding the tooltip. -->
