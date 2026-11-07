# Matriz de Rastreabilidade — FloraCare

Esta matriz estabelece a amarração bidirecional entre requisitos, casos de uso, histórias de usuário, issues de engenharia, componentes de código e testes automatizados.

**Legenda:** `RF` = Requisito Funcional · `RNF` = Requisito Não Funcional · `UC` = Caso de Uso · `US` = User Story · `#NN` = issue do backlog de engenharia.

---

## 1. Requisitos Funcionais

| Requisito | Descrição sumária | Caso de uso | User story | Issues | Implementação | Testes automatizados |
| :---: | :--- | :---: | :---: | :---: | :--- | :--- |
| **[RF01]** | Cadastrar planta com nome, espécie, ambiente e intervalo | UC01 | US01 | #3, #6, #7 | `plant-service.js` (`validatePlantInput`, `createPlant`), `app.js`, `index.html` | `plant-service.test.js` — validação, criação e rejeição de entrada |
| **[RF02]** | Listar plantas, datas, histórico, status e resumo | UC01, UC03 | US06 | #3, #8 | `app.js` (`render`, `card`), `plant-service.js` (`summarizeGarden`) | `plant-service.test.js` — `summarizeGarden`; verificação de renderização no navegador |
| **[RF03]** | Editar dados e recalcular a próxima rega | UC03 | US04 | #3, #11 | `plant-service.js` (`updatePlant`), `app.js` | `plant-service.test.js` — `updatePlant` e recálculo |
| **[RF04]** | Excluir planta com confirmação | UC03 | US05 | #3, #12 | `plant-service.js` (`removePlant`), `app.js` | `plant-service.test.js` — `removePlant` |
| **[RF05]** | Registrar rega com um clique e manter histórico | UC02 | US02 | #3, #10 | `plant-service.js` (`waterPlant`), `app.js` | `plant-service.test.js` — `waterPlant`, idempotência e imutabilidade |
| **[RF06]** | Calcular próxima rega e status hídrico | UC01, UC02 | US02, US03 | #3, #9 | `date-utils.js` (`addDays`, `isISODate`), `plant-service.js` (`nextWateringDate`, `wateringStatus`) | `date-utils.test.js` — virada de mês/ano, bissexto; `plant-service.test.js` — status e data limite |
| **[RF07]** | Filtrar por status e ambiente | UC01, UC03 | US07 | #3, #13 | `plant-service.js` (`filterPlants`), `app.js`, `styles.css` | `plant-service.test.js` — filtros isolados e combinados |
| **[RF08]** | Exportar e importar o jardim em JSON versionado | UC04 | US08 | — (lacuna do relatório) | `plant-service.js` (`exportGarden`, `parseGarden`), `app.js`, `index.html` | `plant-service.test.js` — exportação, roundtrip e rejeição de arquivos inválidos |

---

## 2. Requisitos Não Funcionais

| Requisito | Descrição sumária | Caso de uso | User story | Issues | Implementação | Testes / verificação |
| :---: | :--- | :---: | :---: | :---: | :--- | :--- |
| **[RNF01]** | Persistência local íntegra | UC01, UC02, UC04 | US01, US02, US08 | #5 | `plant-service.js` (`loadPlants`, `savePlants`, `STORAGE_KEY`) | `plant-service.test.js` — leitura, gravação e rejeição de dados corrompidos |
| **[RNF02]** | Cálculo/filtro/resumo < 200 ms para 500 plantas | — | US06, US07 | #14 (fechada) | `date-utils.js`, `plant-service.js` | `plant-service.test.js` — teste `RNF02` com 500 plantas |
| **[RNF03]** | Rega em 1 clique | UC02 | US02 | #10 | `app.js`, `index.html` | `plant-service.test.js` — `waterPlant`; verificação manual do botão |
| **[RNF04]** | Separação domínio/interface e manutenibilidade | — | — | #14 (fechada) | `src/js/date-utils.js`, `src/js/plant-service.js`, `src/js/app.js`, `docs/arquitetura.md` | `npm run lint`, testes unitários e revisão da árvore `src/` |
| **[RNF05]** | Portabilidade local multiplataforma | — | — | #1 | HTML/CSS/JS nativos; CI em `ubuntu-latest`; README | `npm run check` em Windows/Linux; workflow CI |
| **[RNF06]** | ≥ 20 testes, build e CI em push/PR | — | — | — (lacuna do relatório) | `package.json`, `test/`, `scripts/`, `.github/workflows/ci.yml` | 46 testes; jobs `quality` e `security` no CI |
| **[RNF07]** | Segurança, varredura de segredos e dependências | UC04 | — | — (lacuna do relatório) | `.github/workflows/ci.yml`, `.github/dependabot.yml`, `SECURITY.md` | `gitleaks`, `npm audit` e Dependabot no GitHub |

