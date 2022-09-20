---
title: Tooltip
layout: page
imports:
  /src/components/Tooltip.js
eleventyNavigation:
  key: Tooltip
  parent: Prototypes
  order: 80
---

<render-example></render-example>
```html
<button tooltip="Add item">
  <icon plus></icon>
</button>

<button tooltip="Remove item">
  <icon minus></icon>
</button>

<script>
document.querySelector('button').addEventListener('click', function() {
  const btn = document.createElement('button');
  btn.textContent = 'Button';
  btn.setAttribute('tooltip', 'Another tooltip');
  this.parentElement.append(btn);
});

document.querySelector('button + button').addEventListener('click', function() {
  const lastBtn = this.parentElement.querySelector('button:last-child');
  if (lastBtn) {
    this.parentElement.removeChild(lastBtn);
  }
});
</script>
```

Ideas
- when you import "tooltip.js", one "tooltip controller/service" is added globally to document body
- starts a mutation observer on the document
- when a node is added/connected or removed/disconnected (or the attribute is added/removed), check if it has "tooltip" attribute, and attach/detach related event listeners
  - mousein/mouseout, focusin/focusout
  - when triggered, fetch the "tooltip" attribute text value and show the overlay
- configuration could be done using CSS custom props
  - --tooltip-alignment - on which side to show the tooltip preferably
  - --tooltip-anchor - TODO/QUESTION: how could this be used to set a different tooltip anchor, like an element in the shadow root of a component? Maybe as simply as using it as a CSS selector (e.g. --tooltip-anchor: '.inner-class'), and it always looks inside the shadow root (as light dom content could just as well use the "tooltip" attribute)
    - should event listeners also then be placed on that element instead of the host?
- opt-in for shadow roots, need to  call an explicit method to start monitoring DOM changes inside a shadow tree
  - Rich Text Editor would be an example, where each toolbar item would have its own tooltip attribute

Read and learn: https://stackoverflow.com/questions/31659567/performance-of-mutationobserver-to-detect-nodes-in-entire-dom
