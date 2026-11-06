# Especificação de Requisitos do Sistema

Este documento define os Requisitos Funcionais (RF) e Requisitos Não Funcionais (RNF) do sistema **FloraCare**, estruturados com códigos únicos para rastreabilidade direta nas Issues e Pull Requests do repositório.

---

## 1. Requisitos Funcionais (RF)

| ID | Título | Descrição do Requisito | Prioridade |
| :--- | :--- | :--- | :---: |
| **[RF01]** | Cadastrar Planta | O sistema deve permitir cadastrar uma planta informando: Nome/Apelido (obrigatório, mín. 2 caracteres), Espécie (opcional), Ambiente (`Sol Pleno`, `Meia-Sombra` ou `Sombra`) e Intervalo de Rega em dias (número inteiro maior que zero). | Alta |
| **[RF02]** | Listar Plantas | O sistema deve exibir o catálogo de plantas cadastradas, apresentando nome, espécie, ambiente, data da última rega, data da próxima rega e o status atual (`Hidratada` ou `Precisa de Rega`). | Alta |
| **[RF03]** | Editar Planta | O sistema deve permitir atualizar o nome, espécie, ambiente e o intervalo de rega de uma planta já cadastrada, recalculando sua próxima rega. | Média |
| **[RF04]** | Excluir Planta | O sistema deve permitir remover permanentemente uma planta do catálogo mediante confirmação do usuário. | Média |
| **[RF05]** | Registrar Rega | O sistema deve permitir ao usuário registrar que uma planta foi regada na data atual por meio de um botão de ação rápida ("Regar"). | Alta |
| **[RF06]** | Calcular Próxima Rega e Status | O sistema deve calcular automaticamente a `Próxima Rega` somando o `Intervalo de Rega (dias)` à `Data da Última Rega`. Se a data atual for igual ou posterior à `Próxima Rega`, o status deve ser exibido como `Precisa de Rega`; caso contrário, `Hidratada`. | Alta |
| **[RF07]** | Filtrar Plantas | O sistema deve permitir filtrar a listagem de plantas pelo status hídrico (`Todas`, `Precisam de Rega`, `Hidratadas`) e pelo tipo de Ambiente (`Sol Pleno`, `Meia-Sombra`, `Sombra`). | Baixa |

---

## 2. Requisitos Não Funcionais (RNF)

| ID | Categoria | Descrição do Requisito | Critério de Verificação |
| :--- | :--- | :--- | :--- |
| **[RNF01]** | Persistência | Os dados das plantas e seus históricos de rega devem ser persistidos localmente (`LocalStorage`, arquivo `JSON` ou `SQLite`), mantendo os registros intactos após fechar a aplicação. | Fechar e reabrir a aplicação verificando a manutenção dos dados. |
| **[RNF02]** | Desempenho | O cálculo de datas de rega e a renderização da lista de plantas devem ocorrer em tempo inferior a 200 milissegundos para catálogos de até 100 plantas. | Inspeção de resposta imediata na interface local. |
| **[RNF03]** | Usabilidade | A operação de registrar a rega de uma planta (`[RF05]`) deve ser realizada com apenas 1 clique diretamente no card/linha da planta na tela principal. | Teste de fluxo na tela inicial do sistema. |
| **[RNF04]** | Manutenibilidade | O código deve separar a lógica de cálculo de datas/persistência da camada de interface, seguindo Git Flow, Commits Atômicos e SemVer. | Auditoria da árvore de diretórios `src/` e histórico do GitHub. |
| **[RNF05]** | Portabilidade | A aplicação deve rodar localmente em qualquer sistema operacional (Windows, Linux ou macOS) sem necessidade de servidores pagos ou bancos de dados externos complexos. | Execução local limpa seguindo o guia do `README.md`. |