#!/usr/bin/env node

// CLI wrapper for calculator functions (supports +, -, *, / and named commands)
// Usage examples:
//   node src/index.js 2 + 3
//   node src/index.js add 2 3
//   node src/index.js mul 3 4

const { add, subtract, multiply, divide } = require('./calculator');
const readline = require('readline');

function parseAndCompute(tokens) {
  if (tokens.length === 3) {
    const [leftRaw, opRaw, rightRaw] = tokens;
    const a = Number(leftRaw);
    const b = Number(rightRaw);
    if (!Number.isFinite(a) || !Number.isFinite(b)) {
      throw new Error('Invalid number input');
    }

    const op = opRaw.toString().toLowerCase();

    if (['+', 'add', 'plus'].includes(op)) return add(a, b);
    if (['-', 'sub', 'subtract', 'minus'].includes(op)) return subtract(a, b);
    if (['*', 'x', '×', 'mul', 'multiply', 'times'].includes(op)) return multiply(a, b);
    if (['/', '\\', '÷', 'div', 'divide'].includes(op)) return divide(a, b);

    throw new Error(`Unsupported operator: ${opRaw}`);
  }

  throw new Error('Expected exactly three tokens: <number> <operator> <number>');
}

function printUsageAndExit() {
  console.log('Usage: node src/index.js <number> <operator> <number>');
  console.log('Operators: +  -  *  /   or names: add, sub, mul, div');
  process.exit(1);
}

async function interactivePrompt() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
  });

  const question = (q) => new Promise((res) => rl.question(q, res));

  console.log('Interactive calculator. Enter expressions like: 2 + 3  (type q or quit to exit)');
  while (true) {
    const line = (await question('> ')).trim();
    if (!line) continue;
    if (line.toLowerCase() === 'q' || line.toLowerCase() === 'quit') break;
    const parts = line.split(/\s+/);
    try {
      const result = parseAndCompute(parts);
      console.log(result);
    } catch (err) {
      console.error('Error:', err.message);
    }
  }

  rl.close();
}

// Main
(async function main() {
  const argv = process.argv.slice(2);
  if (argv.length === 0) {
    await interactivePrompt();
    return;
  }

  // Support two CLI styles:
  // 1) node src/index.js 2 + 3
  // 2) node src/index.js add 2 3
  let tokens = [];
  if (argv.length === 3 && !isNaN(Number(argv[0])) && !isNaN(Number(argv[2]))) {
    tokens = argv;
  } else if (argv.length === 3 && isNaN(Number(argv[0]))) {
    // named command like: add 2 3
    tokens = [argv[1], argv[0], argv[2]]; // reorder to <number> <op> <number>
  } else if (argv.length === 2 && argv[0].includes(' ')) {
    tokens = argv[0].split(/\s+/);
  } else {
    // fallback: try to parse first three tokens
    tokens = argv.slice(0, 3);
  }

  try {
    const result = parseAndCompute(tokens);
    console.log(result);
  } catch (err) {
    console.error('Error:', err.message);
    printUsageAndExit();
  }
})();
