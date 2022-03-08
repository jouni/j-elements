---
title: Input decorator
layout: page
imports:
  /src/components/InputDecorator.js
  /src/theme/colors.css
  /src/theme/tokens.css
  /src/theme/components.css
eleventyNavigation:
  key: Input decorator
  parent: Prototypes
  order: 50
---

## Prefix and suffix content

Place prefix and suffix elements visually inside an input element. Only text-based input elements are supported.

Notice, that the input element styling is completely retained (coming from the theme), instead of being applied on the `<j-input-decorator>` element. The decorator element needs to be a CSS grid container (`grid` or `inline-grid`).

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
  <icon slot="prefix" search></icon>
  <input type="text" value="Input value">
  <button slot="suffix" theme="tertiary"><icon chevron-down></icon></button>
</j-input-decorator>

<j-input-decorator>
  <icon slot="prefix" search></icon>
  <input type="text" value="Input value" theme="small">
  <button slot="suffix" theme="tertiary small"><icon chevron-down></icon></button>
</j-input-decorator>

<j-input-decorator>
  <textarea>Text area value</textarea>
  <icon slot="prefix" search></icon>
  <button slot="suffix" theme="tertiary"><icon chevron-down></icon></button>
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
  icon[slot] {
    margin: 0 0.5rem;
  }

  textarea ~ [slot] {
    align-self: start;
  }

  textarea ~ icon[slot] {
    margin-top: 0.6rem;
  }
</style>
```


## Auto size

The `autosize` attribute makes the contained input change its size based on the contained text value. Manual text area resizing is disabled when auto size is used.

<render-example></render-example>
```html
<j-input-decorator autosize>
  <icon slot="prefix" search></icon>
  <input type="text" value="Input value">
</j-input-decorator>

<j-input-decorator autosize>
  <textarea>Text area value</textarea>
  <icon slot="prefix" search></icon>
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