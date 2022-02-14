---
title: Component themes
layout: page
eleventyNavigation:
  key: Component themes
  parent: Theme
permalink: /component-themes/
imports:
  /src/theme/typography.css
  /src/theme/colors.css
  /src/theme/palette.css
  /src/theme/size.css
  /src/theme/components.css
---

```html
<link href="j-elements/src/theme/components.css" rel="stylesheet">
```

<style>
render-example {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>

## Button
<render-example></render-example>
```html
<button theme="primary">Primary</button>
<button>Secondary</button>
<button theme="tertiary">Tertiary</button>
```

<render-example></render-example>
```html
<button theme="primary" disabled>Disabled</button>
<button disabled>Disabled</button>
<button theme="tertiary" disabled>Disabled</button>
```

## Text Input
<render-example></render-example>
```html
<input type="text" placeholder="Text">
<input type="date" placeholder="Date">
<input type="email" placeholder="Email">
<input type="number" placeholder="Number">
<input type="password" placeholder="Password">
<input type="tel" placeholder="Telephone">
<input type="search" placeholder="Search">
<input type="url" placeholder="URL">
<textarea placeholder="Text area"></textarea>
```

## Other Inputs
<render-example></render-example>
```html
<input type="range">
<input type="color" placeholder="Color">
<input type="file" placeholder="File">
```

## Select
<render-example></render-example>
```html
<select>
  <option>Option one</option>
  <option>Option two</option>
  <option>Option three</option>
</select>
```

## Checkbox
<render-example></render-example>
```html
<input type="checkbox">
<input type="checkbox" checked>
```

## Radio Button
<render-example></render-example>
```html
<input type="radio">
<input type="radio" checked>
```
