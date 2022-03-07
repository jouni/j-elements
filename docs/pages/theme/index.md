---
title: Theming
layout: page
eleventyNavigation:
  key: Theme
  title: Theming
  order: 30
---

Theming and styling Vaadin components is not easy, and can make seemingly simple tasks complicated, and increase the learning curve. Let's consider some of the main issues that we are facing.

## Custom component implementations
Custom implementations for standard HTML components, like `<vaadin-button>` vs `<button>`, `<vaadin-checkbox>` vs `<input type="checkbox">`, and `<vaadin-text-field>` vs `<input type="text">`, require you to learn how to style them.

### Custom CSS selectors
With custom components you need to target a different element name, sometimes within shadow DOM using `::part()`. You need to target custom state attributes because native pseudo-classes do not work, for example, `[checked]` vs `:checked`.

For example, compare styling a checkbox:
```css
/* Existing Vaadin component */
vaadin-checkbox[checked]::part(checkbox) {

}

/* Standard HTML component */
input[type=checkbox]:checked {

}
```
or styling a focused text input:
```css
/* Existing Vaadin component */
vaadin-text-field[focus]::part(input-field) {

}

/* Standard HTML component */
input[type=text]:focus {

}
```
While they are similar in selector complexity, the standard HTML element selectors require less explicit documentation from our part, as that is readily available online with a vast number of tutorials explaining how to style HTML elements.

There might have been a need to reimplement standard HTML elements before, due to older browsers. With modern browsers, we can reconsider that and avoid making theming/styling more complicated than necessary.

### Using 3rd party CSS libraries

