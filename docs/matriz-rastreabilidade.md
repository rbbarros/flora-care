# Matriz de Rastreabilidade de Requisitos — FloraCare

Esta matriz estabelece a amarração bidirecional entre as necessidades de negócio, especificação técnica, backlog de engenharia e os componentes de código-fonte implementados.

| ID Requisito | Tipo | Descrição Sumária | Caso de Uso | User Story | GitHub Issue | Componente / Arquivo de Implementação |
| :---: | :---: | :--- | :---: | :---: | :---: | :--- |
| **[RF01]** | RF | Cadastro de plantas com ciclo em dias | UC01 | US01 | `#06` | `src/js/plant-service.js`, `src/index.html` |
| **[RF02]** | RF | Listagem de plantas com status do dia | UC03 | US03 | `#08` | `src/js/app.js`, `src/js/plant-service.js` |
| **[RF03]** | RF | Cálculo dinâmico da próxima rega | UC01, UC02 | US01, US02 | `#07` | `src/js/date-utils.js` |
| **[RF04]** | RF | Classificação de criticidade (Em dia/Atrasada) | UC03 | US03 | `#07` | `src/js/date-utils.js` |
| **[RF05]** | RF | Registro rápido de rega (Check-in) | UC02 | US02 | `#09` | `src/js/plant-service.js`, `src/js/app.js` |
| **[RF06]** | RF | Anulação/Desfazer rega do dia | UC02 | - | `#10` | `src/js/plant-service.js` |
| **[RF07]** | RF | Painel filtrado "Plantas com Sede" | UC03 | US04 | `#11` | `src/js/app.js`, `src/styles.css` |
| **[RF08]** | RF | Edição de cadastro de plantas | - | - | `#12` | `src/js/plant-service.js` |
| **[RF09]** | RF | Arquivamento lógico (*soft delete*) | - | US05 | `#12` | `src/js/plant-service.js` |
| **[RNF01]** | RNF | Tempo de resposta local < 150ms | - | - | `#07`, `#08` | `src/js/plant-service.js` (In-memory storage) |
| **[RNF02]** | RNF | Persistência íntegra local | - | - | `#05` | `src/js/plant-service.js` (LocalStorage API) |
| **[RNF03]** | RNF | Idempotência no check-in diário | UC02 | US02 | `#10` | `src/js/plant-service.js` |
| **[RNF04]** | RNF | Usabilidade (Ações em até 2 cliques) | UC02, UC03 | US02, US04 | `#08`, `#13` | `src/index.html`, `src/styles.css` |
| **[RNF05]** | RNF | Execução multiplataforma (Web padrão) | - | - | `#01` | Arquitetura nativa sem dependências pesadas |
| **[RNF06]** | RNF | Modularização em camadas isoladas | - | - | `#01`, `#14` | Separação estrita: `app`, `service`, `utils` |
| **[RNF07]** | RNF | Timestamps normalizados em ISO 8601 | UC02 | US02 | `#07`, `#09` | `src/js/date-utils.js` |