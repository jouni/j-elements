# Portal Element <maturity-badge poc>(Proof of concept)</maturity-badge>

## Problem

Showing an element on top of all other content on the page regardless of its position in the element hierarchy is sometimes tricky.

Unless you know the full hierarchy “above” the element that needs to be shown on top of all others, you have to be prepared that there might be a clipping stacking context somewhere in the hierarchy which ends up clipping your element.

The problem is most apparent when creating a reusable overlay element.

## Solution

Most often, this problem is solved by declaring such elements directly under the `<body>` element, which guarantees they are inside the topmost stacking context on the page. This makes it tricky to manage the elements when building modular applications.

The Portal Element utility (base class) allows you to define an element anywhere in the hierarchy and, when enabled, move itself (and its contents) under the `<body>` element.

> Unlike the previous iteration, Teleporting Element, Portal Element does support one level of nested `<slot>` elements, making it more versatile in compositions.

## Limitations

- When the element `disabled` property is toggled the `disconnectedCallback` and `connectedCallback` are called on the main element as well as on all the child elements
- The content is “live” (i.e. parsed and executed) even when it is not show to the user. This is similar how for example [`<paper-dialog>`](https://www.webcomponents.org/element/PolymerElements/paper-dialog) works.
- Wrapping the content in a `<template>` would save browser resources and bandwidth and prevent scripts from executing before the content is made visible.
- CSS selectors do not work across the element boundary. You can’t style the element or its children using a parent selector, f.e. `.parent-class .portal-element .child`. You should target the element directly, f.e. `.portal-element .child`.
- `querySelector` and `querySelectorAll` do not work across the element boundary, f.e.
  ```javascript
  // Does not work
  querySelector('.parent-class .portal-element .child');
  ```

  You need to have a reference to the element itself before accessing any child elements, f.e.
  ```javascript
  // Works
  querySelector('.parent-class .portal-element').querySelector('.child');
  ```
