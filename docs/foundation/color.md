# Color palette <maturity-badge poc>(Proof of concept)</maturity-badge>

## Problem

Defining and applying a color palette consistently for a web app is non-trivial. You need to take accessibility into account (proper contrast between colors) and other user preferences such as dark mode.

## Solution

A customizable color system using CSS custom properties based on the most common practices across various design systems, with a built-in theme that light and dark palettes.

---

## Getting started

Set a solid foundation for colors by importing the default theme. It defines both light and dark palettes and switches those automatically based on the OS/browser level user preference.

```html
<link rel="stylesheet" href="node_modules/j-elements/src/theme/color.css">
```

## Force light or dark palette

You can override the OS/browser level user preference with the `light-palette` or `dark-palette` classes, which you can apply for any element, including `<html>`.

You can also invert the palette on any element by using the `inverted-palette` class.

```html,live
<div class="light-palette">Always light</div>
<div class="dark-palette">Always dark</div>
<div class="inverted-palette">Dark when parent is light and vice versa</div>

<style>
  .light-palette,
  .dark-palette,
  .inverted-palette {
    /* Use some of the palette colors to see the effect */
    background-color: var(--background);
    color: var(--text-color);

    margin: 0.25em;
    padding: 0.25em;
  }
</style>
```

## Customize the default palettes

Override any number of the properties to set a custom color palette. The light and dark palettes have separate properties you should set. The property values are the hue, saturation and lightness (HSL) values, separated by comma.

```css
html {
  --light-primary-hsl: 289, 90%, 53%;
  --dark-primary-hsl: 289, 100%, 42%;
}
```


---


## Reference

### Background
Primarily used for the app background.

- `--light-background-hsl`
- `--dark-background-hsl`


### Surface
Used for surfaces (i.e. containers such as panels and dialogs).

- `--light-surface-hsl`
- `--dark-surface-hsl`
