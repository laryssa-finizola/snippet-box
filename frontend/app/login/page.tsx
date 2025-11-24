import { PackageIcon } from '../PackageIcon';
import { loginUser } from '../actions';
import { Mail, Lock, LogIn } from 'lucide-react';
import Link from 'next/link';

// Server Page
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/30 to-gray-950 flex items-center justify-center p-4 text-gray-300">
      <div className="w-full max-w-md">
        {/* Logo e Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-[#d965e6]/30 to-purple-500/30 rounded-2xl border border-[#d965e6]/40 backdrop-blur-sm mb-6">
            <PackageIcon width={60} height={60} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Snippet-Box</h1>
          <p className="text-gray-400">
            Faça login para salvar seus snippets
          </p>
        </div>

        {/* Card de Login */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl shadow-black/20 overflow-hidden">
          <div className="bg-gradient-to-r from-[#d965e6]/10 to-purple-500/10 px-8 py-6 border-b border-white/10">
            <h2 className="flex items-center gap-3 text-lg font-semibold text-[#d965e6]">
              <LogIn className="w-6 h-6" />
              Entrar
            </h2>
          </div>

          {/* O formulário chama a Server Action 'loginUser' */}
          <form action={loginUser} className="p-8 space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  id="email"
                  name="email" 
                  required
                  placeholder="seu@email.com"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-11 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#d965e6] focus:ring-2 focus:ring-[#d965e6]/50 transition-all"
                />
              </div>
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  id="password"
                  name="password" 
                  required
                  placeholder="••••••••"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-11 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#d965e6] focus:ring-2 focus:ring-[#d965e6]/50 transition-all"
                />
              </div>
            </div>


            {/* Botão de Login */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#d965e6] to-purple-500 hover:from-[#e075ed] hover:to-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg shadow-[#d965e6]/30 hover:shadow-[#d965e6]/50 flex items-center justify-center gap-2 group"
            >
              <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              Entrar
            </button>
          </form>

          {/* Link para Registro */}
          <div className="px-8 py-6 bg-gray-900/50 border-t border-white/10 text-center">
            <p className="text-gray-400">
              Não tem uma conta?{" "}
              <Link
                href="/register" 
                className="font-medium text-[#d965e6] hover:text-[#e075ed] transition-colors"
              >
                Criar conta
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}