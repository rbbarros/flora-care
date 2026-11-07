# Política de Segurança — FloraCare

## Versões suportadas

| Versão | Suporte |
| :--- | :--- |
| 1.x | Sim |

## Como reportar uma vulnerabilidade

Este é um projeto acadêmico público. Para reportar uma vulnerabilidade, use o recurso **Private vulnerability reporting** do GitHub em:

https://github.com/rbbarros/flora-care/security/advisories/new

Inclua:

- Descrição do problema e impacto.
- Passos para reproduzir.
- Versão/navegador afetado.
- Sugestão de correção, se houver.

Evite abrir uma issue pública com detalhes exploráveis antes da correção.

## Práticas adotadas

- Nenhum segredo, token ou credencial é necessário para executar o projeto.
- O CI executa `gitleaks` para detectar segredos no histórico.
- O CI executa `npm audit --audit-level=high`.
- O Dependabot atualiza dependências npm e GitHub Actions semanalmente.
- A importação de JSON é validada por schema, versão e formato de cada planta antes de gravar.
- A interface escapa HTML dos dados da planta antes de renderizar (`escapeHTML`).
- Dados ficam apenas no `LocalStorage` do navegador; não há telemetria nem envio para servidores.

## Escopo

Este projeto não possui backend, autenticação ou banco de dados remoto. As principais superfícies de risco são:

1. Conteúdo malicioso em arquivo JSON importado.
2. XSS por dados de planta inseridos no DOM.
3. Dependências de desenvolvimento comprometidas (GitHub Actions).
4. Exposição acidental de segredos em commits.
