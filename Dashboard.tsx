import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { Award, BookOpen, Coins, Sparkles, TrendingUp } from "lucide-react";
import { useEffect } from "react";
import { Link } from "wouter";

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const { data: gamificationStats, isLoading: statsLoading } = trpc.gamification.getMyStats.useQuery();
  const { data: tracks, isLoading: tracksLoading } = trpc.tracks.getAll.useQuery();
  const { data: myProgress } = trpc.progress.getMyProgress.useQuery();

  if (authLoading || statsLoading || tracksLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando seu painel...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Acesso Restrito</CardTitle>
            <CardDescription>Você precisa estar logado para acessar o painel.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const eraNames: Record<string, string> = {
    idade_media: "Idade Média",
    renascimento: "Renascimento",
    revolucao_industrial: "Revolução Industrial",
    era_moderna: "Era Moderna",
    era_digital: "Era Digital",
    era_futura: "Era Futura",
  };

  const xpToNextLevel = (gamificationStats?.level || 1) * 100;
  const xpProgress = ((gamificationStats?.xp || 0) % 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Painel do Herói</h1>
          <p className="text-slate-300">Bem-vindo, {user.name || "Aventureiro"}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-yellow-500 to-orange-600 border-none text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Nível
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{gamificationStats?.level || 1}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 border-none text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                XP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{gamificationStats?.xp || 0}</div>
              <Progress value={xpProgress} className="mt-2 h-2" />
              <p className="text-xs mt-1 opacity-90">{xpProgress}/100 para próximo nível</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500 to-yellow-600 border-none text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Coins className="h-4 w-4" />
                Ouro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{gamificationStats?.gold || 0}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-600 border-none text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Award className="h-4 w-4" />
                Era Atual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{eraNames[gamificationStats?.currentEra || "idade_media"]}</div>
            </CardContent>
          </Card>
        </div>

        {/* Trilhas Disponíveis */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            Trilhas de Conhecimento
          </h2>

          {tracks && tracks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tracks.map((track) => {
                const trackProgress = myProgress?.filter(p => p.trackId === track.id) || [];
                const completedCount = trackProgress.filter(p => p.status === "completed").length;
                const totalCount = trackProgress.length || 1;
                const progressPercent = (completedCount / totalCount) * 100;

                return (
                  <Card key={track.id} className="bg-slate-800 border-slate-700 hover:border-purple-500 transition-all">
                    <CardHeader>
                      <CardTitle className="text-white">{track.title}</CardTitle>
                      <CardDescription className="text-slate-400">{track.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Progresso</span>
                          <span className="text-white font-medium">{Math.round(progressPercent)}%</span>
                        </div>
                        <Progress value={progressPercent} className="h-2" />
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span>Dificuldade: {track.difficulty}</span>
                          <span>{track.estimatedHours || 0}h estimadas</span>
                        </div>
                        <Link href={`/track/${track.id}`}>
                          <Button className="w-full bg-purple-600 hover:bg-purple-700">
                            Iniciar Jornada
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="py-12 text-center">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-slate-600" />
                <p className="text-slate-400 mb-4">Nenhuma trilha disponível no momento.</p>
                <p className="text-sm text-slate-500">Novas trilhas serão adicionadas em breve!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
