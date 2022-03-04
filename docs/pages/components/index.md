---
title: Enhanced HTML components
layout: page
eleventyNavigation:
  key: Components
  order: 40
---

Based on the [theming section](/theme), we want to use the `<button>`, `<input>`, `<select>`, and other standard HTML elements and not have specific field component implementations. That leaves a lot of use cases uncovered, compared to existing Vaadin component implementations, specifically:

- conveniently creating accessible forms, including:
  - labels
  - required indicators
  - helpers
  - error/validation messages
- prefix and suffix elements, including:
  - clear input button
  - password reveal button
  - toggle overlay button
  - increment/decrement buttons
- auto-sized text area
- menu bar items that overflow the layout

This section explores these use cases, how we can enhance native HTML components with additional functionality.
