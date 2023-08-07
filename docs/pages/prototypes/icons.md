---
title: Icons
layout: page
eleventyNavigation:
  key: Icons
  parent: Prototypes
  order: 30
imports:
  /src/theme/icons.css
---

An icon set is defined in CSS, as a collection of custom properties which define SVG data URLs.
```css
html {
  --icon-calendar: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>');
  --icon-search: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>');
  --icon-checkmark: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>');
}
```

A custom element name `icon` is used to define a SVG data URL as a mask image. A mask image allows us to change the color of the icon using CSS. Each individual icon is defined using an additional selector.
```css
icon {
  background-color: currentColor;
  -webkit-mask-image: var(--mask-image);
  mask-image: var(--mask-image);

  /* layout properties omitted */
}

icon[calendar] {
  --mask-image: var(--icon-calendar);
}

icon[search] {
  --mask-image: var(--icon-search);
}

icon[checkmark] {
  --mask-image: var(--icon-checkmark);
}
```

## Using Icons in CSS
Import the style sheet and use the `<icon>` element. An accessible label/name for the icon can be placed inside the element.

<render-example class="example"></render-example>
```html
<icon calendar>calendar</icon>
<icon search>search</icon>
<icon checkmark>checkmark</icon>
```

<style>
  .example {
    --display: flex;
    --gap: 1rem;
  }
</style>
