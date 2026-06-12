const { add, subtract, multiply, divide } = require('../calculator');

describe('calculator functions', () => {
  test('add: 2 + 3 = 5 (from image)', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('subtract: 10 - 4 = 6 (from image)', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('multiply: 45 * 2 = 90 (from image)', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('divide: 20 / 5 = 4 (from image)', () => {
    expect(divide(20, 5)).toBe(4);
  });

  test('addition: handles negatives and floats', () => {
    expect(add(-1, 1)).toBe(0);
    expect(add(1.2, 3.4)).toBeCloseTo(4.6);
  });

  test('subtraction: zero and floats', () => {
    expect(subtract(0, 5)).toBe(-5);
    expect(subtract(5.5, 2.2)).toBeCloseTo(3.3);
  });

  test('multiplication: times zero and negatives', () => {
    expect(multiply(3, 0)).toBe(0);
    expect(multiply(-2, 3)).toBe(-6);
  });

  test('division: produces float results', () => {
    expect(divide(5, 2)).toBeCloseTo(2.5);
  });

  test('division: throws on division by zero', () => {
    expect(() => divide(1, 0)).toThrow(/division by zero/i);
  });

  test('exports are functions', () => {
    expect(typeof add).toBe('function');
    expect(typeof subtract).toBe('function');
    expect(typeof multiply).toBe('function');
    expect(typeof divide).toBe('function');
  });
});
