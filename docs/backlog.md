# Backlog de Engenharia — FloraCare

Este documento consolida o backlog real do repositório e o confronta com as lacunas apontadas no relatório técnico de 2026-11-07.

- **Repositório:** https://github.com/rbbarros/flora-care
- **Issues:** https://github.com/rbbarros/flora-care/issues
- **Branch de trabalho desta entrega:** `feat/adjust-report`
- **Última revisão:** 2026-11-07

---

## 1. Issues Existentes no GitHub

| Issue | Título | Labels | Estado | Evidência no repositório |
| :---: | :--- | :--- | :---: | :--- |
| #1 | Configurar estrutura de diretórios e `.gitignore` | `chore` | Aberta | `docs/`, `src/`, `.gitignore` |
| #2 | Criar Project Charter | `documentation` | Aberta | `docs/project-charter.md` v1.1 |
| #3 | Especificar RF e RNF | `documentation` | Aberta | `docs/requisitos.md` (RF01–RF08, RNF01–RNF07) |
| #4 | Documentar casos de uso e user stories com BDD | `documentation` | Aberta | `docs/casos-de-uso.md`, `docs/user-stories.md` |
| #5 | Persistência local do catálogo | `feature` | Aberta | `loadPlants`/`savePlants` + testes |
| #6 | Cadastro de nova planta | `feature` | Aberta | `createPlant`, formulário e testes |
| #7 | Validação de campos obrigatórios | `enhancement` | Aberta | `validatePlantInput` + testes |
| #8 | Listagem geral e contadores | `feature` | Aberta | `render`, `summarizeGarden` + testes |
| #9 | Motor de cálculo da próxima rega e status | `feature` | Aberta | `date-utils.js`, `nextWateringDate`, `wateringStatus` + testes |
| #10 | Botão rápido "Regar" | `feature` | Aberta | `waterPlant`, botão e testes |
| #11 | Edição de planta existente | `feature` | Aberta | `updatePlant` + testes |
| #12 | Exclusão de planta | `feature` | Aberta | `removePlant` + testes |
| #13 | Filtros por status e ambiente | `feature` | Aberta | `filterPlants` + testes |
| #14 | Refatorar modularização em camadas | `refactor` | Fechada | `date-utils.js`, `plant-service.js`, `app.js` |
| #15 | Consolidar README sincronizado com `docs/` | `documentation` | Fechada | `README.md` |

### Observação sobre o estado

As issues #1–#13 continuam abertas no GitHub porque o fechamento exige ação no repositório remoto. O código e os testes desta branch fornecem a evidência de conclusão; o fechamento pode ser feito com `Closes #N` em um Pull Request.

O conjunto padrão de labels está em [.github/labels.yml](../.github/labels.yml) e pode ser aplicado manualmente pelo workflow **Sincronizar labels** (`workflow_dispatch`).

---

## 2. Lacunas do Relatório sem Issue Própria

O relatório propôs 15 issues prioritárias que não são as mesmas 15 issues do repositório. Os itens abaixo foram implementados, mas não têm issue dedicada:

| Código do relatório | Tema | Status | Evidência |
| :--- | :--- | :---: | :--- |
| `[TEST-UNIT]` | Testes unitários de `date-utils` e `plant-service` | Concluído | 46 testes com `node:test` |
| `[DOC-ARQ]` | Arquitetura (módulos, fluxo, persistência) | Concluído | `docs/arquitetura.md` |
| `[TRC-MAT]` | Matriz RF↔UC↔US↔Issue↔Teste | Concluído | `docs/matriz-rastreabilidade.md` |
| `[CI-GEN]` | Pipeline de CI com badge | Concluído | `.github/workflows/ci.yml`, badge no README |
| `[RF-EXPORT]` | Exportar/importar JSON | Concluído | RF08, UC04, US08, `exportGarden`/`parseGarden` |
| `[REL-TAG]` | Tag SemVer anotada | Existente | `v0.1.0`, `v0.2.0`, `v1.0.0` anotadas; próxima versão após merge |
| `[GOV-PR]` | Pull Requests reais e fechamento de issues | Pendente (externo) | Templates e guia prontos; requer `gh auth login` |
| `[PERF-RNF02]` | Desempenho com 500 plantas | Concluído | teste `RNF02` (< 200 ms) |
| `[US-GAP]` | Histórias para listar/filtrar | Concluído | US06 e US07 |
| `[REL-LIC]` | Licença | Concluído | `LICENSE` MIT |
| `[REL-CHL]` | Changelog | Concluído | `CHANGELOG.md` |
| `[GOV-TPL]` | Templates de issue e PR | Concluído | `.github/ISSUE_TEMPLATE/`, `.github/pull_request_template.md` |
| `[DOC-CTB]` | Guia de contribuição | Concluído | `CONTRIBUTING.md` |
| `[SEC-SCAN]` | Varredura de segredos e dependências | Concluído | job `security`, `gitleaks`, `npm audit`, `SECURITY.md` |
| `[DEP-BOT]` | Dependabot/Renovate | Concluído | `.github/dependabot.yml` |

---

## 3. Backlog Futuro (pós-Week_02)

| Item | Tema | Origem |
| :---: | :--- | :--- |
| 16 | Notificação/lembrete de rega | Relatório |
| 17 | Calendário de adubação e poda | README |
| 18 | PWA instalável e offline | Evolução |
| 19 | `.env.example` e variáveis de ambiente | Relatório |
| 20 | `docs/README.md` com índice e regra de sincronização | Relatório |
| 21 | Lint/format (ESLint) e pre-commit | Relatório |
| 22 | Baseline de desempenho dos fluxos principais | Relatório |
| 23 | Checklist de acessibilidade | Relatório |
| 24 | Logs estruturados e mensagens de erro | Relatório |
| 25 | Dockerfile e docker-compose | Relatório |

> Itens 16–25 são evolução; não fazem parte do escopo mínimo desta entrega.
