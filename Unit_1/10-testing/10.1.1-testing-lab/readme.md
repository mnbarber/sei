# Testing Lab

## Introduction

This lab is an opportunity to get more familiar with testing.

## Setup

Fork and Clone this repository

Open a terminal and navigate into the root directory of this repository

To install the Jest package locally on your machine for this project, run `npm i`

## Implementing Tests

Navigate to `isSameFirstLastCharacter.test.js`

In this file, we will be writing unit tests for the `isSameFirstLastCharacter()` function

The `isSameFirstLastCharacter()` takes one argument, a string

The function is designed to determine whether or not the first and last character of the input string are the same character.

## Base Cases

Let's start by considering what our base cases will be:

> **Note:** Remember that **_base cases_** are test cases where our inputs are normal expected inputs

For this function, we should write two base case tests:

- a test case for a string that _does_ have the same first and last character
- a test case for a string that _doesn't_ have the same first and last character

There are stubs in the `isSameFirstLastCharacter.test.js` for these two tests.

The first test case has been completed for you as an example.

Once you are done writing these two tests, you can run your tests with the following command: `npm test`

Since this function is correctly implemented, both of your base case tests should `PASS`

## Edge Cases

Next, lets consider our edge cases:

> **Note:** Remember that **_edge cases_** are test cases where our inputs are at the edges of our allowed input range

For functions that take string arguments, some very common edge cases to test include a very short string (1-2 characters), and the empty string (0 characters)

Let's group our edge cases:

- A test case for a string with only 2 characters that are different
- A test case for a string with only 2 characters that are the same
- A test case for a string with only 1 character
- A test case for an empty string

Before we implement these tests, take a moment to think about what the result of each call to isSameFirstLastCharacter() should return. Once you have thought of an answer for each of the edge cases, you can check your answer below.

### A test case for a string with only 2 characters that are different
<details >
    <summary>Answer</summary>

The function should return false, as the first and last characters are different
</details>

### A test case for a string with only 2 characters that are the same
<details>
    <summary>Answer</summary>

The function should return true, as the first and last characters are the same
</details>

### A test case for a string with only 1 character
<details>
    <summary>Answer</summary>

This one is tricky, but since the first and last character are actually the 
same character in the string (the character at index 0), the function should return true
</details>

### A test case for an empty string
<details>
  <summary>Answer</summary>
This one is even trickier!  Since the empty string technically has neither a first character nor a last character, there is no one true answer to this problem.  For now, let's just say this one should return true.

</details>

Now that we've committed to our assertions for our edge cases, go try implementing them in `isSameFirstLastCharacter.test.js`.

Once you are done, you can run your tests by running `npm test`.

## Check Your Work
Since the `isSameFirstLastCharacter()` function has been implemented correctly, all of your test cases should `PASS`. If any do not pass, review the tests you wrote and check if you've made any mistakes. Remember, tests can have bugs too!
