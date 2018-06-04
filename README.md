# j-elements

> Proof-of-concept helpers and prototype web components



What you’ll find here:



### Proof-of-concept helper elements and mixins

- **Stylable mixin** (`src/stylable-mixin.js`): Allows you to easily inject styles into a web component’s shadow DOM from the same style scope where a component instance is used:

    ```html
    <j-card class="special-card">
      <h3 slot="title">I will be red</h3>
    </j-card>

    <style type="module" for=".special-card">
      [part="title"] {
        color: red;
      }
    </style>
    ```

    The stylable mixin is basically a more versatile replacement for [`Vaadin.ThemableMixin`](https://github.com/vaadin/vaadin-themable-mixin/), and does not depend on Polymer.

- **Teleporting element** (`src/teleporting-element.js`): An element prototype that can escape any stacking context, by “teleporting” itself directly under the `<body>` element when set “visible” (which is needed if any of the original parent elements creates a clipping stacking context):

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

    The “teleporting element” is basically an alternative implementation for [`<vaadin-overlay>`](https://github.com/vaadin/vaadin-overlay), and does not require the user to wrap the contents of the overlay in a `<template>` and does not depend on Polymer.



### Prototype web components

Web components that try to fill in some gaps in the [Vaadin components collection](https://vaadin.com/components), and experiment with alternative implementation ideas for them by using the low-level elements and mixins.

- **Avatar** `<j-avatar>`: a simple avatar component, showing either a default user icon, name abbreviation or profile picture. Uses `<j-tooltip>` to show the full name when hovering over the avatar.

    ```html
    <j-avatar name="John Doe"></j-avatar>
    ```

- **Card** `<j-card>`: A straightforward, versatile card component.

    ```html
    <j-card>
      <h3 slot="title">Card title</h3>
      <p>Some content for the card.</p>
      <button>Action</button>
    </j-card>
    ```

- **Dialog** `<j-dialog>`: A simple dialog element. A test for `TeleportingElement`. Does not handle accessibility or keyboard navigation in any special way.

    ```html
    <j-dialog>
      <p>Some content for the dialog.</p>
    </j-dialog>
    ```

- **Tooltip** `<j-tooltip>`: A simple tooltip element. A test for `TeleportingElement`. Does not handle accessibility in any special way (f.e. does not announce the tooltip for screen readers).

    ```html
    <j-tooltip>Tooltip content</j-tooltip>
    ```



### Development / testing it locally

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
