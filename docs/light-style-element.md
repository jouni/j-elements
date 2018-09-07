# Light Style Element <maturity-badge poc>(Proof of concept)</maturity-badge>

### Providing a lightweight mechanism to add styles to a custom element

Shadow DOM has a non-negligible [impact on browser performance](https://bitworking.org/news/2018/02/shadow-dom-and-css).

For simple custom elements (just a wrapper, no Shadow DOM elements), especially ones which are used dozens of times in an app (like buttons and list items), which need built-in styling, it is possibly better to avoid using Shadow DOM.

But how do you package the built-in styling then? The `LightStyleElement` explores one option while we wait for [the W3C standard which allows us to do this natively](https://github.com/w3c/webcomponents/issues/468).

### Create a LightStyleElement

```javascript
import {LightStyleElement} from 'j-elements';

export class StyledElement extends LightStyleElement {
  constructor() {
    // You can pass a group of CSS properties, CSS selectors
    // or a complete <style> element (as a string)
    // or an actual <style> element reference
    super(`
      color: red;
      font-weight: bold;
    `);
  }
}

window.customElements.define('styled-element', StyledElement);
```
