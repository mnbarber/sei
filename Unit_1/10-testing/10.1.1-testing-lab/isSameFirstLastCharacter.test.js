const isSameFirstLastCharacter = require("./isSameFirstLastCharacter");

// Base Cases

/* A test case for a string that does have the same first and last 
   character and is 4+ characters long
*/
test("it should return true when the first and last character are the same", () => {
  expect(isSameFirstLastCharacter("abbbbba")).toBe(true);
});

/* A test case for a string that does NOT have the same first and last 
   character and is 4+ characters long
*/
test("", () => {});

// Edge Cases
// A test case for a string with only 2 characters that are different
test("", () => {});

// A test case for a string with only 2 characters that are the same
test("", () => {});

// A test case for a string with only 1 character
test("", () => {});

// A test case for an empty string
test("", () => {});
