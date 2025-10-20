#!/usr/bin/env node
import { Command } from "commander";
import { execa } from "execa";
import path from "path";
import { fileURLToPath } from "url";

const program = new Command();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

program
    .name("seer")
    .description("Seer CLI: build programs and visualise transactions")
    .version("0.1.0");

program
    .command("build")
    .description("Compile demo Solana programs")
    .action(async () => {
        const root = path.resolve(__dirname, "..", "..", "demo");

        try {
            console.log("⚙️ Building Seer programs...");
            await execa("../cli/bin/build.sh", {
                cwd: path.join(root),
                stdio: "inherit"
            });

            console.log("✅ Complete!");
        } catch (err) {
            console.error("❌ Failed:", err.message);
            process.exit(1);
        }
    });

program
    .command("run")
    .description("Run Seer transaction")
    .action(async () => {
        const root = path.resolve(__dirname, "..", "..");

        try {
            console.log("⚙️  Running Seer transaction...");
            await execa("../agave/target/debug/seer-demo", {
                cwd: path.join(root, "demo"),
                env: {
                    PROJECT_ROOT: path.join(root, "demo"),
                }
            });

            console.log("✅ Complete!");
        } catch (err) {
            console.error("❌ Failed:", err.message);
            process.exit(1);
        }
    });

program
    .command("view")
    .description("Launch the transaction debugger on localhost")
    .action(async () => {
        const root = path.resolve(__dirname, "..", "..");
        const ui_path = path.join(root, "ui");
        const project_root = path.join(root, "demo");

        try {
            console.log("📦 Ensuring UI dependencies are installed...");
            await execa("pnpm", ["install"], { cwd: ui_path });

            console.log("🚀 Starting SEER on http://localhost:3000");
            await execa("pnpm", ["start"], {
                cwd: ui_path,
                env: {
                    PROJECT_ROOT: project_root,
                },
            });

        } catch (err) {
            console.error("❌ Failed to run SEER:", err.message);
            process.exit(1);
        }
    });

program.parse();