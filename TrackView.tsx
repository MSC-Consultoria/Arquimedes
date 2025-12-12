import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, BookOpen, CheckCircle2, Circle, Lock, PlayCircle } from "lucide-react";
import { Link, useParams } from "wouter";

export default function TrackView() {
  const { id } = useParams();
  const trackId = parseInt(id || "0");
  const { user } = useAuth();

  const { data: track, isLoading: trackLoading } = trpc.tracks.getById.useQuery({ id: trackId });
  const { data: modules, isLoading: modulesLoading } = trpc.tracks.getModules.useQuery({ trackId });
  const { data: myProgress } = trpc.progress.getMyProgressByTrack.useQuery({ trackId });

  if (trackLoading || modulesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-slate-300">Carregando trilha...</p>
        </div>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Card className="bg-slate-800 border-slate-700 text-white">
          <CardHeader>
            <CardTitle>Trilha não encontrada</CardTitle>
            <CardDescription className="text-slate-400">A trilha solicitada não existe.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard">
              <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao Painel
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalModules = modules?.length || 0;
  const completedModules = myProgress?.filter(p => p.status === "completed").length || 0;
  const progressPercent = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-4 text-slate-300 hover:text-white hover:bg-slate-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Painel
            </Button>
          </Link>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h1 className="text-3xl font-bold mb-2">{track.title}</h1>
            <p className="text-slate-300 mb-4">{track.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="h-4 w-4 text-purple-400" />
                <span className="text-slate-400">Domínio:</span>
                <span className="font-medium">{track.domain}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-400">Dificuldade:</span>
                <span className="font-medium capitalize">{track.difficulty}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-400">Duração estimada:</span>
                <span className="font-medium">{track.estimatedHours || 0}h</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Progresso Geral</span>
                <span className="font-medium">{Math.round(progressPercent)}%</span>
              </div>
              <Progress value={progressPercent} className="h-3" />
              <p className="text-xs text-slate-400">{completedModules} de {totalModules} módulos concluídos</p>
            </div>
          </div>
        </div>

        {/* Módulos */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Módulos da Trilha</h2>

          {modules && modules.length > 0 ? (
            <div className="space-y-4">
              {modules.map((module, index) => {
                const moduleProgress = myProgress?.find(p => p.contentId === module.id);
                const isCompleted = moduleProgress?.status === "completed";
                const isInProgress = moduleProgress?.status === "in_progress";
                const isLocked = index > 0 && !myProgress?.find(p => p.contentId === modules[index - 1]?.id && p.status === "completed");

                return (
                  <Card
                    key={module.id}
                    className={`bg-slate-800 border-slate-700 ${isLocked ? "opacity-50" : "hover:border-purple-500"} transition-all`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-white flex items-center gap-2">
                            {isCompleted && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                            {isInProgress && <PlayCircle className="h-5 w-5 text-blue-500" />}
                            {!isCompleted && !isInProgress && !isLocked && <Circle className="h-5 w-5 text-slate-500" />}
                            {isLocked && <Lock className="h-5 w-5 text-slate-500" />}
                            Módulo {index + 1}: {module.title}
                          </CardTitle>
                          <CardDescription className="text-slate-400 mt-1">{module.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Link href={`/module/${module.id}`}>
                        <Button
                          className="w-full md:w-auto bg-purple-600 hover:bg-purple-700"
                          disabled={isLocked}
                        >
                          {isCompleted ? "Revisar Módulo" : isInProgress ? "Continuar" : "Iniciar Módulo"}
                        </Button>
                      </Link>
                      {isLocked && (
                        <p className="text-xs text-slate-500 mt-2">Complete o módulo anterior para desbloquear</p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="py-12 text-center">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-slate-600" />
                <p className="text-slate-400">Nenhum módulo disponível nesta trilha ainda.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
