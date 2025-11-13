import express from 'express';
import { PrismaClient } from '@prisma/client';

// inicio das ferramentas 
const app = express();            // inicio do servidor Express
const prisma = new PrismaClient();  // inicio do cliente do Prisma

// express entende o JSON 
app.use(express.json());

// --- primeiro endpoint: create ---
app.post('/api/snippets', async (req, res) => {
  try {
    // recebe os dados do snippet do corpo da requisição
    const { title, language, description, code } = req.body;

    // prisma cria um novo snippet no banco de dados
    // authorId = 1 para teste
    const newSnippet = await prisma.snippet.create({
      data: {
        title: title,
        language: language,
        description: description,
        code: code,
        authorId: 1, // TODO: Mudar isso quando tiver login real
      },
    });

    // Devolve o snippet que acabou de ser criado como resposta
    res.status(201).json(newSnippet);

  } catch (error) {
    // Se algo der errado (ex: um campo obrigatório faltou)
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o snippet' });
  }
});
  // --- SEGUNDO ENDPOINT (read) ---
// Quando o front-end enviar um GET para 'http://localhost:8080/api/snippets'
app.get('/api/snippets', async (req, res) => {
  try {
    // o prisma busca TODOS os snippets
    // Por enquanto, de TODOS os usuários
    const snippets = await prisma.snippet.findMany({
      // TODO: Filtrar pelo authorId do usuário logado
      // where: { authorId: 1 } 
    });

    // 2. Devolve a lista de snippets como resposta
    res.status(200).json(snippets);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar os snippets' });
  }
});


// "Liga" o servidor
const PORT = 8080; // A porta que o backend vai usar
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend rodando na porta ${PORT}`);
});