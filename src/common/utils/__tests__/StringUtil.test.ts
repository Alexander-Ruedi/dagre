import { valueOrNullIfBlank } from "../StringUtil";

describe("Check 'valueOrNullIfBlank' method", () => {
  [
    { input: "", expected: null },
    { input: "42", expected: "42" },
    { input: null, expected: null },
    { input: undefined, expected: null },
  ].forEach(({ input, expected }) => {
    test(`'${input}' should be converted to '${expected}'`, () => {
      expect(valueOrNullIfBlank(input)).toBe(expected);
    });
  });
});
