'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

// --- helper func para pegar o Token ---
async function getAuthToken() {
  const token = (await cookies()).get('session_token')?.value;
  return token ? `Bearer ${token}` : null;
}

// ===========================================
//  AÇÕES DE AUTENTICAÇÃO
// ===========================================

// --- AÇÃO DE LOGIN ---
export async function loginUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  try {
    const res = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Falha no login');
    }
    (await cookies()).set('session_token', data.token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 60 * 60 * 24 * 7, 
      path: '/', 
    });
  } catch (error) {
    console.error(error);
  }
  redirect('/');
}

// --- AÇÃO DE REGISTO  ---
export async function registerUser(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  try {
    const res = await fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json(); 
    if (!res.ok) {
      return { success: false, error: data.error || 'Falha ao registar' };
    }
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Não foi possível ligar ao servidor. Tente mais tarde.' };
  }
}

// --- AÇÃO DE LOGOUT  ---
export async function logoutUser() {
  (await cookies()).delete('session_token');
  redirect('/login');
}


// ===========================================
//  AÇÕES DE SNIPPETS 
// ===========================================

// --- AÇÃO DE CRIAR SNIPPET  ---
export async function createSnippet(formData: FormData) {
  const token = await getAuthToken();
  if (!token) return redirect('/login'); 

  try {
    const title = formData.get('title') as string;
    const language = formData.get('language') as string;
    const description = formData.get('description') as string;
    const code = formData.get('code') as string;

    const res = await fetch('http://localhost:8080/api/snippets', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token, 
      },
      body: JSON.stringify({
        title,
        language,
        description,
        code,
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

// --- AÇÃO DE DELETAR SNIPPET ---
export async function deleteSnippet(id: number) {
  const token = await getAuthToken(); 
  if (!token) return redirect('/login');

  try {
    const res = await fetch(`http://localhost:8080/api/snippets/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': token, 
      },
    });

    if (!res.ok) {
      throw new Error('Falha ao deletar snippet');
    }

    revalidatePath('/');
    
  } catch (error) {
    console.error(error);
  }
}

// --- AÇÃO DE ATUALIZAR SNIPPET ---
export async function updateSnippet(id: number, formData: FormData) {
  const token = await getAuthToken(); 
  if (!token) return redirect('/login');
  
  try {
    const title = formData.get('title') as string;
    const language = formData.get('language') as string;
    const description = formData.get('description') as string;
    const code = formData.get('code') as string;

    const res = await fetch(`http://localhost:8080/api/snippets/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
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

    revalidatePath('/');
    
  } catch (error) {
    console.error(error);
  }

  redirect('/');
}