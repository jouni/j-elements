---
title: Font tokens
layout: page
eleventyNavigation:
  key: Font tokens
  parent: Theme
permalink: /typography/
---

```html
<link href="j-elements/src/theme/typography.css" rel="stylesheet">
```

## Font size
Font sizes scale slightly based on the browser viewport size.
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
