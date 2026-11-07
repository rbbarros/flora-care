# Contribuindo com o FloraCare

Obrigado por contribuir! Este guia descreve o fluxo de trabalho, o padrão de commits, os testes e os critérios para abrir um Pull Request.

## 1. Pré-requisitos

- Node.js 20 ou superior.
- Git.
- Navegador moderno para testes manuais.

```bash
git clone https://github.com/rbbarros/flora-care.git
cd flora-care
npm ci
```

## 2. Fluxo de branches (Git Flow)

| Tipo de trabalho | Criar a partir de | Integrar em | Nome sugerido |
| :--- | :--- | :--- | :--- |
| Funcionalidade | `develop` | `develop` | `feature/issue-<n>-descricao` |
| Correção | `develop` | `develop` | `bugfix/issue-<n>-descricao` |
| Documentação | `develop` | `develop` | `docs/issue-<n>-descricao` |
| Preparação de release | `develop` | `main` e `develop` | `release/<versao>` |
| Correção urgente | `main` | `main` e `develop` | `hotfix/issue-<n>-descricao` |

Nunca faça commit diretamente em `main`. Abra um Pull Request para `develop` (ou para `main` no caso de release/hotfix).

```bash
git switch develop
git pull origin develop
git switch -c feature/issue-16-notificacao-rega
```

## 3. Conventional Commits

Use mensagens curtas no imperativo, com escopo quando fizer sentido:

```text
feat: adicionar exportacao do jardim em JSON
fix: impedir historico duplicado no mesmo dia
docs: atualizar matriz de rastreabilidade
test: cobrir virada de mes no calculo de rega
chore: configurar Dependabot
refactor: extrair filtro de plantas para o servico
```

Prefixos aceitos: `feat`, `fix`, `docs`, `test`, `refactor`, `chore`, `perf`, `ci`, `build`, `style`.

## 4. Testes e verificação

Antes de abrir o PR, execute:

```bash
npm run check
```

Esse comando executa:

1. `npm run lint` — sintaxe JavaScript e presença dos artefatos obrigatórios.
2. `npm run build` — valida os arquivos e gera `dist/`.
3. `npm test` — 46 testes com `node:test`.

Para cobertura:

```bash
npm run test:coverage
```

Regras:

- Toda função de domínio nova deve ter teste em `test/`.
- Correções de bug devem incluir um teste que falharia antes da correção.
- O teste de desempenho `RNF02` deve permanecer abaixo de 200 ms para 500 plantas.
- Não commite `dist/`, `node_modules/`, segredos ou arquivos locais ignorados.

## 5. Documentação

Atualize, conforme o impacto:

- `docs/requisitos.md` — requisito novo ou alterado.
- `docs/casos-de-uso.md` e `docs/user-stories.md` — fluxo ou critério BDD.
- `docs/matriz-rastreabilidade.md` — vínculo requisito ↔ código ↔ teste.
- `docs/arquitetura.md` — decisão estrutural.
- `CHANGELOG.md` — mudança de comportamento ou entrega.
- `README.md` — funcionalidade, comando ou estrutura.

## 6. Pull Request

Use o template em `.github/pull_request_template.md` e inclua:

- Descrição objetiva da mudança e motivação.
- Issue relacionada com `Closes #N`.
- Tipo de mudança (`feat`, `fix`, `docs`, `test`, `chore`).
- Evidências de teste (`npm run check`).
- Checklist de documentação e rastreabilidade.

O CI precisa ficar verde antes do merge. O merge deve preservar o histórico e fechar a issue automaticamente.

## 7. Segurança

- Não inclua segredos, tokens, senhas ou chaves no repositório.
- O CI executa `gitleaks` e `npm audit`.
- Para reportar vulnerabilidades, siga [SECURITY.md](./SECURITY.md).

## 8. Código de conduta

Seja respeitoso e construtivo nas discussões. Priorize clareza, simplicidade e evidências (testes, documentação e histórico Git).
