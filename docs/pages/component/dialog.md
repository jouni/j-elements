---
title: Dialog
layout: page
imports:
  /src/components/Dialog.js
  /src/components/Button.js
permalink: false
#eleventyNavigation:
#  key: Dialog
#  parent: Components
---

```javascript
import {Dialog} from 'j-elements/src/components/Dialog.js';
```
<module-size modules="components/Dialog.js,util/DefineElementMixin.js,util/Portal.js,util/LightStyleMixin.js,util/css.js,util/bemToShadow.js"></module-size>

A dialog is created using the `<j-dialog>` element. It is based on [Portal](/util/portal), and because of that will always show on top of other content, escaping any parent stacking contexts.

Place any content you wish to show inside the dialog as the children, and use the `show()` and `hide()` methods for opening and closing it.

```html
<j-dialog visible>
  <p>Dialog contents</p>
</j-dialog>
```

> **Note:** j-dialog does not handle accessibility in any special way, for example prevent the user from tabbing out of it or make sure screen readers understand it’s a dialog.

> The content is “live” (i.e. parsed and executed) even when it is not show to the user. This is similar how for example [`<paper-dialog>`](https://www.webcomponents.org/element/PolymerElements/paper-dialog) works.

## Examples

### Create a dialog using HTML

<render-example></render-example>

```html
<j-button class="show-declarative">Open</j-button>

<j-dialog class="declarative">
  <h3>Declarative dialog</h3>
  <p>Dialog content.</p>
  <j-button class="hide">Close</j-button>
</j-dialog>

<script>
  {
    let declarativeDialog = document.querySelector('.declarative');
    let showDeclarative = document.querySelector('.show-declarative');
    let hideDeclarative = declarativeDialog.querySelector('.hide');

    showDeclarative.addEventListener('click', function() {
      declarativeDialog.show();
    });

    hideDeclarative.addEventListener('click', function() {
      declarativeDialog.hide();
    });
  }
</script>
```


### Create a dialog using JavaScript

Demonstrating how you can create and show a dialog using JavaScript.

<render-example></render-example>

```html
<j-button class="show-imperative">Open</j-button>

<script>
  {
    let showImperative = document.querySelector('.show-imperative');

    showImperative.addEventListener('click', function() {
      const dialog = document.createElement('j-dialog');
      dialog.innerHTML = `
        <h3>Imperative dialog</h3>
        <p>Dialog content.</p>
        <j-button class="hide">Close</j-button>
      `;
      document.body.appendChild(dialog);
      dialog.show();

      dialog.querySelector('.hide').addEventListener('click', function() {
        // Hide and remove the dialog from the DOM
        dialog.destroy();
      });
    });
  }
</script>
```


### Styling

<render-example></render-example>

```html
<style>
  .styled {
    border: 2px solid;
  }

  .styled h3 {
    margin-top: 0;
    color: red;
  }
</style>

<j-button class="show-styled">Open</j-button>

<j-dialog class="styled">
  <h3>Styled dialog</h3>
  <p>Dialog content.</p>
  <j-button class="hide">Close</j-button>
</j-dialog>

<script>
  {
    let styledDialog = document.querySelector('.styled');
    let showStyled = document.querySelector('.show-styled');
    let hideStyled = styledDialog.querySelector('.hide');

    showStyled.addEventListener('click', function() {
      styledDialog.show();
    });

    hideStyled.addEventListener('click', function() {
      styledDialog.hide();
    });
  }
</script>
```
