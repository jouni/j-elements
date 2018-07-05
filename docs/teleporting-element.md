# Teleporting Element

A teleporting element (`src/teleporting-element.js`) can escape any stacking context, by “teleporting” itself directly under the `<body>` element when set “visible”. Moving the element under the `<body>` element is needed if any of the original parent elements creates a clipping stacking context. Some libraries call this a “portal element” or “hoisting an element under the <body>”.

```html
<style>
  .clipping-context {
    /* 3D transforms create a new stacking context,
    even for fixed positioned elements */
    transform: translateZ(0);
    overflow: hidden;
    width: 40px;
    height: 40px;
    outline: 1px solid;
  }
</style>

<div class="clipping-context">
  <!-- j-tooltip extends TeleportingElement -->
  <j-tooltip>I’m completely visible!</j-tooltip>
</div>
```

The “teleporting element” is basically an alternative implementation for [`<vaadin-overlay>`](https://github.com/vaadin/vaadin-overlay), and does not require the user to wrap the contents of the overlay in a `<template>` and does not depend on Polymer. It isn’t necessarily “better”, just an alternative approach with a bit of different benefits and drawbacks.
