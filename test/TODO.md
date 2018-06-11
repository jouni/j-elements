Things that should be tested:

- Clicking the label element focuses the first input elements
  - When a native text input is used, with id/for attribute
  - When any other input element is used, with a click listener

- Native radio button elements get a generated name attribute (if not specified explicitly)

- The required attribute is mirrored on the host

- Validity is checked when the field is blurred and when the internal value changes, by looping all contained input elements
  - The invalid attribute is set on the host when one or more of the contained input elements are invalid

- The focused attribute is set on the host when an input element is focused within the field

- Screen readers are able to announce the label
