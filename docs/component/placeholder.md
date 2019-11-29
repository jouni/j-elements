<!--imports
/node_modules/j-elements/src/components/Placeholder.js
-->

<maturity-badge stable>(Stable)</maturity-badge>

# Placeholder

```javascript
import {Placeholder} from 'j-elements/src/components/Placeholder.js';
```
<module-size modules="components/Placeholder.js,util/DefineElementMixin.js"></module-size>

## Examples

### Default placeholder

A simpler element for showing a placeholder box. The default size is 100x100 pixels.

```html,live
<j-placeholder>Placeholder</j-placeholder>
```

### Styling

You can size and change the color of the placeholder with CSS.

```html,live
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
