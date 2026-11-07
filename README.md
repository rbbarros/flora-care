# FloraCare — Gerenciador de Cuidados e Rega de Plantas

![Versão](https://img.shields.io/badge/vers%C3%A3o-1.0.0-blue)
![CI](https://github.com/rbbarros/flora-care/actions/workflows/ci.yml/badge.svg?branch=develop)
![Testes](https://img.shields.io/badge/testes-46%20automatizados-brightgreen)
![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-green)

O **FloraCare** é uma aplicação web simples para organizar plantas domésticas e acompanhar quando precisam ser regadas. O usuário cadastra cada planta, informa seu ambiente e intervalo de rega e consulta a próxima data de cuidado. Os dados são armazenados localmente no navegador e podem ser exportados/importados em JSON.

## Funcionalidades

| Requisito | Funcionalidade | Situação |
|---|---|---|
| [RF01](./docs/requisitos.md) | Cadastrar planta e seus parâmetros de cuidado | Implementado |
| [RF02](./docs/requisitos.md) | Listar plantas com datas, histórico, status e contadores | Implementado |
| [RF03](./docs/requisitos.md) | Editar os dados de uma planta e recalcular a próxima rega | Implementado |
| [RF04](./docs/requisitos.md) | Excluir planta com confirmação | Implementado |
| [RF05](./docs/requisitos.md) | Registrar uma rega com 1 clique e manter histórico | Implementado |
| [RF06](./docs/requisitos.md) | Calcular a próxima rega e o status hídrico | Implementado |
| [RF07](./docs/requisitos.md) | Filtrar por status e ambiente | Implementado |
| [RF08](./docs/requisitos.md) | Exportar e importar o jardim em JSON | Implementado |
| Futuro | Calendário de adubação e poda | Planejado |

Os dados ficam neste navegador e perfil. Limpar os dados do site remove o jardim salvo; use **Exportar JSON** para fazer backup e **Importar JSON** para restaurar em outro navegador.

> A versão publicada é `v1.0.0`. As melhorias da Week_02 (testes, CI, exportação/importação e documentação) estão na branch `feat/adjust-report`, serão integradas em `develop` e estão registradas em [CHANGELOG — Unreleased](./CHANGELOG.md).

## Qualidade e testes

- **46 testes automatizados** com `node:test`, cobrindo cálculo de datas, validação, CRUD, rega, status, filtros, persistência, exportação/importação e desempenho.
- **Cobertura atual:** 97,25% de linhas, 93,41% de branches e 100% de funções em `src/js/`.
- **Teste de desempenho** com 500 plantas e limite de 200 ms (`RNF02`).
- **CI** no GitHub Actions com lint, build, testes, cobertura, `gitleaks` e `npm audit`.
- **Dependabot** semanal para npm e GitHub Actions.

```bash
npm ci
npm run check        # lint + build + testes
npm run test:coverage
```

O workflow está em [.github/workflows/ci.yml](./.github/workflows/ci.yml) e roda em `push` e `pull_request` para `main` e `develop`.

## Estrutura do repositório

```text
flora-care/
├── .editorconfig
├── .gitattributes
├── .gitleaksignore
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   └── labels.yml
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   ├── docs.md
│   │   └── config.yml
│   ├── dependabot.yml
│   ├── labels.yml
│   └── pull_request_template.md
├── docs/
│   ├── README.md
│   ├── project-charter.md
│   ├── requisitos.md
│   ├── casos-de-uso.md
│   ├── user-stories.md
│   ├── arquitetura.md
│   ├── matriz-rastreabilidade.md
│   └── backlog.md
├── scripts/
│   ├── build.mjs
│   └── check.mjs
├── src/
│   ├── index.html
│   ├── styles.css
│   └── js/
│       ├── app.js
│       ├── date-utils.js
│       └── plant-service.js
├── test/
│   ├── date-utils.test.js
│   └── plant-service.test.js
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE
├── SECURITY.md
├── package.json
├── package-lock.json
└── README.md
```

## Documentação do projeto

- [Índice da documentação](./docs/README.md)
- [Project Charter — Termo de Abertura](./docs/project-charter.md)
- [Requisitos Funcionais e Não Funcionais](./docs/requisitos.md)
- [Casos de Uso](./docs/casos-de-uso.md)
- [Histórias de Usuário e Critérios de Aceite](./docs/user-stories.md)
- [Arquitetura de Software](./docs/arquitetura.md)
- [Matriz de Rastreabilidade](./docs/matriz-rastreabilidade.md)
- [Backlog e issues do GitHub](./docs/backlog.md)
- [CHANGELOG](./CHANGELOG.md)
- [Guia de Contribuição](./CONTRIBUTING.md)
- [Política de Segurança](./SECURITY.md)

## Organização da especificação funcional

Os artefatos estão separados por finalidade:

- [requisitos.md](./docs/requisitos.md) registra o que o sistema deve fazer e as restrições de qualidade.
- [casos-de-uso.md](./docs/casos-de-uso.md) descreve atores e fluxos de interação, inclusive alternativas e exceções.
- [user-stories.md](./docs/user-stories.md) expressa as necessidades do usuário e seus critérios de aceite.
- [matriz-rastreabilidade.md](./docs/matriz-rastreabilidade.md) liga requisito, caso de uso, história, issue, código e teste.
- [arquitetura.md](./docs/arquitetura.md) explica módulos, fluxo de dados, persistência e decisões técnicas.

## Executar localmente

É necessário ter Python 3 e um navegador moderno. Na pasta raiz do repositório, inicie um servidor local:

**Windows (PowerShell):**

```powershell
python -m http.server 8000 --directory src
```

Se `python` não estiver disponível, use `py -m http.server 8000 --directory src`.

**macOS/Linux:**

```bash
python3 -m http.server 8000 --directory src
```

Abra `http://localhost:8000` no navegador. Encerre o servidor com `Ctrl+C`. Não é necessário instalar dependências para executar a aplicação; o Node.js é usado apenas para testes, lint e build.

## Fluxo de branches

O trabalho segue o Git Flow solicitado na atividade. Não faça commits diretamente em `main`: implemente em branches temáticas e integre por Pull Request.

| Tipo de trabalho | Criar a partir de | Integrar em |
|---|---|---|
| Funcionalidade ou documentação (`feature/issue-<n>-descricao`) | `develop` | `develop` |
| Correção (`bugfix/issue-<n>-descricao`) | `develop` | `develop` |
| Preparação de versão (`release/<versao>`) | `develop` | `main` e `develop` |
| Correção urgente (`hotfix/issue-<n>-descricao`) | `main` | `main` e `develop` |

Exemplo para trabalhar em uma Issue:

```bash
git switch develop
git pull origin develop
git switch -c feature/issue-16-notificacao-rega
# Faça alterações e commits pequenos, por exemplo:
git add .
git commit -m "feat: adicionar notificacao de rega"
git push -u origin feature/issue-16-notificacao-rega
```

Abra um Pull Request da branch temática para `develop`, inclua `Closes #N` na descrição e use Conventional Commits (`feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`). Para marcar uma versão estável após integrá-la em `main`, use uma tag anotada seguindo SemVer:

```bash
git tag -a v1.0.0 -m "Primeira versão do MVP"
git push origin v1.0.0
```

## Issues e governança no GitHub

O backlog real está em [rbbarros/flora-care/issues](https://github.com/rbbarros/flora-care/issues). As issues #1–#13 cobrem estrutura, documentação, persistência, CRUD, cálculo, rega e filtros; #14 e #15 já estão fechadas. O mapeamento completo, incluindo as lacunas do relatório técnico que ainda não têm issue própria, está em [docs/backlog.md](./docs/backlog.md).

Ações que exigem escrita no GitHub (criar/fechar issues, abrir Pull Requests, aplicar labels e publicar tags) não são executadas automaticamente pelo projeto local.

## Licença

Distribuído sob a licença [MIT](./LICENSE).
