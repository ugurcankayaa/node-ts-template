#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rootDir = process.cwd();

const toSlug = (value) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "my-app";

const toScope = (value) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "")
    .replace(/^@+/, "");

const readJson = async (relativePath) => {
  const fullPath = path.join(rootDir, relativePath);
  const raw = await readFile(fullPath, "utf8");
  return { fullPath, data: JSON.parse(raw) };
};

const writeJson = async (fullPath, data) => {
  await writeFile(fullPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
};

const run = async () => {
  const rl = createInterface({ input, output });

  try {
    console.log("\n🚀 Node + TypeScript Template Setup\n");

    const appNameInput = await rl.question("Application name: ");
    const appName = appNameInput.trim() || "My Application";
    const appSlugDefault = toSlug(appName);

    const appSlugInput = await rl.question(`Project slug (${appSlugDefault}): `);
    const appSlug = appSlugInput.trim() ? toSlug(appSlugInput) : appSlugDefault;

    const scopeInput = await rl.question(
      "NPM scope (optional, without @, e.g. acme): "
    );
    const scope = toScope(scopeInput);

    const descriptionInput = await rl.question(
      `Description (${appName} service): `
    );
    const description = descriptionInput.trim() || `${appName} service`;

    const authorInput = await rl.question("Author (optional): ");
    const author = authorInput.trim();

    const packageBase = scope ? `@${scope}/${appSlug}` : appSlug;

    const rootPackage = await readJson("package.json");
    rootPackage.data.name = `${appSlug}-template`;
    rootPackage.data.description = description;
    rootPackage.data.author = author;
    rootPackage.data.keywords = Array.from(
      new Set([...(rootPackage.data.keywords || []), appSlug])
    );
    await writeJson(rootPackage.fullPath, rootPackage.data);

    const corePackage = await readJson("core/package.json");
    corePackage.data.name = `${packageBase}-core`;
    await writeJson(corePackage.fullPath, corePackage.data);

    const docsPackage = await readJson("docs/package.json");
    docsPackage.data.name = `${appSlug}-docs`;
    docsPackage.data.description = `Documentation generator for ${appName}`;
    await writeJson(docsPackage.fullPath, docsPackage.data);

    const typedoc = await readJson("docs/typedoc.json");
    typedoc.data.name = `${appName} Docs`;
    await writeJson(typedoc.fullPath, typedoc.data);

    const lockFilePath = path.join(rootDir, "package-lock.json");
    try {
      const lockRaw = await readFile(lockFilePath, "utf8");
      const lock = JSON.parse(lockRaw);
      lock.name = `${appSlug}-template`;
      if (lock.packages && lock.packages[""]) {
        lock.packages[""].name = `${appSlug}-template`;
      }
      await writeFile(lockFilePath, `${JSON.stringify(lock, null, 2)}\n`, "utf8");
    } catch {
      console.warn("⚠️ Skipped package-lock.json update.");
    }

    console.log("\n✅ Template configured successfully.");
    console.log("\nNext steps:");
    console.log("1) npm install");
    console.log("2) npm run build");
    console.log("3) npm run docs:generate\n");
  } finally {
    rl.close();
  }
};

run().catch((error) => {
  console.error("❌ Setup failed:", error);
  process.exitCode = 1;
});
