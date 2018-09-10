# Stylable Mixin <maturity-badge poc>(Proof of concept)</maturity-badge>

`StylableMixin` is basically a more versatile replacement for [`Vaadin.ThemableMixin`](https://github.com/vaadin/vaadin-themable-mixin/), and does not depend on Polymer. It allows the user of the web component to inject custom styles inside the component’s shadow root (allowing theming).

#### Benefits
- You can style individual component instances (scoped) in addition to all instances of a component (global)
- Less boilerplate: just two attributes for the standard `<style>` element:
  ```html
  <style type="global" for="my-component">
    /* CSS for component's shadow DOM */
  </style>
  ```
   vs.
  ```html
  <dom-module id="my-id" theme-for="my-component">
    <template>
     <style>
      /* CSS for component's shadow DOM */
     </style>
   </template>
  </dom-module>
  ```
- No extra dependencies and less code

#### Drawbacks
- It adds roughly 10%–40% time to attach an element to the DOM (compared to an element without the mixin). Because of this, it’s not recommended to use the mixin for elements that are used in large numbers (counted in hundreds), f.e. items in a large list/grid.  

  To it’s defence, the performance impact of `ThemableMixin` has not been measured.
- Not tested in production
- Does not have the ability to include other style modules (`<style include="...">`). That could be added as a feature.


### Temporary solution

Both `StylableMixin` and `ThemableMixin` are temporary solutions until the web platform has a proper way to style shadow DOM elements in a controlled way. One proposal for that is the [`::part` and `::theme` pseudo-element selectors](https://tabatkins.github.io/specs/css-shadow-parts/).

## Features

### Style Shadow DOM from the parent scope

`StylableMixin` allows you to easily inject styles into a web component’s shadow DOM from the same style scope where a component instance is used:

```html,live
<style type="scoped" for=".special-card">
  [part="title"] {
    color: red;
  }
</style>

<j-card class="special-card">
  <h3 slot="title">I will be red</h3>
  <p>Card content</p>
</j-card>

<j-card>
  <h3 slot="title">I’m still normal</h3>
  <p>Card content</p>
</j-card>
```

### Style Shadow DOM from the global scope

You can also inject styles from the global scope into any other scope (a.k.a. theme module):

```html
<!-- This style module (when placed in the global scope)
  will be used by all <j-card> instances (you can see it
  being applied for the cards in the above example) -->
<style type="global" for="j-card">
  :host {
    border: 2px dotted;
    margin-bottom: 1em;
  }
</style>
```
<style type="global" for="j-card">
  :host {
    border: 2px dotted;
    margin-bottom: 1em;
  }
</style>

## Making a component stylable

To make a component “stylable”, extend it with the mixin, and call `super.connectedCallback()` in the component’s `connectedCallback()`:

```javascript
import { StylableMixin } from './node_modules/j-elements/src/stylable-mixin.js';

class XStylable extends StylableMixin(HTMLElement) {
  constructor() {
    super();
    // NOTE: your element needs to have a shadow root before StylableMixin is invoked
    this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    // Call super.connectedCallback() to have style modules applied
    super.connectedCallback();
  }
}
```
