---
title: Component themes
layout: page
eleventyNavigation:
  key: Component themes
  parent: Theme
  order: 20
permalink: /component-themes/
imports:
  /src/theme/colors.css
  /src/theme/tokens.css
  /src/theme/components.css
---

## Problem
Component themes are not really a problem in the overall web component/development space, but a problem with Vaadin component themes. While there might've been a need for some of the complexity before (due to older browsers), with modern browsers some decisions make theming/styling more complicated than necessary:

- Custom implementations for standard HTML elements like button, checkbox, and radio button, which make it hard to reuse existing CSS (for example, Bootstrap). You need to target a different element name and custom state attributes (because native pseudo-classes do not work).
- The selectors used by Vaadin component themes can be complex and therefore hard to override.
- Styling is complicated for not much benefit, aiming for visual flair at the cost of simplicity.

The `components.css` style sheet explores an alternative theme implementation for some Vaadin components, trying to fix the issues above.

### Component token names
Component token names are prefixed with the component name + variant + state, and suffixed with the CSS property name they are targeting:
`--[component]-[variant]-[state]-[property]`

For example, the text color for the primary button, when hovered:
`--button-primary-hover-color`

<style>
render-example,
render-example > div {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>

## Button
<render-example></render-example>
```html
<div>
  <button theme="primary">Primary</button>
  <button>Secondary</button>
  <button theme="tertiary">Tertiary</button>
</div>
<div>
  <button theme="primary">Primary <span class="icon-chevron-down"></span></button>
  <button>Secondary <span class="icon-chevron-down"></span></button>
  <button theme="tertiary">Tertiary <span class="icon-chevron-down"></span></button>
</div>
<h5>Small</h5>
<div>
  <button theme="primary small">Primary</button>
  <button theme="small">Secondary</button>
  <button theme="tertiary small">Tertiary</button>
</div>
<div>
  <button theme="primary small">Primary <span class="icon-chevron-down"></span></button>
  <button theme="small">Secondary <span class="icon-chevron-down"></span></button>
  <button theme="tertiary small">Tertiary <span class="icon-chevron-down"></span></button>
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
<render-example></render-example>
```html
<div>
  <input type="text" placeholder="Text">
  <input type="date" placeholder="Date">
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
<div>
  <input type="text" theme="small" placeholder="Small">
</div>
<div>
  <textarea theme="small" placeholder="Small text area"></textarea>
</div>
```

### Text Input tokens
These tokens apply to Select as well.

<render-props>

`--textinput-background` `var(--background)`

`--textinput-hover-background` `var(--textinput-background, var(--background))`

`--textinput-active-background` `var(--textinput-background, var(--background))`

`--textinput-border` `var(--border-ui)`

`--textinput-hover-border` `var(--textinput-border, var(--border-ui-hover))`

`--textinput-active-border` `var(--textinput-border, var(--border-ui-active))`

`--textinput-focus-border` `var(--textinput-border, var(--border-ui-focus))`

`--textinput-border-radius` `var(--border-radius-m)`

`--textinput-font` `var(--font-textinput, inherit)`

`--textinput-color` `var(--color)`

`--textinput-padding` `var(--size-8, 0.5rem)`

`--textinput-padding-small` `var(--size-6, 0.375rem)`

</render-props>


## Select
<render-example></render-example>
```html
<div>
  <select>
    <option>Option one</option>
    <option>Option two</option>
    <option>Option three</option>
  </select>
</div>

<h5>Small</h5>
<div>
  <select theme="small">
    <option>Option one</option>
    <option>Option two</option>
    <option>Option three</option>
  </select>
</div>
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
```

## Radio Button
<render-example></render-example>
```html
<input type="radio" name="example">
<input type="radio" name="example" checked>
```


## Slider
<render-example></render-example>
```html
<input type="range">
```
