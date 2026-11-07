import { cpSync, existsSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = resolve(root, "src");
const destination = resolve(root, "dist");
const required = [
  "index.html",
  "styles.css",
  "js/app.js",
  "js/date-utils.js",
  "js/plant-service.js",
];

for (const file of required) {
  if (!existsSync(resolve(source, file))) {
    console.error(`Arquivo de origem ausente: src/${file}`);
    process.exit(1);
  }
}

rmSync(destination, { recursive: true, force: true });
cpSync(source, destination, { recursive: true });
console.log(`Build concluído: ${required.length} arquivos publicados em dist/.`);
