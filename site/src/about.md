# About

<div class="hero">j</div>

<p class="ingress"><b>JElements is a web development research project</b>, looking at some of the current problems around authoring and using Web Components and how to provide solutions to those problems while the browsers improve their capabilities.</p>

<p class="ingress">It also includes a collection or ready-to-use web components which test the solutions first-hand.</p>

<p>The package has zero dependencies (~11kB gzipped in total), so it is lightweight to use in your projects.</p>

> Since it’s research project, **JElements is not recommended for production use**. It is mainly looking for feedback from other developers, if the concepts are viable for production. See [Maturity Levels](/maturity) for more info.

> **Browser support:** Evergreen browsers (not IE11 or pre-Chromium Edge)

## [Get Started ›](/howto)

## What’s included

### Utilities

The utilities are lower-level mixins and elements which help build components that are easier for other developers to use.

- [`LightStyleElement`](/light-style-element) is a way to include built-in styling for a web component without the need to use shadow DOM
- [`MutationAnimationMixin`](/mutation-animation) makes it easy to animate elements in and out of the DOM
- [`PortalElement`](/portal-element) provides a mechanism for escaping any stacking context, making it suitable as a base for reusable overlay components
- [`StylableMixin`](/stylable-mixin) allows developers using such components to be styled more freely, by allowing them to inject styles inside the shadow DOM


### Components

- [App Layout](/app-layout) – the main layout which is used for this website
- [Avatar](/avatar) – uses some nice SVG ”magic” to make the text inside the avatar scale automatically, and `<j-icon>` for an easily customizable icon
- [Card](/card) – looking at how to make a versatile card component
- [Dialog](/dialog) – testing `TeleportingElement`, if it is a viable option for building dialogs
- [Field](/field) – add consistently styled labels and error messages for any input element
- [Icon](/icon) – easy to style icon component, giving CSS the power to change the icon shape
- [Input](/input) – a text input component with consistent styling across different browsers, prefix and suffix content support and auto-sizing in both horizontal and vertical directions
- [Placeholder](/placeholder) – a simple element for showing a placeholder box (useful for quick prototyping)
- [Tooltip](/tooltip) – testing `TeleportingElement`, if its a viable option for building tooltips
