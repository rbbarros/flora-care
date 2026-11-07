# Issues — Adequações entre o GitHub e o código

Conferência das issues de https://github.com/rbbarros/flora-care/issues com o código da branch `feat/adjust-report` (commit `6cc8173`) e a correção de CI `fix(ci)` aplicada em seguida.

- **Data da conferência:** 2026-11-07
- **Verificação local:** `npm run check` verde (lint, build e 46 testes) e cobertura de 99% das linhas.
- **Referências:** relatório `AVALIACAO_TECNICA_flora-care_2026_2.pdf` (Week_01), [docs/backlog.md](docs/backlog.md) e [docs/matriz-rastreabilidade.md](docs/matriz-rastreabilidade.md).

**Legenda:** ✔ atende e pode ser fechada · ✏️ atende, mas o texto da issue diverge do código · ➕ issue nova a criar

---

## 1. Resumo

| Issue | Título | Estado no GitHub | Situação no código | Ação |
| :---: | :--- | :---: | :---: | :--- |
| #1 | Estrutura de diretórios e `.gitignore` | Aberta | ✔ | Fechar |
| #2 | Project Charter | Aberta | ✔ | Fechar |
| #3 | Requisitos RF/RNF | Aberta | ✏️ | Atualizar o escopo para RF08/RNF07 e fechar |
| #4 | Casos de uso e user stories | Aberta | ✏️ | Atualizar o escopo para UC04/US08 e fechar |
| #5 | Persistência local | Aberta | ✔ | Fechar |
| #6 | Cadastro de planta | Aberta | ✏️ | Deixar a espécie como opcional e fechar |
| #7 | Validação de campos | Aberta | ✏️ | Exigir nome com 2 ou mais caracteres e intervalo inteiro, depois fechar |
| #8 | Listagem e contadores | Aberta | ✔ | Fechar |
| #9 | Motor de cálculo da próxima rega | Aberta | ✏️ | Corrigir o módulo citado e o rótulo do status, depois fechar |
| #10 | Botão "Regar" | Aberta | ✔ | Fechar |
| #11 | Edição de planta | Aberta | ✔ | Fechar |
| #12 | Exclusão de planta | Aberta | ✔ | Fechar |
| #13 | Filtros por status e ambiente | Aberta | ✔ | Fechar |
| #14 | Modularização em camadas | Fechada | ✔ | Comentar com a evidência do teste RNF02 |
| #15 | README sincronizado com `docs/` | Fechada | ✔ | Nenhuma |
| #16 | PR `feat(report): adicionar relatorio` | Aberto | — | Ajustar (seção 3) |
| #17–#25 | — | — | ➕ | Criar (seção 4) |

> Os números #17 em diante são uma sugestão: o GitHub numera issues e PRs na mesma sequência, então o número real depende da ordem de criação.

---

## 2. Ajustes nas issues existentes

### #1 — Configurar estrutura de diretórios (docs/, src/) e .gitignore ✔

- **Evidência:** `docs/`, `src/`, `test/`, `scripts/`; o `.gitignore` cobre SO, IDE (`.vscode/`, `.idea/`), `node_modules/`, `dist/`, `coverage/` e `.env*`.
- **Ação:** fechar.

### #2 — Criar Project Charter ✔

- **Evidência:** `docs/project-charter.md` (justificativa, SMART, escopo, stakeholders).
- **Ação:** fechar.

### #3 — Especificar Requisitos Funcionais (RF) e Não Funcionais (RNF) ✏️

- **Divergência:** a issue pede `[RF01]–[RF07]` e `[RNF01]–[RNF05]`. O documento `docs/requisitos.md` já tem `[RF08]` (exportar/importar), `[RNF06]` (testes e CI) e `[RNF07]` (segurança).
- **Novo critério de aceite:**
  - [x] Requisitos funcionais numerados `[RF01]` a `[RF08]`.
  - [x] Requisitos não funcionais numerados `[RNF01]` a `[RNF07]`, cobrindo persistência, desempenho, usabilidade, manutenibilidade, portabilidade, qualidade/CI e segurança.
- **Ação:** editar o corpo da issue e fechar.

### #4 — Documentar Casos de Uso e User Stories com BDD ✏️

