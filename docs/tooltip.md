# Tooltip <maturity-badge proto>(Proto)</maturity-badge>

A tooltip component based on [Teleporting Element](/teleporting-element), allowing it to escape any stacking contexts.

> **Note:** j-tooltip does not handle accessibility in any special way, for example make sure screen readers announce the tooltip content when it’s shown.

### Simple tooltip
```html,live
<div>
  <p>This paragraph has a tooltip – hover over it see the tooltip.</p>
  <j-tooltip>Well done – here’s a tooltip as a reward!</j-tooltip>
</div>
```


### Tooltip with HTML content
```html,live
<div>
  <p>This paragraph has a tooltip – hover over it see the tooltip.</p>
  <j-tooltip style="padding: 0.75em;">
    <b>Title</b><br>
    <span>Content</span>
  </j-tooltip>
</div>
```


### Escaping a clipping stacking context
```html,live
<style>
  .clipping-context {
    /* 3D transforms create a new stacking context,
       even for fixed positioned elements */
    transform: translateZ(0);
    overflow: hidden;
    width: 40px;
    height: 40px;
    outline: 1px solid;
  }
</style>

<div class="clipping-context">
  <j-tooltip>I’m completely visible!</j-tooltip>
</div>
```


### Custom styling
```html,live
<div>
  <p>This paragraph has a tooltip – hover over it see the tooltip.</p>
  <j-tooltip class="lumo">Tooltip styled with Lumo properties</j-tooltip>
</div>

<!--
  Import the following modules after installing the 'vaadin-lumo-styles'
  package to use Lumo CSS properties:

  <script type="module">
    import '@vaadin/vaadin-lumo-styles/style.js';
    import '@vaadin/vaadin-lumo-styles/color.js';
    import '@vaadin/vaadin-lumo-styles/typography.js';
  </script>
-->

<style type="scoped" for="j-tooltip.lumo">
  :host {
    box-shadow: var(--lumo-box-shadow-s);
    background-color: var(--lumo-contrast-80pct);
    color: var(--lumo-base-color);
    border-radius: var(--lumo-border-radius);
    font-size: var(--lumo-font-size-s);
    line-height: var(--lumo-font-size-s);
    font-family: var(--lumo-font-family);
  }
</style>
```
