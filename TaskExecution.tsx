import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  FileText,
  Loader2,
  Play,
  Sparkles,
  SwipeLeft,
  SwipeRight,
} from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { useLocation, useParams } from "wouter";
import BottomNav from "./BottomNav";

export default function TaskExecution() {
  const { id } = useParams();
  const taskId = parseInt(id || "0");
  const [, setLocation] = useLocation();
  const utils = trpc.useUtils();
  const { user } = useAuth();

  const [isCompleting, setIsCompleting] = useState(false);
  const [xpBanner, setXpBanner] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const { data: task, isLoading: taskLoading } = trpc.tasks.getById.useQuery({ id: taskId });
  const { data: stage } = trpc.stages.getById.useQuery(
    { id: task?.stageId || 0 },
    { enabled: !!task?.stageId }
  );
  const { data: stageTasks } = trpc.stages.getTasks.useQuery(
    { stageId: task?.stageId || 0 },
    { enabled: !!task?.stageId }
  );
  const { data: content } = trpc.content.getById.useQuery(
    { id: task?.contentId || 0 },
    { enabled: !!task?.contentId }
  );
  const { data: userTaskProgress } = trpc.tasks.getMyProgress.useQuery({ taskId }, { enabled: !!taskId });

  const completeTaskMutation = trpc.tasks.complete.useMutation({
    onSuccess: async (result) => {
      setIsCompleting(false);
      setXpBanner(true);
      toast.success("🎉 Tarefa concluída! XP creditado.", {
        description: `Novo nível: ${result?.newLevel ?? "?"}`,
      });
      await utils.gamification.getMyStats.invalidate();
      if (stage?.trackId) {
        await utils.progress.getMyProgressByTrack.invalidate({ trackId: stage.trackId });
      }
      setTimeout(() => {
        setXpBanner(false);
        goToNextTask();
      }, 1400);
    },
    onError: (error) => {
      setIsCompleting(false);
      toast.error("Erro ao completar tarefa", { description: error.message });
    },
  });

  const orderedTasks = useMemo(() => {
    return (stageTasks || []).slice().sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
  }, [stageTasks]);

  const currentIndex = orderedTasks.findIndex((item) => item.id === taskId);
  const nextTask = currentIndex >= 0 && currentIndex < orderedTasks.length - 1 ? orderedTasks[currentIndex + 1] : null;
  const previousTask = currentIndex > 0 ? orderedTasks[currentIndex - 1] : null;

  const isCompleted = userTaskProgress?.status === "completed";

  const handleCompleteTask = () => {
    if (!user) {
      toast.error("Faça login para registrar progresso.");
      return;
    }
    setIsCompleting(true);
    completeTaskMutation.mutate({ taskId, score: 100 });
  };

  const goToNextTask = () => {
    if (nextTask) {
      setLocation(`/task/${nextTask.id}/execute`);
    } else if (stage) {
      setLocation(`/stage/${stage.id}`);
    }
  };

  const goToPreviousTask = () => {
    if (previousTask) {
      setLocation(`/task/${previousTask.id}/execute`);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 80) {
      goToPreviousTask();
    }
    if (deltaX < -80) {
      goToNextTask();
    }
    touchStartX.current = null;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [taskId]);

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
          <Button onClick={() => window.history.back()}>Voltar</Button>
        </div>
      </div>
    );
  }

  const renderMedia = () => {
    if (content?.sourceUrl?.includes("youtube")) {
      const videoId = content.sourceUrl.split("v=")[1];
      return (
        <div className="aspect-video w-full overflow-hidden rounded-xl shadow-inner">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={task.title}
          />
        </div>
      );
    }

    if (content?.type === "pdf" && content.sourceUrl) {
      return <iframe src={content.sourceUrl} title="Material complementar" className="w-full h-[480px] rounded-xl border" />;
    }

    if (content?.sourceUrl) {
      return (
        <div className="p-4 bg-slate-50 rounded-xl border text-sm text-slate-600">
          <p className="font-semibold mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4" /> Material de apoio
          </p>
          <a className="text-blue-600 underline" href={content.sourceUrl} target="_blank" rel="noreferrer">
            Abrir recurso externo
          </a>
        </div>
      );
    }

    return (
      <div className="p-6 bg-slate-50 rounded-xl text-center text-slate-500">
        <BookOpen className="w-8 h-8 mx-auto mb-2" />
        <p>Sem mídia associada. Use a descrição para concluir a atividade.</p>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-white pb-24"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="bg-white border-b border-blue-100 sticky top-0 z-10">
        <div className="container max-w-3xl py-4 px-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()} className="flex-shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-slate-500">{stage?.title || "Tarefa"}</p>
            <h1 className="text-xl font-bold text-gray-900 truncate">{task.title}</h1>
          </div>
        </div>
      </div>

      {xpBanner && (
        <div className="fixed top-16 inset-x-0 flex justify-center z-40 px-4">
          <div className="bg-emerald-500 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 animate-pulse">
            <Sparkles className="w-4 h-4" />
            <span>+50 XP creditados!</span>
          </div>
        </div>
      )}

      <div className="container max-w-3xl px-4 py-6 space-y-6">
        <Card className="border-blue-200 bg-white">
          <CardContent className="p-6 space-y-4">
            <p className="text-sm text-gray-600 leading-relaxed">{task.description}</p>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-blue-600 font-semibold">
              <span className="px-2 py-1 bg-blue-50 rounded-full">{task.type}</span>
              {task.estimatedMinutes && <span>{task.estimatedMinutes} min</span>}
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-white overflow-hidden">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                <Play className="w-5 h-5" /> Execução da tarefa
              </h2>
              <div className="flex items-center gap-3 text-slate-500">
                <SwipeLeft className="w-4 h-4" />
                <SwipeRight className="w-4 h-4" />
              </div>
            </div>
            {renderMedia()}
          </CardContent>
        </Card>

        {!isCompleted ? (
          <Button
            onClick={handleCompleteTask}
            disabled={isCompleting}
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            {isCompleting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Registrando conclusão...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Marcar como Concluída
              </>
            )}
          </Button>
        ) : (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-green-900">Tarefa Concluída!</p>
                <p className="text-xs text-green-700">Parabéns pelo avanço. Continue para a próxima atividade.</p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-between text-sm text-slate-600">
          <Button variant="outline" disabled={!previousTask} onClick={goToPreviousTask}>
            Voltar tarefa
          </Button>
          <Button variant="secondary" onClick={goToNextTask} disabled={!nextTask}>
            Próxima tarefa
          </Button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