---

## 3. Cobertura de Casos de Uso e Histórias

| Caso de uso | Histórias relacionadas | Requisitos |
| :--- | :--- | :--- |
| UC01 — Cadastrar nova planta | US01, US03, US06, US07 | RF01, RF02, RF06, RF07 |
| UC02 — Registrar rega | US02, US03 | RF05, RF06 |
| UC03 — Editar ou excluir planta | US04, US05, US06, US07 | RF02, RF03, RF04, RF07 |
| UC04 — Exportar/importar jardim | US08 | RF08 |

---

## 4. Cobertura de Testes

| Arquivo | Testes | Requisitos cobertos |
| :--- | :---: | :--- |
| `test/date-utils.test.js` | 14 | RF06, RNF02 |
| `test/plant-service.test.js` | 32 | RF01–RF08, RNF01–RNF03, RNF06 |
| **Total** | **46** | — |

Comandos de verificação:

```bash
npm ci
npm run lint
npm run build
npm test
npm run test:coverage
```

---

## 5. Issues Reais do GitHub e Status

As issues abaixo são as existentes em https://github.com/rbbarros/flora-care/issues. O status indica a evidência no código/documentação; o fechamento formal depende de ação no GitHub.

| Issue | Tema | Requisitos | Status no repositório |
| :---: | :--- | :--- | :--- |
| #1 | Estrutura de diretórios, `.gitignore` | RNF05 | Atendida |
| #2 | Project Charter | Governança | Atendida (versão 1.1) |
| #3 | Requisitos RF/RNF | RF01–RF08, RNF01–RNF07 | Atendida (8 RF e 7 RNF) |
| #4 | Casos de uso e user stories com BDD | UC01–UC04, US01–US08 | Atendida |
| #5 | Persistência local | RNF01 | Atendida e testada |
| #6 | Cadastro de nova planta | RF01 | Atendida e testada |
| #7 | Validação de campos obrigatórios | RF01 | Atendida e testada |
| #8 | Listagem e contadores | RF02 | Atendida e testada |
| #9 | Cálculo da próxima rega e status | RF06 | Atendida e testada |
| #10 | Botão rápido "Regar" | RF05, RNF03 | Atendida e testada |
| #11 | Edição de planta | RF03 | Atendida e testada |
| #12 | Exclusão de planta | RF04 | Atendida e testada |
| #13 | Filtros por status e ambiente | RF07 | Atendida e testada |
| #14 | Modularização em camadas | RNF02, RNF04 | Fechada no GitHub |
| #15 | README sincronizado com `docs/` | Governança | Fechada no GitHub |

---

## 6. Lacunas do Relatório Ainda sem Issue no GitHub

O relatório técnico propôs 15 issues prioritárias que não coincidem com as 15 issues existentes no repositório. Os itens abaixo foram implementados nesta entrega, mas ainda não possuem issue própria no GitHub:

| Item do relatório | Evidência no repositório |
| :--- | :--- |
| `[TEST-UNIT]` testes unitários | `test/date-utils.test.js`, `test/plant-service.test.js` (46 testes) |
| `[DOC-ARQ]` arquitetura | `docs/arquitetura.md` |
| `[TRC-MAT]` matriz de rastreabilidade | este documento |
| `[CI-GEN]` pipeline e badge | `.github/workflows/ci.yml`, badge no `README.md` |
| `[RF-EXPORT]` exportar/importar | RF08, UC04, US08 e testes |
| `[PERF-RNF02]` desempenho com 500 plantas | teste `RNF02` |
| `[US-GAP]` histórias de listar/filtrar | US06 e US07 |
| `[REL-TAG]` tag SemVer anotada | tag `v1.0.0` anotada, `package.json` e README em `1.0.0` |
| `[GOV-PR]` Pull Requests e fechamento de issues | `.github/pull_request_template.md` e `CONTRIBUTING.md`; requer ação no GitHub |
| `[REL-LIC]` licença | `LICENSE` MIT |
| `[REL-CHL]` changelog | `CHANGELOG.md` |
| `[GOV-TPL]` templates | `.github/ISSUE_TEMPLATE/` e `.github/pull_request_template.md` |
| `[DOC-CTB]` contribuição | `CONTRIBUTING.md` |
| `[SEC-SCAN]` segredos/dependências | job `security` do CI e `SECURITY.md` |
| `[DEP-BOT]` Dependabot | `.github/dependabot.yml` |

> A criação/fechamento de issues, a abertura de Pull Requests, a aplicação de labels e a publicação de tags são ações externas no GitHub. O token local do `gh` está inválido, portanto essas operações não foram executadas automaticamente.
