import axios from "axios";
import { runIntegration } from "./TestHelper";

// GREEN integration test: server (index.ts) + Utils.ts working together.
// Every expectation is correct, so this must pass.
runIntegration("Integration test (green)", async (base) => {
  const r1 = await axios.get(`${base}/`);
  const r2 = await axios.get(`${base}/hello`);
  const r3 = await axios.get(`${base}/add`, { params: { a: 1, b: 2 } });
  const r4 = await axios.get(`${base}/add`, {
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
