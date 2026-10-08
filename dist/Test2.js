"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const TestHelper_1 = require("./TestHelper");
// GREEN integration test: server (index.ts) + Utils.ts working together.
// Every expectation is correct, so this must pass.
(0, TestHelper_1.runIntegration)("Integration test (green)", async (base) => {
    const r1 = await axios_1.default.get(`${base}/`);
    const r2 = await axios_1.default.get(`${base}/hello`);
    const r3 = await axios_1.default.get(`${base}/add`, { params: { a: 1, b: 2 } });
    const r4 = await axios_1.default.get(`${base}/add`, {
        params: { a: "x", b: 2 },
        validateStatus: () => true,
    });
    return [
        { name: "GET / -> Hello, World!", ok: r1.status === 200 && r1.data === "Hello, World!" },
        { name: "GET /hello -> hello world", ok: r2.data === "hello world" },
        { name: "GET /add?a=1&b=2 -> 3", ok: r3.data.result === 3 },
        { name: "GET /add?a=x&b=2 -> 400", ok: r4.status === 400 },
    ];
});
