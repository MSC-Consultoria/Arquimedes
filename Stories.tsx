import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface StoriesProps {
  userId: number;
  tracks: Array<{
    id: number;
    title: string;
  }>;
}

interface Stage {
  id: number;
  title: string;
  description: string | null;
  trackId: number;
  orderIndex: number;
}

interface Task {
  id: number;
  title: string;
  description: string | null;
  stageId: number;
  type: string;
  orderIndex: number;
}

export function Stories({ userId, tracks }: StoriesProps) {
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Buscar todos os estágios de todas as trilhas
  const stagesQueries = tracks.map((track) =>
    trpc.tracks.getStages.useQuery({ trackId: track.id })
  );

  // Combinar todos os estágios
  const allStages = stagesQueries
    .flatMap((query) => query.data || [])
    .sort((a, b) => a.id - b.id);

  // Buscar tarefas do estágio selecionado
  const { data: tasks } = trpc.stages.getTasks.useQuery(
    { stageId: selectedStage?.id || 0 },
    { enabled: !!selectedStage }
  );

  // Timer de progresso automático (5 segundos por story)
  useEffect(() => {
    if (!selectedStage || isPaused || !tasks || tasks.length === 0) return;

    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Avançar para próxima tarefa
          if (currentTaskIndex < tasks.length - 1) {
            setCurrentTaskIndex((i) => i + 1);
            return 0;
          } else {
            // Fechar modal ao terminar todas as tarefas
            closeStory();
            return 0;
          }
        }
        return prev + 2; // Incrementa 2% a cada 100ms (5s total)
      });
    }, 100);

    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, [selectedStage, currentTaskIndex, isPaused, tasks]);

  const openStory = (stage: Stage) => {
    setSelectedStage(stage);
    setCurrentTaskIndex(0);
    setProgress(0);
    setIsPaused(false);
  };

  const closeStory = () => {
    setSelectedStage(null);
    setCurrentTaskIndex(0);
    setProgress(0);
    setIsPaused(false);
  };

  const goToPrevious = () => {
    if (currentTaskIndex > 0) {
      setCurrentTaskIndex((i) => i - 1);
      setProgress(0);
    }
  };

  const goToNext = () => {
    if (tasks && currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex((i) => i + 1);
      setProgress(0);
    } else {
      closeStory();
    }
  };

  const handleTouchStart = () => {
    setIsPaused(true);
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
  };

  return (
    <>
      {/* Lista de círculos de Stories */}
      <div className="px-4 py-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 max-w-2xl mx-auto">
          {allStages.map((stage) => (
            <StoryCircle
              key={stage.id}
              stage={stage}
              onClick={() => openStory(stage)}
            />
          ))}
        </div>
      </div>

      {/* Modal Fullscreen de Story */}
      {selectedStage && tasks && tasks.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseUp={handleTouchEnd}
        >
          {/* Barras de progresso no topo */}
          <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 p-4">
            {tasks.map((_, index) => (
              <div
                key={index}
                className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
              >
                <div
                  className="h-full bg-white transition-all duration-100"
                  style={{
                    width:
                      index < currentTaskIndex
                        ? "100%"
                        : index === currentTaskIndex
                        ? `${progress}%`
                        : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Header com título e botão fechar */}
          <div className="absolute top-6 left-0 right-0 z-10 flex items-center justify-between px-4 mt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 p-0.5">
                <div className="w-full h-full rounded-full bg-black" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">
                  {selectedStage.title}
                </p>
                <p className="text-white/70 text-xs">
                  {currentTaskIndex + 1} de {tasks.length}
                </p>
              </div>
            </div>
            <button
              onClick={closeStory}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Conteúdo da Story (Tarefa) */}
          <div className="w-full h-full flex items-center justify-center px-8">
            <div className="max-w-md w-full text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                {tasks[currentTaskIndex]?.title}
              </h2>
              <p className="text-white/80 text-sm leading-relaxed">
                {tasks[currentTaskIndex]?.description ||
                  "Clique para ver mais detalhes desta tarefa!"}
              </p>
              <div className="mt-6">
                <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-white text-xs font-medium">
                  {tasks[currentTaskIndex]?.type === "video"
                    ? "📹 Vídeo"
                    : tasks[currentTaskIndex]?.type === "reading"
                    ? "📖 Leitura"
                    : tasks[currentTaskIndex]?.type === "quiz"
                    ? "❓ Quiz"
                    : tasks[currentTaskIndex]?.type === "exercise"
                    ? "✏️ Exercício"
                    : "📝 Tarefa"}
                </span>
              </div>
            </div>
          </div>

          {/* Botões de navegação lateral */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors disabled:opacity-0"
            disabled={currentTaskIndex === 0}
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          {/* Áreas de toque para navegação (estilo Instagram) */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1/3 cursor-pointer"
            onClick={goToPrevious}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-1/3 cursor-pointer"
            onClick={goToNext}
          />
        </div>
      )}
    </>
  );
}

// Componente de círculo individual de Story
interface StoryCircleProps {
  stage: Stage;
  onClick: () => void;
}

function StoryCircle({ stage, onClick }: StoryCircleProps) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 text-center focus:outline-none"
    >
      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 p-0.5 hover:scale-110 transition-transform">
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
          <span className="text-2xl">
            {stage.orderIndex === 1
              ? "📚"
              : stage.orderIndex === 2
              ? "🎯"
              : stage.orderIndex === 3
              ? "🏆"
              : "📖"}
          </span>
        </div>
      </div>
      <p className="text-xs mt-1 text-gray-600 truncate max-w-[64px]">
        {stage.title.split(" ")[0]}
      </p>
    </button>
  );
}
