export default `
.j-input:not([type="range"]) {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 0.25em;
  padding: 0.3em;
}

.j-input[focus],
.j-input:focus:not([focus]) {
  box-shadow: 0 0 0 2px lightblue;
  border-color: blue;
}

.j-input[disabled] {
  opacity: 0.3;
}

.j-input[readonly] {
  border-style: dashed;
}

.j-input > [slot] {
  opacity: 0.6;
  margin: 0 0.3em;
}
`;
