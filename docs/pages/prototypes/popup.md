---
title: Popup
layout: page
imports:
  /src/util/PopupMixin.js
  /src/util/positionPopup.js
eleventyNavigation:
  key: Popup
  parent: Prototypes
  order: 51
---

A mixin class that can be used to create components that have a popup. Use `slot="trigger"` to mark the trigger element. Clicking on the trigger element toggles the popup.

The popup is placed below and aligned with the leading edge of the trigger element. Depending on the size of the popup and the available space around the trigger element, the popup may also be placed above and aligned with the trailing edge of the trigger element.

<render-example></render-example>

```html
<x-popup>
  <button slot="trigger">Open popup</button>
  <p>Popup content</p>
</x-popup>

<script type="module">
  import { PopupMixin } from '/src/util/PopupMixin.js';

  customElements.define('x-popup', class extends PopupMixin(HTMLElement) {});
</script>
```

## Styling

The host element is not meant to be styled.

Use `::part(popup)` to style the popup element.
<!-- A margin can be used to make space between the triggering element and the browser viewport. The margin should be uniform, meaning the same value is used for all sides of the popup. -->

The `--trigger-width` and `--trigger-height` custom properties are set on the host element, and they define the width and height of the trigger element (the button in the example before). You can use it to make the popup always the same size as the trigger element.

## Accessibility

The trigger element defines `aria-haspopup="dialog"`. Other than that, there's no explicit accessibility role defined for the popup or any of its content. Those are left for specialized implementing classes to handle.

## Depends on the native dialog element

The native `<dialog>` element is used internally for the popup. When shown as "modal", it escapes any parent stacking contexts, and prevents mouse and keyboard interaction with the other parts of the page. The Escape key also closes the dialog element.

No polyfill is loaded automatically. Polyfills can't overcome the "clipping stacking context" issue.

<p class="dialog-not-supported">Your browser does not support the native <code>&lt;dialog&gt;</code> element.</p>

### Known Issues

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
