---
title: Icons
layout: page
eleventyNavigation:
  key: Icons
  parent: Components
permalink: /icons/
---

If we agree that icon fonts are the least desirable option for icons, we have two options left. Defining icons in JavaScript or defining icons in CSS.

## Icons in JavaScript

If defined in JavaScript, we need a custom element to conveniently use the icons, which adds a non-trivial amount of code to the front-end bundle ([vaadin-icon.js](https://github.com/vaadin/web-components/blob/master/packages/icon/src/vaadin-icon.js)). To define an icon set, another custom element is currently needed ([vaadin-iconset.js](https://github.com/vaadin/web-components/blob/master/packages/icon/src/vaadin-iconset.js)). The browser has to parse and execute these scripts to render the HTML for an icon (an `<svg>` element).

## Icons in CSS

If defined in CSS, a single style sheet is needed. The icons can be bundled in the style sheet as data URLs. Alternatively, they could be referenced as external resources, which might be suitable in some cases, to minimize the initial bundle size and accept a FOUC when the SVG files are downloading.

The browser only needs to parse the CSS and the data URLs. Rendering the SVG path should be equal amount of work compared to the JavaScript alternative.

Defining the icons can be considered equally cumbersome in both options. In CSS the SVG needs to be URL encoded and each icon separately defined using a CSS selector, while in JavaScript some boilerplate code is needed, both JS and SVG. A tool that generates the definitions from a collection of SVG files can be created for either option.

An additional benefit of defining the icons in CSS is that they can be used to style standard HTML elements, such as `<select>` and `<input type="date">` (the calendar icon), which is not possible with the JavaScript alternative.

## Defining icons in CSS
An icon set is defined in CSS, as a collection of custom properties which define SVG data URLs.
```css
html {
  --icon-calendar: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' /%3E%3C/svg%3E");
  --icon-search: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' /%3E%3C/svg%3E");
  --icon-checkmark: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7' /%3E%3C/svg%3E");
  ...
}
```

A utility class or any other selector, for example, a custom element name, is defined which uses the SVG data URLs as a mask image. A mask image allows us to change color of the icon using CSS. Each individual icon is defined using an additional selector.
```css
[class^="icon"] {
  background-color: currentColor;
  -webkit-mask-image: var(--mask-image);
  mask-image: var(--mask-image);

  /* layout properties omitted */
}

.icon-calendar {
  --mask-image: var(--icon-calendar);
}

.icon-search {
  --mask-image: var(--icon-search);
}

.icon-checkmark {
  --mask-image: var(--icon-checkmark);
}

...
```

## Using icons in CSS
The consumers of the icons import the style sheet and apply the desired utility class on an element (or use the custom element name, or whatever the CSS selector requires). An accessible label/name for the icon can be placed inside the element.

<render-example></render-example>
```html
<span class="icon-calendar">calendar</span>
<span class="icon-search">search</span>
<span class="icon-checkmark">checkmark</span>
```

The drawback of using mask images is that it is not possible to customize anything else about the icons except the color. For example, stroke width can't be modified per instance.
