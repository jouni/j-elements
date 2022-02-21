---
title: Component themes
layout: page
eleventyNavigation:
  key: Component themes
  parent: Theme
  order: 20
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

## Problem
Component themes is not really a problem in the overall web component/development space, but a problem with Vaadin component themes. While there might've been a need for some of the complexity before (due to older browsers), with modern browsers there things we could improve:

- Custom implementations for standard HTML elements like button, checkbox, and radio button, which make it hard to reuse existing CSS (for example, Bootstrap). You need to target a different element name and custom state attributes (because native pseudo-classes do not work).
- The selectors used by Vaadin component themes can be complex and therefore hard to override
- Styling is in some areas complicated for not much benefit, aiming for visual flair at the cost of simplicity

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
```

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
