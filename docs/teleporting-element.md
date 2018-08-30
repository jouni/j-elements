# Teleporting Element <maturity-badge poc>(Proof of concept)</maturity-badge>

A teleporting element can escape any stacking context, by moving itself directly under the `<body>` element when set “visible”.

Moving the element under the `<body>` element is needed if any of the original parent elements create a clipping stacking context. Some libraries call this a “portal element” or “hoisting” an element under the `<body>`.

`TeleportingElement` is basically an alternative implementation for [`<vaadin-overlay>`](https://github.com/vaadin/vaadin-overlay), and does not require the user to wrap the contents of the overlay in a `<template>` and does not depend on Polymer. It isn’t necessarily “better”, just an alternative approach with a bit of different benefits and drawbacks.

#### Benefits
- Escape any stacking context (same as `<vaadin-overlay>`)
- No need to wrap the content in a `<template>`. This allows for easier access to the elements inside and allows data-binding systems to work without extra support (such as `Polymer.Templatizer`)

#### Drawbacks
- When the element `visible` property is toggled the `disconnectedCallback` and `connectedCallback` are called on the main element as well as on all the child elements
- The content is “live” (i.e. parsed and executed) even when it is not show to the user. This is similar how for example [`<paper-dialog>`](https://www.webcomponents.org/element/PolymerElements/paper-dialog) works.
- Wrapping the content in a `<template>` would save browser resources and bandwidth and prevent scripts from executing before the content is made visible.
- CSS selectors do not work across the element boundary. You can’t style the element or its children using a parent selector, f.e. `.parent-class .teleporting-element .child`. You should target the element directly, f.e. `.teleporting-element .child`.
- `querySelector` and `querySelectorAll` do not work across the element boundary, f.e.
  ```javascript
  // Does not work
  querySelector('.parent-class .teleporting-element .child');
  ```

  You need to have a reference to the element itself before accessing any child elements, f.e.
  ```javascript
  // Works
  querySelector('.parent-class .teleporting-element').querySelector('.child');
  ```
- Nesting a `<slot>` element inside a teleporting element won’t work as expected (`<vaadin-overlay>` has the same limitation)

## Examples

See the examples for [Dialog](/dialog) and [Tooltip](/tooltip) components, which use `TeleportingElement`.

## How it works

When the element is not visible, it resides in the place where it is added in the DOM hierarchy.

When the `visible` property is set to `true`, a placeholder element is inserted in the elements place in the DOM hierarchy. The original element is moved under the `<body>`.

The placeholder element shares the same node name and attributes as the original element (so that `querySelector` still matches it). The placeholder element acts as a proxy object for the original element, passing on parts of the DOM API.

When the `visible` property is set to `false`, the original element is moved back to it’s original place in the DOM, and the placeholder element is removed.
