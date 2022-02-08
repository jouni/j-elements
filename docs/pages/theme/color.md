---
title: Color
layout: page
eleventyNavigation:
  key: Color
  parent: Theme
permalink: /color/
---

## Problem

Defining and applying a color palette consistently for a web app is non-trivial. You need to take accessibility into account (proper contrast between colors) and other user preferences such as dark mode.

## Solution

A customizable color system using CSS custom properties based on the most common practices across various design systems, with a built-in theme that light and dark palettes.

---

## Getting started

Set a solid foundation for colors by importing the default theme. It defines both light and dark palettes and switches those automatically based on the OS/browser level user preference.

```html
<link rel="stylesheet" href="node_modules/jelly/src/theme/color.css">
```

<module-size modules="theme/color.css,theme/palette/dark-props.css,theme/palette/dark.css,theme/palette/light-props.css,theme/palette/light.css,theme/palette/props.css"></module-size>

## Force light or dark palette

You can override the OS/browser level user preference with the `light-palette` or `dark-palette` classes, which you can apply for any element, including `<html>`.

You can also invert the palette on any element by using the `inverted-palette` class. Note, that inverting only works for one level of nesting inside light/dark-palette – you can’t invert the color palette inside an already inverted color palette.

<render-example></render-example>
```html
<h5>Force a palette on the app</h5>
<button id="force-light">Light</button>
<button id="force-dark">Dark</button>

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
  }
</style>

<script>
  document.querySelector('#force-light').addEventListener('click', function() {
    document.documentElement.classList.add('light-palette');
    document.documentElement.classList.remove('dark-palette');
  });

  document.querySelector('#force-dark').addEventListener('click', function() {
    document.documentElement.classList.remove('light-palette');
    document.documentElement.classList.add('dark-palette');
  });
</script>
```
<style>
div.light-palette,
div.dark-palette,
div.inverted-palette {
  margin: 0.25em 0;
  padding: 0.25em;
}
div.light-palette {
  margin-top: 2em;
}
</style>

## Customize the default palettes

Override any number of the properties to set a custom color palette. The light and dark palettes have separate properties you should set. The property values are the hue, saturation and lightness (HSL) values, separated by comma.

<render-example></render-example>
```html
<h5>Choose the primary color for the light palette</h5>
<p>Make sure to switch to the light palette in the above examples to see the changes.</p>
<button id="light-primary-color-1">Pink</button>
<button id="light-primary-color-2">Mint</button>
<button id="light-primary-color-0">Default</button>

<script>
  document.querySelector('#light-primary-color-1').addEventListener('click', function(e) {
    document.documentElement.style.setProperty('--light-primary-hsl', '289, 90%, 53%');
  });

  document.querySelector('#light-primary-color-2').addEventListener('click', function(e) {
    document.documentElement.style.setProperty('--light-primary-hsl', '160, 100%, 32%');
  });

  document.querySelector('#light-primary-color-0').addEventListener('click', function(e) {
    document.documentElement.style.setProperty('--light-primary-hsl', '');
  });
</script>
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
