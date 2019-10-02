# Input <maturity-badge preview>(Preview)</maturity-badge>

```javascript
import {JInput} from 'j-elements';
```

## Problem

The native `<input>` element is not styled consistently across different browsers and does not allow placing additional content inside it.

## Solution

`<j-input>` is a text input element which adds prefix and suffix element support, multi-line and autosizing (both horizontal and vertical) for the native `<input>` element.


---


## Examples

### Default configuration
```html,live
<j-input placeholder="Type here"></j-input>
```

### Autosize
```html,live
<j-input value="Auto width" autosize></j-input>
```

### Number input
With prefix and suffix elements.
```html,live
<j-input value="123" type="number" autosize>
  <span slot="start">$</span>
  <span slot="end" style="margin-left: 0;">.00</span>
</j-input>
```

> Autosize does not work correctly with `type="number"` in Firefox

### Multi-line
Multi-line inputs are user-resizable by default in both directions. You can control this with the `resize` CSS property.
```html,live
<j-input multiline placeholder="Type a lot here"></j-input>
```

### Multi-line, autosize
The autosizing multi-line input prevents user-resizing by default.
```html,live
<j-input multiline value="Auto\nheight" autosize></j-input>
```

## Styling

The input can be styled similarly as the native `<input>` element, using border, background, padding, box-shadow, display, etc.

The only exception is the `:focus`, `:focus-visible`, `:disabled` and `:invalid` pseudo-classes – use the `[focus]`, `[focus-visible]`, `[disabled]` and `[invalid]` state attributes instead.

```html,live
<j-input class="custom"></j-input>

<style>
  j-input.custom {
    border: 2px solid #000;
    background-color: #eee;
    font-weight: bold;
    padding: 0.8em 1em;
    border-radius: 1em;
  }

  j-input.custom:hover {
    border-color: #666;
    background-color: #fff;
  }

  j-input.custom[focus] {
    outline: none;
    border-color: orange;
    box-shadow: 0 0 0 4px yellow;
  }
</style>
```
