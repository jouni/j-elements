# When to use Shadow DOM




<!--

side note here, the entire problem that arises from using shadow dom in the components, and not having primitives in the web platform for defining styles for shadow dom from outside (e. g., `/deep/` selector combinator, `::theme` for css shadow parts, or CSS Modules that could be imported from JS, or something like that). I’m wondering nowadays if shadow dom is worth at all.

Anton Platonov [9 days ago]

- currently, we rely on collecting styles from `dom-module` elements at runtime because of not having platform features for that, and this has a bad syntax and other issues, such as loading-dependent order, having to learn our custom solution, dependence on Polymer, and so on...
- with the proposed css build pipeline that annotates and compiles `dom-module`-s from regular css files, we solve the syntax issue, but not the others, and I think there are more important issues than syntactical. (edited)

Serhii Kulykov [9 days ago]
I agree with your points, dropping shadow DOM should be considered after V14. That would mean that “next” components wouldn’t be backwards compatible though

Anton Platonov [9 days ago]
In comparison between the most polar options I have:

    ```
    :host { }
    ```

    - requires build tooling, runtime work, and learning

    ```
    vaadin-grid {
    }
    ```

    - works out-of-the-box with zero tooling for some cases, no runtime is required, old and standard CSS everyone knows how to include

    I’m trying to make a point here, that even if we don’t drop shadow dom, let’s maybe think on how to go from the latter least-weird way towards what would work for us, instead of trying to adapt the first already weird way by applying more weirdness. (edited)

---

[https://developers.google.com/search/docs/guides/fix-search-javascript](https://developers.google.com/search/docs/guides/fix-search-javascript)
"Make sure your web components are search-friendly:
To encapsulate and hide implementation details, use shadow DOM.
Put your content into light DOM whenever possible"

---

- If no shadow dom, how are component’s own styles packaged and applied?

---

-->
