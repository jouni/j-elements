---
title: Components
layout: page
eleventyNavigation:
  key: Components
  parent: Prototypes
  order: 20
imports:
  /src/theme/button.css
  /src/theme/tooltip.css
---

## Token Names
Token names are prefixed with the component name + variant + state, and suffixed with the CSS property name they are targeting:
`--[component]-[variant]-[state]-[property]`

For example, the font for the small button variant:
`--button-small-font`

<style>
render-example.flex {
  --display: flex;
  --flex-wrap: wrap;
  --gap: 1rem;
}

render-example.flex,
render-example > div {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

render-example :is(h5, h6) {
  width: 100%;
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

Buttons don't define a fixed height. They are sized by their content. Different states are indicated with a background or text color change, with a subtle transition.

<j-field>
  <label>Button Color</label>
  <j-select id="button-color">
    <button slot="trigger" class="small">Choose value</button>
    <div role="option" selected>Neutral</div>
    <div role="option">Accent</div>
  </j-select>
</j-field>
<script>
  document.querySelector('#button-color').onchange = (e) => {
    document.querySelectorAll('render-example.buttons button').forEach(button => {
      // button.classList.toggle('accent', e.detail.value == 'Accent');
      button.setAttribute('theme', e.detail.value.toLowerCase());
    });
  }
</script>

<render-example class="flex buttons"></render-example>
```html

<div>
  <button class="primary">Primary</button>
  <button>Secondary</button>
  <button class="outline">Outline</button>
  <button class="ghost">Ghost</button>
</div>
<div>
  <button class="primary">Primary <icon chevron-down></icon></button>
  <button>Secondary <icon chevron-down></icon></button>
  <button class="outline">Outline <icon sun></icon></button>
  <button class="ghost">Ghost <icon arrow-right></icon></button>
</div>
<h5>Small</h5>
<div>
  <button class="primary small">Primary</button>
  <button class="small">Secondary</button>
  <button class="outline small">Outline</button>
  <button class="ghost small">Ghost</button>
</div>
<div>
  <button class="primary small">Primary <icon chevron-down></icon></button>
  <button class="small">Secondary <icon chevron-down></icon></button>
  <button class="outline small">Outline <icon sun></icon></button>
  <button class="ghost small">Ghost <icon arrow-right></icon></button>
</div>
<h5>Icon</h5>
<div>
  <button class="primary"><icon search></icon></button>
  <button><icon search></icon></button>
  <button class="outline"><icon search></icon></button>
  <button class="ghost"><icon search></icon></button>
</div>
<div>
  <button class="primary small"><icon search></icon></button>
  <button class="small"><icon search></icon></button>
  <button class="outline small"><icon search></icon></button>
  <button class="ghost small"><icon search></icon></icon></button>
</div>
<h5>Disabled</h5>
<div>
  <h6>Native</h6>
  <button disabled class="primary">Primary</button>
  <button disabled>Secondary</button>
  <button disabled class="outline">Outline</button>
  <button disabled class="ghost">Ghost</button>

  <h6>ARIA-disabled</h6>
  <button aria-disabled="true" class="primary">Primary</button>
  <button aria-disabled="true">Secondary</button>
  <button aria-disabled="true" class="outline">Outline</button>
  <button aria-disabled="true" class="ghost">Ghost</button>
</div>
```

### Button Tokens
<render-props>

`--button-border-radius` `var(--border-radius-m)`

`--button-padding` `var(--size-8, 0.5rem) var(--size-12, 0.75rem)`
The vertical padding should match the vertical padding defined in `--textinput-padding`.

`--button-font` `var(--font-button)`
The line-height should match the line-height defined in `--textinput-font`.

`--button-background` `var(--background-ui)`

`--button-color` `var(--color)`

`--button-border` `1px solid transparent`
The border width should match the width defined in `--textinput-border`.

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

### Text Input Tokens
These tokens apply to Select as well.

<render-props>

`--textinput-background` `var(--background)`

`--textinput-hover-background` `var(--textinput-background)`

`--textinput-active-background` `var(--textinput-background)`

`--textinput-disabled-background` `var(--textinput-background)`

`--textinput-readonly-background` `var(--textinput-background)`

`--textinput-border` `var(--border-ui)`
The border width should match the width defined in `--button-border`.

`--textinput-hover-border` `var(--textinput-border, var(--border-ui-hover))`

`--textinput-active-border` `var(--textinput-border, var(--border-ui-active))`

`--textinput-focus-border` `var(--textinput-border, var(--border-ui-focus))`

`--textinput-disabled-border` `1px solid var(--border-color-low-contrast)`

`--textinput-readonly-border` `1px solid var(--border-color-low-contrast)`

`--textinput-border-radius` `var(--border-radius-m)`

`--textinput-font` `var(--font-textinput, inherit)`
The line-height should match the line-height defined in `--button-font`.

`--textinput-color` `var(--color)`

`--textinput-disabled-color` `var(--color-disabled)`

`--textinput-padding` `var(--size-8, 0.5rem)`
The vertical padding should match the vertical padding defined in `--button-padding`.

`--textinput-small-padding` `var(--size-6, 0.375rem)`
The vertical padding should match the vertical padding defined in `--button-small-padding`.

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

### Select Tokens
All Text Input tokens apply for Select as well.

<render-props>

`--select-padding-inline-end` `calc(var(--icon-size) + var(--size-8) * 2)`
Used to reserve the space for the drop down icon, which is set as a background image.

`--select-background-image` `var(--icon-chevron-down-gray)`
A `url(data:...)`, which is used for the drop down icon. Use a neutral gray color to support both light and dark mode with the same image/icon.

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

### Checkbox Tokens

<render-props>
TODO
</render-props>

## Radio Button
<render-example></render-example>
```html
<input type="radio" name="example">
<input type="radio" name="example" checked>

<h5>Disabled</h5>
<input type="radio" disabled name="disabled-example">
<input type="radio" disabled name="disabled-example" checked>
```

### Radio Button Tokens

<render-props>
TODO
</render-props>


## Slider
<render-example></render-example>
```html
<input type="range">
<input type="range" disabled>
```

### Slider Tokens

<render-props>
TODO
</render-props>


## Progress and Meter
<style>
render-example.progress-bar :is(progress, meter) {
  margin-inline-end: 1em;
}
</style>
<render-example class="progress-bar"></render-example>
```html
<h4>Progress</h4>
<progress min=0 max=5 value=3></progress>
<progress></progress>

<h4>Meter</h4>
<meter min=0 max=5 value=3></meter>
<meter min=0 max=100 low=33 high=66 optimum=80 value=50>at 50/100</meter>
<meter min=0 max=100 low=33 high=66 optimum=80 value=20>at 20/100</meter>
<meter min=0 max=100 low=33 high=66 optimum=80 value=90>at 90/100</meter>

```

### Progress and Meter Tokens

<render-props>
TODO
</render-props>

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
  <input type="range">
</details>

<details theme="filled reverse">
  <summary>Summary</summary>
  <input value="Input">
  <button>Button</button>
  <input type="range">
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

### Details Tokens

<render-props>
TODO
</render-props>


<!--
## Definition list
TODO: key-value pairs nicely laid out and styles (horizontal and vertical)
 -->

## Vertical Alignment
Testing the vertical alignment of components.

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
<progress value=0.4></progress>
<meter value=0.4></meter>
```
