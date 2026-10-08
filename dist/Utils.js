"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
function helloworld() {
    return "hello world";
}
function add(a, b) {
    return a + b; // เปลี่ยนเป็น a - b เพื่อทดสอบให้ test fail
}
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
// age must be an integer between 1 and 120
function isValidAge(age) {
    return Number.isInteger(age) && age >= 1 && age <= 120;
}
exports.Utils = { helloworld, add, isValidEmail, isValidAge };
