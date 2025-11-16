"use client"; 

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { PackageIcon } from '../PackageIcon';
import { registerUser } from '../actions';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  // 3. Criar estado para a mensagem de erro e carregamento
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); 

  // 5. Criar a função "wrapper" que faz a validação
  async function handleSubmit(formData: FormData) {
    setIsLoading(true); 
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    // Validação de "Confirmar Senha" 
    if (password !== confirmPassword) {
      setError('As senhas não coincidem!');
      setIsLoading(false); 
      return; 
    }

    // Limpa erros antigos
    setError(null);
    
    // 6. Chamar a Server Action e guardar o resultado
    const result = await registerUser(formData);

    // 7. Verificar se a Server Action retornou um erro
    if (result.error) {
      // Se sim, definir a mensagem de erro (ex: "Este e-mail já está em uso.")
      setError(result.error);
      setIsLoading(false); 
    } 
    
    // 8. Se retornou sucesso, redirecionar para o login
    if (result.success) {
      router.push('/login');
    }
  }

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
            Crie sua conta e comece a salvar snippets
          </p>
        </div>

        {/* Card de Registro */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl shadow-black/20 overflow-hidden">
          <div className="bg-gradient-to-r from-[#d965e6]/10 to-purple-500/10 px-8 py-6 border-b border-white/10">
            <h2 className="flex items-center gap-3 text-lg font-semibold text-[#d965e6]">
              <UserPlus className="w-6 h-6" />
              Criar Conta
            </h2>
          </div>

          <form action={handleSubmit} className="p-8 space-y-6">
            {/* Nome */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-400">
                Nome
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  id="name"
                  name="name" 
                  required
                  placeholder="Seu nome completo"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-11 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#d965e6] focus:ring-2 focus:ring-[#d965e6]/50 transition-all"
                />
              </div>
            </div>

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
            
            {/* Confirmar Senha (o seu campo de validação) */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400">
                Confirmar Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  placeholder="••••••••"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-11 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#d965e6] focus:ring-2 focus:ring-[#d965e6]/50 transition-all"
                />
              </div>
            </div>
            
            {/* Mensagem de Erro (para "Senhas não coincidem" ou "Email já existe") */}
            {error && (
              <div className="text-center text-red-400 bg-red-900/30 border border-red-500/50 p-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Botão de Registro */}
            <button
              type="submit"
              disabled={isLoading} 
              className="w-full bg-gradient-to-r from-[#d965e6] to-purple-500 hover:from-[#e075ed] hover:to-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg shadow-[#d965e6]/30 hover:shadow-[#d965e6]/50 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {isLoading ? "A criar conta..." : "Criar Conta"}
            </button>
          </form>

          {/* Link para Login */}
          <div className="px-8 py-6 bg-gray-900/50 border-t border-white/10 text-center">
            <p className="text-gray-400">
              Já tem uma conta?{" "}
              <Link
                href="/login"
                className="font-medium text-[#d965e6] hover:text-[#e075ed] transition-colors"
              >
                Fazer login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}