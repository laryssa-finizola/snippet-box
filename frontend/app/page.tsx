// frontend/app/page.tsx

// IMPORTS
import { createSnippet, deleteSnippet } from './actions';
import Link from 'next/link';

// TYPE DO SNIPPET
type Snippet = {
  id: number;
  title: string;
  language: string;
  description: string | null;
  code: string;
  authorId: number;
};

// BUSCA DADOS DA API
async function getSnippets(): Promise<Snippet[]> {
  try {
    const res = await fetch('http://localhost:8080/api/snippets', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Falha ao buscar dados da API');
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// ======== PAGINA PRINCIPAL ========
export default async function Home() {
  const snippets = await getSnippets();

  return (
    // LAYOUT PRINCIPAL
    <main className="flex min-h-screen flex-col gap-12 p-8 lg:p-24">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Snippet-Box</h1>
        <p className="text-lg text-gray-400">
          Salve seus pedaços de código favoritos.
        </p>
      </div>

      {/* --- FORMULÁRIO PARA CRIAR O SNIPPET --- */}
      <form
        action={createSnippet}
        className="flex flex-col gap-4 p-8 bg-gray-900 rounded-lg border border-gray-700"
      >
        <h2 className="text-2xl font-semibold">Novo Snippet</h2>
        {/* titulo*/}
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm font-medium">
            Título
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            className="bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
          />
        </div>

        {/* linguagem */}
        <div className="flex flex-col gap-2">
          <label htmlFor="language" className="text-sm font-medium">
            Linguagem
          </label>
          <input
            type="text"
            name="language"
            id="language"
            required
            className="bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
          />
        </div>

        {/* descrição */}
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-sm font-medium">
            Descrição
          </label>
          <input
            type="text"
            name="description"
            id="description"
            className="bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
          />
        </div>

        {/* código */}
        <div className="flex flex-col gap-2">
          <label htmlFor="code" className="text-sm font-medium">
            Código
          </label>
          <textarea
            name="code"
            id="code"
            required
            rows={5}
            className="bg-gray-800 border border-gray-700 rounded-md p-2 text-white font-mono"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
        >
          Salvar Snippet
        </button>
      </form>

      {/* --- lista com todos os snippets do usuário --- */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Meus Snippets</h2>

        {snippets.length === 0 && (
          <p className="text-gray-400">Nenhum snippet encontrado.</p>
        )}

        {snippets.map((snippet) => (
          <div
            key={snippet.id}
            className="bg-gray-800 p-4 rounded-lg border border-gray-700"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-blue-400">
                {snippet.title}
              </h2>

              {/* Div para os botões */}
              <div className="flex gap-2">
                {/* link de edição */}
                <Link
                  href={`/snippets/${snippet.id}/edit`}
                  className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-bold py-1 px-3 rounded-md transition-colors"
                >
                  Editar
                </Link>

                {/* BOTÃO DE DELETAR */}
                <form action={deleteSnippet.bind(null, snippet.id)}>
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-1 px-3 rounded-md transition-colors"
                  >
                    Deletar
                  </button>
                </form>
              </div>
            </div>
            
            <p className="text-gray-300 mt-2">{snippet.description}</p>
            <pre className="bg-gray-900 p-2 rounded-md mt-4 text-sm text-yellow-300">
              <code>{snippet.code}</code>
            </pre>
          </div>
        ))}
      </div>
    </main>
  );
}