# Especificação de Requisitos do Sistema — FloraCare

Este documento define os Requisitos Funcionais (RF) e Requisitos Não Funcionais (RNF) do sistema **FloraCare**, estruturados com códigos únicos para rastreabilidade direta nas Issues, Pull Requests, testes automatizados e componentes de código.

A matriz que liga cada requisito a casos de uso, histórias de usuário, issues e testes está em [matriz-rastreabilidade.md](./matriz-rastreabilidade.md).

---

## 1. Requisitos Funcionais (RF)

| ID | Título | Descrição do Requisito | Prioridade |
| :--- | :--- | :--- | :---: |
| **[RF01]** | Cadastrar Planta | O sistema deve permitir cadastrar uma planta informando: Nome/Apelido (obrigatório, mínimo de 2 caracteres), Espécie (opcional), Ambiente (`Sol Pleno`, `Meia-Sombra` ou `Sombra`) e Intervalo de Rega em dias (número inteiro maior que zero). Entradas inválidas devem ser bloqueadas com mensagem clara. | Alta |
| **[RF02]** | Listar Plantas | O sistema deve exibir o catálogo de plantas cadastradas, apresentando nome, espécie, ambiente, data da última rega, data da próxima rega, quantidade de regas registradas e o status atual (`Hidratada` ou `Precisa de Rega`), além dos totais do jardim. | Alta |
| **[RF03]** | Editar Planta | O sistema deve permitir atualizar o nome, espécie, ambiente e intervalo de rega de uma planta já cadastrada, recalculando sua próxima rega sem perder o histórico de regas. | Média |
| **[RF04]** | Excluir Planta | O sistema deve permitir remover permanentemente uma planta do catálogo mediante confirmação explícita do usuário. | Média |
| **[RF05]** | Registrar Rega | O sistema deve permitir ao usuário registrar que uma planta foi regada na data atual por meio de um botão de ação rápida ("Regar agora"), mantendo o histórico de regas. Registros repetidos no mesmo dia não devem duplicar a entrada do histórico. | Alta |
| **[RF06]** | Calcular Próxima Rega e Status | O sistema deve calcular automaticamente a `Próxima Rega` somando o `Intervalo de Rega (dias)` à `Data da Última Rega`. Se a data atual for igual ou posterior à `Próxima Rega`, o status deve ser exibido como `Precisa de Rega`; caso contrário, `Hidratada`. | Alta |
| **[RF07]** | Filtrar Plantas | O sistema deve permitir filtrar a listagem de plantas pelo status hídrico (`Todas`, `Precisam de Rega`, `Hidratadas`) e pelo tipo de Ambiente (`Sol Pleno`, `Meia-Sombra`, `Sombra`), inclusive de forma combinada. | Baixa |
| **[RF08]** | Exportar e Importar Jardim | O sistema deve permitir exportar todo o jardim (plantas e históricos) em um arquivo `JSON` versionado e importá-lo em outro navegador. A importação deve validar o schema e as plantas antes de substituir os dados atuais; arquivos inválidos não podem alterar o jardim existente. | Média |

---

## 2. Requisitos Não Funcionais (RNF)

| ID | Categoria | Descrição do Requisito | Critério de Verificação |
| :--- | :--- | :--- | :--- |
| **[RNF01]** | Persistência | Os dados das plantas e seus históricos de rega devem ser persistidos localmente (`LocalStorage`), mantendo os registros intactos após fechar a aplicação. | Fechar e reabrir a aplicação verificando a manutenção dos dados; testes `loadPlants`/`savePlants`. |
| **[RNF02]** | Desempenho | O cálculo de datas, o filtro e o resumo do jardim devem ocorrer em tempo inferior a 200 milissegundos para catálogos de até 500 plantas. | Teste automatizado `RNF02` com 500 plantas em `test/plant-service.test.js`. |
| **[RNF03]** | Usabilidade | A operação de registrar a rega de uma planta (`[RF05]`) deve ser realizada com apenas 1 clique diretamente no card da planta na tela principal. | Teste de fluxo na tela inicial e teste unitário de `waterPlant`. |
| **[RNF04]** | Manutenibilidade | A lógica de cálculo de datas, validação e persistência deve ser separada da camada de interface, com funções puras testáveis e documentação de arquitetura. | Auditoria de `src/js/` e `docs/arquitetura.md`; testes de `date-utils` e `plant-service`. |
| **[RNF05]** | Portabilidade | A aplicação deve rodar localmente em qualquer sistema operacional (Windows, Linux ou macOS) sem servidores pagos ou bancos de dados externos complexos. | Execução local limpa seguindo o `README.md`; CI em `ubuntu-latest`. |
| **[RNF06]** | Qualidade e Integração Contínua | O projeto deve manter no mínimo 20 testes automatizados com `node:test`, build reproduzível e pipeline de CI executando verificação estática, build e testes em `push` e `pull_request`. | `npm test` com 46 testes; workflow `.github/workflows/ci.yml` verde e badge no README. |
| **[RNF07]** | Segurança e Dependências | O repositório não deve conter segredos; o CI deve executar varredura de segredos (`gitleaks`) e auditoria de dependências (`npm audit`), com atualizações automatizadas via Dependabot. | Workflow de segurança no CI, `.github/dependabot.yml` e `SECURITY.md`. |

---

## 3. Regras de Rastreabilidade

1. Todo RF/RNF deve aparecer na [matriz de rastreabilidade](./matriz-rastreabilidade.md) com caso de uso, história de usuário, issue, implementação e teste.
2. Toda mudança de comportamento deve atualizar o requisito, a matriz, os testes e, quando aplicável, o `CHANGELOG.md`.
3. Os identificadores `RFxx`/`RNFxx` são estáveis e não devem ser renumerados; novos requisitos recebem o próximo número livre.
4. A documentação só pode declarar algo como "implementado" quando houver código e teste correspondente ou verificação manual registrada.
