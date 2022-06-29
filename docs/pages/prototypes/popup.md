---
title: Popup
layout: page
imports:
  /src/components/HasPopup.js
eleventyNavigation:
  key: Popup
  parent: Prototypes
  order: 51
---

A base class that can be used to create components that have a popup. A click event from within the main element shows the popup. Use `slot="trigger"` to mark a dedicated trigger element.

The popup is placed below and aligned with the leading edge of the anchoring element (the first element inside the main element). Depending on the size of the popup and the available space around the anchoring element, the popup may also be placed above and aligned with the trailing edge of the anchoring element.

<render-example></render-example>
```html
<x-popup>
  <button slot="trigger">Open popup</button>
  <p>Popup content</p>
</x-popup>

<script type="module">
  import { HasPopup } from '/src/components/HasPopup.js';

  customElements.define('x-popup', class extends HasPopup {});
</script>
```

## Styling

The host element is not meant to be styled, and defines `display: contents` by default.

Use `::part(popup)` to style the popup element. A margin can be used to make space between the triggering element and the browser viewport. The margin should be uniform, meaning the same value is used for all sides of the popup.

The `--anchor-width` custom property is set on the `::part(popup)` element, and it defines the width of the triggering/anchoring element (the button in the example before). You can use it to make the popup always the same size as the triggering/anchroring element.

## Accessibility

There is no explicit accessibility role defined for the popup or any of its content, and the triggering element is not connected to the popup semantically. Those are left for specialized implementing classes to handle.

## Depends on the native dialog element

The native `<dialog>` element is used internally for the popup. When shown as "modal", it escapes any parent stacking contexts, and prevents mouse and keyboard interaction with the other parts of the page. The Escape key also closes the dialog element.

No polyfill is loaded automatically. Polyfills can't overcome the "clipping stacking context" issue.

<p class="dialog-not-supported">Your browser does not support the native <code>&lt;dialog&gt;</code> element.</p>

### Known issues

In Safari 15.4 (the first version to support the `<dialog>` element), it is not possible to focus elements inside a `<dialog>`, when the dialog is inside shadow DOM and the content is slotted into it: https://bugs.webkit.org/show_bug.cgi?id=233320#c3

This issue has been fixed in Safari 15.5.

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