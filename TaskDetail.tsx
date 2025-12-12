import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, CheckCircle2, Clock, Loader2, Play } from "lucide-react";
import { useLocation, useParams } from "wouter";
import { useState } from "react";
import { toast } from "sonner";

export default function TaskDetail() {
  const params = useParams();
  const taskId = parseInt(params.id || "0");
  const [, setLocation] = useLocation();
  const [isCompleting, setIsCompleting] = useState(false);

  const { data: task, isLoading: taskLoading } = trpc.tasks.getById.useQuery({ id: taskId });
  const { data: progress } = trpc.tasks.getMyProgress.useQuery({ taskId }, { enabled: !!taskId });
  
  const completeTaskMutation = trpc.tasks.complete.useMutation({
    onSuccess: () => {
      toast.success("🎉 Tarefa concluída! Você ganhou XP!");
      setIsCompleting(false);
      // Voltar para o estágio após 1.5s
      setTimeout(() => {
        if (task?.stageId) {
          setLocation(`/stage/${task.stageId}`);
        }
      }, 1500);
    },
    onError: (error) => {
      toast.error("Erro ao completar tarefa: " + error.message);
      setIsCompleting(false);
    },
  });

  const handleCompleteTask = () => {
    setIsCompleting(true);
    completeTaskMutation.mutate({ taskId, score: 100 });
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
        <div className="text-center">
          <p className="text-gray-600 mb-4">Tarefa não encontrada</p>
          <Button onClick={() => window.history.back()}>Voltar</Button>
        </div>
      </div>
    );
  }

  const isCompleted = progress?.status === "completed";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pb-20">
      {/* Header */}
      <div className="bg-white border-b border-blue-100 sticky top-0 z-10">
        <div className="container max-w-2xl py-4 px-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => window.history.back()}
              className="flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-gray-900 truncate">{task.title}</h1>
              <p className="text-sm text-gray-600">Tarefa • {task.type}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Task Content */}
      <div className="container max-w-2xl px-4 py-6 space-y-6">
        {/* Task Info Card */}
        <Card className="border-blue-200 bg-white">
          <CardContent className="p-6 space-y-4">
            {/* Description */}
            {task.description && (
              <div>
                <h2 className="text-sm font-semibold text-gray-700 mb-2">Descrição</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{task.description}</p>
              </div>
            )}

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-gray-600 pt-4 border-t border-gray-100">
              {task.estimatedMinutes && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{task.estimatedMinutes} minutos</span>
                </div>
              )}
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                task.type === 'video' ? 'bg-red-100 text-red-700' :
                task.type === 'quiz' ? 'bg-purple-100 text-purple-700' :
                task.type === 'reading' ? 'bg-orange-100 text-orange-700' :
                task.type === 'exercise' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {task.type === 'video' ? '📹 Vídeo' :
                 task.type === 'quiz' ? '❓ Quiz' :
                 task.type === 'reading' ? '📖 Leitura' :
                 task.type === 'exercise' ? '✏️ Exercício' :
                 '📝 Tarefa'}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Video Player Placeholder (se for vídeo) */}
        {task.type === 'video' && (
          <Card className="border-blue-200 bg-white overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
                  <p className="text-sm">Player de vídeo será implementado aqui</p>
                  <p className="text-xs opacity-70 mt-1">Content ID: {task.contentId}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Content Reference (se houver) */}
        {task.contentId && task.type !== 'video' && (
          <Card className="border-blue-200 bg-white">
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Material de Estudo</h3>
              <p className="text-sm text-gray-600">Content ID: {task.contentId}</p>
              <p className="text-xs text-gray-500 mt-1">O conteúdo será carregado aqui</p>
            </CardContent>
          </Card>
        )}

        {/* Complete Button */}
        {!isCompleted && (
          <Button 
            onClick={handleCompleteTask}
            disabled={isCompleting}
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            {isCompleting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Completando...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Marcar como Concluída
              </>
            )}
          </Button>
        )}

        {/* Already Completed */}
        {isCompleted && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-green-900">Tarefa Concluída!</p>
                <p className="text-xs text-green-700">Você já completou esta tarefa.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
