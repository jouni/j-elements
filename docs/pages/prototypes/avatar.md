---
title: Avatar
layout: page
eleventyNavigation:
  key: Avatar
  parent: Prototypes
  order: 30
imports:
  /src/components/Avatar.js
  /src/components/AvatarGroup.js
---

## Single avatar

### Name
The text content is used to form the abbreviation inside the avatar.

<render-example></render-example>
```html
<j-avatar>Jouni Koivuviita</j-avatar>
```

### Explicit abbreviation
In case the text content is more than the persons name, you can override the abbreviation.

<render-example></render-example>
```html
<j-avatar abbr="JK">
  <div>Jouni Koivuviita</div>
  <span>jouni@vaadin.com</span>
</j-avatar>

<style>
  j-avatar span {
    color: var(--color-low-contrast);
    font-size: var(--font-size-s);
  }
</style>
```

### Image
<render-example></render-example>
```html
<j-avatar src="https://avatars.githubusercontent.com/u/66382?s=60&v=4">
  Jouni Koivuviita
</j-avatar>
```

### Avatar only
When only the avatar is shown, the text content is show in a tooltip.

<render-example></render-example>
```html
<j-avatar minimal>Jouni Koivuviita</j-avatar>
```

## Avatar group
A group of avatars. The [overflow menu](/prototypes/overflow-menu/) component is used to collapse overflowing avatars into a menu.

<render-example></render-example>
```html
<j-avatar-group>
  <j-avatar abbr="JK">
    <div>Jouni Koivuviita</div>
    <span>jouni@vaadin.com</span>
  </j-avatar>
  <j-avatar abbr="JK">
    <div>Jouni Koivuviita</div>
    <span>jouni@vaadin.com</span>
  </j-avatar>
  <j-avatar abbr="JK">
    <div>Jouni Koivuviita</div>
    <span>jouni@vaadin.com</span>
  </j-avatar>
  <j-avatar abbr="JK">
    <div>Jouni Koivuviita</div>
    <span>jouni@vaadin.com</span>
  </j-avatar>
  <j-avatar abbr="JK">
    <div>Jouni Koivuviita</div>
    <span>jouni@vaadin.com</span>
  </j-avatar>
  <j-avatar abbr="JK">
    <div>Jouni Koivuviita</div>
    <span>jouni@vaadin.com</span>
  </j-avatar>
  <j-avatar abbr="JK">
    <div>Jouni Koivuviita</div>
    <span>jouni@vaadin.com</span>
  </j-avatar>
  <j-avatar abbr="JK">
    <div>Jouni Koivuviita</div>
    <span>jouni@vaadin.com</span>
  </j-avatar>
</j-avatar-group>
```


### Customization
The avatar overlap, gap, roundness, size, background, and max number of items shown can be customized using CSS.

<render-example></render-example>
```html
<style>
  j-avatar-group.styled {
    --avatar-overlap: 0.5rem;
    --avatar-gap: 4px;
    --avatar-border-radius: 8px;
    --avatar-size: 30px;
    --avatar-group-max-items: 5;
  }

  j-avatar-group.styled ::part(avatar) {
    fill: var(--background-accent);
    color: var(--background);
    font-weight: var(--font-weight-strong);
  }
</style>

<j-avatar-group class="styled">
  <j-avatar abbr="JK">
    <div>Jouni Koivuviita</div>
    <span>jouni@vaadin.com</span>
  </j-avatar>
  <j-avatar abbr="JK">
    <div>Jouni Koivuviita</div>
    <span>jouni@vaadin.com</span>
  </j-avatar>
  <j-avatar abbr="JK">
    <div>Jouni Koivuviita</div>
    <span>jouni@vaadin.com</span>
  </j-avatar>
  <j-avatar abbr="JK">
    <div>Jouni Koivuviita</div>
    <span>jouni@vaadin.com</span>
  </j-avatar>
  <j-avatar abbr="JK">
    <div>Jouni Koivuviita</div>
    <span>jouni@vaadin.com</span>
  </j-avatar>
  <j-avatar abbr="JK">
    <div>Jouni Koivuviita</div>
    <span>jouni@vaadin.com</span>
  </j-avatar>
  <j-avatar abbr="JK">
    <div>Jouni Koivuviita</div>
    <span>jouni@vaadin.com</span>
  </j-avatar>
  <j-avatar abbr="JK">
    <div>Jouni Koivuviita</div>
    <span>jouni@vaadin.com</span>
  </j-avatar>
</j-avatar-group>
```
