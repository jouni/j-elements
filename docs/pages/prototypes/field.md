---
title: Form fields
layout: page
imports:
  /src/components/Field.js
  /src/components/FieldGroup.js
eleventyNavigation:
  key: Form fields
  parent: Prototypes
  order: 40
---

<!-- TODO Disabled fields and field groups -->

## Label and Description
Wrap any native input element and a label with `<j-field>`, and accessibility is handled for you automatically without the need to manually use `id`, `for`, `aria-labelledby`, or `aria-describedby` attributes.

<render-example></render-example>
```html
<j-field>
  <label>Label</label>
  <p description>Description for the input</p>
  <input type="text">
</j-field>
```

## Validation Messages

Validation messages are provided by the browsers by default, but you can provide a custom message as well. Again, no need to use `id` or `aria-describedby` attributes.

### Required Validation
<render-example></render-example>
```html
<j-field>
  <label>Label</label>
  <input type="text" required minlength="3">
</j-field>
```

### Pattern Validation
<render-example></render-example>
```html
<j-field>
  <label>Label</label>
  <div description>Only numbers are accepted</div>
  <input type="text" pattern="[0-9]+">
</j-field>
```

### Custom Validation Message
<render-example></render-example>
```html
<j-field validation-message="You should really type something here.">
  <label>Label</label>
  <input type="text" required>
</j-field>
```

## Input Types

All native input types are supported without extra effort.

### Date Input
<render-example></render-example>
```html
<j-field>
  <label>Label</label>
  <input type="date" required>
</j-field>
```

### Text Area
<render-example></render-example>
```html
<j-field>
  <label>Label</label>
  <textarea></textarea>
</j-field>
```

### Select
<render-example></render-example>
```html
<j-field>
  <label>Options</label>
  <div description>Description for options</div>
  <select required>
    <option value="" disabled selected>Choose one</option>
    <option>Option one</option>
    <option>Option two</option>
    <option>Option three</option>
  </select>
</j-field>
```

### Checkbox
<render-example></render-example>
```html
<j-field>
  <input type="checkbox" required>
  <label>Accept terms and conditions</label>
  <p description>You need to accept these before continuing</p>
</j-field>
```

### Upload
<render-example></render-example>
```html
<j-field>
  <label>Upload a file</label>
  <input type="file" required accept="application/pdf,.pdf">
</j-field>
```


## Field Group

<!-- TODO remove, replace with <fieldset> + <legend> -->
<!-- OR hmm, how do you create a more complex fieldset then? -->

`<j-field-group>` allows you to group multiple checkbox or radio button fields together. For radio buttons, you don't need to decide on a name for the group, if you don't want to.

### Checkbox Group

<render-example></render-example>
```html
<j-field-group aria-labelledby="foo">
  <label id="foo">Options</label>
  <p description>Description for checkbox group</p>
  <label>
    <input type="checkbox">
    Option one
  </label>
  <label>
    <input type="checkbox">
    Option two
  </label>
  <label>
    <input type="checkbox">
    Option three
  </label>
</j-field-group>
```

### Radio Group
<render-example></render-example>
```html
<j-field-group>
  <label>Options</label>
  <label>
    <input type="radio" required>
    Option one
  </label>
  <label>
    <input type="radio">
    Option two
  </label>
  <label>
    <input type="radio">
    Option three
  </label>
</j-field-group>
```

### Text Input Group
<render-example></render-example>
```html
<j-field-group>
  <label>Multiple inputs</label>
  <div description>Helper text for group</div>
  <div>
    <j-field inline>
      <label>One</label>
      <input type="text">
    </j-field>
    <j-field inline>
      <label>Two</label>
      <input type="text">
    </j-field>
    <j-field inline>
      <label>Three</label>
      <input type="text">
    </j-field>
  </div>
</j-field-group>
```

## Aligning with Other Components

### Text Input and Prefix Content and Button
<render-example></render-example>
```html
<script type="module">
import '/src/components/InputDecorator.js';
</script>

<j-field>
  <label>Label</label>
  <div description>Describe the purpose of this field</div>
  <div>
    <j-input-decorator>
      <icon slot="prefix" search style="margin: 0 0.5em"></icon>
      <input type="text" required>
    </j-input-decorator>
    <button>Button <icon chevron-down></icon></button>
  </div>
</j-field>
```

### Text Input and Checkbox
<render-example></render-example>
```html
<j-field>
  <label>Label</label>
  <div>
    <input type="text">
    <j-field>
      <input type="checkbox">
      <label>Checkbox</label>
    </j-field>
  </div>
</j-field>
```
