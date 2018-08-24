// By using "var innerHTML" we allow IDEs (at least Atom) to use correct syntax highlighting and code completion
let innerHTML = `
  <style>
    .j-field {
      display: inline-flex;
      flex-direction: column;
    }

    .j-field__label {
      font-size: 0.875em;
      font-weight: 600;
    }


    .j-field--required .j-field__label::after {
      content: " *";
      color: red;
    }

    .j-field__error-message {
      font-size: 0.875em;
      color: red;
      margin: 0;
    }

    .j-field:not(.j-field--invalid) .j-field__error-message {
      display: none !important;
    }
  </style>
`;

export default innerHTML;
