# JElements

> Proof-of-concept helpers and prototype web components

*Not recommended for production, but very much recommended for testing and providing feedback* 😊

[Docs and demos ›](https://jelements.netlify.com)


## Proof-of-concept helper elements and mixins

See the documentation for `LightStyleElement`, `StylableMixin` and `PortalElement`.



## Prototype web components

Web components that try to fill in some gaps in the [Vaadin components collection](https://vaadin.com/components), and experiment with alternative implementation ideas for them by using the low-level elements and mixins.

See the documentation site for all components.





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
    cd site
    npm link ../
    polymer serve -o
    ```
