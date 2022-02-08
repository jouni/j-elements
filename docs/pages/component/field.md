---
title: Field & Field Group
layout: page
imports:
  /src/components/Field.js
  /src/components/FieldGroup.js
  /src/theme/components/field.css
permalink: /field/
eleventyNavigation:
  key: Field & Field Group
  parent: Components
---

```javascript
import { Field } from 'j-elements/src/components/Field.js';
import { FieldGroup } from 'j-elements/src/components/FieldGroup.js';
```

`<j-field>` allows you to add an accessible label and a validation message to an input element.

`<j-field-group>` allows you to group multiple checkbox or radio button fields together.

They handle accessibility for you automatically, including validation messages, without the need to manually use `id`, `for`, `aria-labelledby`, or `aria-describedby` attributes.

## Label
<render-example></render-example>
```html
<j-field>
  <label>Label</label>
  <input type="text">
</j-field>
```

## Required validation
<render-example></render-example>
```html
<j-field>
  <label>Label</label>
  <p description>Description.</p>
  <input type="text" required minlength="3">
</j-field>
```

## Pattern validation
<render-example></render-example>
```html
<j-field>
  <label>Label</label>
  <input type="text" pattern="[0-9]+">
</j-field>
```

## Custom validation message
<render-example></render-example>
```html
<j-field validation-message="You should really type something here.">
  <label>Label</label>
  <input type="text" required>
</j-field>
```

## Date input
<render-example></render-example>
```html
<j-field>
  <label>Choose a date</label>
  <input type="date" required>
</j-field>
```

## Select
<render-example></render-example>
```html
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

## Checkbox
<render-example></render-example>
```html
<j-field>
  <input type="checkbox" required>
  <label>Accept terms and conditions</label>
</j-field>
```

## Checkbox group
<render-example></render-example>
```html
<j-field-group>
  <label>Options</label>
  <p description>Description for checkbox group</p>
  <j-field>
    <input type="checkbox">
    <label>Option one</label>
  </j-field>
  <j-field>
    <input type="checkbox">
    <label>Option two</label>
  </j-field>
  <j-field>
    <input type="checkbox">
    <label>Option three</label>
  </j-field>
</j-field-group>
```

## Radio group
<render-example></render-example>
```html
<j-field-group>
  <label>Options</label>
  <j-field>
    <input type="radio" required>
    <label>Option one</label>
  </j-field>
  <j-field>
    <input type="radio">
    <label>Option two</label>
  </j-field>
  <j-field>
    <input type="radio">
    <label>Option three</label>
  </j-field>
</j-field-group>
```