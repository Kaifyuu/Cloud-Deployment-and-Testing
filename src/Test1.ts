// Test1.ts - Unit test runner for CI pipeline
// Exit code 0 = PASS, 1 = FAIL
// Used in GitHub Actions workflow to validate Utils functions

import { add, subtract, multiply, divide } from "./Utils";

let passed = 0;
let failed = 0;

function assert(testName: string, actual: number, expected: number): void {
  if (actual === expected) {
    console.log(`✅ PASS: ${testName} (expected ${expected}, got ${actual})`);
    passed++;
  } else {
    console.log(`❌ FAIL: ${testName} (expected ${expected}, got ${actual})`);
    failed++;
  }
}

// Test cases
assert("add(1, 2) should be 3", add(1, 2), 3);
assert("add(-1, 1) should be 0", add(-1, 1), 0);
assert("add(0, 0) should be 0", add(0, 0), 0);
assert("subtract(5, 3) should be 2", subtract(5, 3), 2);
assert("multiply(3, 4) should be 12", multiply(3, 4), 12);
assert("divide(10, 2) should be 5", divide(10, 2), 5);

console.log(`\n--- Results: ${passed} passed, ${failed} failed ---`);

// Output exit code for CI pipeline
if (failed > 0) {
  console.log("1");
  process.exit(1);
} else {
  console.log("0");
  process.exit(0);
}
