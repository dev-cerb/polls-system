# Polls System

---

## Sobre o Projeto

Este projeto consiste no desenvolvimento de um sistema de enquetes em tempo real com perguntas de múltipla escolha.

---

## Requisitos

### Requisitos Funcionais

- Deve ser possível criar uma enquete.
- Deve ser possível editar uma enquete.
- Deve ser possível excluir uma enquete.
- Deve ser possível listar todas as enquetes.
- Deve ser possível listar as enquetes por status.
- Deve ser possível adicionar quantas opções quiser na enquete.
- Deve ser atualizado o número de votos sem precisar atualizar a página.

### Requisitos Não Funcionais

- Deve ser utilizado Node.js.
- Deve ser utilizado TypeScript.
- Deve ser utilizado Fastify.
- Deve ser utilizado Vitest.
- Deve ser utilizado Zod.
- Deve ser utilizado um banco PostgreSQL criado com Docker.
- Deve ser utilizado Swagger com Scalar para gerar a documentação dos endpoints.

---

## Regras de Negócio

- A enquete deve ter um título.
- A enquete deve ter uma data de início.
- A enquete deve ter uma data de término.
- A enquete pode ter os status `Não iniciado`, `Iniciado`, `Em andamento` e `Finalizado`.
- A enquete deve possuir no mínimo 3 opções.

### Regras de Status da Enquete

Os status da enquete foram definidos com base nas datas de início, término e quantidade de votos registrados.

- Não iniciado → A data atual ainda não atingiu a data de início da enquete.
- Iniciado → A enquete está disponível para votação, mas ainda não recebeu votos.
- Em andamento → A enquete está ativa e já possui votos registrados.
- Finalizado → A data atual ultrapassou a data de término da enquete.

---
