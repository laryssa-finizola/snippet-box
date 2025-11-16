import 'dotenv/config';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// Corrigido para .js (o erro de maiúsculas/minúsculas que você encontrou!)
import { authMiddleware } from './authMiddleware.js'; 

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('O segredo JWT_SECRET não está definido no .env!');
}


// ===========================================
//  ROTAS DE AUTENTICAÇÃO
// ===========================================

app.post('/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body; 

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Este e-mail já está em uso.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name, 
      },
    });

    res.status(201).json({ message: 'Utilizador criado com sucesso!' });
  } catch (error) {
    console.error("ERRO NO REGISTO:", error); 
    res.status(500).json({ error: 'Erro ao registar user' });
  }
});


app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Email ou password inválidos' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Email ou password inválidos' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET!,
      { expiresIn: '7d' } 
    );

    res.status(200).json({
      message: 'Login bem-sucedido!',
      token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name, 
      },
    });

  } catch (error) {
    console.error("ERRO NO LOGIN:", error); 
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

// ===========================================
//  ROTAS DE SNIPPETS (AGORA PROTEGIDAS)
// ===========================================


app.post('/api/snippets', authMiddleware, async (req, res) => {
  try {
    const userId = req.user!.userId; 
    const { title, language, description, code } = req.body;
    const newSnippet = await prisma.snippet.create({
      data: {
        title: title,
        language: language,
        description: description,
        code: code,
        authorId: userId,
      },
    });
    res.status(201).json(newSnippet);
  } catch (error) {
    console.error("ERRO AO CRIAR SNIPPET:", error);
    res.status(500).json({ error: 'Erro ao criar o snippet' });
  }
});

app.get('/api/snippets', authMiddleware, async (req, res) => {
  try {
    const userId = req.user!.userId;
    const snippets = await prisma.snippet.findMany({
      where: { authorId: userId },
    });
    res.status(200).json(snippets);
  } catch (error) {
    console.error("ERRO AO BUSCAR SNIPPETS:", error);
    res.status(500).json({ error: 'Erro ao buscar os snippets' });
  }
});

app.get('/api/snippets/:id', authMiddleware, async (req, res) => {
  try {
    const userId = req.user!.userId;
    const id = parseInt(req.params.id);
    const snippet = await prisma.snippet.findFirst({
      where: { 
        id: id,
        authorId: userId 
      },
    });
    if (!snippet) {
      return res.status(404).json({ error: 'Snippet não encontrado' });
    }
    res.status(200).json(snippet);
  } catch (error) {
    console.error("ERRO AO BUSCAR SNIPPET ÚNICO:", error);
    res.status(500).json({ error: 'Erro ao buscar o snippet' });
  }
});

app.put('/api/snippets/:id', authMiddleware, async (req, res) => {
  try {
    const userId = req.user!.userId;
    const id = parseInt(req.params.id);
    const { title, language, description, code } = req.body;

    const result = await prisma.snippet.updateMany({
      where: {
        id: id,
        authorId: userId,
      },
      data: {
        title: title,
        language: language,
        description: description,
        code: code,
      },
    });

    if (result.count === 0) {
      return res.status(404).json({ error: 'Snippet não encontrado ou não tem permissão para editar.' });
    }
    const updatedSnippet = await prisma.snippet.findUnique({ where: { id: id }});
    res.status(200).json(updatedSnippet);

  } catch (error) {
    console.error("ERRO AO ATUALIZAR SNIPPET:", error);
    res.status(500).json({ error: 'Erro ao atualizar o snippet' });
  }
});


app.delete('/api/snippets/:id', authMiddleware, async (req, res) => {
  try {
    const userId = req.user!.userId;
    const id = parseInt(req.params.id);

    const result = await prisma.snippet.deleteMany({
      where: {
        id: id,
        authorId: userId,
      },
    });

    if (result.count === 0) {
      return res.status(404).json({ error: 'Snippet não encontrado ou não tem permissão para apagar.' });
    }
    res.status(204).send();
  } catch (error) {
    console.error("ERRO AO DELETAR SNIPPET:", error);
    res.status(500).json({ error: 'Erro ao deletar o snippet' });
  }
});


// Iniciar o servidor
const PORT = 8080; 
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend rodando na porta ${PORT}`);
});