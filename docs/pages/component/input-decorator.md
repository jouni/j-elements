---
title: Input Decorator
layout: page
imports: /src/components/InputDecorator.js
permalink: /input/
eleventyNavigation:
  key: Input Decorator
  parent: Components
---

```javascript
import { InputDecorator } from 'j-elements/src/components/InputDecorator.js';
```

`<j-input-decorator>` allows placing prefix and suffix elements inside an input element. Only text-based input elements are supported.

<render-example></render-example>
```html
<j-input-decorator>
  <span slot="prefix">Prefix</span>
  <input type="text">
  <button slot="suffix">Suffix</button>
</j-input-decorator>

<style>
  input {
    padding: 0.5em;
    height: 2rem;
    font: inherit;
  }

  [slot] {
    margin: 0.5rem;
  }
</style>
```

## Limitations

Dynamic updates to the styling, for example, on `:hover`, of the prefix, suffix, or input elements are not accounted for.
