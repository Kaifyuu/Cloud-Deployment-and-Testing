import { AddressInfo } from "net";
import { app } from "./index";

export type Check = { name: string; ok: boolean };

// Start the real Express app on a random free port, run the checks against it,
// print PASS/FAIL per check, and exit 1 if any check failed.
export async function runIntegration(
  title: string,
  tests: (base: string) => Promise<Check[]>
): Promise<void> {
  const server = app.listen(0); // port 0 = random free port, no clash with 3000
  const { port } = server.address() as AddressInfo;
  let failed = false;

  try {
    for (const c of await tests(`http://127.0.0.1:${port}`)) {
      console.log(`${c.ok ? "PASS" : "FAIL"} ${c.name}`);
      if (!c.ok) failed = true;
    }
  } catch (e) {
    console.log("FAIL unexpected error:", (e as Error).message);
    failed = true;
  } finally {
    server.close();
  }

  if (failed) {
    console.log(`${title} failed`);
    process.exit(1); // exit code != 0 makes the GitHub Actions step fail (red)
  }
  console.log(`${title} passed`);
}
