# Project Charter (Termo de Abertura do Projeto)

**Nome do Projeto:** FloraCare — Gerenciador de Cuidados e Rega de Plantas  
**Versão do Documento:** 1.1  
**Status:** Aprovado para Desenvolvimento  
**Repositório:** https://github.com/rbbarros/flora-care  
**Backlog:** https://github.com/rbbarros/flora-care/issues

---

## 1. Visão Geral do Produto
O **FloraCare** é uma aplicação leve e intuitiva voltada para o gerenciamento de plantas domésticas ("pais de plantas" e entusiastas de jardinagem urbana). O sistema permite cadastrar as plantas da casa, definir a frequência ideal de rega (em dias) e o tipo de iluminação (Sol Pleno, Meia-Sombra ou Sombra), calculando automaticamente a data da próxima rega e destacando quais plantas precisam de água no dia atual.

## 2. Justificativa
Um dos maiores problemas enfrentados por quem cultiva plantas em apartamentos ou residências é o esquecimento das regas ou o excesso de água por falta de controle das datas, levando à morte das plantas. Planilhas comuns são pouco práticas para o dia a dia, enquanto aplicativos comerciais costumam exigir assinaturas caras. 

O **FloraCare** resolve essa dor oferecendo um painel direto onde, com apenas um clique no botão "Regar", o sistema atualiza o histórico e agenda automaticamente a próxima rega. Na perspectiva acadêmica, o projeto permite aplicar um fluxo completo de Engenharia de Software (SDLC), rastreabilidade de requisitos e versionamento profissional no GitHub.

## 3. Objetivos SMART
* **Específico (Specific):** Desenvolver um MVP capaz de gerenciar o ciclo de vida dos dados (CRUD) de plantas domésticas, registrar eventos de rega e calcular automaticamente o status hídrico ("Hidratada" vs. "Precisa de Rega").
* **Mensurável (Measurable):** Implementar 100% dos 8 Requisitos Funcionais (RFs) e 7 Requisitos Não Funcionais (RNFs) especificados, com 46 testes automatizados, pipeline de CI verde e rastreabilidade nas 15 Issues do GitHub.
* **Atingível (Achievable):** Adotar arquitetura enxuta com persistência de dados local (`LocalStorage`, arquivo `JSON` ou `SQLite`), viabilizando a entrega completa por um único desenvolvedor.
* **Relevante (Relevant):** Exercitar boas práticas de especificação formal, Git Flow, Commits Atômicos (Conventional Commits) e Versionamento Semântico (SemVer).
* **Temporal (Time-bound):** Concluir toda a documentação, implementação, testes e publicação da release `v1.0.0` dentro do prazo de 1 semana, mantendo a evolução da Week_02 na branch `feat/adjust-report`.

## 4. Escopo Preliminar

### ✅ Dentro do Escopo (In-Scope para esta semana)
* Cadastro de plantas com Nome/Apelido, Espécie, Ambiente de Luz e Intervalo de Rega (em dias).
* Listagem de todas as plantas cadastradas com indicador visual de status hídrico.
* Cálculo automático da data da próxima rega baseado na última rega + intervalo em dias.
* Registro rápido de rega ("Regar Agora") atualizando a data da última rega para a data atual.
* Edição dos dados e parâmetros de cuidado de uma planta existente.
* Exclusão de plantas do catálogo pessoal.
* Filtro de plantas por status ("Todas", "Precisam de Rega Hoje") e por ambiente de luz.
* Persistência de dados local.
* Exportação e importação do jardim em JSON versionado, com validação do arquivo.
* Testes automatizados de domínio, build reproduzível e pipeline de CI.

### ❌ Fora do Escopo (Out-of-Scope para esta semana)
* Identificação automática de espécies de plantas por foto/Inteligência Artificial.
* Integração com sensores físicos de umidade do solo (IoT / Arduino / ESP32).
* Alertas por notificações *push* no celular ou envio de e-mails.
* Autenticação multiusuário em nuvem e rede social de jardinagem.
* Controle avançado de adubação química, poda e controle de pragas.

## 5. Stakeholders e Público-Alvo

### Stakeholders
| Stakeholder | Papel | Interesse / Responsabilidade |
| :--- | :--- | :--- |
| **Estudante / Desenvolvedor** | Product Owner & Engenheiro de Software | Especificar requisitos, estruturar o backlog, desenvolver o código e manter o Git Flow. |
| **Professor Avaliador** | Sponsor / Avaliador Técnico | Avaliar a rastreabilidade documental, organização das Issues e qualidade do fluxo Git. |

### Público-Alvo
* Moradores de apartamentos, estudantes e entusiastas de jardinagem doméstica (*Urban Jungle*) que possuem entre 3 e 50 plantas em casa e desejam uma ferramenta simples e rápida para não esquecer o dia correto de regar cada espécie.

## 6. Critérios de Sucesso

* 100% dos RF01–RF08 e RNF01–RNF07 implementados ou verificados.
* Matriz de rastreabilidade completa ligando requisito, caso de uso, história, issue, código e teste.
* `npm run check` (lint + build + testes) verde localmente e no GitHub Actions.
* Nenhum segredo versionado; `gitleaks` e `npm audit` verdes no CI.
* README, arquitetura, requisitos, casos de uso, histórias, changelog e guia de contribuição sincronizados.
* Issues #1–#13 evidenciadas por código/testes; #14 e #15 já concluídas no histórico.