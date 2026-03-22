import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

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

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = getUserFromToken(request);
    if (!user)
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    const snippet = await prisma.snippet.findFirst({
      where: { id: id, authorId: user.userId },
    });

    if (!snippet)
      return NextResponse.json({ error: 'Snippet não encontrado' }, { status: 404 });

    return NextResponse.json(snippet, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar o snippet' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = getUserFromToken(request);
    if (!user)
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    const body = await request.json();
    const { title, language, description, code } = body;

    const result = await prisma.snippet.updateMany({
      where: { id: id, authorId: user.userId },
      data: { title, language, description, code },
    });

    if (result.count === 0)
      return NextResponse.json({ error: 'Snippet não encontrado' }, { status: 404 });

    const updatedSnippet = await prisma.snippet.findUnique({ where: { id: id } });
    return NextResponse.json(updatedSnippet, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar o snippet' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = getUserFromToken(request);
    if (!user)
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    const result = await prisma.snippet.deleteMany({
      where: { id: id, authorId: user.userId },
    });

    if (result.count === 0)
      return NextResponse.json({ error: 'Snippet não encontrado' }, { status: 404 });

    return NextResponse.json({ message: 'Apagado com sucesso' }, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao apagar' }, { status: 500 });
  }
}