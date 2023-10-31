---
title: Menu
layout: page
imports:
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
  <button slot="trigger">
    Open menu
  </button>
  <button disabled>
    <icon plus></icon>
    Action 1
  </button>
  <button>Action 2</button>
  <button aria-disabled="true" tooltip="This action is not available at the moment">Action 3</button>
  <hr role=none>
  <j-menu>
    <button slot="trigger">
      Additional actions
    </button>
    <button>Action 4</button>
    <j-menu>
      <button slot="trigger">
        More actions
      </button>
      <button>Action 7</button>
      <button>Action 8</button>
    </j-menu>
    <button>Action 5</button>
    <button disabled>Action 6</button>
  </j-menu>
  <hr role=none>
  <button>Action 9</button>
  <button>Action 10</button>
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

<j-field>
  <input type="checkbox" id="debug">
  <label>Reveal helper areas for mouse navigation</label>
  <p description>Enable the visibility of the helper elements to see the additional areas where you can move the mouse cursor towards sub-menu items.</p>
</j-field>
<style>
  j-menu::after {
    background: var(--debug-color);
    opacity: 0.5;
  }
</style>
<script type="module">
  import '/src/components/Field.js';
  document.querySelector('#debug').addEventListener('change', (e) => {
    document.querySelector('#example').style.setProperty('--debug-color', e.target.checked ? 'green' : '');
  });
</script>

### Known Issues

VoiceOver on Safari fails to recognize any of the elements inside the menu. I assume there's a bug in the way it handles elements that are slotted inside a modal `<dialog>` element.

Using a `tooltip` (the attribute) inside the menu is also problematic on Safari, as it seems to break keyboard navigation inside the menu. I assume Safari's focus management gets messed up or reset when elements are added or removed from the `<slot>` inside the `<dialog>`. In the example on this page, you can't navigate past the "Action 3" item, unless you keep an arrow key pressed down, which makes it seem like a timing issue related to the timeout for hiding the tooltip.
