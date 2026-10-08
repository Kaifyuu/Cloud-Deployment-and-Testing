"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("./Utils");
// Unit test: many cases in one file, stop at the first failing case
const unit_test = async () => {
    // test1
    if (Utils_1.Utils.add(1, 2) !== 3) {
        console.log("Error: add(1,2) should be 3");
        process.exit(1); // exit code != 0 makes the GitHub Actions step fail
    }
    // test2
    if (Utils_1.Utils.add(-1, 1) !== 0) {
        console.log("Error: add(-1,1) should be 0");
        process.exit(1);
    }
    // test3
    if (Utils_1.Utils.helloworld() !== "hello world") {
        console.log('Error: helloworld() should be "hello world"');
        process.exit(1);
    }
    // email and age: each case is [input, expected result]
    const emailCases = [
        ["a@camt.info", true],
        ["john.doe+tag@example.co.th", true],
        ["", false],
        ["no-at-sign.com", false],
        ["missing@domain", false],
        ["@camt.info", false],
        ["two@@camt.info", false],
        ["has space@camt.info", false],
    ];
    for (const [input, expected] of emailCases) {
        if (Utils_1.Utils.isValidEmail(input) !== expected) {
            console.log(`Error: isValidEmail("${input}") should be ${expected}`);
            process.exit(1);
        }
    }
    const ageCases = [
        [7, true],
        [1, true],
        [120, true],
        [0, false],
        [-5, false],
        [121, false],
        [7.5, false],
        [NaN, false],
    ];
    for (const [input, expected] of ageCases) {
        if (Utils_1.Utils.isValidAge(input) !== expected) {
            console.log(`Error: isValidAge(${input}) should be ${expected}`);
            process.exit(1);
        }
    }
    console.log("Test1 passed");
};
unit_test();
