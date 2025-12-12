import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { BookOpen, Gamepad2, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-slate-300">Carregando...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="container mx-auto py-16 px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Bem-vindo de volta, {user.name}!</h1>
          <p className="text-xl text-slate-300 mb-8">Continue sua jornada de conhecimento</p>
          <Link href="/dashboard">
            <Button className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-6">
              <Gamepad2 className="h-5 w-5 mr-2" />
              Ir para o Painel
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto py-16 px-4">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            MSC Sistema Educacional
          </h1>
          <p className="text-2xl text-slate-300 mb-8">
            Aprenda através de uma jornada gamificada épica
          </p>
          <a href={getLoginUrl()}>
            <Button className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-6">
              <Sparkles className="h-5 w-5 mr-2" />
              Começar Minha Jornada
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Conteúdo Denso</h3>
            <p className="text-slate-400">
              Acesse vídeos, PDFs e materiais cuidadosamente selecionados para cada tópico.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Gamepad2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Gamificação RPG</h3>
            <p className="text-slate-400">
              Ganhe XP, suba de nível e progrida através das eras históricas enquanto aprende.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Trilhas Personalizadas</h3>
            <p className="text-slate-400">
              Siga trilhas de ensino individualizadas adaptadas ao seu ritmo e objetivos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
