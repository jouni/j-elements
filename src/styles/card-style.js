// By using "var innerHTML" we allow IDEs (at least Atom) to use correct syntax highlighting and code completion
var innerHTML = `
  <style>
    .card {
      display: flex;
      flex-direction: column;
      position: relative;
      border: 1px solid rgba(0, 0, 0, 0.1);
      padding: 1em;
      border-radius: 0.25em;
      box-sizing: border-box;
    }

    .card__content {
      display: block;
    }

    .card__title {
      display: block;
      font-size: 1.25em;
      font-weight: 600;
    }

    [part="header"],
    [part="image"],
    [part="footer"] {
      /* margin: calc(var(--lumo-space-l) * -1); */
      /* padding: var(--lumo-space-wide-l); */
      /* line-height: var(--lumo-line-height-xs); */
    }

    .card__content {
      flex: auto;
      /* padding: var(--lumo-space-wide-l); */
    }

    [part="header"],
    [part="image"] {
      /* margin-bottom: var(--lumo-space-s); */
      /* border-radius: var(--lumo-border-radius) var(--lumo-border-radius) 0 0; */
    }

    [part="header"] {
      /* background-color: var(--lumo-contrast-5pct); */
      /* font-weight: 500; */
    }

    [part="footer"] {
      /* margin-top: var(--lumo-space-l); */
      /* border-radius: 0 0 var(--lumo-border-radius) var(--lumo-border-radius); */
      /* border-top: 1px solid var(--lumo-contrast-10pct); */
    }

    .card__image {
      background-size: cover;
      padding: 0;
    }

    .card[image] .card__header {
      position: absolute;
      left: 0;
      right: 0;
      /* color: var(--lumo-base-color); */
      /* background-color: var(--lumo-contrast-70pct); */
    }

    /* @supports (-webkit-backdrop-filter: blur(1px)) {
      :host([image]) [part="header"] {
        background-color: var(--lumo-contrast-50pct);
        -webkit-backdrop-filter: blur(5px);
      }
    } */

    .card__title {
      display: flex;
      /* padding: 0 var(--lumo-space-l); */
      /* margin-top: var(--lumo-space-l); */
    }

    [part="title"] {
      flex: auto;
      /* line-height: var(--lumo-line-height-xs); */
    }

    [part="title-suffix"] {
      flex: none;
    }

    /* [part="title"] ::slotted(h1),
    [part="title"] ::slotted(h2),
    [part="title"] ::slotted(h3),
    [part="title"] ::slotted(h4),
    [part="title"] ::slotted(h5),
    [part="title"] ::slotted(h6) {
      margin: 0 !important;
    } */

    /* [part="title"] ::slotted(h5),
    [part="title"] ::slotted(h6) {
      color: var(--lumo-secondary-text-color) !important;
      font-weight: 500 !important;
    } */

    /* [part="title"] ::slotted(h6) {
      text-transform: uppercase;
      font-size: var(--lumo-font-size-xs) !important;
      letter-spacing: 0.03em;
    } */

    /* [part="content"] ::slotted(p) {
      margin-top: 0 !important;
    } */

    /* [part="content"] ::slotted(p:last-child) {
      margin-bottom: 0 !important;
    } */

    /* Image overlay */

    /* :host([theme~="image-overlay"][image]) .j-card-title {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      align-items: flex-end;
      padding: 0;
      margin: 0;
      background-image: linear-gradient(to top, var(--lumo-shade-80pct) 20%, var(--lumo-shade-5pct) 80%);
      text-shadow: 0 1px 1px var(--lumo-shade-30pct);
    }

    :host([theme~="image-overlay"][image]) [part^="title"] {
      margin-bottom: var(--lumo-space-m);
    }

    :host([theme~="image-overlay"][image]) [part="title"] {
      margin-left: var(--lumo-space-l);
    }

    :host([theme~="image-overlay"][image]) [part="title-suffix"] {
      margin-right: var(--lumo-space-l);
    }

    .j-card-title-spacer {
      display: none;
    }

    :host([theme~="image-overlay"][image]) .j-card-title-spacer {
      display: block;
    }

    :host([theme~="image-overlay"][image]) [part="title"] ::slotted(h1),
    :host([theme~="image-overlay"][image]) [part="title"] ::slotted(h2),
    :host([theme~="image-overlay"][image]) [part="title"] ::slotted(h3),
    :host([theme~="image-overlay"][image]) [part="title"] ::slotted(h4),
    :host([theme~="image-overlay"][image]) [part="title"] ::slotted(h5),
    :host([theme~="image-overlay"][image]) [part="title"] ::slotted(h6) {
      color: #fff !important;
    }

    :host([theme~="image-overlay"][image]) [part="title"] ::slotted(h4),
    :host([theme~="image-overlay"][image]) [part="title"] ::slotted(h5),
    :host([theme~="image-overlay"][image]) [part="title"] ::slotted(h6) {
      opacity: 0.9;
    } */
  </style>
`;

export { innerHTML as style };
