// By using "var innerHTML" we allow IDEs (at least Atom) to use correct syntax highlighting and code completion
var innerHTML = `
  <style>
    .j-avatar {
      --size-xs: 20px;
      --size-s: 24px;
      --size-m: 32px;
      --size-l: 48px;
      --size-xl: 64px;
      --box-shadow: none;
      --background: rgba(0, 0, 0, 0.4);
      --font-family: "Helvetica Neue", Arial, sans-serif;
      --font-size-xs: 10px;
      --font-size-s: 12px;
      --font-size-m: 14px;
      --font-size-l: 20px;
      --font-size-xl: 28px;
      --text-color: #FFF;
      --font-weight: 600;
      --border-radius: 50%;
    }

    .j-avatar {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
      width: var(--size-m);
      height: var(--size-m);
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);
      overflow: hidden;
      flex: none;
      cursor: default;
    }

    .j-avatar::before {
      content: "\\2003";
      display: inline-block;
      width: 0;
    }

    .j-avatar:not([image]) {
      background: var(--background);
    }

    .j-avatar[hidden] {
      display: none !important;
    }

    .j-avatar__image {
      width: 100%;
      height: 100%;
      border-radius: inherit;
      background-size: cover;
    }

    .j-avatar__abbr {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: auto;
      align-self: stretch;
      font-family: var(--font-family);
      font-size: var(--font-size-m);
      color: var(--text-color);
      text-transform: uppercase;
      line-height: 1;
      font-weight: var(--font-weight);
    }

    .j-avatar__abbr:empty::before,
    .j-avatar__abbr:empty::after {
      content: "";
      display: block;
      width: 25%;
      height: 25%;
      border-radius: 50%;
      background: var(--text-color);
      margin: 4%;
    }

    .j-avatar__abbr:empty::after {
      width: 55%;
      height: 18%;
      margin-bottom: 6%;
      border-radius: 50% 50% 0 0 / 100% 100% 0 0;
    }

    .j-avatar:not([image]) .j-avatar__image,
    .j-avatar[image] .j-avatar__abbr {
      display: none;
    }

    /* Sizes */

    .j-avatar--size-xs {
      width: var(--size-xs);
      height: var(--size-xs);
    }

    .j-avatar--size-xs .j-avatar__abbr {
      font-size: var(--font-size-xs);
    }

    .j-avatar--size-s {
      width: var(--size-s);
      height: var(--size-s);
    }

    .j-avatar--size-s .j-avatar__abbr {
      font-size: var(--font-size-s);
    }

    .j-avatar--size-l {
      width: var(--size-l);
      height: var(--size-l);
    }

    .j-avatar--size-l .j-avatar__abbr {
      font-size: var(--font-size-l);
    }

    .j-avatar--size-xl {
      width: var(--size-xl);
      height: var(--size-xl);
    }

    .j-avatar--size-xl .j-avatar__abbr {
      font-size: var(--font-size-xl);
    }

    /* Round */

    .j-avatar--round {
      border-radius: 50%;
    }
  </style>
`;

export default innerHTML;
