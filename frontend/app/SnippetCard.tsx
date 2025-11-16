"use client"; 

import { useState } from "react";
import Link from "next/link";
import { Code2, Trash2, Edit3, Copy, Check } from "lucide-react";
import { deleteSnippet } from "./actions"; 
import { CodeBlock } from "./CodeBlock";
import { ConfirmModal } from "./ConfirmModal"; 

type Snippet = {
  id: number;
  title: string;
  language: string;
  description: string | null;
  code: string;
  authorId: number; 
};

export function SnippetCard({ snippet }: { snippet: Snippet }) {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  
  // ---  ESTADO PARA O MODAL ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); 

  const handleCopy = (code: string, id: number) => {
    const textArea = document.createElement("textarea");
    textArea.value = code;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Falha ao copiar texto: ', err);
    }
    document.body.removeChild(textArea);
  };


  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteSnippet(snippet.id);
    } catch (error) {
      console.error("Falha ao deletar:", error);
      setIsDeleting(false); // Se falhar, reativar botões
      setIsModalOpen(false); // Fecha o modal se falhar
    }
  };


  return (
    <> 
      
      {isModalOpen && (
        <ConfirmModal
          title="Tem certeza?"
          message={`Você está prestes a apagar o snippet "${snippet.title}". Esta ação não pode ser desfeita.`}
          onCancel={() => setIsModalOpen(false)}
          onConfirm={handleConfirmDelete} 
          isLoading={isDeleting}
        />
      )}

      {/*  Card  */}
      <div
        key={snippet.id}
        className="bg-gray-900 rounded-2xl border border-white/10 shadow-xl shadow-black/20 overflow-hidden hover:border-[#d965e6]/50 transition-all group"
      >
        {/* Header do snippet */}
        <div className="px-8 py-5 bg-gray-900/50 border-b border-white/10 flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-[#d965e6] mb-2 text-lg font-semibold">
              {snippet.title}
            </h3>
            {snippet.description && (
              <p className="text-gray-400 text-sm">
                {snippet.description}
              </p>
            )}
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-[#d965e6]/10 border border-[#d965e6]/30 rounded-full text-xs text-[#d965e6]">
              <Code2 className="w-3 h-3" />
              {snippet.language}
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopy(snippet.code, snippet.id)}
              className="p-2 hover:bg-[#d965e6]/20 rounded-lg transition-colors group/copy"
              title="Copiar código"
            >
              {copiedId === snippet.id ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-gray-500 group-hover/copy:text-[#d965e6]" />
              )}
            </button>
            
            <Link
              href={`/snippets/${snippet.id}/edit`}
              className="p-2 hover:bg-[#d965e6]/20 rounded-lg transition-colors group/edit"
              title="Editar"
            >
              <Edit3 className="w-4 h-4 text-gray-500 group-hover/edit:text-[#d965e6]" />
            </Link>

            {/* --- BOTÃO DELETAR --- */}
            <button
              onClick={() => setIsModalOpen(true)} // Apenas abre o modal
              className="p-2 hover:bg-red-500/10 rounded-lg transition-colors group/delete"
              title="Deletar"
            >
              <Trash2 className="w-4 h-4 text-gray-500 group-hover/delete:text-red-400" />
            </button>
          </div>
        </div>

        {/* Código  */}
        <div className="p-6">
          <pre className="bg-gray-950/50 border border-white/10 rounded-xl p-4 overflow-x-auto">
            <CodeBlock
              language={snippet.language}
              code={snippet.code}
            />
          </pre>
        </div>
      </div>
    </>
  );
}