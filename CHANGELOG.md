# Changelog

Todas as mudanças notáveis deste projeto são registradas neste arquivo.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e o versionamento segue [SemVer 2.0.0](https://semver.org/lang/pt-BR/).

## [Unreleased]

### Added

- 46 testes automatizados com `node:test` para `date-utils` e `plant-service`, incluindo validação, criação, edição, exclusão, rega, status, filtros, persistência, exportação/importação e desempenho.
- Exportação e importação do jardim em JSON versionado (`schema: floracare.garden`, `version: 1`), com validação de schema, versão e plantas antes de substituir os dados (`RF08`, `UC04`, `US08`).
- Pipeline de CI com lint, build, testes, cobertura, `gitleaks` e `npm audit`.
- Badge de CI, testes e licença no `README.md`.
- Dependabot para npm e GitHub Actions.
- Templates de issue (bug, feature, docs) e de Pull Request.
- `CONTRIBUTING.md`, `SECURITY.md`, `LICENSE` (MIT) e `docs/README.md`.
- `docs/backlog.md` com as issues reais do GitHub e as lacunas do relatório.
- Histórias US06 (listar), US07 (filtrar) e US08 (exportar/importar), caso de uso UC04 e requisitos RF08, RNF06 e RNF07.

### Changed

- Matriz de rastreabilidade reescrita com RF01–RF08, RNF01–RNF07, UC01–UC04, US01–US08, issues reais do GitHub, implementação e testes.
- `docs/arquitetura.md` ampliado com diagramas, fluxo de dados, modelo, ADRs, testabilidade, segurança e evolução.
- `docs/project-charter.md` atualizado para 8 RF, 7 RNF, 46 testes e CI.
- `README.md` sincronizado com a estrutura real, testes, CI, licença e documentação.
- `waterPlant` tornou-se idempotente no mesmo dia; `updatePlant`, `removePlant`, `filterPlants` e `summarizeGarden` foram extraídos para o serviço para permitir testes sem DOM.
- `addDays` e `formatDate` passaram a validar datas ISO reais; `loadPlants`/`savePlants` validam o jardim antes de ler/gravar.

### Fixed

- Alinhamento entre requisitos, casos de uso, histórias, código e testes.
- Ausência de testes, CI, licença, changelog, templates e guia de contribuição.
- Risco de perda de dados ao limpar o navegador, mitigado pela exportação/importação em JSON.

## [1.0.0] - 2026-11-07

### Added

- MVP local do FloraCare com cadastro, listagem, edição, exclusão, rega, cálculo de próxima rega, status hídrico e filtros.
- Persistência em `LocalStorage`.
- Documentação de requisitos, casos de uso, histórias de usuário, arquitetura e matriz de rastreabilidade.
- Estrutura modular em `date-utils.js`, `plant-service.js` e `app.js`.

[Unreleased]: https://github.com/rbbarros/flora-care/compare/v1.0.0...develop
[1.0.0]: https://github.com/rbbarros/flora-care/releases/tag/v1.0.0
