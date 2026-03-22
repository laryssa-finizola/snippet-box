import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password, name } = body;
        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return NextResponse.json(
                { error: 'Este e-mail já está em uso.' },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                name: name,
            },
        });

        return NextResponse.json(
            { message: 'Utilizador criado com sucesso!' },
            { status: 201 }
        );
    } catch (error) {
        console.error('ERRO NO REGISTO:', error);
        return NextResponse.json(
            { error: 'Erro ao registar user' },
            { status: 500 }
        );
    }
}