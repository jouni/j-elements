<!--imports
/node_modules/j-elements/src/components/Card.js
-->

<maturity-badge preview>(Preview)</maturity-badge>

# Stylable

## Problem

Sometimes you want to customize the styles inside a component’s shadow DOM from the outside. Theming is a common use case with web components. CSS custom properties only get you so far.

## Solution

Let components pick up matching style sheets from the global scope (document, for theming) and from the scope they are contained in (their parent shadow root, for styling).

The matching is done using the standard media query feature. Using a custom media query makes the contained rules (either a full or partial style sheet) inert from the document so that the style rules do not end up matching unintended elements.

## Example

```html,live
<style>
  j-card div {
    font-style: italic;
  }

  @media j-card {
    ::slotted(div) {
      font-weight: bold;
    }
  }

  @media j-card\.special-card {
    [part="title"] {
      color: red;
    }
  }
</style>

<j-card>
  <div slot="title">I am bold and italic</div>
</j-card>

<j-card class="special-card">
  <div slot="title">I am bold, italic and red</div>
</j-card>
```

## Matching components using media queries

Stylable Mixin uses (or perhaps abuses) the standard style sheet media queries. Instead of the standard values, such as `(max-width: 400px)` and `print`, you write CSS selectors to match the components you want to style. **The selector has to start with a custom element name**, for example `my-element` (element name with a dash).

Examples:

- `j-card` – matches all `<j-card>` elements
- `j-card\.special-card` – matches only `<j-card class="special-card">` elements

> ###### Escaping the media selector
> The media attribute selector needs to be properly escaped. Otherwise the browser will parse it as `not all`.
>
> For example, the dot in class selectors and the angle brackets in attribute selectors need to be escaped with a backward slash: `\.my-class` and `\[my-attribute\]`

There are several ways how to write the media queries.

> `my-card-styles.css` is assumed to contain styles for the shadow DOM of the matching components.

### HTML attribute

```html
<link rel="stylesheet" href="my-card-styles.css" media="j-card">
```
> ###### Warning
> `<style media="j-card">` will not work in Safari/WebKit – it will not appear in `document.styleSheets`. See [WebKit bug](https://bugs.webkit.org/show_bug.cgi?id=203073).

### CSS @import rule

Use the `@import` rule to scope an imported style sheet in full.

```css
@import "my-card-styles.css" j-card;
```

### CSS @media rule

Use the `@media` rule to scope a portion of a style sheet.

```css
@media j-card {
  /* Styles for the shadow DOM of the matching elements */
}
```

You can nest `@media` rules inside each other, which allows you to style nested components.

```css
@media parent-component {
  /* Styles for the shadow root of <parent-component> */
  @media child-component {
    /* Styles for the shadow root of <child-component> which is inside the shadow root of <parent-component> */
  }
}
```

## How to make a component stylable

To make a component’s shadow DOM stylable from the outside, extend it with the mixin and call `super.connectedCallback()` in the component’s `connectedCallback()`.

> **Note:** Your component needs to have a shadow root before StylableMixin is invoked

```javascript
import { StylableMixin } from 'j-elements/src/util/StylableMixin.js';

class XStylable extends StylableMixin(HTMLElement) {
  connectedCallback() {
    if (!this.shadowRoot) {
      // Attach a shadow root
      this.attachShadow({mode: 'open'});
    }

    // Call super.connectedCallback() to have style modules applied
    super.connectedCallback();
  }
}
```

---

## Limitations

### Components have to opt-in
Each component has to opt-in explicitly to be stylable in its own implementation, by extending the `StylableMixin` class. You won’t be able to style the shadow DOM of other custom elements using media queries.

### Performance
`StylableMixin` increases the time spent attaching an element to the DOM (~0.05–3ms per element, depending on the amount of CSS rules in the document and on the CPU).

The performance impact is linearly correlated to the number of style sheet in the global scope and in the scope where the element is attached, and to the number of CSS rules in those style sheets. Each stylable element traverses all those style sheets and the rules inside them recursively every time they are attached to the DOM.

Try to keep the number of style sheets in the global scope low. Avoid attaching a large number of elements (which use `StylableMixin`) to the DOM at the same time. For example, avoid using `StylableMixin` for items in a large list/grid.

#### Optimizations possibilities

Certain style sheets could be skipped by wrapping them inside a `@supports not (stylable) { ... }` declaration. Alternatively, only style sheets/rules which are wrapped inside a `@supports (stylable) { ... }` declaration could be processed.
