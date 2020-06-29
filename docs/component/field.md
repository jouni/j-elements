<!--imports
/node_modules/j-elements/src/components/Field.js
/node_modules/j-elements/src/components/Input.js
-->

<maturity-badge preview>(Preview)</maturity-badge>

# Field

```javascript
import {Field} from 'j-elements/src/components/Field.js';
```
<module-size modules="components/Field.js,util/DefineElementMixin.js,util/LightStyleMixin.js,util/css.js"></module-size>

`<j-field>` is a wrapper element that allows you to add a label and an error message to any input element.

It handles accessibility for you automatically, without the need to manually use `id` and `for` attributes to bind the label and the field, as well as showing validation error messages (and making them accessible as well).

> The label is currently announces twice on VoiceOver on macOS Safari.

## Label
```html,live
<j-field>
  <label>Label</label>
  <j-input></j-input>
</j-field>
```

## Required validation
```html,live
<j-field>
  <label>Label</label>
  <j-input required minlength="3"></j-input>
</j-field>
```

## Pattern validation
```html,live
<j-field>
  <label>Label</label>
  <j-input pattern="[0-9]+"></j-input>
</j-field>
```

## Custom error message
```html,live
<j-field>
  <label>Label</label>
  <j-input required error-message="You should really type something here"></j-input>
</j-field>
```

## Native text input
```html,live
<j-field>
  <label>Label</label>
  <input type="text" required pattern="[0-9]+">
</j-field>
```

## Native date input
```html,live
<j-field>
  <label>Choose a date</label>
  <input type="date" required>
</j-field>
```

## Native select
```html,live
<j-field>
  <label>Select an option</label>
  <select required>
    <option></option>
    <option>Option one</option>
    <option>Option two</option>
    <option>Option three</option>
  </select>
</j-field>
```
