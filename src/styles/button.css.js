export default `
  .j-button {
    background-color: hsl(216, 100%, 97%);
    color: hsl(216, 100%, 39%);
    font-weight: 500;
    padding: 0.5em 1em;
    border-radius: 0.25em;
  }

  .j-button:hover {
    background-color: hsl(216, 46%, 90%);
  }

  .j-button:active {
    background-color: hsl(216, 53%, 83%);
  }

  .j-button[focus-visible],
  .j-button:focus:not([focus-visible]) {
    box-shadow: 0 0 0 2px lightblue;
  }
`;
