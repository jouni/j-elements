---
title: Tokens
layout: page
eleventyNavigation:
  key: Tokens
  parent: Theme
  order: 10
permalink: /tokens/
imports:
  /src/theme/colors.css
  /src/theme/palette.css
  /src/theme/typography.css
  /src/theme/size.css
---

```html
<link href="j-elements/src/theme/colors.css" rel="stylesheet">
<link href="j-elements/src/theme/palette.css" rel="stylesheet">
<link href="j-elements/src/theme/typography.css" rel="stylesheet">
<link href="j-elements/src/theme/size.css" rel="stylesheet">
```


## Color scales

`colors.css` defines a collection of static color scales – a range of colors from light to dark – for various hues, for example, "slate", "red", "emerald", "purple", and "rose". At the moment those scales are copied from [Tailwind CSS](https://tailwindcss.com/docs/customizing-colors).

## Palette

`palette.css` defines a low-level semantic custom properties, which adapt to light and dark modes, mapping to the static color scales.

The `theme="dark"` and `theme="light"` attributes can be used to toggle between modes, at any level of DOM hierarchy.

<render-example></render-example>
```html
<p theme="light">Always light</p>
<p theme="dark">Always dark</p>
```

### Palette tokens

#### Background

<render-props>

`--background`
The default application background / surface.

`--background-above`
Background / surface which is above the default background.

`--background-below`
Background / surface which is below the default background.

`--background-ui`
Background for UI controls, such as buttons.

`--background-ui-hover`
Background for UI controls when hovered.


`--background-ui-active`
Background for UI controls when activated (for example, clicked with a mouse or pressed with a finger).

</render-props>


#### Text

<render-props>

`--color`
Default text color. Should have at least 7:1 contrast ratio on top of all non-UI backgrounds.

`--color-low-contrast`
Low contrast text color. Use, for example, for secondary text elements. Should have at least 4.5:1 contrast ratio on top of all non-UI backgrounds.

`--color-high-contrast`
High contrast text color. Use, for example, for heading text elements.

`--color-disabled`
Disabled text color.

</render-props>


#### Border

<render-props>

`--border-color`
Default border color.

`--border-color-low-contrast`
Low contrast border color.

`--border-color-high-contrast`
High contrast border color.

`--border-ui`
Default border for UI controls, such as text inputs.

`--border-ui-hover`
Border for UI controls when hovered.

`--border-ui-active`
Border for UI controls when activated.

`--border-ui-focus`
Border for UI controls when focused.

`--border-radius-l`
Large border radius. For example, dialogs, cards, and other containers.

`--border-radius-m`
Medium border radius. For example, button and text input.

`--border-radius-s`
Small border radius. For example, checkbox.

</render-props>


## Typography
Font sizes scale slightly based on the browser viewport size.
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
