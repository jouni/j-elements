---
title: Defining and using icons
layout: page
eleventyNavigation:
  parent: Research
  key: Icons research
  title: Icons
  order: 30
---

Icons are a fundamental part of the visual appearance of an application.

The current way of defining and using icons in a Vaadin application involves JavaScript, which is not natural for designers, and prevents using the icons with standard HTML elements (a `<vaadin-icon>` element is needed to use an icon).

For icons used in components, a custom icon font is needed to be able to override them. This leads to duplication of the same icon in two formats.

If we agree that icon fonts are the least desirable option for icons, as they are the most difficult to author (binary formats), we have two options left: defining SVG-based icons in JavaScript or CSS.

## Defining icons in JavaScript

Benefits:
- Inline SVGs are more customizable using CSS (for example, `stroke-width`)

Drawbacks:
- a custom element is currently used to define an iconset ([vaadin-iconset.js](https://github.com/vaadin/web-components/blob/master/packages/icon/src/vaadin-iconset.js), [example of an icon set](https://github.com/vaadin/web-components/blob/master/packages/vaadin-lumo-styles/vaadin-iconset.js))
- a custom element is needed to conveniently use the icons, which adds a non-trivial amount of code to the front-end bundle ([vaadin-icon.js](https://github.com/vaadin/web-components/blob/master/packages/icon/src/vaadin-icon.js))
- the browser has to parse and execute these scripts to render the HTML for an icon (an `<svg>` element)

<!-- See https://www.webperf.tips/tip/cached-js-misconceptions/ for more reasoning why we should avoid JS as much as possible -->

## Defining icons in CSS

Benefits:
- a single style sheet is enough. The icons can be bundled in the style sheet as data URLs. Alternatively, they could be referenced as external resources, which might be suitable in some cases, to minimize the initial bundle size and accept a FOUC when the SVG files are downloading.
- the browser only needs to parse the CSS and the data URLs. Rendering the SVG path should be equal amount of work compared to the JavaScript alternative.
- the icons can be used to style standard HTML elements, such as `<select>` (the toggle/dropdown icon) and `<input type="date">` (the calendar icon), which is not possible with the JavaScript alternative.

Drawbacks:
- Less customizable using CSS (for example, can't adjust `stroke-width`)
- No multi-color icons (except with opacity)


## Authoring an using icons

Authoring an icon set can be considered equally cumbersome in both options. In CSS the SVG needs to be URL encoded and each icon separately defined using a CSS selector, while in JavaScript some boilerplate code is needed, both JS and SVG. A tool that generates the definitions from a collection of SVG files can be created for either option.

Using an icon is equally convenient in both options. You either import a JavaScript module, or a style sheet, and create a HTML element with an attribute that defines which icon to use, for example `<vaadin-icon icon="search"></vaadin-icon>` or `<icon search></icon>`.

The CSS alternative assumes it is convenient to import a style sheet into a component shadow root if needed.



See [Icons](/icons) for a prototype.
