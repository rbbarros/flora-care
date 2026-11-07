import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

const requiredFiles = [
  "README.md",
  "LICENSE",
  "CHANGELOG.md",
  "CONTRIBUTING.md",
  "SECURITY.md",
  ".editorconfig",
  ".gitattributes",
  "package.json",
  "package-lock.json",
  "docs/project-charter.md",
  "docs/requisitos.md",
  "docs/casos-de-uso.md",
  "docs/user-stories.md",
  "docs/arquitetura.md",
  "docs/matriz-rastreabilidade.md",
  "docs/README.md",
  "docs/backlog.md",
  ".github/workflows/ci.yml",
  ".github/workflows/labels.yml",
  ".github/dependabot.yml",
  ".github/labels.yml",
  ".github/pull_request_template.md",
  ".github/ISSUE_TEMPLATE/bug_report.md",
  ".github/ISSUE_TEMPLATE/feature_request.md",
  ".github/ISSUE_TEMPLATE/docs.md",
];

for (const file of requiredFiles) {
  if (!existsSync(resolve(root, file))) {
    errors.push(`Arquivo obrigatório ausente: ${file}`);
  }
}

const packagePath = resolve(root, "package.json");
if (existsSync(packagePath)) {
  try {
    const manifest = JSON.parse(readFileSync(packagePath, "utf8"));
    if (!manifest.version) errors.push("package.json sem campo version.");
    if (!manifest.scripts?.test) errors.push("package.json sem script de testes.");
  } catch (error) {
    errors.push(`package.json inválido: ${error.message}`);
  }
}

function walk(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const fullPath = join(directory, entry);
    return statSync(fullPath).isDirectory() ? walk(fullPath) : [fullPath];
  });
}

const jsFiles = [
  ...walk(resolve(root, "src")).filter((file) => file.endsWith(".js")),
  ...walk(resolve(root, "scripts")).filter((file) => file.endsWith(".mjs")),
  ...walk(resolve(root, "test")).filter((file) => file.endsWith(".js")),
];

for (const file of jsFiles) {
  const result = spawnSync(process.execPath, ["--check", file], {
    cwd: root,
    encoding: "utf8",
  });
  if (result.status !== 0) {
    errors.push(`Erro de sintaxe em ${relative(root, file)}:\n${result.stderr}`);
  }
}

const matrixPath = resolve(root, "docs/matriz-rastreabilidade.md");
if (existsSync(matrixPath)) {
  const matrix = readFileSync(matrixPath, "utf8");
  for (const id of [
    "RF01", "RF02", "RF03", "RF04", "RF05", "RF06", "RF07", "RF08",
    "RNF01", "RNF02", "RNF03", "RNF04", "RNF05", "RNF06", "RNF07",
  ]) {
    if (!matrix.includes(id)) errors.push(`Matriz de rastreabilidade sem ${id}.`);
  }
}

if (errors.length > 0) {
  console.error("Verificação estática falhou:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Verificação estática concluída: ${requiredFiles.length} arquivos obrigatórios e ${jsFiles.length} arquivos JavaScript.`);
