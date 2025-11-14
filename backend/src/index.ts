// backend/src/index.ts

import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// --- Endpoint de CRIAR (CREATE) ---
app.post('/api/snippets', async (req, res) => {
  // ... (seu código de create - sem mudança)
  try {
    const { title, language, description, code } = req.body;
    const newSnippet = await prisma.snippet.create({
      data: {
        title: title,
        language: language,
        description: description,
        code: code,
        authorId: 1, // TODO: Mudar quando tiver login
      },
    });
    res.status(201).json(newSnippet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o snippet' });
  }
});

// --- Endpoint de LER (READ ALL) ---
app.get('/api/snippets', async (req, res) => {
  try {
    const snippets = await prisma.snippet.findMany({
      // TODO: Filtrar pelo authorId
    });
    res.status(200).json(snippets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar os snippets' });
  }
});

// --- NOVO ENDPOINT: LER UM (READ ONE) ---
app.get('/api/snippets/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const snippet = await prisma.snippet.findUnique({
      where: { id: id },
    });

    if (!snippet) {
      return res.status(404).json({ error: 'Snippet não encontrado' });
    }

    res.status(200).json(snippet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar o snippet' });
  }
});

// --- NOVO ENDPOINT: ATUALIZAR (UPDATE) ---
app.put('/api/snippets/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, language, description, code } = req.body;

    const updatedSnippet = await prisma.snippet.update({
      where: {
        id: id,
        // TODO: Checar o authorId
      },
      data: {
        title: title,
        language: language,
        description: description,
        code: code,
      },
    });

    res.status(200).json(updatedSnippet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o snippet' });
  }
});


// --- Endpoint de DELETAR (DELETE) ---
app.delete('/api/snippets/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.snippet.delete({
      where: {
        id: id,
        // TODO: Checar o authorId
      },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar o snippet' });
  }
});


// "Liga" o servidor
const PORT = 8080; 
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend rodando na porta ${PORT}`);
});