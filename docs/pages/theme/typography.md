---
title: Typography
layout: page
eleventyNavigation:
  key: Typography
  parent: Theme
permalink: /typography/
---

## Font size
<style>
.font-size {
  display: block;
}
.font-size p {
  margin: var(--size-8) 0;
  line-height: var(--line-height-xs);
}
</style>
<render-example class="font-size"></render-example>
```html
<p style="font-size: var(--font-size-3xl);">Lorem ipsum</p>
<p style="font-size: var(--font-size-2xl);">Lorem ipsum</p>
<p style="font-size: var(--font-size-xl);">Lorem ipsum</p>
<p style="font-size: var(--font-size-l);">Lorem ipsum</p>
<p style="font-size: var(--font-size-m);">Lorem ipsum</p>
<p style="font-size: var(--font-size-s);">Lorem ipsum</p>
<p style="font-size: var(--font-size-xs);">Lorem ipsum</p>
<p style="font-size: var(--font-size-2xs);">Lorem ipsum</p>
```
