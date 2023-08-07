---
title: Tooltip
layout: page
imports:
  /src/components/Tooltip.js
    /src/util/positionPopup.js
eleventyNavigation:
  key: Tooltip
  parent: Prototypes
  order: 80
---

An easy way to add customizable tooltips to any element, by simply adding the `tooltip` attribute on them. You can add a tooltip (or content with a tooltip) dynamically as well.

<render-example></render-example>
```html
<button tooltip="Add item" id="add-item">
  <icon plus></icon>
</button>

<button tooltip="Remove item" id="remove-item">
  <icon minus></icon>
</button>

<script>
document.querySelector('#add-item').addEventListener('click', function() {
  const btn = document.createElement('button');
  btn.textContent = 'Button';
  btn.setAttribute('tooltip', 'Item ' + (this.parentElement.childElementCount - 2));
  this.parentElement.append(btn);
});

document.querySelector('#remove-item').addEventListener('click', function() {
  const lastBtn = this.parentElement.querySelector('button:last-child');
  if (lastBtn) {
    this.parentElement.removeChild(lastBtn);
  }
});
</script>
```

<style>
render-example button {
  margin: 0.25rem;
}
</style>

<!--

TODO:
- configuration could be done using CSS custom props
  - `--tooltip-alignment` - on which side to show the tooltip preferably
  - `--tooltip-anchor` - QUESTION: how could this be used to set a different tooltip anchor, like an element in the shadow root of a component? Maybe as simply as using it as a CSS selector (e.g. --tooltip-anchor: '.inner-class'), and it always looks inside the shadow root (as light dom content could just as well use the "tooltip" attribute)
    - should event listeners also then be placed on that element instead of the host?
- opt-in for shadow roots, need to  call an explicit method to start monitoring DOM changes inside a shadow tree
- Read and learn (as the implementation is based on `MutationObserver`): https://stackoverflow.com/questions/31659567/performance-of-mutationobserver-to-detect-nodes-in-entire-dom

-->
