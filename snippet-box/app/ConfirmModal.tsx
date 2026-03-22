"use client";
import { X, AlertTriangle } from 'lucide-react';

type ConfirmModalProps = {
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
  isLoading?: boolean;
};

export function ConfirmModal({
  title,
  message,
  onCancel,
  onConfirm,
  isLoading = false,
}: ConfirmModalProps) {
  return (
    <div 
      onClick={onCancel}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      {/* O conteúdo do Modal */}
      <div
        onClick={(e) => e.stopPropagation()} // Impede que clicar no card feche o modal
        className="relative w-full max-w-md p-6 bg-gray-900 rounded-2xl border border-white/10 shadow-xl"
      >
        {/* Botão de Fechar (X) */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white hover:bg-gray-800 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          {/* Ícone de Alerta */}
          <div className="flex-shrink-0 p-3 bg-red-900/50 border border-red-500/30 rounded-full">
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>

          {/* Textos */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="mt-2 text-gray-400">{message}</p>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-6 py-2 text-gray-300 bg-gray-800/50 hover:bg-gray-700/80 border border-gray-700 rounded-lg transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="px-6 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-lg shadow-red-500/20 disabled:opacity-50"
          >
            {isLoading ? "A deletar..." : "Sim, Deletar"}
          </button>
        </div>
      </div>
    </div>
  );
}