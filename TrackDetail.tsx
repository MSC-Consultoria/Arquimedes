import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, BookOpen, Circle, Clock, Loader2, Play } from "lucide-react";
import { useLocation, useParams } from "wouter";

export default function TrackDetail() {
  const params = useParams();
  const trackId = parseInt(params.id || "0");
  const [, setLocation] = useLocation();

  const { data: track, isLoading: trackLoading } = trpc.tracks.getById.useQuery({ id: trackId });
  const { data: stages, isLoading: stagesLoading } = trpc.tracks.getStages.useQuery({ trackId });

  const isLoading = trackLoading || stagesLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!track) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Trilha não encontrada</p>
          <Button onClick={() => setLocation("/feed")}>Voltar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pb-20">
      {/* Header */}
      <div className="bg-white border-b border-blue-100 sticky top-0 z-10">
        <div className="container max-w-2xl py-4 px-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setLocation("/feed")}
              className="flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-gray-900 truncate">{track.title}</h1>
              <p className="text-sm text-gray-600">Trilha de {track.domain}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Track Info */}
      <div className="container max-w-2xl px-4 py-6">
        <Card className="border-blue-200 bg-white">
          <CardHeader>
            <CardTitle className="text-lg">Sobre esta Trilha</CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              {track.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Progress */}
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-700 font-medium">Seu Progresso</span>
                <span className="text-blue-600 font-semibold">0%</span>
              </div>
              <Progress value={0} className="h-3" />
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-gray-600 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{track.estimatedHours}h</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                <span className="capitalize">{track.difficulty}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  {stages?.length || 0} estágios
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stages List */}
      <div className="container max-w-2xl px-4">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Estágios da Trilha</h2>
        <div className="space-y-3">
          {stages && stages.length > 0 ? (
            stages.map((stage, index) => (
              <Card 
                key={stage.id}
                className="border-blue-200 hover:border-blue-400 transition-all cursor-pointer hover:shadow-md"
                onClick={() => setLocation(`/stage/${stage.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {/* Stage Number */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>

                    {/* Stage Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1">{stage.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{stage.description}</p>

                      {/* Progress */}
                      <div className="flex items-center gap-2">
                        <Progress value={0} className="h-1.5 flex-1" />
                        <span className="text-xs text-gray-500 flex-shrink-0">0/0</span>
                      </div>
                    </div>

                    {/* Status Icon */}
                    <div className="flex-shrink-0">
                      <Circle className="w-6 h-6 text-gray-300" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-blue-200">
              <CardContent className="p-8 text-center">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">Nenhum estágio disponível nesta trilha.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Start Button */}
      {stages && stages.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-blue-100 px-4 py-3">
          <div className="container max-w-2xl">
            <Button 
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              size="lg"
              onClick={() => setLocation(`/stage/${stages[0].id}`)}
            >
              <Play className="w-5 h-5 mr-2" />
              Começar Trilha
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
