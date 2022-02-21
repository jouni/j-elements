---
title: Theming is hard
layout: page
eleventyNavigation:
  key: Theme
  title: Theme
  order: 30
---

Theming and styling Vaadin components is not easy, and can make seemingly simple tasks really complicated.

## Custom components and 3rd party CSS libraries
Component themes are not really a problem in the overall web component/development space. We have plenty of options to choose from when styling native HTML elements, like `<button>`, `<input>`, or `<select>`. Some examples include [Bootstrap](http://getbootstrap.com), [Skeleton](http://getskeleton.com), and [Bulma](https://bulma.io).

Using these CSS libraries is a problem with Vaadin components. Custom implementations for standard HTML elements, like `<vaadin-button>`, `<vaadin-checkbox>`, and `<vaadin-text-field>` make it hard to reuse existing CSS. You need to target a different element name (sometimes within shadow DOM) and custom state attributes, because native pseudo-classes do not work. Even if you wouldn't be using a CSS framework/library, styling non-standard elements increases the learning curve dramatically.

While there might've been a need to reimplement standard HTML elements before, due to older browsers, with modern browsers we can reconsider some of the decisions and avoid making theming/styling more complicated than necessary.

## Visual style complexity
The visual style of Lumo in particular can be complicated in some cases for not much benefit, aiming for visual flair at the cost of simplicity.

For example, the hover and activation effects on many components (button, checkbox, text input) involve both `::before` and `::after` elements with transforms and transition. That means it is difficult for theme customizations to utilize those pseudo elements for their own purposes, which usually means that they either hide them completely, or don't try to override the effects.

### Complex selectors and inconsistent custom properties
The selectors in the Lumo theme are hard to override. Most often, you end up inspecting the DOM with browser dev tools and copy paste the selector from there.

Lumo custom properties are inconsistently named, making it harder than necessary to remember them or remember where they should be used.

### Defining and using icons


## The future
Suggestions what a better future might look like.

### Component implementations
We should deprecate some of the Vaadin components in favor of standard HTML elements. Specifically, the following:

- ~~`<vaadin-button>`~~ `<button>`
- ~~`<vaadin-checkbox>`~~ `<input type="checkbox">`
- ~~`<vaadin-radio-button>`~~ `<input type="radio">`
- ~~`<vaadin-text-field>`~~ `<input type="text">`
- ~~`<vaadin-text-area>`~~ `<textarea>`
- ~~`<vaadin-password-field>`~~ `<input type="password">`
- …and other similar fields (email, number)
- ~~`<vaadin-details>`~~ `<details>`
- ~~`<vaadin-progress-bar>`~~ `<meter>`

Deprecating the field components leaves a lot of use cases uncovered. Those are covered in [the next section](/component).

Some of the related components, like `<vaadin-combo-box>` and `<vaadin-date-picker>`, which are currently based on `<vaadin-text-field>` should also be broken down and limited to the unique features each one provides over any other component. For example, the only feature `<vaadin-date-picker>` should provide is the custom calendar overlay picker, and the only feature `<vaadin-combo-box>` should provide is the lazy-loading item overlay.

### Theme implementation
Lumo should aim to be a great baseline theme, from which custom themes can easily extend upon, instead of tying to be the flashiest and most polished theme out of the box.

The selectors should use `:where()` extensively to reduce selector specificity and make overriding styles that much easier.

CSS custom property names should follow a consistent naming convention.

The following pages for [theme tokens](/tokens) and [component themes](/component-themes) contain prototype implementations for those.
