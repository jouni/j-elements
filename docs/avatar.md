# Avatar <maturity-badge rfc>(Request for feedback)</maturity-badge>

### Default avatar

Without any configuration, the avatar shows an icon (a “user” icon by default). The icon is a [`<j-icon>`](/icon) element, so the default icon can be changed with CSS (by setting the `--svg` property).

```html,live
<j-avatar></j-avatar>

<j-avatar class="custom-icon"></j-avatar>

<style>
  .custom-icon {
    --svg: <path d="M16.14526 6.752408l1.486766 1.339388-4.909254 5.578324c-.223349.249992-.903305.565635-2.039867.946926a.20002.20002 0 0 1-.120015.002272c-.105986-.031147-.166655-.142316-.135508-.248302l.00002.000005c.331547-1.128177.608798-1.817041.831754-2.066593l4.886105-5.55202zm.89182-1.013364l1.240148-1.409164c.369021-.413042.995814-.442158 1.39998-.065033.404167.377126.432657 1.017683.063636 1.430725L18.52354 7.07878l-1.48646-1.339735zM15.015176 5l-1.608163 1.8h-5.414C7.330035 6.8 6.8 7.33413 6.8 7.993012v8.013976C6.8 16.669964 7.33413 17.2 7.993012 17.2h8.013976c.662976 0 1.193012-.53413 1.193012-1.193012v-4.44073L19 9.551534v6.445114C19 17.655354 17.657621 19 15.996649 19H8.00335C6.344646 19 5 17.657621 5 15.996649V8.00335C5 6.344646 6.342379 5 8.003351 5h7.011825z"/>;
  }
</style>
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
