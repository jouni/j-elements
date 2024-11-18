---
title: Input Decorator
layout: page
imports:
  /src/components/InputDecorator.js
eleventyNavigation:
  key: Input Decorator
  parent: Prototypes
  order: 50
---

## Prefix and Suffix Content

Place prefix and suffix elements visually inside an input element.

Notice, that the input element styling is completely retained (coming from the theme), instead of being applied on the `<j-input-decorator>` element.

> #### <icon error></icon> Input Decorator Should Be a Grid
> The decorator element needs to be a CSS grid container: a `grid` or an `inline-grid`. Otherwise the prefix and suffix elements are rendered visually outside the input element.

<style>
render-example {
  --display: flex;
  --flex-direction: column;
  --gap: 1rem;
  --align-items: start;
}

input {
  min-width: 0;
}
</style>

<render-example></render-example>

```html
<j-input-decorator>
  <icon slot="prefix" search></icon>
  <input type="text" value="Input value">
  <span slot="suffix">€</span>
</j-input-decorator>

<j-input-decorator>
  <icon slot="prefix" search></icon>
  <input type="text" value="Input value" theme="small">
  <span slot="suffix">€</span>
</j-input-decorator>

<j-input-decorator>
  <textarea>Text area value</textarea>
  <icon slot="prefix" search></icon>
  <span slot="suffix">€</span>
</j-input-decorator>

<j-input-decorator>
  <span slot="prefix">0</span>
  <input type="range">
  <span slot="suffix">100</span>
</j-input-decorator>

<h5>Select, prefix only</h5>

<j-input-decorator>
  <icon slot="prefix" search></icon>
  <select>
    <option>Option one</option>
    <option>Option two</option>
    <option>Option three</option>
  </select>
</j-input-decorator>

<j-input-decorator>
  <icon slot="prefix" search></icon>
  <select theme="small">
    <option>Option one</option>
    <option>Option two</option>
    <option>Option three</option>
  </select>
</j-input-decorator>

<style>
  [slot=prefix], [slot=suffix] {
    margin: 0.25rem 0.5rem;
  }

  textarea ~ [slot] {
    align-self: start;
  }

  textarea ~ icon[slot] {
    margin-top: 0.6rem;
  }
</style>
```


## Auto-Size

The `autosize` attribute makes the contained input change its size based on the contained text value. User resizing is disabled when auto size is used.

<render-example></render-example>
```html
<j-input-decorator autosize>
  <icon slot="prefix" search></icon>
  <input type="text" value="Input value">
  <span slot="suffix">€</span>
</j-input-decorator>

<j-input-decorator autosize>
  <icon slot="prefix" search></icon>
  <textarea>Text area value</textarea>
</j-input-decorator>

<j-input-decorator autosize>
  <icon slot="prefix" search></icon>
  <select>
    <option>Option</option>
    <option>Longer option</option>
    <option>Option with a long label</option>
  </select>
</j-input-decorator>
```



## Limitations

The size of the prefix and suffix elements are measured when the element is connected/attached, and after updates to the HTML/DOM structure. Dynamic updates to the styling of the prefix, suffix, or input elements are not accounted for automatically.

<render-example></render-example>
```html
<j-input-decorator class="limitation-test">
  <icon slot="prefix" search></icon>
  <input type="text" value="Input value">
</j-input-decorator>

<style>
  /* Update the sizing of the prefix element on :hover */
  /* The input value is not shifting accordingly */
  .limitation-test:hover [slot] {
    margin: 0 1em;
  }
</style>
```
