---
title: Get started
layout: page
eleventyNavigation:
  key: Get started
  order: 20
---

## Install

JElements is installable with [npm](https://npmjs.org) or any alternative npm client, like [Yarn](https://yarnpkg.com/en/):

```shell
npm install j-elements
```

The package has zero dependencies and is about <module-size></module-size> in total including all components, utilities, and CSS.

## Import

The components are delivered as [ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import).

If you are using a build tool / bundler (Webpack, Rollup, Polymer CLI, etc), you can use the bare module specifier.

```js
import { Field, InputDecorator } from 'j-elements';
```

Otherwise you should specify a fully qualified path, for example:

```js
import { Field, InputDecorator } './node_modules/j-elements/index.js';
```

Using `from 'j-elements'` results in importing all the components and utilities, unless you use a build tool that can do [“tree shaking”](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) and remove the unused imports.

To avoid importing everything, use the explicit paths to the components and utilities, for example:
```js
import { Field } from 'j-elements/src/components/Field.js';
```


## Use

After importing the components, use them via HTML or JavaScript.

### HTML
<render-example></render-example>
```html
<j-field>
  <label>Name</label>
  <input type="text" required>
</j-field>
```

### JavaScript
<render-example></render-example>
```html
<script type="module">
  import '/src/components/Field.js';

  const field = document.createElement('j-field');
  field.innerHTML = `
    <label>Name</label>
    <input type="text" required>
  `;

  document.querySelector('#example').appendChild(field);
</script>
<div id="example"></div>
```
