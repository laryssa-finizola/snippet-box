# 🚀 Snippet-Box

![Status](https://img.shields.io/badge/status-MVP_funcional-green)

Um gerenciador de snippets de código full-stack. Este projeto foi criado como parte do meu portfólio para demonstrar habilidades em uma arquitetura **monorepo** com:

* **Backend:** Node.js, Express, Prisma (com SQLite) e TypeScript.
* **Frontend:** Next.js, React, TailwindCSS e TypeScript (com Server Actions).

---

## 🏛️ Estrutura do Projeto (Monorepo)

Este repositório contém dois projetos independentes que trabalham juntos:

* `./backend/`: A API RESTful (Node.js/Express) que gerencia os dados.
* `./frontend/`: A aplicação web (Next.js/React) que consome a API.

---

## 🛠️ Tecnologias Utilizadas

| Backend | Frontend |
| --- | --- |
| Node.js | Next.js 14 (App Router) |
| Express | React 18 |
| Prisma (ORM) | TailwindCSS |
| SQLite | TypeScript |
| TypeScript | Server Actions |

---

## STATUS ATUAL (MVP Concluído)

* **[✅] Backend:**
    * Servidor Node.js + Express + TS configurado.
    * Banco de dados SQLite configurado com Prisma.
    * Migração inicial (`User`, `Snippet`) concluída.
    * Endpoint `POST /api/snippets` (Create) funcional.
    * Endpoint `GET /api/snippets` (Read All) funcional.
    * Endpoint `GET /api/snippets/:id` (Read One) funcional.
    * Endpoint `PUT /api/snippets/:id` (Update) funcional.
    * Endpoint `DELETE /api/snippets/:id` (Delete) funcional.
* **[✅] Frontend:**
    * Projeto Next.js 14 inicializado com App Router.
    * Conectado à API (GET, POST, PUT, DELETE).
    * Página principal (`/`) com formulário de criação e lista de snippets.
    * Página de edição (`/snippets/[id]/edit`) com formulário pré-preenchido.
    * Server Actions para `create`, `delete` e `update` sem `fetch` no lado do cliente.

---

## 🚀 Como Rodar Localmente

Para rodar este projeto, você precisará de **dois terminais** abertos simultaneamente.

### 1. Backend (Terminal 1)

1.  **Navegue até a pasta do backend:**
    ```bash
    cd snippet-box/backend
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Crie o arquivo `.env`**
    Crie um arquivo `.env` na raiz da pasta `backend` e adicione a seguinte linha:
    ```env
    DATABASE_URL="file:./dev.db"
    ```
4.  **Rode as migrações do Prisma:**
    (Este comando cria o banco `dev.db` com as tabelas `User` e `Snippet`)
    ```bash
    npx prisma migrate dev
    ```
5.  **Rode o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    O servidor do backend estará rodando em `http://localhost:8080`.

### 2. Frontend (Terminal 2)

1.  **Navegue até a pasta do frontend:**
    ```bash
    cd snippet-box/frontend
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Rode o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    A aplicação web estará rodando em `http://localhost:3000`.

---

## 📋 API Endpoints (CRUD Completo)

Abaixo estão todos os endpoints da API implementados.

**URL Base:** `http://localhost:8080`

### 1. Criar um Snippet
Cria um novo snippet de código.

* **Método:** `POST`
* **URL:** `/api/snippets`
* **Body (JSON):**
    ```json
    {
      "title": "Meu Snippet",
      "language": "javascript",
      "description": "Uma descrição",
      "code": "console.log('Olá');"
    }
    ```
* **Nota:** Atualmente, o `authorId` está "hardcoded" (fixo) como `1` para fins de teste.

### 2. Listar todos os Snippets
Busca todos os snippets salvos no banco de dados.

* **Método:** `GET`
* **URL:** `/api/snippets`
* **Nota:** Atualmente, este endpoint busca snippets de *todos* os usuários.

### 3. Buscar um Snippet
Busca um snippet específico pelo seu ID.

* **Método:** `GET`
* **URL:** `/api/snippets/:id` (ex: `/api/snippets/1`)
* **Resposta de Sucesso (200 - OK):**
    ```json
    {
      "id": 1,
      "title": "Meu Snippet",
      "language": "javascript",
      "description": "Uma descrição",
      "code": "console.log('Olá');",
      "authorId": 1
    }
    ```

### 4. Atualizar um Snippet
Atualiza um snippet específico pelo seu ID.

* **Método:** `PUT`
* **URL:** `/api/snippets/:id` (ex: `/api/snippets/1`)
* **Body (JSON):**
    ```json
    {
      "title": "Novo Título",
      "language": "typescript",
      "description": "Nova descrição",
      "code": "console.log('Novo');"
    }
    ```
* **Resposta de Sucesso (200 - OK):**
    (Retorna o snippet atualizado)

### 5. Deletar um Snippet
Deleta um snippet específico pelo seu ID.

* **Método:** `DELETE`
* **URL:** `/api/snippets/:id` (ex: `/api/snippets/1`)
* **Resposta de Sucesso (204 - No Content):**
    (Nenhum conteúdo é retornado)

---

## 🎯 Próximos Passos (Roadmap)

O MVP (CRUD) está completo. Os próximos passos são:

--
