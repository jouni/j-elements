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

### Default
<render-example></render-example>
```html
<j-avatar></j-avatar>
```

### Text
<render-example></render-example>
```html
<j-avatar>JK</j-avatar>
```

### Image
<render-example></render-example>
```html
<j-avatar>
  <img src="https://avatars.githubusercontent.com/u/66382?s=60&v=4">
</j-avatar>
```

### Custom icon
<render-example></render-example>
```html
<j-avatar>
  <icon search></icon>
</j-avatar>
```

## Avatar group
A group of avatars. The [overflow menu](/prototypes/overflow-menu/) component is used to collapse overflowing avatars into a menu.

<render-example></render-example>
```html
<j-avatar-group>
  <j-avatar></j-avatar>
  <j-avatar>JK</j-avatar>
  <j-avatar><img src="https://avatars.githubusercontent.com/u/66382?s=60&v=4"></j-avatar>
  <j-avatar><icon search></icon></j-avatar>
  <j-avatar></j-avatar>
  <j-avatar>JK</j-avatar>
  <j-avatar><img src="https://avatars.githubusercontent.com/u/66382?s=60&v=4"></j-avatar>
  <j-avatar><icon search></icon></j-avatar>
  <j-avatar></j-avatar>
  <j-avatar>JK</j-avatar>
  <j-avatar><img src="https://avatars.githubusercontent.com/u/66382?s=60&v=4"></j-avatar>
  <j-avatar><icon search></icon></j-avatar>
</j-avatar-group>
```


### Customization
The avatar overlap, gap, roundness, size, background, and max number of items shown can be customized using CSS.

<render-example></render-example>
```html
<style>
  j-avatar-group.styled {
    --avatar-group-overlap: 10px;
    --avatar-group-gap: 4px;
    --avatar-border-radius: 6px;
    --avatar-size: 30px;
    --avatar-group-max-items: 5;
    --avatar-background-color: var(--background);
    --avatar-color: var(--color-accent);
    --avatar-border-color: currentColor;
    font-weight: var(--font-weight-strong);
    font-size: var(--font-size-xs);
  }
</style>

<j-avatar-group class="styled">
  <j-avatar></j-avatar>
  <j-avatar>JK</j-avatar>
  <j-avatar><img src="https://avatars.githubusercontent.com/u/66382?s=60&v=4"></j-avatar>
  <j-avatar><icon search></icon></j-avatar>
  <j-avatar></j-avatar>
  <j-avatar>JK</j-avatar>
  <j-avatar><img src="https://avatars.githubusercontent.com/u/66382?s=60&v=4"></j-avatar>
  <j-avatar><icon search></icon></j-avatar>
  <j-avatar></j-avatar>
  <j-avatar>JK</j-avatar>
  <j-avatar><img src="https://avatars.githubusercontent.com/u/66382?s=60&v=4"></j-avatar>
  <j-avatar><icon search></icon></j-avatar>
</j-avatar-group>
```
