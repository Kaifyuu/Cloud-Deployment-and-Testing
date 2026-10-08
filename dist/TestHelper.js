"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runIntegration = runIntegration;
const index_1 = require("./index");
// Start the real Express app on a random free port, run the checks against it,
// print PASS/FAIL per check, and exit 1 if any check failed.
async function runIntegration(title, tests) {
    const server = index_1.app.listen(0); // port 0 = random free port, no clash with 3000
    const { port } = server.address();
    let failed = false;
    try {
        for (const c of await tests(`http://127.0.0.1:${port}`)) {
            console.log(`${c.ok ? "PASS" : "FAIL"} ${c.name}`);
            if (!c.ok)
                failed = true;
        }
    }
    catch (e) {
        console.log("FAIL unexpected error:", e.message);
        failed = true;
    }
    finally {
        server.close();
    }
    if (failed) {
        console.log(`${title} failed`);
        process.exit(1); // exit code != 0 makes the GitHub Actions step fail (red)
    }
    console.log(`${title} passed`);
}
