---
title: Get started
layout: page
eleventyNavigation:
  key: Get started
---

## Install

JElements is installable with [npm](https://npmjs.org) or any alternative npm client, like [Yarn](https://yarnpkg.com/en/):

```
npm install jelly
```

## Import

The components are delivered as [ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import).

If you are using a build tool / bundler (Webpack, Rollup, Polymer CLI, etc), you can use the bare module specifier.

```javascript
import 'jelly';

// You can optionally import just some of the components or utilities, for example:
import {Icon, Card} from 'jelly';
```

Otherwise you should specify a fully qualified path, for example:

```javascript
import './elements.js';
```

> Using `from 'jelly'` results in importing all the components and utilities, unless you use a build tool that can do [“tree shaking”](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) and remove the unused imports.
>
> To avoid importing everything, use the explicit paths to the components and utilities, e.g. `from 'jelly/src/components/JAvatar.js'` and `from 'jelly/src/util/Portal.js'`.


## Use

After importing the components, use them in JavaScript or HTML.

### JavaScript
```javascript
const avatar = document.createElement('j-avatar');
avatar.setAttribute('name', 'John Doe');
document.body.appendChild(avatar);
```

### HTML
```html
<j-avatar name="John Doe"></j-avatar>
```
