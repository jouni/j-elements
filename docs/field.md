# Field <maturity-badge proto>(Prototype)</maturity-badge>

`<j-field>` is a wrapper element that allows you to add a label and an error message to any input element.

### Text field
```html,live
<j-field>
  <label>Label</label>
  <input type="text" required>
  <p error-message>Error message</p>
</j-field>
```

### Text field (no label)
```html,live
<j-field>
  <input type="text" required>
  <p error-message>Error message</p>
</j-field>
```

### Text area
```html,live
<j-field>
  <label slot="label">Label</label>
  <textarea required></textarea>
  <p error-message>Error message</p>
</j-field>
```

### Date field
```html,live
    <j-field>
      <label slot="label">Label</label>
      <input type="date" required>
      <p error-message>Error message</p>
    </j-field>
```

### Checkbox group
```html,live
<j-field>
  <label slot="label">Label</label>
  <label><input type="checkbox"> Option</label>
  <label><input type="checkbox" required> Option</label>
  <p error-message>Error message</p>
</j-field>
```

### Radio button group
```html,live
<j-field>
  <label slot="label">Label</label>
  <label><input type="radio" required> Option</label>
  <label><input type="radio"> Option</label>
  <label><input type="radio"> Option</label>
  <p error-message>Error message</p>
</j-field>
```

### Slider
```html,live
<j-field>
  <label slot="label">Label</label>
  <input type="range">
</j-field>
```

### Vaadin Text Field
```html,live
<j-field>
  <label slot="label">Label</label>
  <vaadin-text-field required></vaadin-text-field>
  <p error-message>Error message</p>
</j-field>
```
