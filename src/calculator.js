/*
Operations supported:
- addition (+)
- subtraction (-)
- multiplication (* or ×)
- division (/ or ÷)
- modulo (%)
- exponentiation (power, ^)
- square root (sqrt)

This module exports functions: add, subtract, multiply, divide, modulo, power, squareRoot
All functions accept numeric arguments and return a numeric result. squareRoot accepts one argument.
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

function modulo(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a % b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (typeof n !== 'number' || Number.isNaN(n)) {
    throw new Error('Invalid number');
  }
  if (n < 0) {
    throw new Error('Square root of negative number');
  }
  return Math.sqrt(n);
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
};