- **Divergência:** a issue cita `[UC01]–[UC03]` e `[US01]–[US05]`. Os documentos têm `UC04` (exportar/importar) e `US06` (listar), `US07` (filtrar) e `US08` (exportar/importar).
- **Novo critério de aceite:**
  - [x] Casos de uso `[UC01]` a `[UC04]` com fluxos principal, alternativo e de exceção.
  - [x] User stories `[US01]` a `[US08]` no formato canônico, com critérios Dado/Quando/Então.
- **Ação:** editar o corpo da issue e fechar.

### #5 — Implementar camada de persistência local ✔

- **Evidência:** `loadPlants`/`savePlants` em `src/js/plant-service.js`, chave `floracare.plants.v1`; dados corrompidos não são apagados; testes em `test/plant-service.test.js`.
- **Ação:** fechar.

### #6 — Implementar funcionalidade de cadastro de nova planta ✏️

- **Divergência:** o critério diz que o usuário "preenche nome, espécie, ambiente e intervalo". No código e em `[RF01]`, a **espécie é opcional**: o card mostra "Espécie não informada". O código também tem a opção "precisa de rega agora" (fluxo alternativo A1 do UC01), que a issue não menciona.
- **Novo critério de aceite (BDD):**
  - **Dado** que estou no formulário de cadastro,
  - **Quando** informo nome, ambiente e intervalo de rega (espécie opcional) e salvo,
  - **Então** a planta é persistida e exibida no catálogo (`[RF01]`);
  - **E**, se marquei "precisa de rega agora", ela aparece com status `Precisa de Rega` (`UC01-A1`).
- **Ação:** editar e fechar.

### #7 — Adicionar validação de campos obrigatórios no cadastro ✏️

- **Divergência:** a issue bloqueia "nome vazio". O código (`validatePlantInput`) é mais restritivo: exige **nome com pelo menos 2 caracteres** após `trim()` e **intervalo inteiro ≥ 1**. Também rejeita ambiente fora de `Sol Pleno | Meia-Sombra | Sombra`.
- **Novo critério de aceite (BDD):**
  - **Dado** que preencho o formulário,
  - **Quando** informo um nome com menos de 2 caracteres, um intervalo não inteiro ou menor que 1, ou um ambiente inválido,
  - **Então** a submissão é bloqueada com mensagem clara (`[RF01]`, `[UC01]`).
- **Ação:** editar e fechar.

### #8 — Desenvolver listagem geral do catálogo e contadores ✔

- **Evidência:** `card()` e `render()` em `src/js/app.js` exibem nome, espécie, ambiente, intervalo, última e próxima rega, quantidade de regas e status; `summarizeGarden` alimenta os contadores.
- **Ação:** fechar.

### #9 — Desenvolver motor de cálculo da próxima rega e status hídrico ✏️

- **Divergência 1:** a issue diz que o `date-utils.js` calcula a próxima rega e o status. No código, `date-utils.js` só faz a aritmética de datas (`addDays`, `isISODate`, `toISODate`). Quem calcula são `nextWateringDate` e `wateringStatus`, em `plant-service.js`.
- **Divergência 2:** a issue usa o rótulo "Precisa de água". O código e os documentos usam **"Precisa de rega"**.
- **Novo critério de aceite:**
  - [x] `date-utils.js` faz aritmética de datas ISO local (virada de mês/ano e ano bissexto testados).
  - [x] `plant-service.js` calcula `Próxima rega = Última rega + Intervalo` (`[RF06]`).
  - [x] Status `Precisa de rega` quando hoje ≥ próxima rega; caso contrário, `Hidratada`.
- **Ação:** editar e fechar.

### #10 — Implementar botão rápido "Regar" ✔

- **Evidência:** botão `💧 Regar agora` (`data-action="water"`) chama `waterPlant`. Regar duas vezes no mesmo dia não duplica o histórico (idempotência testada).
- **Sugestão:** acrescentar ao critério a regra "uma segunda rega no mesmo dia não duplica o histórico".
- **Ação:** fechar.

### #11 — Implementar edição de planta existente ✔

- **Evidência:** `updatePlant` valida e preserva o histórico; a próxima rega é recalculada pelo novo intervalo; há testes.
- **Ação:** fechar.

### #12 — Implementar exclusão de planta ✔

- **Evidência:** `window.confirm` em `app.js` e depois `removePlant` + `savePlants`; há testes.
- **Ação:** fechar.

### #13 — Criar filtros por status hídrico e ambiente ✔

- **Evidência:** `filterPlants` (filtros isolados e combinados) e estado vazio "Nenhuma planta encontrada"; há testes.
- **Ação:** fechar.

