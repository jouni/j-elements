---
title: Components
layout: page
eleventyNavigation:
  key: Components
  order: 40
---

Based on [the previous section](/theme), we want to use the `<button>`, `<input>`, `<select>`, and other standard HTML elements and not have specific field component implementations. That leaves a lot of use cases uncovered, specifically:

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
