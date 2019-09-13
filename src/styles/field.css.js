export default `
  .j-field:not(:first-child) {
    margin-top: 1.5em;
  }

  .j-field:not(:last-child) {
    margin-bottom: 0.5em;
  }

  .j-field__label {
    font-size: 0.875em;
    font-weight: 600;
  }

  .j-field--required .j-field__label::after {
    color: red;
  }

  .j-field__validation-message {
    font-size: 0.875em;
    margin: 0;
    color: red;
  }

  .j-field > label,
  .j-field > [label] {
    font-weight: 500;
    font-size: 0.875em;
    margin-bottom: 0.3em;
  }
`;
