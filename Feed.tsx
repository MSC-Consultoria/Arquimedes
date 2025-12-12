import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Stories } from "@/components/Stories";
import { trpc } from "@/lib/trpc";
import { getPersonalizedMessage } from "@/lib/messages";
import { useAuth } from "@/_core/hooks/useAuth";
import { BookOpen, Play, Trophy } from "lucide-react";
import { useLocation } from "wouter";

export default function Feed() {
  const { user, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();

  // Buscar trilhas do usuário
  const { data: tracks, isLoading: tracksLoading } = trpc.tracks.getAll.useQuery(
    undefined,
    { enabled: !!user }
  );

  // Buscar progresso do usuário
  const { data: gamification } = trpc.gamification.getMyStats.useQuery(
    undefined,
    { enabled: !!user }
  );

  if (authLoading || tracksLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 pb-20">
        <FeedSkeleton />
      </div>
    );
  }

  if (!user) {
    setLocation("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-pink-50 pb-20">
      {/* Header com informações do usuário */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Archimedes
            </h1>
            <p className="text-sm text-gray-600">
              {getPersonalizedMessage(user.name || "Estudante", "welcome")}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-gray-500">Nível</div>
              <div className="text-lg font-bold text-purple-600">
                {gamification?.level || 1}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">XP</div>
              <div className="text-lg font-bold text-pink-600">
                {gamification?.xp || 0}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stories (Estágios) */}
      {tracks && tracks.length > 0 && (
        <Stories userId={user.id} tracks={tracks} />
      )}

      {/* Feed de Tarefas */}
      <div className="px-4 space-y-4 max-w-2xl mx-auto">
        {/* Mensagem motivacional */}
        <Card className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 border-none">
          <p className="text-sm text-purple-900 font-medium text-center">
            {getPersonalizedMessage(user.name || "Estudante", "motivational")}
          </p>
        </Card>

        {/* Cards de Trilhas */}
        {tracks && tracks.length > 0 ? (
          tracks.map((track) => (
            <TrackCard
              key={track.id}
              track={track}
              onClick={() => setLocation(`/track/${track.id}`)}
            />
          ))
        ) : (
          <Card className="p-8 text-center">
            <BookOpen className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600">Nenhuma trilha disponível ainda.</p>
          </Card>
        )}
      </div>

      {/* Bottom Navigation - Implementar depois */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex justify-around items-center max-w-2xl mx-auto">
          <button className="flex flex-col items-center gap-1 text-purple-600">
            <BookOpen className="w-6 h-6" />
            <span className="text-xs font-medium">Feed</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <Play className="w-6 h-6" />
            <span className="text-xs">Trilhas</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <Trophy className="w-6 h-6" />
            <span className="text-xs">Conquistas</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

// Componente de Card de Trilha
interface TrackCardProps {
  track: {
    id: number;
    title: string;
    description: string | null;
    estimatedHours: number | null;
  };
  onClick: () => void;
}

function TrackCard({ track, onClick }: TrackCardProps) {
  return (
    <Card
      className="overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
      onClick={onClick}
    >
      {/* Imagem de capa com gradiente */}
      <div className="h-48 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 relative">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-white drop-shadow-lg">
            {track.title}
          </h3>
          <p className="text-sm text-white/90 mt-1">{track.description}</p>
        </div>
      </div>

      {/* Conteúdo do card */}
      <div className="p-4 space-y-3">
        {/* Progresso */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Progresso</span>
            <span className="font-medium text-purple-600">0%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
              style={{ width: "0%" }}
            />
          </div>
        </div>

        {/* Estatísticas */}
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-1 text-gray-600">
            <BookOpen className="w-4 h-4" />
            <span>{track.estimatedHours || 0}h</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Trophy className="w-4 h-4" />
            <span>0 tarefas</span>
          </div>
        </div>

        {/* Botão de ação */}
        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          Começar Agora
        </Button>
      </div>
    </Card>
  );
}

// Skeleton de loading
function FeedSkeleton() {
  return (
    <div className="px-4 py-6 space-y-4 max-w-2xl mx-auto">
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}
