import axios from "axios";
import { runIntegration } from "./TestHelper";

// RED integration test: deliberately fails (wrong expected value) to show
// what a failing integration test looks like in GitHub Actions.
runIntegration("Integration test (red)", async (base) => {
  const r1 = await axios.get(`${base}/`);
  const r2 = await axios.get(`${base}/add`, { params: { a: 2, b: 3 } });
  return [
    { name: "GET / -> Hello, World!", ok: r1.data === "Hello, World!" },
    // 2 + 3 is 5, but we expect 6 on purpose -> this check FAILS
    { name: "GET /add?a=2&b=3 -> 6 (intentionally wrong)", ok: r2.data.result === 6 },
  ];
});
