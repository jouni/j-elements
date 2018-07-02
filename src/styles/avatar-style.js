// By using "var innerHTML" we allow IDEs (at least Atom) to use correct syntax highlighting and code completion
let innerHTML = `
  <style>
    .j-avatar {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
      flex: none;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      overflow: hidden;
      background-color: rgba(0, 0, 0, 0.4);
      color: #fff;
      font-weight: 500;
      font-size: 48px;
      cursor: default;
    }

    .j-avatar__abbr {
      text-transform: uppercase;
      line-height: 1;
    }

    .j-avatar[image] {
      background: transparent;
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

    .j-avatar:not([image]) .j-avatar__image,
    .j-avatar[image] .j-avatar__abbr,
    .j-avatar[image] .j-avatar__icon,
    .j-avatar[name] .j-avatar__icon,
    .j-avatar:not([name]) .j-avatar__abbr {
      display: none;
    }
  </style>
`;

export default innerHTML;