### #14 — Refatorar modularização em camadas (fechada) ✔

- **Observação:** a issue foi fechada declarando `[RNF02] < 200 ms` antes de existir medição. A evidência agora existe: o teste `RNF02` com 500 plantas roda em cerca de 7 ms.
- **Ação:** comentar na issue com o link do teste.

### #15 — Consolidar README sincronizado com docs/ (fechada) ✔

- **Observação:** o README foi reescrito na Week_02. A árvore agora inclui `.gitleaksignore`.
- **Ação:** nenhuma.

---

## 3. Ajustes no PR #16 (`feat/adjust-report` → `develop`)

1. **Descrição vazia:** preencher com o template `.github/pull_request_template.md` e incluir `Closes #1` … `Closes #13`. Assim as issues que o código já atende fecham automaticamente no merge (critério `[GOV-PR]` do relatório).
2. **Título genérico:** o PR entrega testes, CI, documentação e a funcionalidade RF08. Sugestão: `feat: testes, CI, exportação/importação e documentação da Week_02`.
3. **Commit não atômico:** `6cc8173` altera 36 arquivos (+2.143 linhas) com a mensagem "adicionar relatorio". Antes do merge, dividir em commits por assunto (`test:`, `ci:`, `feat(rf08):`, `docs:`, `chore:`) ou usar squash com uma mensagem descritiva.
4. **CI vermelho:** o gitleaks falhou por falso positivo em `STORAGE_KEY`. A correção já está no commit `fix(ci)` local (ver #19).

---

## 4. Issues novas a criar

### #17 ➕ [RF08] Exportar e importar o jardim em JSON

- **Labels:** `type:feature`, `stack:frontend`, `priority:medium`
- **Contexto:** já está implementada (`exportGarden`/`parseGarden`, UC04, US08), mas sem issue. A matriz registra "— (lacuna do relatório)".
- **Critério de aceite (BDD):**
  - **Dado** um jardim com 3 plantas,
  - **Quando** exporto e importo o arquivo em outro navegador,
  - **Então** as plantas e o histórico são restaurados;
  - **E** um arquivo com `schema`/`version` inválido ou com plantas inválidas é rejeitado sem alterar os dados.
- **Situação:** concluída no código; fechar no merge do PR #16.

### #18 ➕ [RNF06] Testes automatizados e pipeline de CI

- **Labels:** `type:test`, `scope:devops`, `priority:high`
- **Contexto:** 46 testes com `node:test` e o job `quality` (lint, build, testes, cobertura) existem, mas sem issue.
- **Critério de aceite:**
  - [x] ≥ 20 testes cobrindo `date-utils` e `plant-service`.
  - [x] CI em push e PR para `main`/`develop`.
  - [ ] Badge de CI verde no README (depende de #19).
- **Situação:** concluída no código; fechar no merge.

### #19 ➕ [RNF07] Corrigir falha do gitleaks no CI (falso positivo e permissões)

- **Labels:** `type:bug`, `scope:devops`, `priority:critical`
- **Contexto:** os dois runs do PR #16 (push e pull_request) falharam com `generic-api-key` em `src/js/plant-service.js:3`. O valor `"floracare.plants.v1"` é o nome da chave do `localStorage`, não um segredo. O alerta apareceu porque a linha passou a ter `export`. O job também não conseguia comentar no PR (`Resource not accessible by integration`), porque tinha `pull-requests: read`.
- **Correção aplicada localmente (commit `fix(ci)`):**
  - [x] `// gitleaks:allow` na linha de `STORAGE_KEY`.
  - [x] `.gitleaksignore` com o fingerprint `6cc8173…:src/js/plant-service.js:generic-api-key:3`, para a varredura do intervalo de commits do PR.
  - [x] `permissions: pull-requests: write` no job `security`.
- **Critério de aceite:** **Dado** o PR #16 atualizado, **quando** o CI roda, **então** o job `security` fica verde. Um segredo real ainda deve falhar o CI.

### #20 ➕ [CI] Atualizar Node.js para 22 e alinhar gatilhos de branch

- **Labels:** `type:chore`, `scope:devops`, `priority:medium`
- **Contexto:** o CI usava Node.js 20, que saiu de suporte em abril de 2026. O push só disparava o CI em `feat/**`, mas o README e o CONTRIBUTING mandam usar `feature/issue-<n>-…`.
- **Correção aplicada localmente:**
  - [x] `node-version: 22` no CI, `engines.node >= 22` no `package.json` e CONTRIBUTING atualizado.
  - [x] Gatilho `feature/**` adicionado ao workflow.
- **Pendência:** a própria branch do PR se chama `feat/adjust-report`, fora do padrão documentado. Nas próximas, usar `feature/issue-<n>-descricao`.

### #21 ➕ [REL-TAG] Corrigir tags SemVer

- **Labels:** `type:chore`, `priority:high`
- **Contexto:** `v0.1.0`, `v0.2.0` e `v1.0.0` apontam para o **mesmo commit** (`ff6e740`). Além disso, a `v1.0.0` ("versão final completa com CI") foi criada antes de existirem testes e um CI funcional. O `package.json` declara `1.0.0`, mas as mudanças da Week_02 estão em `Unreleased`.
- **Tarefas:**
  - [ ] Decidir com o professor se as tags erradas serão apagadas ou mantidas, com uma nota no CHANGELOG.
  - [ ] Se forem recriadas: `v0.1.0` → `7922aaa` (docs), `v0.2.0` → `cd00a73` (MVP).
  - [ ] Após o merge do PR #16 em `main`, publicar `v1.1.0` (nova funcionalidade RF08, compatível), atualizando `package.json`, o badge do README e o CHANGELOG.
- **Critério de aceite:** **Dado** `git tag -n`, **quando** listado, **então** cada versão aponta para um commit distinto e coerente com o CHANGELOG.

### #22 ➕ [QA-LINT] Substituir o "lint" por ESLint de verdade

- **Labels:** `type:chore`, `priority:medium`
- **Contexto:** `npm run lint` (`scripts/check.mjs`) só confere se os arquivos existem e a sintaxe com `node --check`. Não detecta variáveis não usadas, `==`, globais etc. É o item 21 do backlog do relatório.
- **Tarefas:**
  - [ ] Adicionar `eslint` + `@eslint/js` como devDependencies, com `eslint.config.js` (flat config, globais de browser em `src/` e de Node em `test/`/`scripts/`).
  - [ ] `npm run lint` passa a executar `eslint .`, e `scripts/check.mjs` vira `npm run check:docs`.
  - [ ] Opcional: Prettier e pre-commit.
- **Critério de aceite:** **Dado** um `const` não usado em `src/js/app.js`, **quando** o CI roda, **então** o job `quality` falha.

### #23 ➕ [GOV-LBL] Aplicar o conjunto padrão de labels e reclassificar as issues

- **Labels:** `type:chore`, `priority:low`
- **Contexto:** `.github/labels.yml` define `type:*`, `priority:*`, `status:*`, `scope:*` e `stack:*`, mas as issues #1–#15 usam só `chore`, `documentation`, `feature`, `enhancement` e `refactor`.
- **Tarefas:**
  - [ ] Rodar o workflow **Sincronizar labels** (`workflow_dispatch`).
  - [ ] Reclassificar #1–#15 com `type:*` e `priority:*`.

### #24 ➕ [TRC-MAT] Atualizar matriz e backlog com os números das novas issues

- **Labels:** `type:docs`, `priority:medium`
- **Contexto:** `docs/matriz-rastreabilidade.md` e `docs/backlog.md` marcam `RF08`, `RNF06` e `RNF07` como "— (lacuna do relatório)".
- **Tarefas:**
  - [ ] Trocar as lacunas pelas issues reais (#17, #18, #19).
  - [ ] Atualizar o estado das issues #1–#13 para "Fechada" após o merge.
  - [ ] Incluir #20–#23 no backlog.

### #25 ➕ [TEST-UI] Testes da camada de interface (`app.js`)

- **Labels:** `type:test`, `stack:frontend`, `priority:low`
- **Contexto:** a cobertura só mede `date-utils.js` e `plant-service.js`. O `app.js` (renderização, confirmação de exclusão, importação, `escapeHTML`) só tem verificação manual, como registra a matriz em RF02 e RNF03.
- **Tarefas:**
  - [ ] Testar `render`/`card` com DOM simulado (por exemplo, `happy-dom`) ou um teste E2E com Playwright.
  - [ ] Garantir que `escapeHTML` impede a injeção de HTML pelo nome da planta.
- **Critério de aceite:** **Dado** uma planta com o nome `<img src=x onerror=alert(1)>`, **quando** a lista é renderizada, **então** o nome aparece como texto.
