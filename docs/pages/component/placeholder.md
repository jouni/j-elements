---
title: Field
layout: page
imports: /src/components/Placeholder.js
maturity: Stable
permalink: /placeholder/
eleventyNavigation:
  key: Placeholder
  parent: Components
---

```javascript
import {Placeholder} from 'jelly/src/components/Placeholder.js';
```
<module-size modules="components/Placeholder.js,util/DefineElementMixin.js"></module-size>

## Examples

### Default placeholder

A simpler element for showing a placeholder box. The default size is 100x100 pixels.

<render-example></render-example>
```html
<j-placeholder>Placeholder</j-placeholder>
```

### Styling

You can size and change the color of the placeholder with CSS.

<render-example></render-example>
```html
<style>
.big {
  font-size: 2em;
  width: 100%;
  height: 200px;
  color: blue;
}
</style>
<j-placeholder class="big">I’m big</j-placeholder>
```
