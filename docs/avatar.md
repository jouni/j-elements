# Avatar <maturity-badge rfc>(Request for feedback)</maturity-badge>

### Default Avatar

Without any configuration, the avatar shows an icon.

```html,live
<j-avatar></j-avatar>
```

### Abbreviation

You can specify the `name` attribute for the avatar. The abbreviation/initials of the name are shown in the avatar instead of the icon. The full name is shown in a tooltip.

You can override the computed abbreviation by specifying the `abbr` attribute.

```html,live
<!-- Computed from name -->
<j-avatar name="John Doe"></j-avatar>

<!-- Explicit -->
<j-avatar name="John Doe" abbr="J"></j-avatar>
```

### Image

```html,live
<j-avatar image="https://placeimg.com/80/80/people" name="John Doe"></j-avatar>
```

### Size
```html,live
<style>
  j-avatar.small {
    width: 24px;
    height: 24px;
  }

  j-avatar.large {
    width: 48px;
    height: 48px;
  }
</style>

<p>
  <j-avatar class="small"></j-avatar>
  <j-avatar></j-avatar>
  <j-avatar class="large"></j-avatar>
</p>

<p>
  <j-avatar name="John Doe" class="small"></j-avatar>
  <j-avatar name="John Doe"></j-avatar>
  <j-avatar name="John Doe" class="large"></j-avatar>
</p>

<p>
  <j-avatar image="https://placeimg.com/70/70/people" name="John Doe" class="small"></j-avatar>
  <j-avatar image="https://placeimg.com/80/80/people" name="John Doe"></j-avatar>
  <j-avatar image="https://placeimg.com/90/90/people" name="John Doe" class="large"></j-avatar>
</p>
```

### Custom style
<script type="module">
  import '@vaadin/vaadin-lumo-styles/sizing.js';
</script>
```html,live
<j-avatar class="custom"></j-avatar>
<j-avatar class="lumo"></j-avatar>

<style>
  .custom {
    width: 50px;
    height: 50px;
    background: orange;
    color: black;
    border-radius: 4px;
  }

  /*
    Import the following modules after installing the 'vaadin-lumo-styles'
    package to use the Lumo CSS properties:

    <script type="module">
      import '@vaadin/vaadin-lumo-styles/sizing.js';
      import '@vaadin/vaadin-lumo-styles/style.js';
      import '@vaadin/vaadin-lumo-styles/color.js';
      import '@vaadin/vaadin-lumo-styles/typography.js';
    </script>
  */
  .lumo {
    width: var(--lumo-size-m);
    height: var(--lumo-size-m);
    box-shadow: 0 1px 2px 1px var(--lumo-shade-10pct), 0 1px 1px 0 var(--lumo-shade-10pct);
    background: #FFF linear-gradient(var(--lumo-contrast-40pct), var(--lumo-contrast-50pct));
    font-family: var(--lumo-font-family);
    font-size: var(--lumo-size-l);
    color: var(--lumo-base-color);
    font-weight: 600;
  }
</style>
```
