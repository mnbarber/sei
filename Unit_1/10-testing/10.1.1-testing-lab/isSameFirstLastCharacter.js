function isSameFirstLastCharacter(str) {
  return str.charAt(0) === str.charAt(str.length - 1);
}

console.log(isSameFirstLastCharacter(""));

module.exports = isSameFirstLastCharacter;
