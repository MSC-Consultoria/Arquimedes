import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { Award, BookOpen, Clock3, Compass, Sparkles, TrendingUp } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { Link } from "wouter";
import BottomNav from "./BottomNav";

export default function UserDashboard() {
  const { user, loading: authLoading } = useAuth();
  const { data: gamificationStats, isLoading: statsLoading, refetch: refetchStats } = trpc.gamification.getMyStats.useQuery();
  const { data: tracks, isLoading: tracksLoading } = trpc.tracks.getAll.useQuery();
  const { data: myProgress, refetch: refetchProgress } = trpc.progress.getMyProgress.useQuery();

  const preferredTrackId = tracks?.[0]?.id || 0;
  const { data: tasksByPreferredTrack, refetch: refetchTasks } = trpc.tracks.getTasks.useQuery(
    { trackId: preferredTrackId },
    { enabled: !!preferredTrackId }
  );

  const pullStartY = useRef<number | null>(null);

  const refreshAll = () => {
    refetchStats();
    refetchProgress();
    refetchTasks();
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    pullStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (pullStartY.current === null) return;
    const deltaY = e.changedTouches[0].clientY - pullStartY.current;
    if (deltaY > 90) refreshAll();
    pullStartY.current = null;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const xpProgress = ((gamificationStats?.xp || 0) % 100);
  const eraNames: Record<string, string> = {
    idade_media: "Idade Média",
    renascimento: "Renascimento",
    revolucao_industrial: "Revolução Industrial",
    era_moderna: "Era Moderna",
    era_digital: "Era Digital",
    era_futura: "Era Futura",
  };

  const progressByTrack = useMemo(() => {
    if (!myProgress) return new Map<number, { completed: number; total: number }>();
    const map = new Map<number, { completed: number; total: number }>();
    tracks?.forEach((track) => {
      const completed = myProgress.filter((p) => p.trackId === track.id && p.status === "completed").length;
      const total = myProgress.filter((p) => p.trackId === track.id).length;
      map.set(track.id, { completed, total });
    });
    return map;
  }, [myProgress, tracks]);

  const nextTasks = useMemo(() => {
    if (!tasksByPreferredTrack) return [];
    const completedIds = new Set(myProgress?.filter((p) => p.status === "completed").map((p) => p.contentId));
    return tasksByPreferredTrack
      .filter((item) => !completedIds.has(item.task.contentId ?? item.task.id))
      .slice(0, 5)
      .map((item) => item.task);
  }, [myProgress, tasksByPreferredTrack]);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pb-24"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-300">Bem-vindo de volta</p>
            <h1 className="text-4xl font-bold">Olá, {user.name || "Aventureiro"}</h1>
          </div>
          <Button variant="secondary" onClick={refreshAll}>Atualizar</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-yellow-500 to-orange-600 border-none text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Sparkles className="h-4 w-4" /> Nível
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{gamificationStats?.level || 1}</div>
              <p className="text-xs text-white/80">Era: {eraNames[gamificationStats?.currentEra || "idade_media"]}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 border-none text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4" /> XP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{gamificationStats?.xp || 0}</div>
              <Progress value={xpProgress} className="mt-2 h-2 bg-white/20" />
              <p className="text-xs mt-1 text-white/80">{xpProgress}/100 para próximo nível</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-green-600 border-none text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Compass className="h-4 w-4" /> Trilhas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{tracks?.length || 0}</div>
              <p className="text-xs text-white/80">Jornadas disponíveis</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-600 border-none text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Award className="h-4 w-4" /> Era Atual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{eraNames[gamificationStats?.currentEra || "idade_media"]}</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <BookOpen className="h-6 w-6" /> Trilhas em andamento
            </h2>
          </div>

          {tracks && tracks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tracks.map((track) => {
                const summary = progressByTrack.get(track.id) || { completed: 0, total: 1 };
                const percent = Math.round((summary.completed / summary.total) * 100);

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
                          <span className="text-white font-medium">{percent}%</span>
                        </div>
                        <Progress value={percent} className="h-2" />
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span>{summary.completed} de {summary.total} passos</span>
                          <span>{track.estimatedHours || 0}h</span>
                        </div>
                        <Link href={`/track/${track.id}`}>
                          <Button className="w-full bg-purple-600 hover:bg-purple-700">
                            Continuar
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
              </CardContent>
            </Card>
          )}
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between text-white">
            <div>
              <p className="text-sm text-slate-400">Próximas tarefas</p>
              <h3 className="text-xl font-semibold">Continue de onde parou</h3>
            </div>
            <Clock3 className="h-5 w-5 text-slate-400" />
          </div>

          {nextTasks.length > 0 ? (
            <div className="grid gap-3">
              {nextTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3 rounded-lg bg-slate-900/60 border border-slate-700 hover:border-purple-500 cursor-pointer"
                >
                  <Link href={`/task/${task.id}/execute`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">{task.title}</p>
                        <p className="text-xs text-slate-400 line-clamp-1">{task.description}</p>
                      </div>
                      <Button size="sm" variant="secondary">Ir</Button>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-sm">Sem tarefas pendentes na trilha principal.</p>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
