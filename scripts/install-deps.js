import { execSync } from "child_process";
import { existsSync } from "fs";

const projectDir = "/vercel/share/v0-project";

console.log("Checking node_modules...");
if (!existsSync(`${projectDir}/node_modules/.bin/next`)) {
  console.log("next binary not found, installing dependencies with pnpm...");
  try {
    execSync("pnpm install --frozen-lockfile", {
      cwd: projectDir,
      stdio: "inherit",
    });
    console.log("Dependencies installed successfully.");
  } catch (err) {
    console.error("pnpm install failed, trying npm install...");
    execSync("npm install", {
      cwd: projectDir,
      stdio: "inherit",
    });
    console.log("npm install completed.");
  }
} else {
  console.log("next binary already exists, skipping install.");
}
