import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Award, BookOpen, CheckCircle2, ExternalLink, Youtube } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "wouter";
import { toast } from "sonner";

export default function ModuleView() {
  const { id } = useParams();
  const moduleId = parseInt(id || "0");
  const { user } = useAuth();

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const { data: moduleContent, isLoading: contentLoading } = trpc.tracks.getModuleContent.useQuery({ moduleId });
  const updateProgressMutation = trpc.progress.updateProgress.useMutation();
  const addXPMutation = trpc.gamification.addXP.useMutation();
  const addGoldMutation = trpc.gamification.addGold.useMutation();

  const contentId = moduleContent?.[0]?.id;
  const { data: quizzes } = trpc.quiz.getByContentId.useQuery(
    { contentId: contentId || 0 },
    { enabled: !!contentId }
  );

  if (contentLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-slate-300">Carregando módulo...</p>
        </div>
      </div>
    );
  }

  if (!moduleContent || moduleContent.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Card className="bg-slate-800 border-slate-700 text-white">
          <CardHeader>
            <CardTitle>Módulo não encontrado</CardTitle>
            <CardDescription className="text-slate-400">O módulo solicitado não existe ou não possui conteúdo.</CardDescription>
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

  const content = moduleContent[0];

  const handleQuizSubmit = async () => {
    if (!quizzes || quizzes.length === 0) return;

    let correct = 0;
    quizzes.forEach((quiz) => {
      if (selectedAnswers[quiz.id] === quiz.correctOption) {
        correct++;
      }
    });

    const score = Math.round((correct / quizzes.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);

    if (score >= 70) {
      // Passou no quiz
      const xpEarned = 50;
      const goldEarned = 10;

      await updateProgressMutation.mutateAsync({
        contentId: content.id,
        status: "completed",
        quizScore: score,
      });

      await addXPMutation.mutateAsync({ xp: xpEarned });
      await addGoldMutation.mutateAsync({ gold: goldEarned });

      toast.success(`Parabéns! Você ganhou ${xpEarned} XP e ${goldEarned} Ouro!`, {
        description: `Pontuação: ${score}%`,
      });
    } else {
      toast.error("Você precisa de pelo menos 70% para completar o módulo.", {
        description: `Pontuação: ${score}%. Tente novamente!`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-4 text-slate-300 hover:text-white hover:bg-slate-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Painel
            </Button>
          </Link>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-2xl">{content.title}</CardTitle>
              <CardDescription className="text-slate-400">{content.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="px-3 py-1 bg-purple-600 rounded-full">
                  {content.domain}
                </span>
                <span className="px-3 py-1 bg-blue-600 rounded-full capitalize">
                  {content.difficulty}
                </span>
                <span className="px-3 py-1 bg-slate-700 rounded-full capitalize">
                  {content.type}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Conteúdo */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            Conteúdo de Aprendizado
          </h2>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-6">
              {content.type === "video" && content.sourceUrl && (
                <div className="space-y-4">
                  <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center">
                    <Youtube className="h-16 w-16 text-slate-600" />
                  </div>
                  <a
                    href={content.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Assistir no YouTube
                  </a>
                  {content.sourceName && (
                    <p className="text-sm text-slate-400">Fonte: {content.sourceName}</p>
                  )}
                </div>
              )}

              {content.type === "pdf" && content.sourceUrl && (
                <div className="space-y-4">
                  <a
                    href={content.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Abrir PDF
                  </a>
                  {content.sourceName && (
                    <p className="text-sm text-slate-400">Fonte: {content.sourceName}</p>
                  )}
                </div>
              )}

              {content.transcript && (
                <div className="mt-4 p-4 bg-slate-900 rounded-lg">
                  <h3 className="font-semibold mb-2">Transcrição / Resumo:</h3>
                  <p className="text-slate-300 text-sm whitespace-pre-wrap">{content.transcript}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quiz */}
        {quizzes && quizzes.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Award className="h-6 w-6" />
              Desafio de Validação
            </h2>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Teste seus conhecimentos</CardTitle>
                <CardDescription className="text-slate-400">
                  Responda às questões abaixo para completar este módulo. Você precisa de 70% de acerto.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {quizzes.map((quiz, index) => (
                  <div key={quiz.id} className="p-4 bg-slate-900 rounded-lg">
                    <h3 className="font-semibold mb-3">
                      {index + 1}. {quiz.question}
                    </h3>
                    <RadioGroup
                      value={selectedAnswers[quiz.id] || ""}
                      onValueChange={(value) => setSelectedAnswers({ ...selectedAnswers, [quiz.id]: value })}
                      disabled={quizSubmitted}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="A" id={`q${quiz.id}-a`} />
                        <Label htmlFor={`q${quiz.id}-a`} className="cursor-pointer">
                          A) {quiz.optionA}
                        </Label>
                        {quizSubmitted && quiz.correctOption === "A" && (
                          <CheckCircle2 className="h-4 w-4 text-green-500 ml-2" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="B" id={`q${quiz.id}-b`} />
                        <Label htmlFor={`q${quiz.id}-b`} className="cursor-pointer">
                          B) {quiz.optionB}
                        </Label>
                        {quizSubmitted && quiz.correctOption === "B" && (
                          <CheckCircle2 className="h-4 w-4 text-green-500 ml-2" />
                        )}
                      </div>
                      {quiz.optionC && (
                        <div className="flex items-center space-x-2 mb-2">
                          <RadioGroupItem value="C" id={`q${quiz.id}-c`} />
                          <Label htmlFor={`q${quiz.id}-c`} className="cursor-pointer">
                            C) {quiz.optionC}
                          </Label>
                          {quizSubmitted && quiz.correctOption === "C" && (
                            <CheckCircle2 className="h-4 w-4 text-green-500 ml-2" />
                          )}
                        </div>
                      )}
                      {quiz.optionD && (
                        <div className="flex items-center space-x-2 mb-2">
                          <RadioGroupItem value="D" id={`q${quiz.id}-d`} />
                          <Label htmlFor={`q${quiz.id}-d`} className="cursor-pointer">
                            D) {quiz.optionD}
                          </Label>
                          {quizSubmitted && quiz.correctOption === "D" && (
                            <CheckCircle2 className="h-4 w-4 text-green-500 ml-2" />
                          )}
                        </div>
                      )}
                    </RadioGroup>
                    {quizSubmitted && quiz.explanation && (
                      <div className="mt-3 p-3 bg-slate-800 rounded text-sm text-slate-300">
                        <strong>Explicação:</strong> {quiz.explanation}
                      </div>
                    )}
                  </div>
                ))}

                {!quizSubmitted && (
                  <Button
                    onClick={handleQuizSubmit}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    disabled={Object.keys(selectedAnswers).length < quizzes.length}
                  >
                    Enviar Respostas
                  </Button>
                )}

                {quizSubmitted && (
                  <div className="text-center">
                    <div className={`text-2xl font-bold mb-2 ${quizScore >= 70 ? "text-green-500" : "text-red-500"}`}>
                      Pontuação: {quizScore}%
                    </div>
                    {quizScore >= 70 ? (
                      <p className="text-green-400">Parabéns! Você completou este módulo!</p>
                    ) : (
                      <Button
                        onClick={() => {
                          setQuizSubmitted(false);
                          setSelectedAnswers({});
                        }}
                        className="mt-4 bg-purple-600 hover:bg-purple-700"
                      >
                        Tentar Novamente
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
