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

The menu utilizes the [`PopupMixin`](/prototypes/popup) base class.

<render-example></render-example>
```html
<j-menu>
  <button slot="trigger">
    Open menu
    <icon chevron-down></icon>
  </button>
  <div role="group" aria-label="Primary actions">
    <button>Action 1</button>
    <button>Action 2</button>
    <button>Action 3</button>
  </div>
  <hr>
  <j-menu>
    <button slot="trigger">Open sub-menu</button>
    <button disabled>Action 4</button>
    <button>Action 5</button>
    <button>Action 6</button>
  </j-menu>
</j-menu>

<p class="clicked"></p>

<script>
  document.querySelector('j-menu').addEventListener('item-click', (e) => {
    document.querySelector('.clicked').textContent = 'Clicked: ' + e.target.textContent;
  });
</script>
```
