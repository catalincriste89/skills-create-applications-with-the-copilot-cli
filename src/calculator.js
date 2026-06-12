/*
Operations supported:
- addition (+)
- subtraction (-)
- multiplication (* or ×)
- division (/ or ÷)

This module exports functions: add, subtract, multiply, divide
All functions accept two numeric arguments and return a numeric result.
*/

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
};
