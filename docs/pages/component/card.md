---
title: Card
layout: page
imports:
  /src/components/Card.js
permalink: false
#eleventyNavigation:
#  key: Card
#  parent: Components
---

```javascript
import {Card} from 'j-elements/src/components/Card.js';
```
<module-size modules="components/Card.js,util/DefineElementMixin.js,util/Stylable.js"></module-size>

## Examples

### Simple card

<render-example></render-example>

```html
<j-card>
  <h3 slot="title">Card title</h3>
  <p>Card content lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
  <button>Action</button>
  <button>Action</button>
</j-card>
```
