function helloworld(): string {
  return "hello world";
}

function add(a: number, b: number): number {
  return a + b; // เปลี่ยนเป็น a - b เพื่อทดสอบให้ test fail
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// age must be an integer between 1 and 120
function isValidAge(age: number): boolean {
  return Number.isInteger(age) && age >= 1 && age <= 120;
}

export const Utils = { helloworld, add, isValidEmail, isValidAge };
