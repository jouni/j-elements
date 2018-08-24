# Get Started

## Install

j-elements is installable with [npm](https://npmjs.org) or any alternative npm client, like [Yarn](https://yarnpkg.com/en/):

```
npm install j-elements
```

## Import

The components are delivered as ES6 Modules.

If you are using a build tool / bundler (Webpack, Rollup, Polymer CLI, etc), you can use the bare module specifier.

```javascript
import 'j-elements';

// You can optionally import just some of the components or utilities, for example:
import {JIcon, JCard} from 'j-elements';
```

Otherwise you should specify a fully qualified path, for example:

```javascript
import './node_modules/j-elements/elements.js';
```


## Use

After importing the components, use them in JavaScript or HTML.

#### JavaScript
```javascript
const avatar = document.createElement('j-avatar');
avatar.setAttribute('name', 'John Doe');
document.body.appendChild(avatar);
```

#### HTML
```html
<j-avatar name="John Doe"></j-avatar>
```
