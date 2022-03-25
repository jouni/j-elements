---
title: Other theming issues
layout: page
eleventyNavigation:
  parent: Research
  key: Other theming issues
  order: 40
---

## Visual style complexity
The visual style of Lumo in particular can be complicated in some cases for not much benefit, aiming for visual flair at the cost of simplicity.

<video src="/docs/assets/textfield-focus.mov" autoplay loop style="width:203px;"></video>

<video src="/docs/assets/checkbox-click.mov" autoplay loop style="width:290px;"></video>

For example, the hover and activation effects on many components (button, checkbox, text input) involve both `::before` and `::after` elements with transforms and transition. That means it is difficult for theme customizations to utilize those pseudo elements for their own purposes, which usually means that they either hide them completely, or don't try to override the effects.


### Proposal: clean, minimal, functional visual styling
Less is more for the majority of business application users. Lumo should aim to be a great baseline theme, from which custom themes can easily extend upon, instead of tying to be the flashiest and most polished theme out of the box.  

I'm not proposing the removal of all visual styling, only the more elaborate ones, while keeping simple state change transition effects. Simple state transition effects are easier to customize, as the selectors are simpler (no pseudo-elements) and there are less properties to override (for example, no transforms). More elaborate styling could be better suited as Cookbook examples.

See [Component themes](/component-themes/) for examples of simpler baseline styling.

<!--
## Complex selectors
The selectors in the Lumo theme are hard to override. Most often, you end up inspecting the DOM with browser dev tools and copy paste the selector from there.

For example:
```css
/* From vaadin-lumo-styles/mixins/input-field-shared.js */
:host(:hover:not([readonly]):not([focused])) [part='label'] {
  color: var(--lumo-body-text-color);
}
```

If a developer wants to override the text field label color to red, they will likely do the following (in the corresponding component style sheet):
```css
[part="label"] {
  color: red;
}
/* or */
vaadin-text-field::part(label) {
  color: red;
}
```
The specificity of that selector is not enough to override the built-in hover color. The developer will likely need to open the browser inspector to identify the selector they need to override.

TODO: actually, using ::part will override any shadow DOM styles, so this point is moot if we package styles inside shadow DOM (though, which I'm arguing against at the moment).

### Proposal: use :where() in built-in selectors
The previous proposal for less elaborate visual styling/effects will help, but in addition, the built-in component selectors should use `:where()` extensively to reduce selector specificity and make overriding styles that much easier.
-->

## Baseline alignment "hack"
The way the Lumo theme tries to ensure components align vertically as expected is complex and brittle. We should remove it, and make sure that component alignments are good enough by other means, for example, by relying on the browser more and making it easier to use lower-level building blocks which align without extra effort (deconstruct field components).

## Inconsistent custom properties
Lumo custom properties are inconsistently named, making it harder than necessary to remember them or remember where they should be used.


## The "theme" attribute
The proprietary `theme` attribute is almost the same as the standard `class` attribute, except that it is copied to "sub-components" (another element with shadow DOM) inside the main component's shadow DOM.

Using the `theme` attribute  is likely not a big issue for most developers, as copy-pasting code from examples is easy enough, and the exact API naming is perhaps not much of a concern. Styling sub-components is a case that needs a solution, though, so without the `theme` attribute the `class` attribute would need to be copied to sub-components.

One aspect where the `theme` attribute is clearly worse than the standard `class` attribute is the DOM API for manipulating the values. Adding, removing, and toggling class names is very easy through the `classList` API, whereas with the `theme` attribute developers have to manually manipulate a space-separated string value.

## Theme implementation


CSS custom property names should follow a consistent naming convention.

The following pages for [theme tokens](/tokens) and [component themes](/component-themes) contain prototype implementations for those.

Themes for standard HTML elements should be delivered as plain `.css` files, not wrapped inside JavaScript modules. More complex components will still likely want to package their core theme with the JavaScript module, although I would recommend that additional themes such as "Lumo" or "Material" are maintained in plain `.css` files, and are opt-in by the user on top of the main component JavaScript import.

Importing CSS from JavaScript files should work via standard API: https://web.dev/css-module-scripts/, although it has the limitation of no supporting nested `@import` statements. I would assume front-end build tools (webpack, Vite) should handle this use case.


<!-- ## Component sizing and spacing
No built-in spacing outside the component (button and text field). No fixed height for buttons and inputs, rely on line height and padding instead (?) -->
