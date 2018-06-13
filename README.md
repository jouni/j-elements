# j-elements

> Proof-of-concept helpers and prototype web components

*Not recommended for production, but very much recommended for getting inspired and providing feedback* 😊



## Proof-of-concept helper elements and mixins



### Stylable mixin

`StylableMixin` (`src/stylable-mixin.js`) allows you to easily inject styles into a web component’s shadow DOM from the same style scope where a component instance is used:

```html
<j-card class="special-card">
  <h3 slot="title">I will be red</h3>
</j-card>

<style type="scoped" for=".special-card">
  :host {
    background-color: black;
    color: white;
  }
</style>
```

You can also inject styles from the global scope into any other scope (a.k.a. theme module):

```html
<!-- This style module (when placed in
  the global scope) will be used by all
  <j-card> instances -->
<style type="global" for="j-card">
  :host {
    border: 2px solid;
  }
</style>
```

To make a component “stylable”, extend your component with the mixin:

```javascript
import { StylableMixin } from './node_modules/j-elements/src/stylable-mixin.js';

class JCard extends StylableMixin(HTMLElement) {
  connectedCallback() {
    // You need to call this to have style modules applied
    super.connectedCallback();
  }
}
```

The stylable mixin is basically a more versatile replacement for [`Vaadin.ThemableMixin`](https://github.com/vaadin/vaadin-themable-mixin/), and does not depend on Polymer.






### Teleporting element

A teleporting element (`src/teleporting-element.js`) can escape any stacking context, by “teleporting” itself directly under the `<body>` element when set “visible”. Moving the element under the `<body>` element is needed if any of the original parent elements creates a clipping stacking context. Some libraries call this a “portal element” or “hoisting an element under the <body>”.

```html
<style>
  .clipping-context {
    /* 3D transforms create a new stacking context,
    even for fixed positioned elements */
    transform: translateZ(0);
    overflow: hidden;
    width: 40px;
    height: 40px;
    outline: 1px solid;
  }
</style>

<div class="clipping-context">
  <!-- j-tooltip extends TeleportingElement -->
  <j-tooltip>I’m completely visible!</j-tooltip>
</div>
```

The “teleporting element” is basically an alternative implementation for [`<vaadin-overlay>`](https://github.com/vaadin/vaadin-overlay), and does not require the user to wrap the contents of the overlay in a `<template>` and does not depend on Polymer. It isn’t necessarily “better”, just an alternative approach with a bit of different benefits and drawbacks.

StylableMixin drawbacks:
- It adds roughly 10%–40% time to attach an element to the DOM (compared to an element without the mixin). Because of this, it’s not recommended to use the mixin for elements that are used in large numbers (counted in hundreds), f.e. items in a large list/grid.









## Prototype web components

Web components that try to fill in some gaps in the [Vaadin components collection](https://vaadin.com/components), and experiment with alternative implementation ideas for them by using the low-level elements and mixins.


### Avatar

`<j-avatar>`: a simple avatar component, showing either a default user icon, name abbreviation or profile picture. Uses `<j-tooltip>` to show the full name when hovering over the avatar.

```html
<j-avatar name="John Doe"></j-avatar>
```


### Card

`<j-card>`: A straightforward, versatile card component.

```html
<j-card>
  <h3 slot="title">Card title</h3>
  <p>Some content for the card.</p>
  <button>Action</button>
</j-card>
```


### Dialog

`<j-dialog>`: A simple dialog element. A test for `TeleportingElement`. Does not handle accessibility or keyboard navigation in any special way.

```html
<j-dialog visible>
  <p>Some content for the dialog.</p>
</j-dialog>
```


### Tooltip

`<j-tooltip>`: A simple tooltip element. A test for `TeleportingElement`. Does not handle accessibility in any special way (f.e. does not announce the tooltip for screen readers).

```html
<j-tooltip>Tooltip content</j-tooltip>
```






## Development / testing it locally

Install Node.js and npm, then do the following:

1. Clone the repo and change to the project directory:

    ```
    git clone https://github.com/jouni/j-elements
    cd j-elements
    ```

1. Install project dependencies:

    ```
    npm install
    ```

1. Install [Polymer CLI](https://www.polymer-project.org/3.0/docs/tools/polymer-cli):

    ```
    npm install -g polymer-cli
    ```

1. Run the demos and open them in your default browser:

    ```
    polymer serve -o --open-path demo
    ```
