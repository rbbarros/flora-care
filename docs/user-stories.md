# Histórias de Usuário (User Stories)

Este documento descreve as Histórias de Usuário do projeto **FloraCare** utilizando o template ágil canônico e Critérios de Aceite baseados em **BDD (Behavior-Driven Development / Gherkin)**.

---

## [US01] Cadastro de Planta no Jardim Virtual
**Requisito Relacionado:** `[RF01]`

> **Como** um cuidador de plantas domésticas,  
> **Quero** cadastrar minhas plantas informando nome, espécie, ambiente de luz e frequência de rega em dias,  
> **Para que** eu tenha um catálogo centralizado com as necessidades específicas de cada planta da minha casa.

### Critérios de Aceite (BDD):

* **Cenário 1: Cadastro de planta válido**
  * **Dado** que estou no formulário de cadastro de plantas,
  * **Quando** preencho o nome "Espada-de-São-Jorge", espécie "Sansevieria", ambiente "Meia-Sombra" e intervalo de rega de `10` dias e clico em salvar,
  * **Então** a planta deve ser salva no armazenamento local e exibida na lista com próxima rega agendada para daqui a `10` dias.

* **Cenário 2: Bloqueio de cadastro com intervalo de rega inválido**
  * **Dado** que estou preenchendo o cadastro de uma nova planta,
  * **Quando** informo um intervalo de rega igual a `0` ou número negativo e tento salvar,
  * **Então** o sistema deve impedir o cadastro e exibir a mensagem *"O intervalo de rega deve ser de pelo menos 1 dia"*.

---

## [US02] Registro Rápido de Rega e Cálculo da Próxima Data
**Requisitos Relacionados:** `[RF05]`, `[RF06]`

> **Como** um usuário cuidando das minhas plantas no dia a dia,  
> **Quero** marcar com um clique que reguei uma planta hoje,  
> **Para que** o sistema calcule automaticamente a data da próxima rega e atualize o status dela para "Hidratada".

### Critérios de Aceite (BDD):

* **Cenário 1: Regar uma planta que estava com sede**
  * **Dado** que a planta "Manjericão" possui intervalo de rega de `2` dias e está com o status `Precisa de Rega` na data de hoje,
  * **Quando** clico no botão "Regar" desta planta,
  * **Então** a data da última rega deve ser atualizada para `Hoje`, a próxima rega deve ser definida para `Hoje + 2 dias` e o status deve mudar imediatamente para `Hidratada`.

---

## [US03] Monitoramento e Filtragem de Plantas com Sede
**Requisitos Relacionados:** `[RF02]`, `[RF07]`

> **Como** um usuário com diversas plantas em diferentes cômodos,  
> **Quero** filtrar a listagem para ver apenas as plantas com status "Precisa de Rega" ou por tipo de ambiente,  
> **Para que** eu saiba exatamente quais plantas regar hoje sem perder tempo procurando.

### Critérios de Aceite (BDD):

* **Cenário 1: Filtrar plantas que precisam de água hoje**
  * **Dado** que possuo 4 plantas cadastradas, sendo 2 com status `Hidratada` e 2 com status `Precisa de Rega`,
  * **Quando** seleciono o filtro "Precisam de Rega",
  * **Então** o painel deve exibir exclusivamente as 2 plantas com status `Precisa de Rega`.

* **Cenário 2: Filtrar plantas por ambiente de iluminação**
  * **Dado** que possuo plantas de `Sol Pleno` e `Sombra`,
  * **Quando** seleciono o filtro de ambiente `Sol Pleno`,
  * **Então** apenas as plantas configuradas como `Sol Pleno` devem ser listadas na tela.

---

## [US04] Edição de Parâmetros de Cuidado da Planta
**Requisito Relacionado:** `[RF03]`

> **Como** um cuidador atento às mudanças de estação do ano,  
> **Quero** editar o intervalo de dias de rega ou o ambiente de uma planta já cadastrada,  
> **Para que** o cronograma de regas se adapte ao clima sem que eu precise recadastrar a planta do zero.

### Critérios de Aceite (BDD):

* **Cenário 1: Alteração do intervalo de dias de rega**
  * **Dado** que a planta "Suculenta" possui intervalo de rega de `7` dias e foi regada hoje,
  * **Quando** edito a planta alterando seu intervalo de rega para `14` dias e salvo,
  * **Então** o sistema deve atualizar o registro e recalcular a próxima rega para `Hoje + 14 dias`.

---

## [US05] Exclusão de Planta do Catálogo
**Requisito Relacionado:** `[RF04]`

> **Como** um usuário organizando meu jardim virtual,  
> **Quero** excluir do sistema uma planta que doei ou que não possuo mais,  
> **Para que** eu não receba mais alertas de rega desnecessários.

### Critérios de Aceite (BDD):

* **Cenário 1: Exclusão confirmada pelo usuário**
  * **Dado** que a planta "Violeta" está listada no meu painel,
  * **Quando** clico no botão "Excluir" e confirmo a operação no diálogo de segurança,
  * **Então** a planta "Violeta" deve desaparecer da listagem e ser removida do armazenamento local.