import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { BookOpen, Clock, Trophy, ArrowRight, Loader2 } from "lucide-react";
import { useLocation } from "wouter";

export default function TracksSelection() {
  const { user, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  
  const { data: tracks, isLoading } = trpc.tracks.getAll.useQuery();
  const { data: progressData } = trpc.gamification.getMyStats.useQuery(undefined, {
    enabled: !!user,
  });

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pb-20">
      {/* Header */}
      <div className="bg-white border-b border-blue-100 sticky top-0 z-10">
        <div className="container max-w-2xl py-4 px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Minhas Trilhas</h1>
              <p className="text-sm text-gray-600">Escolha uma trilha para começar</p>
            </div>
            {progressData && (
              <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full">
                <Trophy className="w-5 h-5" />
                <span className="font-bold">Nível {progressData?.level || 1}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      {progressData && (
        <div className="container max-w-2xl px-4 py-6">
          <div className="grid grid-cols-3 gap-3">
            <Card className="border-blue-200 bg-white">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">0</div>
                <div className="text-xs text-gray-600">Tarefas Completas</div>
              </CardContent>
            </Card>
            <Card className="border-blue-200 bg-white">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">0%</div>
                <div className="text-xs text-gray-600">Progresso Geral</div>
              </CardContent>
            </Card>
            <Card className="border-blue-200 bg-white">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{progressData?.xp || 0}</div>
                <div className="text-xs text-gray-600">XP Total</div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Tracks List */}
      <div className="container max-w-2xl px-4 space-y-4">
        {tracks && tracks.length > 0 ? (
          tracks.map((track) => (
            <Card 
              key={track.id} 
              className="border-blue-200 hover:border-blue-400 transition-all cursor-pointer hover:shadow-lg"
              onClick={() => setLocation(`/track/${track.id}`)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-gray-900">{track.title}</CardTitle>
                    <CardDescription className="mt-1 text-sm line-clamp-2">
                      {track.description}
                    </CardDescription>
                  </div>
                  <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0 ml-2" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>Progresso</span>
                    <span className="font-semibold">0%</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{track.estimatedHours}h</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span className="capitalize">{track.difficulty}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {track.domain}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="border-blue-200">
            <CardContent className="p-8 text-center">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">Nenhuma trilha disponível no momento.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-blue-100 px-4 py-3">
        <div className="container max-w-2xl flex items-center justify-around">
          <Button variant="ghost" className="flex-col h-auto py-2 text-blue-600">
            <BookOpen className="w-6 h-6 mb-1" />
            <span className="text-xs">Trilhas</span>
          </Button>
          <Button variant="ghost" className="flex-col h-auto py-2" onClick={() => setLocation("/dashboard")}>
            <Trophy className="w-6 h-6 mb-1" />
            <span className="text-xs">Progresso</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
