import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { getLoginUrl } from "@/const";

/**
 * Página de Login Ultra-Simplificado - Sistema Archimedes
 * Apenas 1 botão para Naiara Monteiro
 * Design clean e minimalista mobile-first
 * 
 * Usa OAuth do Manus para autenticação real
 */

export default function Login() {
  const handleLogin = () => {
    // Redirecionar para OAuth do Manus
    window.location.href = getLoginUrl();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex flex-col items-center justify-center p-4">
      {/* Logo e Título */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-6 transform hover:scale-105 transition-transform">
          <span className="text-5xl">📚</span>
        </div>
        <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
          Archimedes
        </h1>
        <p className="text-gray-600 text-lg mb-2">
          Seu Sistema de Aprendizado Personalizado
        </p>
        <p className="text-gray-500 text-sm">
          Português e Matemática Básica
        </p>
      </div>

      {/* Botão de Login */}
      <div className="w-full max-w-sm space-y-6 animate-slide-up">
        <Button
          onClick={handleLogin}
          className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
        >
          <Sparkles className="w-6 h-6 mr-3" />
          Entrar como Naiara
        </Button>

        {/* Mensagem de Boas-Vindas */}
        <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-purple-100">
          <p className="text-gray-700 text-sm leading-relaxed">
            <span className="font-semibold text-purple-600">Olá, Naiara!</span> 🌟
            <br />
            Pronta para continuar sua jornada de aprendizado?
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-sm text-gray-500">
        <p>Sistema desenvolvido pela MSC Consultoria</p>
        <p className="text-xs mt-1">© 2025 - Todos os direitos reservados</p>
      </div>
    </div>
  );
}
