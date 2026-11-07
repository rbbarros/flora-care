# Documentação do FloraCare

Índice dos artefatos de engenharia do projeto. A documentação deve permanecer sincronizada com o código, os testes e o backlog.

## Artefatos

| Documento | Finalidade | Público principal |
| :--- | :--- | :--- |
| [Project Charter](./project-charter.md) | Termo de abertura, objetivos SMART, escopo e stakeholders. | Product Owner / avaliador |
| [Requisitos](./requisitos.md) | RF01–RF08 e RNF01–RNF07 com critérios de verificação. | Desenvolvimento / QA |
| [Casos de Uso](./casos-de-uso.md) | Atores, fluxos principais, alternativos e de exceção (UC01–UC04). | Desenvolvimento / QA |
| [User Stories](./user-stories.md) | Histórias US01–US08 com critérios BDD/Gherkin. | Product Owner / QA |
| [Arquitetura](./arquitetura.md) | Camadas, módulos, fluxo de dados, persistência e ADRs. | Desenvolvimento |
| [Matriz de Rastreabilidade](./matriz-rastreabilidade.md) | Ligação RF/RNF ↔ UC ↔ US ↔ issue ↔ código ↔ teste. | Avaliador / QA |
| [Backlog](./backlog.md) | Issues reais do GitHub, lacunas do relatório e backlog futuro. | Product Owner |
| [CHANGELOG](../CHANGELOG.md) | Histórico de versões no formato Keep a Changelog. | Todos |
| [CONTRIBUTING](../CONTRIBUTING.md) | Git Flow, Conventional Commits, testes e checklist de PR. | Contribuidores |
| [SECURITY](../SECURITY.md) | Política de segurança e varredura de segredos. | Contribuidores |

## Regra de sincronização

Uma mudança só é considerada concluída quando:

1. O requisito afetado em `requisitos.md` foi atualizado.
2. A matriz de rastreabilidade aponta para o código e o teste correspondentes.
3. Os casos de uso e histórias relacionados continuam coerentes.
4. `npm run check` (lint + build + testes) passa.
5. O `CHANGELOG.md` registra a mudança quando ela afeta comportamento ou entrega.

## Comandos de verificação

```bash
npm ci
npm run lint
npm run build
npm test
npm run test:coverage
```
