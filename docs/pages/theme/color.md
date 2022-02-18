---
title: Color tokens
layout: page
eleventyNavigation:
  key: Color tokens
  parent: Theme
permalink: /color/
imports:
  /src/theme/colors.css
  /src/theme/palette.css
---

```html
<link href="j-elements/src/theme/colors.css" rel="stylesheet">
<link href="j-elements/src/theme/palette.css" rel="stylesheet">
```

- `colors.css` defines a collection of static color scales – a range of colors from light to dark – for various hues, for example, "slate", "red", "emerald", "purple", and "rose". At the moment those scales are copied from [Tailwind CSS](https://tailwindcss.com/docs/customizing-colors).

- `palette.css` defines a low-level semantic custom properties, which adapt to light and dark modes, mapping to the static color scales.

- The `theme="dark"` and `theme="light"` attributes can be used to toggle between modes, at any level of DOM hierarchy.

<style>
.example-1 + pre {
  display: none;
}
render-example {
  border: 0;
}
</style>
<render-example class="full toggle-theme"></render-example>
```html
<button id="toggle-theme">Toggle light/dark theme</button>
<script>
document.querySelector('#toggle-theme').onclick = () => {
  const current = document.documentElement.getAttribute('theme');
  document.documentElement.setAttribute('theme', current == 'dark' ? 'light' : 'dark');
}
</script>
```
