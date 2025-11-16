import { updateSnippet } from '../../../actions';
import { PackageIcon } from '../../../PackageIcon';
import Link from 'next/link';
import { use } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// --- TYPE (Definição do Snippet) ---
type Snippet = {
  id: number;
  title: string;
  language: string;
  description: string | null;
  code: string;
  authorId: number;
};
type EditPageProps = {
  params: Promise<{ id: string }>;
};

// --- Função para buscar UM snippet  ---
async function getSnippetById(id: string): Promise<Snippet | null> {
  const token = (await cookies()).get('session_token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/snippets/${id}`;
    console.log(`[Frontend Server] Tentando buscar: ${url}`);

    const res = await fetch(url, {
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      redirect('/login');
    }

    if (!res.ok) {
      console.error(
        `[Frontend Server] Erro na API! Status: ${res.status}, Texto: ${res.statusText}`
      );
      return null;
    }

    return res.json();
  } catch (error) {
    console.error('[Frontend Server] Falha catastrófica no fetch:', error);
    return null;
  }
}

// O Componente da Página de Edição
export default function EditSnippetPage(props: EditPageProps) {
  const params = use(props.params);
  const snippet = use(getSnippetById(params.id));

  if (!snippet) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-gray-950 to-black">
        <h1 className="text-4xl font-bold text-red-500">
          Snippet não encontrado
        </h1>
        <p className="text-gray-400 mt-2">
          Você não tem permissão ou este snippet não existe.
        </p>
        <Link href="/" className="mt-4 text-pink-400 hover:text-pink-300">
          Voltar para Home
        </Link>
      </main>
    );
  }

  const updateSnippetAction = updateSnippet.bind(null, snippet.id);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 to-black text-gray-300">
      <div className="bg-gray-950/50 border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-8 lg:px-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-[#d965e6]/20 to-purple-500/20 rounded-xl border border-white/10">
              <PackageIcon className="w-10 h-10" />
            </div>
            <div>
              <h1 className="flex items-center gap-3 text-2xl font-semibold text-white">
                Editar Snippet
              </h1>
              <p className="text-gray-400 mt-1">
                Modifique seu snippet:{' '}
                <span className="text-white font-medium">{snippet.title}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 lg:px-12 space-y-12">
        <div className="bg-gray-900 rounded-2xl border border-white/10 shadow-xl overflow-hidden">
          <form action={updateSnippetAction} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-400"
                >
                  Título
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  defaultValue={snippet.title}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#d965e6] focus:ring-2 focus:ring-[#d965e6]/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-gray-400"
                >
                  Linguagem
                </label>
                <input
                  type="text"
                  name="language"
                  id="language"
                  required
                  defaultValue={snippet.language}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#d965e6] focus:ring-2 focus:ring-[#d965e6]/50 transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-400"
              >
                Descrição
              </label>
              <input
                type="text"
                name="description"
                id="description"
                defaultValue={snippet.description || ''}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#d965e6] focus:ring-2 focus:ring-[#d965e6]/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-400"
              >
                Código
              </label>
              <textarea
                name="code"
                id="code"
                required
                rows={10}
                defaultValue={snippet.code}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 font-mono focus:outline-none focus:border-[#d965e6] focus:ring-2 focus:ring-[#d965e6]/50 transition-all resize-none"
              />
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-[#d965e6] to-purple-500 hover:from-[#e075ed] hover:to-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg shadow-[#d965e6]/30 hover:shadow-[#d965e6]/50 flex items-center justify-center gap-2 group"
              >
                Salvar Alterações
              </button>
              <Link
                href="/"
                className="flex-1 text-center bg-gray-800/50 hover:bg-gray-700/80 text-gray-300 hover:text-white font-bold py-3 px-6 rounded-lg transition-colors border border-gray-700"
              >
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}