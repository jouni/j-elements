---
title: Input decorator
layout: page
imports:
  /src/components/InputDecorator.js
  /src/theme/components.css
permalink: /input/
eleventyNavigation:
  key: Input decorator
  parent: Components
---

```javascript
import { InputDecorator } from 'j-elements/src/components/InputDecorator.js';
```

`<j-input-decorator>` allows placing prefix and suffix elements visually inside an input element. Only text-based input elements are supported.

Notice, that the `<input>` element styling is completely retained, instead of being applied on the `<j-input-decorator>` element. The decorator element needs to be a CSS grid container (`display: grid` or `display: inline-grid`).

<render-example></render-example>
```html
<j-input-decorator>
  <span slot="prefix">🔎</span>
  <input type="text" value="Input value">
  <button slot="suffix" theme="tertiary small">Button</button>
</j-input-decorator>

<br>

<j-input-decorator>
  <span slot="prefix">🔎</span>
  <textarea>Text area value</textarea>
  <button slot="suffix" theme="tertiary small">Button</button>
</j-input-decorator>

<style>
  j-input-decorator {
    display: grid;
  }

  span[slot] {
    margin: 0 0.5rem;
  }
</style>
```

## Limitations

Dynamic updates to the styling of the prefix, suffix, or input elements are not accounted for.

In the next example, the prefix element is hidden if the input is empty. When you enter text in the input, the prefix element is made visible, but it won't take space from the input text.

<render-example></render-example>
```html

<j-input-decorator class="not-working">
  <input type="text" required placeholder="Required field">
  <span slot="prefix" class="valid">✅</span>
</j-input-decorator>

<style>
  .not-working input:invalid + [slot].valid {
    display: none;
  }
</style>
```

Instead of completely hiding the prefix element, you can change its opacity or visibility instead, so it will take the space already when the input decorator is first rendered.

<render-example></render-example>
```html

<j-input-decorator class="working">
  <input type="text" required placeholder="Required field">
  <span slot="prefix" class="valid">✅</span>
</j-input-decorator>

<style>
  .working input:invalid + [slot].valid {
    visibility: hidden;
  }
</style>
```
