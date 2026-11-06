# FloraCare — Especificação de um Gerenciador de Cuidados e Rega de Plantas

![Versão](https://img.shields.io/badge/vers%C3%A3o-0.1.0-blue)
![Fase](https://img.shields.io/badge/fase-especifica%C3%A7%C3%A3o-blue)

O **FloraCare** é a especificação de um sistema simples para organizar plantas domésticas e acompanhar quando precisam ser regadas. Este repositório está na etapa de planejamento e documentação: os requisitos e os comportamentos esperados estão descritos em `docs/`, e a pasta `src/` está reservada para o código-fonte, ainda não implementado.

## Funcionalidades especificadas

| Requisito | Funcionalidade | Situação |
|---|---|---|
| [RF01] | Cadastrar planta e seus parâmetros de cuidado | Especificado; implementação pendente |
| [RF02] | Listar plantas com datas e status hídrico | Especificado; implementação pendente |
| [RF03] | Editar os dados de uma planta | Especificado; implementação pendente |
| [RF04] | Excluir planta com confirmação | Especificado; implementação pendente |
| [RF05] | Registrar uma rega e manter seu histórico | Especificado; implementação pendente |
| [RF06] | Calcular a próxima rega e o status | Especificado; implementação pendente |
| [RF07] | Filtrar por status e ambiente | Especificado; implementação pendente |
| Futuro | Calendário de adubação e poda | Planejado |

## Estrutura do repositório

```text
flora-care/
├── .gitignore
├── README.md
├── docs/
│   ├── project-charter.md
│   ├── requisitos.md
│   ├── casos-de-uso.md
│   └── user-stories.md
└── src/
    └── .gitkeep
```

## Documentação do projeto

- [Project Charter — Termo de Abertura](./docs/project-charter.md)
- [Requisitos Funcionais e Não Funcionais](./docs/requisitos.md)
- [Casos de Uso](./docs/casos-de-uso.md)
- [Histórias de Usuário e Critérios de Aceite](./docs/user-stories.md)

## Organização da especificação funcional

Os artefatos estão separados por finalidade:

- [requisitos.md](./docs/requisitos.md) registra o que o sistema deve fazer e as restrições de qualidade.
- [casos-de-uso.md](./docs/casos-de-uso.md) descreve atores e fluxos de interação, inclusive alternativas e exceções.
- [user-stories.md](./docs/user-stories.md) expressa as necessidades do usuário e seus critérios de aceite.

As histórias e os casos de uso complementam os requisitos; não são código-fonte. A implementação correspondente será adicionada a `src/` posteriormente.

## Execução

Ainda não há uma aplicação executável. `src/` está intencionalmente sem código-fonte; `.gitkeep` existe somente para que o Git preserve a pasta no repositório.

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
git switch -c feature/issue-1-estrutura-inicial
# Faça alterações e commits pequenos, por exemplo:
git add .
git commit -m "feat: adicionar estrutura inicial da aplicação"
git push -u origin feature/issue-1-estrutura-inicial
```

Abra um Pull Request da branch temática para `develop`, inclua `Closes #1` na descrição e use Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`). Para marcar uma versão estável após integrá-la em `main`, use uma tag anotada seguindo SemVer, por exemplo: `git tag -a v0.1.0 -m "Primeira versão do MVP"` e `git push origin v0.1.0`.

As Issues do GitHub são criadas no repositório remoto; este projeto local não cria nem simula essas Issues.
