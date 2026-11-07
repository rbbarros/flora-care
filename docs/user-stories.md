# Histórias de Usuário (User Stories) — FloraCare

Este documento descreve as Histórias de Usuário do projeto **FloraCare** utilizando o template ágil canônico e Critérios de Aceite baseados em **BDD (Behavior-Driven Development / Gherkin)**.

Cada história aponta para o requisito correspondente em [requisitos.md](./requisitos.md) e para os testes automatizados em `test/`.

---

## [US01] Cadastro de Planta no Jardim Virtual
**Requisito Relacionado:** `[RF01]`

> **Como** um cuidador de plantas domésticas,  
> **Quero** cadastrar minhas plantas informando nome, espécie, ambiente de luz e frequência de rega em dias,  
> **Para que** eu tenha um catálogo centralizado com as necessidades específicas de cada planta da minha casa.

### Critérios de Aceite (BDD)

* **Cenário 1: Cadastro de planta válido**
  * **Dado** que estou no formulário de cadastro de plantas,
  * **Quando** preencho o nome "Espada-de-São-Jorge", espécie "Sansevieria", ambiente "Meia-Sombra" e intervalo de rega de `10` dias e clico em salvar,
  * **Então** a planta deve ser salva no armazenamento local e exibida na lista com próxima rega agendada para daqui a `10` dias.

* **Cenário 2: Bloqueio de cadastro com intervalo de rega inválido**
  * **Dado** que estou preenchendo o cadastro de uma nova planta,
  * **Quando** informo um intervalo de rega igual a `0` ou número negativo e tento salvar,
  * **Então** o sistema deve impedir o cadastro e exibir a mensagem *"O intervalo de rega deve ser um número inteiro de pelo menos 1 dia."*

* **Cenário 3: Bloqueio de nome muito curto**
  * **Dado** que estou preenchendo o cadastro,
  * **Quando** informo um nome com menos de `2` caracteres,
  * **Então** o sistema deve impedir o cadastro e exibir a mensagem *"Informe um nome com pelo menos 2 caracteres."*

---

## [US02] Registro Rápido de Rega
**Requisito Relacionado:** `[RF05]`

> **Como** um usuário cuidando das minhas plantas no dia a dia,  
> **Quero** marcar com um clique que reguei uma planta hoje,  
> **Para que** o histórico registre o cuidado e o sistema recalcule automaticamente a próxima rega.

### Critérios de Aceite (BDD)

* **Cenário 1: Regar uma planta que estava com sede**
  * **Dado** que a planta "Manjericão" possui intervalo de rega de `2` dias e está com o status `Precisa de Rega` na data de hoje,
  * **Quando** clico no botão "Regar agora" desta planta,
  * **Então** a data da última rega deve ser atualizada para `Hoje`, a próxima rega deve ser definida para `Hoje + 2 dias`, o status deve mudar imediatamente para `Hidratada` e o histórico deve receber a data de hoje.

* **Cenário 2: Registro repetido no mesmo dia**
  * **Dado** que a planta já teve uma rega registrada na data de hoje,
  * **Quando** clico novamente em "Regar agora",
  * **Então** a data da última rega permanece em `Hoje` e o histórico não deve duplicar a entrada do dia.

---

## [US03] Cálculo Automático da Próxima Rega e do Status Hídrico
**Requisito Relacionado:** `[RF06]`

> **Como** um cuidador que não quer esquecer o dia de regar,  
> **Quero** que o sistema calcule a próxima rega e classifique cada planta como hidratada ou sedenta,  
> **Para que** eu saiba rapidamente quem precisa de água hoje.

### Critérios de Aceite (BDD)

* **Cenário 1: Planta hidratada**
  * **Dado** que a planta foi regada em `2026-11-07` e possui intervalo de `4` dias,
  * **Quando** consulto o jardim em `2026-11-08`,
  * **Então** a próxima rega deve ser `2026-11-11` e o status deve ser `Hidratada`.

* **Cenário 2: Planta na data limite**
  * **Dado** que a próxima rega da planta é `2026-11-07`,
  * **Quando** consulto o jardim em `2026-11-07`,
  * **Então** o status deve ser `Precisa de Rega`.

* **Cenário 3: Virada de mês e ano**
  * **Dado** que a última rega foi em `2026-12-30` e o intervalo é de `3` dias,
  * **Quando** o sistema calcula a próxima rega,
  * **Então** o resultado deve ser `2027-01-02`.

---

## [US04] Edição de Parâmetros de Cuidado da Planta
**Requisito Relacionado:** `[RF03]`

> **Como** um cuidador atento às mudanças de estação do ano,  
> **Quero** editar o intervalo de dias de rega ou o ambiente de uma planta já cadastrada,  
> **Para que** o cronograma de regas se adapte ao clima sem que eu precise recadastrar a planta do zero.

### Critérios de Aceite (BDD)

