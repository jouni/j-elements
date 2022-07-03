---
title: Component themes
layout: page
eleventyNavigation:
  key: Component themes
  parent: Prototypes
  order: 20
imports:
  /src/theme/components.css
---

## Component token names
Component token names are prefixed with the component name + variant + state, and suffixed with the CSS property name they are targeting:
`--[component]-[variant]-[state]-[property]`

For example, the text color for the primary button, when hovered:
`--button-primary-hover-color`

<style>
render-example.flex,
render-example > div {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

render-example h5 {
  margin-bottom: 1rem;
}

render-example.flex h5 {
  margin-top: 1em;
  margin-bottom: 0;
}

render-example:not(.flex) :is(input[type=radio], input[type=checkbox]) + :is(input[type=radio], input[type=checkbox]) {
  margin-inline-start: 1rem;
}
</style>

## Button
<render-example class="flex"></render-example>
```html
<div>
  <button theme="primary">Primary</button>
  <button>Secondary</button>
  <button theme="tertiary">Tertiary</button>
</div>
<div>
  <button theme="primary">Primary <icon chevron-down></icon></button>
  <button>Secondary <icon chevron-down></icon></button>
  <button theme="tertiary">Tertiary <icon chevron-down></icon></button>
</div>
<h5>Small</h5>
<div>
  <button theme="primary small">Primary</button>
  <button theme="small">Secondary</button>
  <button theme="tertiary small">Tertiary</button>
</div>
<div>
  <button theme="primary small">Primary <icon chevron-down></icon></button>
  <button theme="small">Secondary <icon chevron-down></icon></button>
  <button theme="tertiary small">Tertiary <icon chevron-down></icon></button>
</div>
<h5>Disabled</h5>
<div>
  <button disabled theme="primary">Primary</button>
  <button disabled>Secondary</button>
  <button disabled theme="tertiary">Tertiary</button>
</div>
```

### Button tokens
<render-props>

`--button-border-radius` `var(--border-radius-m)`

`--button-padding` `var(--size-8, 0.5rem) var(--size-12, 0.75rem)`

`--button-font` `var(--font-button)`

#### Secondary variant (default)

`--button-background` `var(--background-ui)`

`--button-hover-background` `var(--button-background, var(--background-ui-hover))`

`--button-active-background` `var(--button-background, var(--background-ui-active))`

`--button-color` `var(--color)`

`--button-border` `none`

#### Primary variant

`--button-primary-background` `var(--background-accent)`

`--button-primary-hover-background` `var(--background-accent-hover)`

`--button-primary-active-background` `var(--background-accent-active)`

`--button-primary-color` `var(--background)`

`--button-primary-border` `none`

#### Tertiary variant

`--button-tertiary-background` `transparent`

`--button-tertiary-color` `var(--color-accent)`

`--button-tertiary-hover-color` `var(--color-accent-high-contrast)`

`--button-tertiary-active-color` `var(--color)`

`--button-tertiary-border` `none`

#### Small variant

`--button-small-font` `var(--font-button-small)`

`--button-small-padding` `var(--size-6, 0.375rem) var(--size-8, 0.5rem)`

#### Disabled variant

`--button-disabled-color` `var(--color-disabled)`

`--button-disabled-background` `var(--background-ui)`
Does not apply to the tertiary variant.

`--button-disabled-border` `var(--button-border, none)`
Does not apply to the tertiary variant.

</render-props>

## Text Input
<render-example class="flex"></render-example>
```html
<div>
  <input type="text" placeholder="Text">
  <input type="date" placeholder="Date">
  <input type="datetime-local" placeholder="Date">
  <input type="email" placeholder="Email">
  <input type="number" placeholder="Number">
  <input type="password" placeholder="Password">
  <input type="tel" placeholder="Telephone">
  <input type="search" placeholder="Search">
  <input type="url" placeholder="URL">
</div>
<div>
  <textarea placeholder="Text area"></textarea>
</div>

<h5>Small</h5>
<div>
  <input type="text" theme="small" placeholder="Small">
</div>
<div>
  <textarea theme="small" placeholder="Small text area"></textarea>
</div>

<h5>Disabled</h5>
<div>
  <input type="text" value="Text" disabled>
</div>

<h5>Read-only</h5>
<div>
  <input type="text" value="Text" readonly>
</div>
```

### Text Input tokens
These tokens apply to Select as well.

<render-props>

`--textinput-background` `var(--background)`

`--textinput-hover-background` `var(--textinput-background, var(--background))`

`--textinput-active-background` `var(--textinput-background, var(--background))`

`--textinput-disabled-background` `var(--textinput-disabled-background, var(--background))`

`--textinput-readonly-background` `var(--textinput-readonly-background, var(--background))`

`--textinput-border` `var(--border-ui)`

`--textinput-hover-border` `var(--textinput-border, var(--border-ui-hover))`

`--textinput-active-border` `var(--textinput-border, var(--border-ui-active))`

`--textinput-focus-border` `var(--textinput-border, var(--border-ui-focus))`

`--textinput-disabled-border`, `1px solid var(--border-color-low-contrast)`

`--textinput-readonly-border`, `1px solid var(--border-color-low-contrast)`

`--textinput-border-radius` `var(--border-radius-m)`

`--textinput-font` `var(--font-textinput, inherit)`

`--textinput-color` `var(--color)`

`--textinput-disabled-color` `var(--color-disabled)`

`--textinput-padding` `var(--size-8, 0.5rem)`

`--textinput-small-padding` `var(--size-6, 0.375rem)`

</render-props>


## Select
<render-example></render-example>
```html
<select>
  <option>Option one</option>
  <option>Option two</option>
  <option>Option three</option>
</select>

<h5>Small</h5>
<select theme="small">
  <option>Option one</option>
  <option>Option two</option>
  <option>Option three</option>
</select>

<h5>Disabled</h5>
<select disabled>
  <option>Option one</option>
  <option>Option two</option>
  <option>Option three</option>
</select>
```

### Select tokens
See the tokens for Text Input.

<render-props>

`--select-padding-inline-end` `var(--size-32, 2rem)`
Used to reserve the space for the drop down icon, which is set as a background image.

`--select-background-image` `var(--icon-chevron-down-gray)`
A `url(data:...)`, which is used for the drop down icon. Use a neutral gray color if to support both light and dark mode with the same image/icon.

`--select-background-blend-mode` `multiply` (`screen` in dark mode)
Background blend mode is used to support the both light and dark mode with a single image/icon.

</render-props>

## Checkbox
<render-example></render-example>
```html
<input type="checkbox">
<input type="checkbox" checked>
<input type="checkbox" class="indeterminate">

<h5>Disabled</h5>
<input type="checkbox" disabled>
<input type="checkbox" disabled checked>
<input type="checkbox" disabled class="indeterminate">

<script>
[...document.querySelectorAll('input.indeterminate')].forEach(checkbox =>
  checkbox.indeterminate = true
);
</script>
```

## Radio Button
<render-example></render-example>
```html
<input type="radio" name="example">
<input type="radio" name="example" checked>

<h5>Disabled</h5>
<input type="radio" disabled name="disabled-example">
<input type="radio" disabled name="disabled-example" checked>
```

## Slider
<render-example></render-example>
```html
<input type="range">
<input type="range" disabled>
```

## Details
<render-example></render-example>
```html
<details>
  <summary>Summary</summary>
  <div>Detail contents</div>
</details>

<details theme="reverse">
  <summary>Summary</summary>
  <div>Detail contents</div>
</details>

<h5>Filled</h5>

<details theme="filled">
  <summary>Summary</summary>
  <input value="Input">
  <button>Button</button>
</details>

<details theme="filled reverse">
  <summary>Summary</summary>
  <input value="Input">
  <button>Button</button>
</details>

<h5>Disabled</h5>
To disable a details panel, set <code>tabindex="-1"</code> on the <code>&lt;summary&gt;</code> element.
<details>
  <summary tabindex="-1">Summary</summary>
  <div>Detail contents</div>
</details>

<details open>
  <summary tabindex="-1">Summary</summary>
  <div>Detail contents</div>
</details>
```
<style>
details + details {
  margin-top: 1rem;
}
</style>

<!--
## Definition list
TODO: key-value pairs nicely laid out and styles (horizontal and vertical)
 -->

## Vertical alignment
<render-example></render-example>
```html
<script type="module">
  import '/src/components/InputDecorator.js';
  import '/src/components/Field.js';
</script>

<span style="vertical-align: middle;">Text</span>
<button><icon search></icon> Button</button>
<j-input-decorator>
  <icon search slot="prefix"></icon>
  <input type="text" value="Text input">
</j-input-decorator>
<j-field>
  <input type="checkbox">
  <label>Checkbox</label>
</j-field>
<j-field>
  <input type="checkbox" checked>
  <label>Checkbox</label>
</j-field>
```
