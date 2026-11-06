# 🌱 FloraCare — Gerenciador de Cuidados e Rega de Plantas

![Version](https://img.shields.io/badge/version-v1.0.0-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/build-passing-brightgreen.svg)
![Workflow](https://img.shields.io/badge/workflow-Git%20Flow-orange.svg)

O **FloraCare** é uma aplicação leve projetada para ajudar entusiastas de jardinagem doméstica e moradores de apartamentos a cuidarem de suas plantas. O sistema resolve o problema do esquecimento das regas ao calcular automaticamente a data da próxima hidratação com base na frequência em dias de cada espécie, destacando visualmente quais plantas estão "com sede" no dia atual.

---

## 📂 Documentação de Planejamento e Engenharia (`docs/`)

Todos os artefatos de concepção e especificação formal do sistema estão disponíveis na pasta `docs/`:

* 📄 **[Project Charter (Termo de Abertura)](./docs/project-charter.md)** — Visão geral, justificativa, objetivos SMART, escopo e stakeholders.
* 📋 **[Requisitos Funcionais e Não Funcionais](./docs/requisitos.md)** — Especificação rastreável (`[RF01]` a `[RF07]` e `[RNF01]` a `[RNF05]`).
* 🔄 **[Casos de Uso (Use Cases)](./docs/casos-de-uso.md)** — Atores e fluxos principais, alternativos e de exceção.
* 🧩 **[Histórias de Usuário (User Stories & BDD)](./docs/user-stories.md)** — Histórias ágeis com critérios de aceite em formato Gherkin (*Dado/Quando/Então*).

---

## ✅ Sumário de Funcionalidades (Implementadas vs. Planejadas)

| ID | Funcionalidade | Status | Release |
| :---: | :--- | :---: | :---: |
| `[RF01]` | Cadastro de plantas (Nome, Espécie, Ambiente e Intervalo em dias) | ✅ Implementado | `v0.2.0` |
| `[RF02]` | Listagem do jardim virtual com indicadores de status hídrico | ✅ Implementado | `v0.2.0` |
| `[RF06]` | Cálculo automático da data da próxima rega e alerta de sede | ✅ Implementado | `v0.3.0` |
| `[RF05]` | Registro rápido de rega ("💧 Regar") com 1 clique | ✅ Implementado | `v0.3.0` |
| `[RF03]` | Edição de parâmetros de cuidado da planta | ✅ Implementado | `v0.3.0` |
| `[RF04]` | Exclusão de planta com confirmação | ✅ Implementado | `v0.3.0` |
| `[RF07]` | Filtro por status ("Precisa de Rega" / "Hidratada") e Ambiente | ✅ Implementado | `v0.3.0` |
| `Futuro` | Controle de calendário de adubação e poda | 📅 Planejado | `v2.0.0` |

---

## 🚀 Configuração de Ambiente e Execução Local

### Pré-requisitos
* Git instalado
* Navegador Web moderno (ou Node.js / Python conforme implementação em `src/`)

### Passo a Passo
```bash
# 1. Clone este repositório
git clone https://github.com/SEU-USUARIO/floracare.git

# 2. Acesse o diretório do projeto
cd floracare

# 3. Abra a aplicação no navegador (ou execute via terminal)
open src/index.html