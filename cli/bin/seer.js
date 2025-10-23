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