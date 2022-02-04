---
title: App Layout
layout: page
imports: /src/components/AppLayout.js
maturity: Preview
permalink: false
#eleventyNavigation:
#  key: App Layout
#  parent: Components
---

The `<j-app-layout>` is a responsive application layout that covers multiple common application layout patterns.

```
<j-app-layout type="top|side">
  <div slot="brand">Logo</div>
  <div slot="menu">Main menu</div>
  <div slot="support">User avatar, search field, etc.</div>
  <div slot="drawer">Additional navigation, like a submenu for example</div>

  <!-- Page content here -->
</j-app-layout>
```

Documentation is in progress. Meanwhile, you can examine the source of the documentation site for this project.
