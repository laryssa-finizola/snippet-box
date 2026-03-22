# 🚀 Snippet-Box

![Status](https://img.shields.io/badge/status-MVP_funcional-green)

Um gerenciador de snippets de código full-stack. Este projeto foi criado como parte do meu portfólio para demonstrar habilidades de desenvolvimento utilizando o ecossistema unificado do Next.js com as seguintes tecnologias:

* **Framework:** Next.js (App Router & API Routes)
* **Frontend:** React, TailwindCSS e TypeScript
* **Banco de Dados:** Prisma (ORM) com SQLite

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição |
| --- | --- |
| **Next.js 14+** | Framework React full-stack |
| **React 18+** | Biblioteca de UI |
| **Prisma** | ORM para comunicação com o banco de dados |
| **SQLite** | Banco de dados relacional leve |
| **TailwindCSS** | Estilização utilitária |
| **TypeScript** | Tipagem estática |

---

## 🚀 Como Rodar Localmente

Como o projeto agora é unificado, você precisará de apenas **um terminal** para rodar toda a aplicação.

1.  **Clone o repositório e acesse a pasta do projeto:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd snippet-box
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto e adicione a seguinte linha para o banco de dados:
    ```env
    DATABASE_URL="file:./prisma/dev.db"
    ```

4.  **Rode as migrações do Prisma:**
    (Este comando cria o banco de dados e as tabelas `User` e `Snippet`)
    ```bash
    npx prisma migrate dev
    ```

5.  **Rode o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    A aplicação web e a API estarão rodando simultaneamente em `http://localhost:3000`.

---

## 📋 API Endpoints (CRUD Completo)

Abaixo estão todos os endpoints da API implementados nativamente no Next.js.

**URL Base:** `http://localhost:3000`

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
* **Nota:** Atualmente, o `authorId` está fixo como `1` para fins de teste.

### 2. Listar todos os Snippets
Busca todos os snippets salvos no banco de dados.

* **Método:** `GET`
* **URL:** `/api/snippets`

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

### 5. Deletar um Snippet
Deleta um snippet específico pelo seu ID.

* **Método:** `DELETE`
* **URL:** `/api/snippets/:id` (ex: `/api/snippets/1`)
