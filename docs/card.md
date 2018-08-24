# Card <maturity-badge proto>(Prototype)</maturity-badge>

### Simple card
```html,live
<j-card>
  <h3 slot="title">Card title</h3>
  <p>Card content lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
  <button>Action</button>
  <button>Action</button>
</j-card>
```

### Custom style card (Lumo)
```html,live
<j-card class="lumo">
  <h3 slot="title">Card title</h3>
  <p>Card content lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
  <button>Action</button>
  <button>Action</button>
</j-card>

<style type="scoped" for="j-card.lumo">
  :host {
    font-family: var(--lumo-font-family);
    font-size: var(--lumo-font-size-m);
    color: var(--lumo-body-text-color);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--lumo-base-color);
    border-radius: var(--lumo-border-radius);
    padding: var(--lumo-space-l);
    border: 0;
    /* TODO should become --lumo-box-shadow-xs */
    box-shadow: 0 1px 4px -1px var(--lumo-shade-60pct);
  }
</style>
```
