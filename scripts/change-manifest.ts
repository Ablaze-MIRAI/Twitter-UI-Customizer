import fs from "node:fs/promises";
import fsSync from "node:fs";
import type { Manifest } from "webextension-polyfill";
import manifest from "../manifest.config.ts";

export async function changeManifest(target: string) {
    if (target !== "firefox" && target !== "chromium" && target !== "chromiumCRX") return;
    const config = manifest;

    const targets = Object.keys(config).filter((k) => k !== "common");

    if (!targets.includes(target)) {
        console.error(`Error: Invalid platform "${target ?? ""}". (${targets.join(", ")})`);
        process.exit(1);
    }

    let output: Manifest.WebExtensionManifest & { update_url?: string };
    if (target == "chromiumCRX") {
        output = Object.assign(config.common, config.chromium, config.chromiumCRX) satisfies Manifest.WebExtensionManifest & { update_url: string };
        const repo = process.env["GITHUB_REPO"];
        output.update_url = output.update_url.replace("$(github.repository)", repo);
    } else {
        output = Object.assign(config.common, config[target]) satisfies Manifest.WebExtensionManifest;
    }

    if (!fsSync.existsSync("./dist")) {
        await fs.mkdir("./dist");
    }

    await fs.writeFile("./dist/manifest.json", JSON.stringify(output, undefined, 4));
}

if (process.argv[1] === import.meta.filename) {
    const target = process.argv[2];
    if (target === "firefox" || target === "chromium" || target === "chromiumCRX") {
        changeManifest(target);
    } else {
        console.error(`Error: Invalid platform "${target ?? ""}".`);
        process.exit(1);
    }
}
