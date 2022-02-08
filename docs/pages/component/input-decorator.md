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

<render-example></render-example>
```html
<j-input-decorator>
  <span slot="prefix">Prefix</span>
  <input type="text">
  <button slot="suffix">Suffix</button>
</j-input-decorator>

<style>
  render-example {
    display: flex;
    flex-direction: column;
  }

  input {
    padding: 0.5em;
    height: 2rem;
    font: inherit;
  }

  [slot] {
    margin: 0.5em;
  }
</style>
```