Using 3rd-party CSS libraries, like [Bootstrap](http://getbootstrap.com), [Skeleton](http://getskeleton.com), or [Bulma](https://bulma.io), is a problem with Vaadin components. The selectors defined by 3rd party libraries do not apply to custom components, and it is impossible to add classes defined by those libraries to the correct elements in Vaadin components, because they are either generated at runtime or they are hidden inside shadow DOM.

### Proposal: use standard HTML when possible

I believe we should deprecate some of the Vaadin components in favor of standard HTML elements. That said, many of the current use cases covered by Vaadin components can not be easily covered with standard HTML elements, so there is still a need for convenience APIs on top of the standard elements. I'm arguing for a change in the abstraction of those APIs.

As Vaadin components already place the native `<input>`, `<textarea>`, and `<label>` elements in the light DOM of the components, it seems wasteful not to style those elements directly, and require developers to style elements inside shadow DOM instead.

In addition to helping developers style components more easily, using standard HTML elements improves performance as there is less JavaScript to download, parse, and run, and potentially less DOM elements to render (this depends on other implementation details). The effort required to maintain components could also reduce, as more work is delegated to the browser instead of recreating it with JavaScript.


#### `<vaadin-button>` → `<button>`

Benefits:
- standard CSS applies
- no shadow DOM
- no JavaScript to download, parse, and run, to support all the same use cases
- shorter HTML to write

Drawbacks:
- the `:active` state is not triggered when clicking a button with the Enter key, but only when clicking with the Space key

See the [prototype theme implementation for button](/component-themes/#button).

#### `<vaadin-checkbox>` → `<input type="checkbox">`

The same applies to `<vaadin-radio-button>` → `<input type="radio">`.

Benefits:
- standard CSS applies
- no shadow DOM
- less DOM elements
- no JavaScript to download, parse, and run, to support all the same use cases

Drawbacks:
- adding a label for the input is less convenient (`<input id="">` + `<label for="">`)

Although it is not absolutely necessary, I would recommend a helper component that takes care of connecting the label and the input. This saves the developer from coming up with unique ID's for all inputs. That reintroduces some amount of JavaScript, so that benefit is diminished.

See the [`<j-field>`](/field/#checkbox) prototype and the [prototype theme implementation for checkbox](/component-themes/#radio-button) and [radio button](/component-themes/#checkbox).

##### Checkbox and radio groups

Grouping checkboxes and radio buttons still benefits from a component that makes it convenient to label the group and provide validation functionality (required field indicator, validation message).

See the [`<j-field-group>`](/field/#field-group) prototype.


#### `<vaadin-text-field>` → `<input type="text">`

The same applies to:
- `<vaadin-password-field>` → `<input type="password">`
- `<vaadin-email-field>` → `<input type="email">`
- `<vaadin-number-field>` → `<input type="number">`
- `<vaadin-text-area>` → `<textarea>`

Benefits:
- standard CSS applies
- no shadow DOM
- less DOM elements
- no JavaScript to download, parse, and run, to support all the same use cases

Drawbacks:
- adding a label for the input is less convenient (`<input id="">` + `<label for="">`)
- no support for prefix and suffix content
- no native password reveal button in all browsers
- no native "clear input" button for all input types (only for "search")
- text area does not size itself based on content
- the `:invalid` pseudo-class behaves differently than the `[invalid]` attribute (the latter is similar to `:user-invalid`, which is only supported in Firefox)
- email input validation pattern is defined by the browser, and it is potentially more strict than what we want?
- number input spinner buttons are placed differently from the controls that `<vaadin-number-field>` provides

Similarly to checkbox and radio button, I recommend a helper component for labelling and validation purposes. See the [`<j-field>`](/field/) prototype and the [prototype theme implementation for text input](/component-themes/#text-input)

For prefix content and text area autosizing, I recommend another helper component. See the [`<j-input-decorator>`](/input/) prototype. It uses JavaScript and shadow DOM, so those benefit are diminished.

To support the "clear input" button, the input decorator element could have that as a feature.

The benefit of this approach is that users can opt-in to features instead of always "paying" for all features even if they would not be using any.

Some of the related components, like `<vaadin-combo-box>` and `<vaadin-date-picker>`, which are currently based on `<vaadin-text-field>` should also be broken down and limited to the unique features each one provides over any other component. For example, the primary feature `<vaadin-date-picker>` should provide is the custom calendar overlay picker, and the main feature `<vaadin-combo-box>` should provide is the lazy-loading item overlay.


#### `<vaadin-details>` → `<details>`

Benefits:
- standard CSS applies
- no shadow DOM
- less DOM elements
- no JavaScript to download, parse, and run, to support all the same use cases

Drawbacks:
- no support for the disabled state

The disabled state can be mimicked with `tabindex="-1"` + `pointer-events: none;`, which is of course less convenient.

See the [prototype theme implementation for details](/component-themes/#details).

<!-- #### `<vaadin-progress-bar>` → `<meter>` -->

## Visual style complexity
The visual style of Lumo in particular can be complicated in some cases for not much benefit, aiming for visual flair at the cost of simplicity.

<video src="/docs/assets/textfield-focus.mov" autoplay loop style="width:203px;"></video>

<video src="/docs/assets/checkbox-click.mov" autoplay loop style="width:290px;"></video>

For example, the hover and activation effects on many components (button, checkbox, text input) involve both `::before` and `::after` elements with transforms and transition. That means it is difficult for theme customizations to utilize those pseudo elements for their own purposes, which usually means that they either hide them completely, or don't try to override the effects.

### Proposal: clean, minimal, functional visual styling
Less is more for the majority of business application users.

## Complex selectors
The selectors in the Lumo theme are hard to override. Most often, you end up inspecting the DOM with browser dev tools and copy paste the selector from there.

## Baseline alignment "hack"
The way the Lumo theme tries to ensure components align vertically as expected is complex and brittle. We should remove it, and make sure that component alignments are good enough by other means, for example, by relying on the browser more and making it easier to use lower-level building blocks which align without extra effort (deconstruct field components).

## Inconsistent custom properties

Lumo custom properties are inconsistently named, making it harder than necessary to remember them or remember where they should be used.

## Issues with defining and using icons
Icons are a fundamental part of theming. The current way of defining and using icons involves JavaScript, which is not a natural for designers, and prevents using the icons with standard HTML elements (a custom element is needed to use an icon).

[Icons](/icons)

## Theme implementation
Lumo should aim to be a great baseline theme, from which custom themes can easily extend upon, instead of tying to be the flashiest and most polished theme out of the box.

The selectors should use `:where()` extensively to reduce selector specificity and make overriding styles that much easier.

CSS custom property names should follow a consistent naming convention.

The following pages for [theme tokens](/tokens) and [component themes](/component-themes) contain prototype implementations for those.

Themes for standard HTML elements should be delivered as plain `.css` files, not wrapped inside JavaScript modules. More complex components will still likely want to package their core theme with the JavaScript module, although I would recommend that additional themes such as "Lumo" or "Material" are maintained in plain `.css` files, and are opt-in by the user on top of the main component JavaScript import.
