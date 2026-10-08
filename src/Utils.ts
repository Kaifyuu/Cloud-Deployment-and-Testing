// Utils.ts - Utility module with testable functions
// Used in Part 2 Lab: GitHub Actions automated unit testing

export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

export function divide(a: number, b: number): number {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}
