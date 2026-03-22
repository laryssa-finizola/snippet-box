import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Função para substituir o antigo authMiddleware
function getUserFromToken(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.split(' ')[1];
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };
  } catch (err) {
    return null;
  }
}

// Rota para BUSCAR TODOS os snippets do usuário (antigo app.get('/api/snippets'))
export async function GET(request: Request) {
  try {
    const user = getUserFromToken(request);
    if (!user)
      return NextResponse.json(
        { error: 'Não autorizado. Token inválido ou ausente.' },
        { status: 401 }
      );

    const snippets = await prisma.snippet.findMany({
      where: { authorId: user.userId },
    });
    return NextResponse.json(snippets, { status: 200 });
  } catch (error) {
    console.error('ERRO AO BUSCAR SNIPPETS:', error);
    return NextResponse.json({ error: 'Erro ao buscar os snippets' }, { status: 500 });
  }
}

// Rota para CRIAR um snippet (antigo app.post('/api/snippets'))
export async function POST(request: Request) {
  try {
    const user = getUserFromToken(request);
    if (!user)
      return NextResponse.json(
        { error: 'Não autorizado. Token inválido ou ausente.' },
        { status: 401 }
      );

    const body = await request.json();
    const { title, language, description, code } = body;

    const newSnippet = await prisma.snippet.create({
      data: {
        title: title,
        language: language,
        description: description,
        code: code,
        authorId: user.userId,
      },
    });
    return NextResponse.json(newSnippet, { status: 201 });
  } catch (error) {
    console.error('ERRO AO CRIAR SNIPPET:', error);
    return NextResponse.json({ error: 'Erro ao criar o snippet' }, { status: 500 });
  }
}