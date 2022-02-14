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
render-example,
render-example > div {
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
```

<render-example></render-example>
```html

<div>
  <button disabled theme="primary">Primary</button>
  <button disabled>Secondary</button>
  <button disabled theme="tertiary">Tertiary</button>
</div>
<div>
  <button disabled theme="primary">Primary <span class="icon-chevron-down"></span></button>
  <button disabled>Secondary <span class="icon-chevron-down"></span></button>
  <button disabled theme="tertiary">Tertiary <span class="icon-chevron-down"></span></button>
</div>
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
