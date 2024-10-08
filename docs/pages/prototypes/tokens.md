---
title: Design Tokens
layout: page
eleventyNavigation:
  key: Design Tokens
  parent: Prototypes
  order: 10
imports:
  /src/theme/colors.css
  /src/theme/tokens.css
---

## Token Names

Token (CSS custom property) names start with the CSS property name they are primarily meant to be used for:
`--[property]`

For example, the token for the default text color:
`--color`

Token variants and states are suffixed after the property name:
`--[property]-[variant]-[state]`

For example, the token for low contrast (secondary) text:
`--color-low-contrast`


## Dark Mode

Light and dark theme presets are available. The `theme="dark"` and `theme="light"` attributes can be used to toggle between modes, at any level of DOM hierarchy.

<render-example style="--display: flex; --gap: 1em;"></render-example>
```html
<div theme="light">Always light</div>
<div theme="dark">Always dark</div>
```

You can customize the hue, saturation, and lightness of the grayscale colors easily.

<render-example style="--display: flex; --gap: 1em;"></render-example>
```html
<div theme="custom-theme">Custom theme</div>
<style>
  [theme="custom-theme"] {
    --bg-h: 200;
    --bg-c: 0.1;
    --bg-l: 0.4;
  }
</style>
```
<style>
  div[theme] {
    padding: var(--space-50) var(--space-75);
    border-radius: 0.5em;
    margin: 0;
    border: var(--border-ui);
    background: var(--bg);
    color: var(--color-high-contrast);
  }
</style>

## Background
Note, that the background tokens are meant to be used for the CSS `background` shorthand property, and not for the `background-color` property.

> You need to combine these properties with the `--background-blend-mode-surface` property.

<render-props class="surface">

`--background-surface-4`
Surface which is visually the highest (most elevated). Mainly used for popups/popovers/menus.

`--background-surface-3`
Surface which is above the default surface. Mainly used for cards, dialogs, and other containers.

`--background-surface-2`
The default surface.

`--background-surface-1`
Surface which is below the default surface.

`--background-surface-0`
Surface which is visually the lowest (most recessed).

</render-props>

<style>
.preview.color span::before {
  background-blend-mode: var(--background-blend-mode-surface);
}
</style>


## Text Color
<render-props>

`--color-high-contrast`
High contrast text color. Use, for example, for heading text elements.

`--color`
Default text color. Should have at least 7:1 contrast ratio on top of all backgrounds/surfaces.

`--color-low-contrast`
Low contrast text color. Use, for example, for secondary text elements. Should have at least 4.5:1 contrast ratio on top of all non-UI backgrounds.

`--color-disabled`
Disabled text color.

`--color-accent`

`--color-accent-high-contrast`

`--color-accent-low-contrast`

</render-props>


## Border
<render-props>

`--border-color`
Default border color.

`--border-color-high-contrast`
High contrast border color.

`--border-color-low-contrast`
Low contrast border color.

`--border-color-accent`

</render-props>


### Border Presets
<render-props>

`--border-ui`
Default border for UI controls, such as text inputs.

`--border-ui-hover`
Border for UI controls when hovered.

`--border-ui-active`
Border for UI controls when activated.

`--border-ui-focus`
Border for UI controls when focused.

</render-props>


### Border Radius
<render-props>

`--border-radius-l`
Large border radius. For example, dialogs, cards, and other containers.

`--border-radius-m`
Medium border radius. For example, button and text input.

`--border-radius-s`
Small border radius. For example, checkbox.

</render-props>


## Outline

Focus outlines are the primary use case for these tokens.

<render-props>

`--outline-color` `var(--border-color-accent)`
The color of the outline.

`--outline-offset` `2px`
How far detached the outline is from the associated component.

`--outline-width` `2px`
The size of the outline.

</render-props>



## Typography

### Font Family
<style>
.font-family {
  display: block;
}
.font-family p {
  margin: var(--size-8) 0;
  line-height: var(--line-height-xs);
}
</style>
<render-example class="font-family"></render-example>
```html
<p style="font-family: var(--font-family-sans-serif);">Lorem ipsum</p>
<p style="font-family: var(--font-family-serif);">Lorem ipsum</p>
<p style="font-family: var(--font-family-monospace);">Lorem ipsum</p>
```

<render-props>

`--font-family-sans-serif`

`--font-family-serif`

`--font-family-monospace`

`--font-family` `var(--font-family-sans-serif)`

</render-props>


### Font Size
<style>
.font-size {
  display: block;
}
.font-size p {
  margin: var(--size-8) 0;
  line-height: var(--line-height-xs);
}
</style>
<render-example class="font-size"></render-example>
```html
<p style="font-size: var(--font-size-3xl);">Lorem ipsum</p>
<p style="font-size: var(--font-size-2xl);">Lorem ipsum</p>
<p style="font-size: var(--font-size-xl);">Lorem ipsum</p>
<p style="font-size: var(--font-size-l);">Lorem ipsum</p>
<p style="font-size: var(--font-size-m);">Lorem ipsum</p>
<p style="font-size: var(--font-size-s);">Lorem ipsum</p>
<p style="font-size: var(--font-size-xs);">Lorem ipsum</p>
<p style="font-size: var(--font-size-2xs);">Lorem ipsum</p>
```

<render-props>

`--font-size-3xl`

`--font-size-2xl`

`--font-size-xl`

`--font-size-l`

`--font-size-m`

`--font-size-s`

`--font-size-xs`

`--font-size-2xs`

</render-props>


### Line Height

<render-props>

`--line-height-m`

`--line-height-s`

`--line-height-xs`

`--line-height-m-px`

`--line-height-s-px`

`--line-height-xs-px`

</render-props>


### Font Weight

<render-props>

`--font-weight-strongest`

`--font-weight-strong`

`--font-weight`

`--font-weight-weak`

`--font-weight-weakest`

</render-props>


### Font Smoothing

<render-props>

`--font-smoothing`
Set to `auto` to disable grayscale/antialiased font smoothing and use default sub-pixel antialiasing.

</render-props>


### Presets

<render-props>

`--font-label`
Form field labels.

`--font-button`

`--font-button-small`
Font size and line height should match those of `--font-textinput-small`.

`--font-textinput`

`--font-textinput-small`
Font size and line height should match those of `--font-button-small`.

`--font-field-label`

`--font-field-description`

</render-props>


## Size / Space

<render-props>

`--size-1`

`--size-2`

`--size-4`

`--size-6`

`--size-8`

`--size-12`

`--size-16`

`--size-24`

`--size-28`

`--size-32`

`--size-40`

`--size-48`

`--size-56`

`--size-64`

</render-props>
