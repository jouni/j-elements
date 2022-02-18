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

## Problem

- I want to show additional content, for example, an icon, inside a text input
- I don't want to recreate a text input component from scratch
- I want to reuse a 3rd party CSS library/framework, for example, Bootstrap, which usually target native input elements.

## Prefix and suffix content

Place prefix and suffix elements visually inside an input element. Only text-based input elements are supported.

Notice, that the `<input>` and `<textarea>` element styling is completely retained (coming from the theme), instead of being applied on the `<j-input-decorator>` element. The decorator element needs to be a CSS grid container (`grid` or `inline-grid`).

<style>
render-example {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: start;
}

input {
  min-width: 0;
}
</style>

<render-example></render-example>
```html
<j-input-decorator>
  <span slot="prefix" class="icon-search"></span>
  <input type="text" value="Input value">
  <button slot="suffix" theme="tertiary"><span class="icon-chevron-down"></span></button>
</j-input-decorator>

<j-input-decorator>
  <span slot="prefix" class="icon-search"></span>
  <input type="text" value="Input value" theme="small">
  <button slot="suffix" theme="tertiary small"><span class="icon-chevron-down"></span></button>
</j-input-decorator>

<j-input-decorator>
  <textarea>Text area value</textarea>
  <span slot="prefix" class="icon-search"></span>
  <button slot="suffix" theme="tertiary"><span class="icon-chevron-down"></span></button>
</j-input-decorator>

<style>
  span[slot] {
    margin: 0 0.5rem;
  }

  textarea ~ [slot] {
    align-self: start;
  }

  textarea ~ span[slot] {
    margin-top: 0.6rem;
  }
</style>
```


## Auto size

The `autosize` attribute makes the contained input change its size based on the contained text value. Manual text area resizing is disabled when auto size is used.

<render-example></render-example>
```html
<j-input-decorator autosize>
  <span slot="prefix" class="icon-search"></span>
  <input type="text" value="Input value" class="bare">
</j-input-decorator>

<j-input-decorator autosize>
  <textarea>Text area value</textarea>
  <span slot="prefix" class="icon-search"></span>
</j-input-decorator>
```



## Limitations

The size of the prefix and suffix elements are measured when the element is connected/attached, and after updates to the HTML/DOM structure. Dynamic updates to the styling of the prefix, suffix, or input elements are not accounted for automatically.

<render-example></render-example>
```html
<j-input-decorator class="limitation-test">
  <span slot="prefix" class="icon-search"></span>
  <input type="text" required placeholder="Required field">
</j-input-decorator>

<style>
  .limitation-test:hover [slot] {
    margin: 0 1em;
  }
</style>
```
