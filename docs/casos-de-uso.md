# Especificação de Casos de Uso

Este documento especifica os fluxos de interação entre o ator e o sistema **FloraCare** para as operações essenciais de gerenciamento e cuidado de plantas.

---

## 1. Descrição dos Atores

* **Cuidador de Plantas (Usuário):** Pessoa que utiliza o sistema para organizar seu jardim doméstico, consultar quais plantas estão com sede e registrar as regas realizadas.

---

## 2. Detalhamento dos Casos de Uso

### [UC01] Cadastrar Nova Planta
* **Ator Principal:** Cuidador de Plantas
* **Requisitos Relacionados:** `[RF01]`, `[RF06]`, `[RNF01]`
* **Pré-condições:** O sistema deve estar aberto na tela principal.
* **Pós-condições:** A nova planta é persistida localmente e sua primeira data de próxima rega é calculada.

#### Fluxo Principal (Caminho Feliz):
1. O Usuário aciona a opção "Adicionar Planta".
2. O Sistema exibe o formulário com os campos: Nome/Apelido, Espécie, Ambiente de Luz e Intervalo de Rega (em dias).
3. O Usuário informa o nome (ex.: "Jiboia da Sala"), espécie ("Epipremnum aureum"), seleciona o ambiente ("Meia-Sombra") e define o intervalo de rega para `4` dias.
4. O Usuário confirma clicando em "Salvar Planta".
5. O Sistema valida os dados, registra a data atual como base inicial, calcula a próxima rega para `Hoje + 4 dias` (status `Hidratada`) e salva no armazenamento local.
6. O Sistema atualiza a listagem exibindo a nova planta.

#### Fluxo Alternativo (A1 - Cadastro de Planta que Precisa de Rega Imediata):
* **No passo 3:** O Usuário marca a opção indicando que a planta ainda não foi regada hoje.
* **No passo 5:** O Sistema define a próxima rega para a data de `Hoje` e já cria a planta com o status `Precisa de Rega`.

#### Fluxo de Exceção (E1 - Dados Inválidos ou Intervalo Zero/Negativo):
* **No passo 5:** O Sistema detecta que o Nome tem menos de 2 caracteres ou que o Intervalo de Rega é menor ou igual a `0`.
* O Sistema interrompe a gravação e exibe a mensagem de erro: *"Informe um nome válido (mín. 2 letras) e um intervalo de rega de pelo menos 1 dia"*. O fluxo retorna ao passo 3.

---

### [UC02] Registrar Rega da Planta
* **Ator Principal:** Cuidador de Plantas
* **Requisitos Relacionados:** `[RF02]`, `[RF05]`, `[RF06]`, `[RNF01]`, `[RNF03]`
* **Pré-condições:** A planta deve estar previamente cadastrada e listada no painel.
* **Pós-condições:** A data da última rega passa a ser a data atual, a próxima rega é recalculada para o futuro e o status muda para `Hidratada`.

#### Fluxo Principal (Realizar Rega):
1. O Usuário visualiza no painel uma planta com status `Precisa de Rega` (ex.: "Samambaia", intervalo de `2` dias).
2. O Usuário clica no botão "💧 Regar" daquela planta.
3. O Sistema atualiza o atributo `Última Rega` da planta para a data de hoje.
4. O Sistema recalcula o atributo `Próxima Rega` somando `2` dias à data de hoje.
5. O Sistema altera o status da planta para `Hidratada`, persiste a atualização localmente e atualiza o indicador visual na tela.

#### Fluxo Alternativo (A1 - Rega Antecipada de Planta já Hidratada):
* **No passo 2:** O Usuário decide regar uma planta cujo status ainda consta como `Hidratada`.
* O Sistema permite a ação, redefine a `Última Rega` para hoje e reinicia a contagem do ciclo de dias a partir da data atual.

#### Fluxo de Exceção (E1 - Erro de Gravação Local):
* **No passo 5:** Caso ocorra uma falha de escrita no armazenamento local, o Sistema desfaz a mudança em tela e exibe um alerta informando a falha ao salvar o registro da rega.

---

### [UC03] Editar ou Excluir Planta
* **Ator Principal:** Cuidador de Plantas
* **Requisitos Relacionados:** `[RF03]`, `[RF04]`, `[RF06]`, `[RNF01]`
* **Pré-condições:** A planta deve existir no catálogo do sistema.
* **Pós-condições:** Os parâmetros de cuidado da planta são atualizados ou ela é removida do catálogo.

#### Fluxo Principal (Ajustar Intervalo de Rega no Inverno/Verão):
1. O Usuário seleciona a opção "Editar" no card de uma planta (ex.: "Costela-de-Adão").
2. O Sistema exibe o formulário preenchido com os dados atuais da planta.
3. O Usuário altera o Intervalo de Rega de `7` para `5` dias devido ao clima mais quente e clica em "Salvar Alterações".
4. O Sistema valida os dados, recalcula a data da próxima rega com base no novo intervalo de `5` dias, salva no armazenamento e atualiza a tela.

#### Fluxo Alternativo (A1 - Exclusão de Planta):
* **No passo 1:** O Usuário aciona o botão "Excluir" da planta.
* O Sistema exibe um modal/alerta de confirmação: *"Deseja realmente remover esta planta do seu jardim?"*.
* O Usuário confirma a operação e o Sistema apaga o registro permanentemente.

#### Fluxo de Exceção (E1 - Edição Inválida):
* **No passo 4:** Se o usuário inserir um intervalo inválido (`<= 0`) ou apagar o nome da planta, o Sistema bloqueia a alteração e exibe o aviso de validação correspondente.