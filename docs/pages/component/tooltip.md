---
title: Field
layout: page
imports: /src/components/Tooltip.js
maturity: Preview
permalink: /tooltip/
eleventyNavigation:
  key: Tooltip
  parent: Components
---

```javascript
import {Tooltip} from 'jelly/src/components/Tooltip.js';
```
<module-size modules="components/Tooltip.js,util/DefineElementMixin.js,util/Portal.js,util/bemToShadow.js"></module-size>

A tooltip component based on [Portal](/util/portal), allowing it to escape any stacking contexts.

> **Note:** j-tooltip does not handle accessibility in any special way, for example make sure screen readers announce the tooltip content when it’s shown.

## Examples

### Simple tooltip
<render-example></render-example>
```html
<div>
  <p>This paragraph has a tooltip – hover over it see the tooltip.</p>
  <j-tooltip>Well done – here’s a tooltip as a reward!</j-tooltip>
</div>
```


### Tooltip with HTML content
<render-example></render-example>
```html
<div>
  <p>This paragraph has a tooltip – hover over it see the tooltip.</p>
  <j-tooltip style="padding: 0.75em;">
    <b>Title</b><br>
    <span>Content</span>
  </j-tooltip>
</div>
```


### Escaping a clipping stacking context
<render-example></render-example>
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
  <j-tooltip>I’m completely visible!</j-tooltip>
</div>
```


### Custom styling
<render-example></render-example>
```html
<div>
  <p>This paragraph has a tooltip – hover over it see the tooltip.</p>
  <j-tooltip class="custom-style">Tooltip with custom styles</j-tooltip>
</div>

<style>
  j-tooltip.custom-style {
    box-shadow: 0 2p 6px rgba(0,0,0,0.5);
    background-color: #fff;
    color: #000;
    padding: 0.5em;
    font-size: 1.25em;
  }
</style>
```
