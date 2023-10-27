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
    <icon chevron-down></icon>
  </button>
  <button disabled>
    <icon plus></icon>
    Action 1
  </button>
  <button>Action 2</button>
  <button aria-disabled="true" tooltip="This action is not available at the moment">Action 3</button>
  <hr>
  <j-menu>
    <button slot="trigger">
      Additional actions
      <icon chevron-right directional></icon>
    </button>
    <button>Action 4</button>
    <j-menu>
      <button slot="trigger">
        More actions
        <icon chevron-right directional></icon>
      </button>
      <button>Action 7</button>
      <button>Action 8</button>
    </j-menu>
    <button>Action 5</button>
    <button disabled>Action 6</button>
  </j-menu>
  <hr>
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

<!--
TODO: Instead of relying on a dynamically generated svg that you hover over, use the distance of the pointer from the submenu is an indication if the user is moving towards it. If the user continues to move closer within a 300ms timer, then keep the menu open and ignore events on other menu items.

Inspiration: https://www.youtube.com/watch?v=o0NtjY17v5w

-->
