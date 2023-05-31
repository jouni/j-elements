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
  <div role="group" aria-label="Primary actions">
    <button>Action 1</button>
    <button>Action 2</button>
    <button disabled>Action 3</button>
  </div>
  <hr>
  <j-menu>
    <button slot="trigger">Additional actions</button>
    <button>Action 4</button>
    <j-menu>
      <button slot="trigger">More actions</button>
      <button>Action 7</button>
      <button>Action 8</button>
    </j-menu>
    <button>Action 5</button>
    <button disabled>Action 6</button>
  </j-menu>
</j-menu>

<p class="clicked"></p>

<script>
  document.querySelector('#example').addEventListener('click', (e) => {
    document.querySelector('.clicked').textContent = 'Clicked: ' + e.target.textContent;
  });
</script>
```