* **Cenário 1: Alteração do intervalo de dias de rega**
  * **Dado** que a planta "Suculenta" possui intervalo de rega de `7` dias e foi regada hoje,
  * **Quando** edito a planta alterando seu intervalo de rega para `14` dias e salvo,
  * **Então** o sistema deve atualizar o registro e recalcular a próxima rega para `Hoje + 14 dias`, preservando o histórico.

* **Cenário 2: Edição inválida**
  * **Dado** que estou editando uma planta,
  * **Quando** informo intervalo `0` ou apago o nome e tento salvar,
  * **Então** o sistema deve bloquear a alteração e exibir a mensagem de validação correspondente.

---

## [US05] Exclusão de Planta do Catálogo
**Requisito Relacionado:** `[RF04]`

> **Como** um usuário organizando meu jardim virtual,  
> **Quero** excluir do sistema uma planta que doei ou que não possuo mais,  
> **Para que** eu não receba mais alertas de rega desnecessários.

### Critérios de Aceite (BDD)

* **Cenário 1: Exclusão confirmada pelo usuário**
  * **Dado** que a planta "Violeta" está listada no meu painel,
  * **Quando** clico no botão "Excluir" e confirmo a operação no diálogo de segurança,
  * **Então** a planta "Violeta" deve desaparecer da listagem e ser removida do armazenamento local.

* **Cenário 2: Exclusão cancelada**
  * **Dado** que acionei a exclusão de uma planta,
  * **Quando** cancelo a confirmação,
  * **Então** a planta deve permanecer no jardim sem alterações.

---

## [US06] Listagem do Catálogo de Plantas
**Requisito Relacionado:** `[RF02]`

> **Como** cuidador com várias plantas,  
> **Quero** visualizar todas as plantas cadastradas com seus dados de cuidado e status,  
> **Para que** eu tenha uma visão geral do jardim em um único lugar.

### Critérios de Aceite (BDD)

* **Cenário 1: Exibição dos dados da planta**
  * **Dado** que existe uma planta cadastrada,
  * **Quando** abro a tela principal,
  * **Então** devo ver nome, espécie, ambiente, intervalo de rega, última rega, próxima rega, quantidade de regas e status hídrico.

* **Cenário 2: Resumo do jardim**
  * **Dado** que possuo `3` plantas, sendo `2` sedentas,
  * **Quando** a tela é renderizada,
  * **Então** o resumo deve exibir `3 plantas` no total e `2 plantas` precisando de água.

* **Cenário 3: Jardim vazio**
  * **Dado** que não há plantas cadastradas,
  * **Quando** abro a tela principal,
  * **Então** devo ver uma mensagem orientando a adicionar a primeira planta.

---

## [US07] Filtragem de Plantas por Status e Ambiente
**Requisito Relacionado:** `[RF07]`

> **Como** um usuário com diversas plantas em diferentes cômodos,  
> **Quero** filtrar a listagem por status hídrico e por ambiente,  
> **Para que** eu encontre rapidamente as plantas que preciso regar hoje.

### Critérios de Aceite (BDD)

* **Cenário 1: Filtrar plantas que precisam de água hoje**
  * **Dado** que possuo `4` plantas cadastradas, sendo `2` com status `Hidratada` e `2` com status `Precisa de Rega`,
  * **Quando** seleciono o filtro "Precisam de rega",
  * **Então** o painel deve exibir exclusivamente as `2` plantas sedentas.

* **Cenário 2: Filtrar plantas por ambiente de iluminação**
  * **Dado** que possuo plantas de `Sol Pleno` e `Sombra`,
  * **Quando** seleciono o filtro de ambiente `Sol Pleno`,
  * **Então** apenas as plantas configuradas como `Sol Pleno` devem ser listadas.

* **Cenário 3: Filtros combinados sem resultados**
  * **Dado** que combino status e ambiente,
  * **Quando** nenhuma planta atende aos dois critérios,
  * **Então** devo ver a mensagem "Nenhuma planta encontrada" e uma orientação para ajustar os filtros.

---

## [US08] Exportar e Importar o Jardim em JSON
**Requisito Relacionado:** `[RF08]`

> **Como** usuário que não quer perder o jardim ao limpar o navegador ou trocar de dispositivo,  
> **Quero** exportar e importar todos os dados em um arquivo JSON,  
> **Para que** eu possa fazer backup e restaurar plantas e históricos de rega.

### Critérios de Aceite (BDD)

* **Cenário 1: Exportação do jardim**
  * **Dado** que possuo `3` plantas com históricos de rega,
  * **Quando** clico em "Exportar JSON",
  * **Então** o navegador deve baixar um arquivo versionado contendo as `3` plantas e seus históricos.

* **Cenário 2: Importação em outro navegador**
  * **Dado** que exportei um jardim com `3` plantas,
  * **Quando** importo o arquivo em outro navegador e confirmo a substituição,
  * **Então** as `3` plantas e seus históricos devem ser restaurados e exibidos.

* **Cenário 3: Arquivo inválido**
  * **Dado** que seleciono um arquivo que não é uma exportação válida do FloraCare,
  * **Quando** tento importar,
  * **Então** o sistema deve exibir uma mensagem de erro e manter o jardim atual intacto.
