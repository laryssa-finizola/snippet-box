import { createSnippet, logoutUser } from './actions'; 
import { PackageIcon } from './PackageIcon';
import { SnippetCard } from './SnippetCard';
import { Plus, Code2, LogOut } from 'lucide-react'; 
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

// --- BUSCA DE DADOS  ---
async function getSnippets(): Promise<Snippet[]> {
  const token = (await cookies()).get('session_token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    const res = await fetch('http://localhost:8080/api/snippets', {
      cache: 'no-store',
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
    });
    
    if (res.status === 401) {
      redirect('/login');
    }

    if (!res.ok) throw new Error('Falha ao buscar dados da API');
    return res.json();
  } catch (error) {
    console.error(error);
    redirect('/login');
  }
}

// ======== PAGINA PRINCIPAL (Server Component) ========
export default async function Home() {
  const snippets = await getSnippets();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 to-black text-gray-300">
      {/* Header com borda sutil */}
      <div className="bg-gray-950/50 border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-8 lg:px-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-[#d965e6]/20 to-purple-500/20 rounded-xl border border-white/10">
                <PackageIcon width={40} height={40} />
              </div>
              <div>
                <h1 className="flex items-center gap-3 text-2xl font-semibold text-white">
                  Snippet-Box
                </h1>
                <p className="text-gray-400 mt-1">
                  Salve seus pedaços de código favoritos.
                </p>
              </div>
            </div>
            {/* --- BOTÃO DE LOGOUT --- */}
            <form action={logoutUser}>
              <button
                type="submit"
                className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Sair
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 lg:px-12 space-y-12">
        {/* Formulário */}
        <div className="bg-gray-900 rounded-2xl border border-white/10 shadow-xl overflow-hidden">
          <div className="px-8 py-6 border-b border-white/10">
            <h2 className="flex items-center gap-3 text-lg font-semibold text-[#d965e6]">
              <Plus className="w-6 h-6" />
              Novo Snippet
            </h2>
          </div>
          
          <form action={createSnippet} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-400">
                  Título
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  placeholder="Ex: Função de validação"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#d965e6] focus:ring-2 focus:ring-[#d965e6]/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="language" className="block text-sm font-medium text-gray-400">
                  Linguagem
                </label>
                <input
                  type="text"
                  name="language"
                  id="language"
                  required
                  placeholder="Ex: JavaScript, Python"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#d965e6] focus:ring-2 focus:ring-[#d965e6]/50 transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-400">
                Descrição
              </label>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Uma breve descrição do snippet"
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#d965e6] focus:ring-2 focus:ring-[#d965e6]/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="code" className="block text-sm font-medium text-gray-400">
                Código
              </label>
              <textarea
                name="code"
                id="code"
                required
                rows={8}
                placeholder="Cole seu código aqui..."
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 font-mono focus:outline-none focus:border-[#d965e6] focus:ring-2 focus:ring-[#d965e6]/50 transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#d965e6] to-purple-500 hover:from-[#e075ed] hover:to-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg shadow-[#d965e6]/30 hover:shadow-[#d965e6]/50 flex items-center justify-center gap-2 group"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              Salvar Snippet
            </button>
          </form>
        </div>

        {/* Lista de Snippets */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Code2 className="w-6 h-6 text-[#d965e6]" />
            <h2 className="text-lg font-semibold text-[#d965e6]">Meus Snippets</h2>
          </div>

          {snippets.length === 0 && (
            <div className="bg-gray-900 rounded-2xl border border-white/10 p-12 text-center">
              <PackageIcon className="mx-auto mb-4 opacity-20 w-20 h-20" />
              <p className="text-gray-500">
                Nenhum snippet encontrado. Crie seu primeiro!
              </p>
            </div>
          )}

          <div className="grid gap-6">
            {snippets.map((snippet) => (
              <SnippetCard key={snippet.id} snippet={snippet} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}