---
title: Components
layout: page
eleventyNavigation:
  parent: Research
  key: Components
  order: 20
---

Custom implementations for basic HTML components, like button, checkbox, and various text inputs means you can't use standard CSS to style them.

## Custom CSS Selectors
With custom components you need to target a different element name, sometimes within shadow DOM using `::part()`. You need to target custom state attributes because native pseudo-classes do not work, for example, `[checked]` vs `:checked`.

For example, compare styling a checkbox:
```css
/* Vaadin component */
vaadin-checkbox[checked]::part(checkbox) {

}

/* HTML component */
input[type=checkbox]:checked {

}
```
or styling a focused text input:
```css
/* Vaadin component */
vaadin-text-field[focus]::part(input-field) {

}

/* HTML component */
input[type=text]:focus {

}
```
While they are similar in selector complexity, the HTML element selectors require less explicit documentation from our part, as that is readily available online with a vast number of tutorials explaining how to style HTML elements. Also, attribute selectors are the worst performing CSS selector (the data doesn't show pseudo-classes, I assume them to be as fast as regular classes): https://nolanlawson.com/2022/06/22/style-scoping-versus-shadow-dom-which-is-fastest/

There might have been a need to reimplement basic HTML elements before, due to older browsers. With modern browsers, we can reconsider that and avoid making theming/styling more complicated than necessary.

## Using 3rd-Party CSS Libraries

Using 3rd-party CSS libraries, like [Bootstrap](http://getbootstrap.com), [Skeleton](http://getskeleton.com), or [Bulma](https://bulma.io), is a problem with Vaadin components.

The selectors defined by 3rd party libraries do not apply to custom components, and it is impossible to add classes defined by those libraries to the correct elements in Vaadin components, because they are either generated at runtime, or they are hidden inside shadow DOM, or they are not meant to be styled (for example, the native `<input>` element slotted inside Vaadin field components).

## Proposal: Use Basic HTML When Possible

I believe we should deprecate some of the Vaadin components in favor of basic HTML components. That said, many of the current use cases covered by Vaadin components can not be easily covered with basic HTML elements, so there is still a need for convenience APIs on top of the standard elements. I'm arguing for a change in the abstraction of those APIs.

As Vaadin components already place the native `<input>`, `<textarea>`, and `<label>` elements in the light DOM of the components, it seems wasteful not to style those elements directly, and require developers to style elements inside shadow DOM instead.

In addition to helping developers style components more easily, using basic HTML elements improves performance as there is less JavaScript to download, parse, and run, and potentially less DOM elements to render (this depends on other implementation details). After all, performance (startup/rendering/runtime) can be seen as a major feature of any business application.

The effort required to maintain components could also reduce, as more work is delegated to the browser instead of recreating it with JavaScript.

---


### Button

`<vaadin-button>` → `<button>`

Benefits:
- standard CSS applies
- no shadow DOM
- less DOM elements
- no JavaScript to download, parse, and run
- shorter HTML to write

Drawbacks:
- the `:active` state is not triggered when clicking a button with the Enter key, but only when clicking with the Space key

See the [prototype theme implementation for button](/prototypes/component-themes/#button).

<!-- TODO disabled vs aria-disabled (allow focusing disabled buttons) -->

---

### Checkbox and Radio Button

- `<vaadin-checkbox>` → `<input type="checkbox">`
- `<vaadin-radio-button>` → `<input type="radio">`.

Benefits:
- standard CSS applies
- no shadow DOM
- less DOM elements
- no JavaScript to download, parse, and run

Drawbacks:
- adding a label for the input is less convenient (`<input id="">` + `<label for="">`)
- no read-only state

Although it is not absolutely necessary, I would recommend a helper component that takes care of connecting the label and the input. This saves the developer from coming up with unique ID's for all inputs. That reintroduces some amount of JavaScript, so that benefit is diminished. A shared “field” component would fix all inconsistency issue across input field components, most prominently validation-related behavior.

See the [`<j-field>`](/prototypes/field/#checkbox) prototype and the [prototype theme implementation for checkbox](/prototypes/component-themes/#checkbox) and [radio button](/prototypes/component-themes/#radio-button).

#### Checkbox and Radio Groups

Grouping checkboxes and radio buttons still benefits from a component that makes it convenient to label the group and provide validation functionality (required field indicator, validation message).

See the [`<j-field-group>`](/prototypes/field/#field-group) prototype.

<!--
Potential regressions:
- checkboxes and radio buttons no longer get focused in Safari when clicked: https://github.com/vaadin/web-components/issues/4165
-->

---

### Text Inputs

- `<vaadin-text-field>` → `<input type="text">`
- `<vaadin-password-field>` → `<input type="password">`
- `<vaadin-email-field>` → `<input type="email">`
- `<vaadin-number-field>` → `<input type="number">`
- `<vaadin-text-area>` → `<textarea>`

Benefits:
- standard CSS applies
- no shadow DOM
- less DOM elements
- no JavaScript to download, parse, and run

Drawbacks:
- adding a label and a description/helper for the input is less convenient (`<input id="..." aria-describedby="...">` + `<label for="...">`)
- adding validation features (required field indicator, validation/error message) for the input is less convenient
- no support for prefix and suffix content
- no native password reveal button in all browsers
- no native "clear input" button for all input types (only for "search")
- text area does not size itself based on content
- the `:invalid` pseudo-class behaves differently than the `[invalid]` attribute (the latter is similar to `:user-invalid`, which is only supported in Firefox)
- email input validation pattern is defined by the browser, and it is potentially more strict than what we want?
- number input spinner buttons are placed differently from the controls that `<vaadin-number-field>` provides
- no “auto-select” feature

Similarly to checkbox and radio button, I recommend a helper component for labelling and validation purposes. See the [`<j-field>`](/prototypes/field/) prototype and the [prototype theme implementation for text input](/prototypes/component-themes/#text-input)

For prefix content and text area autosizing, I recommend another helper component. See the [`<j-input-decorator>`](/prototypes/input-decorator/) prototype. It uses JavaScript and shadow DOM, so those benefit are diminished.

To support the "clear input" button, the input decorator element could have that as a feature.

The benefit of this approach is that users can opt-in to features instead of always "paying" for all features even if they would not be using any.

Some of the related components, like `<vaadin-combo-box>` and `<vaadin-date-picker>`, which are currently based on `<vaadin-text-field>` should also be broken down and limited to the unique features each one provides over any other component. For example, the primary feature `<vaadin-date-picker>` should provide is the custom calendar overlay picker, and the main feature `<vaadin-combo-box>` should provide is the lazy-loading item overlay.


---


### Progress Bar

`<vaadin-progress-bar>` → `<progress>`

Benefits:
- standard CSS applies
- no shadow DOM
- less DOM elements
- no JavaScript to download, parse, and run

Drawbacks:
- None

See the [prototype theme implementation for progress bar](/prototypes/component-themes/#progress-and-meter).

---


### Details

`<vaadin-details>` → `<details>`

Benefits:
- standard CSS applies
- no shadow DOM
- less DOM elements
- no JavaScript to download, parse, and run
- browsers "find in page" actually finds (auto-expands) content collapsed inside it

Drawbacks:
- no support for the disabled state

The disabled state can be mimicked with `tabindex="-1"` + `pointer-events: none;`, which is of course less convenient.

See the [prototype theme implementation for details](/prototypes/component-themes/#details).

<!-- TODO take into consideration: https://www.scottohara.me/blog/2022/09/12/details-summary.html -->

---


### Accordion

`<vaadin-accordion>` → `<details name="...">` + `<details name="...">` ...

Drawbacks:

- `<details name="...">` isn't supported in Firefox at the time of writing.

<!--
### `<vaadin-progress-bar>` → `<progress>`
https://web.dev/building-a-loading-bar-component/
-->
