import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Loader2,
  Play,
  Sparkles,
  Trophy,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "wouter";
import { toast } from "sonner";

type Params = { id?: string };

const XP_REWARD_BASE = 50;

function getYoutubeEmbed(url?: string) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v");
    }
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace("/", "");
    }
  } catch (error) {
    console.error("Erro ao ler URL de vídeo", error);
  }
  return null;
}

export default function TaskExecution() {
  const params = useParams<Params>();
  const taskId = Number(params.id ?? 0);
  const [, setLocation] = useLocation();

  const utils = trpc.useUtils();
  const [showXpAnimation, setShowXpAnimation] = useState(false);
  const [xpEarned, setXpEarned] = useState(XP_REWARD_BASE);
  const [isCompleting, setIsCompleting] = useState(false);

  const { data: task, isLoading: taskLoading } = trpc.tasks.getById.useQuery(
    {
      id: taskId,
    },
    { enabled: Boolean(taskId) }
  );

  const { data: content } = trpc.content.getById.useQuery(
    { id: task?.contentId ?? 0 },
    { enabled: Boolean(task?.contentId) }
  );

  const { data: stageTasks } = trpc.stages.getTasks.useQuery(
    { stageId: task?.stageId ?? 0 },
    { enabled: Boolean(task?.stageId) }
  );

  const { data: progress } = trpc.tasks.getMyProgress.useQuery(
    { taskId },
    { enabled: Boolean(taskId) }
  );

  const { data: gamificationStats } = trpc.gamification.getMyStats.useQuery();

  const completeTaskMutation = trpc.tasks.complete.useMutation();
  const addXPMutation = trpc.gamification.addXP.useMutation();

  const nextTask = useMemo(() => {
    if (!stageTasks || !task) return null;
    const ordered = [...stageTasks].sort((a, b) => a.orderIndex - b.orderIndex);
    const currentIndex = ordered.findIndex((item) => item.id === task.id);
    if (currentIndex === -1) return null;
    return ordered[currentIndex + 1] ?? null;
  }, [stageTasks, task]);

  const xpReward = useMemo(() => {
    const importanceBonus = (task?.importanceIndex ?? 5) * 5;
    return Math.max(XP_REWARD_BASE, importanceBonus);
  }, [task?.importanceIndex]);

  useEffect(() => {
    if (!showXpAnimation) return;
    const timeout = setTimeout(() => setShowXpAnimation(false), 2000);
    return () => clearTimeout(timeout);
  }, [showXpAnimation]);

  const handleCompleteTask = async () => {
    if (!task) return;
    setIsCompleting(true);

    try {
      await completeTaskMutation.mutateAsync({ taskId: task.id, score: 100 });
      const xpResult = await addXPMutation.mutateAsync({ xp: xpReward });
      setXpEarned(xpReward);
      setShowXpAnimation(true);

      await utils.tasks.getMyProgress.invalidate({ taskId: task.id });
      await utils.gamification.getMyStats.invalidate();

      toast.success(
        `🎉 Tarefa concluída! +${xpReward} XP${xpResult?.newLevel ? ` (Nível ${xpResult.newLevel})` : ""}`
      );

      setTimeout(() => {
        if (nextTask) {
          setLocation(`/task/${nextTask.id}/execute`);
          return;
        }
        if (task.stageId) {
          setLocation(`/stage/${task.stageId}`);
        } else {
          setLocation("/dashboard");
        }
      }, 1200);
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível completar a tarefa agora.");
    } finally {
      setIsCompleting(false);
    }
  };

  if (taskLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center space-y-3">
          <p className="text-gray-600">Tarefa não encontrada</p>
          <Button onClick={() => setLocation("/tracks")}>Voltar</Button>
        </div>
      </div>
    );
  }

  const isCompleted = progress?.status === "completed";
  const youtubeId = getYoutubeEmbed(content?.sourceUrl ?? undefined);
  const isPdf = content?.sourceUrl?.toLowerCase().endsWith(".pdf");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-16">
      {showXpAnimation && (
        <div className="fixed inset-0 pointer-events-none flex justify-center items-start mt-24 z-50">
          <div className="bg-emerald-500 text-white px-6 py-3 rounded-full shadow-lg animate-bounce">
            +{xpEarned} XP!
          </div>
        </div>
      )}

      <div className="bg-white border-b border-blue-100 sticky top-0 z-20">
        <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <p className="text-xs uppercase text-blue-500 font-semibold">Execução de Tarefa</p>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">{task.title}</h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Recompensa base: {xpReward} XP</span>
          </div>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-blue-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-5 h-5 text-blue-500" /> Conteúdo da tarefa
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {youtubeId && (
                  <div className="aspect-video rounded-xl overflow-hidden shadow-sm border border-blue-100">
                    <iframe
                      src={`https://www.youtube.com/embed/${youtubeId}`}
                      title="YouTube video player"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}

                {isPdf && (
                  <div className="rounded-xl overflow-hidden shadow-sm border border-blue-100 h-[600px] bg-white">
                    <iframe src={content?.sourceUrl} className="w-full h-full" title="PDF Viewer" />
                  </div>
                )}

                {!youtubeId && !isPdf && (
                  <Card className="bg-blue-50 border-blue-100">
                    <CardContent className="p-6 text-center space-y-3">
                      <FileText className="w-8 h-8 text-blue-500 mx-auto" />
                      <p className="text-sm text-gray-700">
                        {content?.sourceUrl
                          ? "Visualização não suportada. Abra o material no link abaixo."
                          : "Esta tarefa ainda não possui material vinculado."}
                      </p>
                      {content?.sourceUrl && (
                        <a
                          href={content.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 font-semibold hover:underline"
                        >
                          Abrir material externo
                        </a>
                      )}
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            {task.description && (
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle>Sobre esta tarefa</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-gray-700">
                  <p>{task.description}</p>
                  {content?.sourceName && (
                    <p className="text-xs text-gray-500">Fonte: {content.sourceName}</p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-white">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-emerald-700">
                  <Sparkles className="w-4 h-4" /> Recompensas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">XP ganho ao concluir</span>
                  <span className="font-semibold text-emerald-700">+{xpReward} XP</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Nível atual</span>
                    <span className="font-semibold text-gray-800">{gamificationStats?.level ?? 1}</span>
                  </div>
                  <Progress value={((gamificationStats?.xp ?? 0) % 100)} className="h-2" />
                  <p className="text-xs text-gray-500">
                    {gamificationStats?.xp ?? 0} XP totais • Era {gamificationStats?.currentEra ?? "idade_media"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`w-5 h-5 ${isCompleted ? "text-emerald-600" : "text-gray-400"}`} />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Status</p>
                    <p className="text-xs text-gray-600">{isCompleted ? "Concluída" : "Pendente"}</p>
                  </div>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  disabled={isCompleted || isCompleting}
                  onClick={handleCompleteTask}
                >
                  {isCompleting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Concluindo...
                    </>
                  ) : isCompleted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" /> Tarefa já concluída
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" /> Completar Tarefa
                    </>
                  )}
                </Button>

                {nextTask ? (
                  <p className="text-xs text-gray-600 text-center">
                    Próxima tarefa: <span className="font-semibold">{nextTask.title}</span>
                  </p>
                ) : (
                  <p className="text-xs text-gray-600 text-center">
                    Esta é a última tarefa do estágio.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
