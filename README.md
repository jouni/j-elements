# JElements

JElements is a web development research project, looking at some of the current problems around authoring and using Web Components and how to provide solutions to those problems while the browsers improve their capabilities.

It also includes a collection or ready-to-use web components which test the solutions first-hand.

> **Not recommended for production**, but very much recommended for testing and providing feedback 😊

[Docs and demos ›](https://jelements.netlify.com)

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

1. Run the docs site and open it in your default browser:

    ```
    cd site
    npm link ../
    polymer serve -o
    ```
