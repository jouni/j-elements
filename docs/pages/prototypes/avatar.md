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
<render-example></render-example>
```html
<j-avatar>Jouni Koivuviita</j-avatar>
```

### Details
<render-example></render-example>
```html
<j-avatar>
  Jouni Koivuviita
  <span slot="details">jouni@vaadin.com</span>
</j-avatar>

<style>
  span[slot=details] {
    color: var(--color-low-contrast);
  }
</style>
```

### Image
<render-example></render-example>
```html
<j-avatar src="https://avatars.githubusercontent.com/u/66382?s=60&v=4">Jouni Koivuviita</j-avatar>
```

### Avatar only
<render-example></render-example>
```html
<j-avatar theme="avatar-only">Jouni Koivuviita</j-avatar>
```

## Avatar group

<render-example></render-example>
```html
<j-avatar-group>
  <j-avatar>
    <span>Jouni Koivuviita</span>
    <span slot="details">jouni@vaadin.com</span>
  </j-avatar>
  <j-avatar>
    <span>Jouni Koivuviita</span>
    <span slot="details">jouni@vaadin.com</span>
  </j-avatar>
  <j-avatar>
    <span>Jouni Koivuviita</span>
    <span slot="details">jouni@vaadin.com</span>
  </j-avatar>
  <j-avatar>
    <span>Jouni Koivuviita</span>
    <span slot="details">jouni@vaadin.com</span>
  </j-avatar>
  <j-avatar>
    <span>Jouni Koivuviita</span>
    <span slot="details">jouni@vaadin.com</span>
  </j-avatar>
  <j-avatar>
    <span>Jouni Koivuviita</span>
    <span slot="details">jouni@vaadin.com</span>
  </j-avatar>
  <j-avatar>
    <span>Jouni Koivuviita</span>
    <span slot="details">jouni@vaadin.com</span>
  </j-avatar>
  <j-avatar>
    <span>Jouni Koivuviita</span>
    <span slot="details">jouni@vaadin.com</span>
  </j-avatar>
</j-avatar-group>
```


## Overlap, gap, roundness, size, and max items

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
</style>

<j-avatar-group class="styled">
  <j-avatar>
    <span>Jouni Koivuviita</span>
    <span slot="details">jouni@vaadin.com</span>
  </j-avatar>
  <j-avatar>
    <span>Jouni Koivuviita</span>
    <span slot="details">jouni@vaadin.com</span>
  </j-avatar>
  <j-avatar>
    <span>Jouni Koivuviita</span>
    <span slot="details">jouni@vaadin.com</span>
  </j-avatar>
  <j-avatar>
    <span>Jouni Koivuviita</span>
    <span slot="details">jouni@vaadin.com</span>
  </j-avatar>
  <j-avatar>
    <span>Jouni Koivuviita</span>
    <span slot="details">jouni@vaadin.com</span>
  </j-avatar>
  <j-avatar>
    <span>Jouni Koivuviita</span>
    <span slot="details">jouni@vaadin.com</span>
  </j-avatar>
  <j-avatar>
    <span>Jouni Koivuviita</span>
    <span slot="details">jouni@vaadin.com</span>
  </j-avatar>
  <j-avatar>
    <span>Jouni Koivuviita</span>
    <span slot="details">jouni@vaadin.com</span>
  </j-avatar>
</j-avatar-group>
```
