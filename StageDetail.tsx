import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, CheckCircle2, Circle, Clock, Loader2, Play, Trophy } from "lucide-react";
import { useLocation, useParams } from "wouter";

export default function StageDetail() {
  const params = useParams();
  const stageId = parseInt(params.id || "0");
  const [, setLocation] = useLocation();

  const { data: stage, isLoading: stageLoading } = trpc.stages.getById.useQuery({ id: stageId });
  const { data: tasks, isLoading: tasksLoading } = trpc.stages.getTasks.useQuery({ stageId });

  const isLoading = stageLoading || tasksLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!stage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Estágio não encontrado</p>
          <Button onClick={() => window.history.back()}>Voltar</Button>
        </div>
      </div>
    );
  }

  const completedTasks = 0; // TODO: Get from user progress
  const totalTasks = tasks?.length || 0;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

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
              <h1 className="text-xl font-bold text-gray-900 truncate">{stage.title}</h1>
              <p className="text-sm text-gray-600">Estágio da trilha</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stage Info */}
      <div className="container max-w-2xl px-4 py-6">
        <Card className="border-blue-200 bg-white">
          <CardContent className="p-4 space-y-4">
            <p className="text-sm text-gray-700 leading-relaxed">{stage.description}</p>

            {/* Progress */}
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-700 font-medium">Progresso</span>
                <span className="text-blue-600 font-semibold">{progressPercent}%</span>
              </div>
              <Progress value={progressPercent} className="h-3" />
              <p className="text-xs text-gray-500 mt-1">{completedTasks} de {totalTasks} tarefas concluídas</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks List */}
      <div className="container max-w-2xl px-4">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Tarefas</h2>
        <div className="space-y-3">
          {tasks && tasks.length > 0 ? (
            tasks.map((task, index) => {
              const isCompleted = false; // TODO: Get from user progress
              const importance = task.importanceIndex || 3;
              
              return (
                <Card 
                  key={task.id}
                  className={`border-blue-200 hover:border-blue-400 transition-all cursor-pointer hover:shadow-md ${
                    isCompleted ? 'bg-blue-50/50' : 'bg-white'
                  }`}
                  onClick={() => setLocation(`/task/${task.id}/execute`)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {/* Task Status Icon */}
                      <div className="flex-shrink-0 mt-0.5">
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                        ) : (
                          <Circle className="w-6 h-6 text-gray-300" />
                        )}
                      </div>

                      {/* Task Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className={`font-semibold text-sm ${isCompleted ? 'text-gray-600 line-through' : 'text-gray-900'}`}>
                            {task.title}
                          </h3>
                          {importance >= 5 && (
                            <Trophy className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                          )}
                        </div>

                        {task.description && (
                          <p className="text-xs text-gray-600 line-clamp-2 mb-2">{task.description}</p>
                        )}

                        {/* Task Meta */}
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          {task.estimatedMinutes && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{task.estimatedMinutes} min</span>
                            </div>
                          )}
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            task.type === 'quiz' ? 'bg-purple-100 text-purple-700' :
                            task.type === 'reading' ? 'bg-orange-100 text-orange-700' :
                            task.type === 'project' ? 'bg-green-100 text-green-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {task.type}
                          </span>
                          {importance >= 4 && (
                            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                              Importante
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Card className="border-blue-200">
              <CardContent className="p-8 text-center">
                <Play className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">Nenhuma tarefa disponível neste estágio.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
