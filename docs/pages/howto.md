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

## Import

The components are delivered as [ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import).

If you are using a build tool / bundler (Webpack, Rollup, Polymer CLI, etc), you can use the bare module specifier.

```javascript
import 'j-elements';

// You can optionally import just some of the components or utilities, for example:
import { Field, Input } from 'j-elements';
```

Otherwise you should specify a fully qualified path, for example:

```javascript
import './elements.js';
```

> Using `from 'j-elements'` results in importing all the components and utilities, unless you use a build tool that can do [“tree shaking”](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) and remove the unused imports.
>
> To avoid importing everything, use the explicit paths to the components and utilities, e.g. `from 'j-elements/src/components/Field.js'` and `from 'j-elements/src/util/Portal.js'`.


## Use

After importing the components, use them in JavaScript or HTML.

### JavaScript
```javascript
const field = document.createElement('j-field');
field.innerHTML = `
  <label>Name</label>
  <input type="text">
`;
document.body.appendChild(field);
```

### HTML
```html
<j-field>
  <label>Name</label>
  <input type="text">
</j-field>
```
