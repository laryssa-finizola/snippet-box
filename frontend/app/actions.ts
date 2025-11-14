// frontend/app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// --- AÇÃO DE CRIAR SNIPPET ---
export async function createSnippet(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const language = formData.get('language') as string;
    const description = formData.get('description') as string;
    const code = formData.get('code') as string;

    const res = await fetch('http://localhost:8080/api/snippets', { // <-- Porta 8080
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        language,
        description,
        code,
        authorId: 1, // TODO: Mudar com login
      }),
    });

    if (!res.ok) {
      throw new Error('Falha ao criar snippet');
    }

    revalidatePath('/');
  } catch (error) {
    console.error(error);
  }
}


// --- NOVA AÇÃO: DELETAR SNIPPET ---
export async function deleteSnippet(id: number) {
  try {
    // 1. Envia a requisição DELETE para a sua API
    const res = await fetch(`http://localhost:8080/api/snippets/${id}`, { // <-- Porta 8080
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error('Falha ao deletar snippet');
    }

    // 2. Força a atualização da lista na página inicial
    revalidatePath('/');
    
  } catch (error) {
    console.error(error);
  }
}


// --- NOVA AÇÃO: ATUALIZAR SNIPPET ---
export async function updateSnippet(id: number, formData: FormData) {
  try {
    // pega os dados do formulário
    const title = formData.get('title') as string;
    const language = formData.get('language') as string;
    const description = formData.get('description') as string;
    const code = formData.get('code') as string;

    // envia os dados para a API (PUT)
    const res = await fetch(`http://localhost:8080/api/snippets/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        language,
        description,
        code,
      }),
    });

    if (!res.ok) {
      throw new Error('Falha ao atualizar snippet');
    }

    // 3. Limpa o cache da home
    revalidatePath('/');
    
  } catch (error) {
    console.error(error);
  }

  //Redireciona o usuário de volta para a Home
  redirect('/');
}