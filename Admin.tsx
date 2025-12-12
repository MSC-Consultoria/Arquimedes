import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Users, Settings, BarChart3, FileText, Upload } from "lucide-react";
import { useLocation } from "wouter";

export default function Admin() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-slate-300">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Card className="bg-slate-800 border-slate-700 max-w-md">
          <CardHeader>
            <CardTitle className="text-red-500">Acesso Negado</CardTitle>
            <CardDescription className="text-slate-400">
              Você não tem permissão para acessar esta página.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setLocation("/")} className="w-full">
              Voltar para Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Painel Administrativo</h1>
          <p className="text-slate-300">Gerencie conteúdos, trilhas e usuários do sistema</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-slate-800 border border-slate-700">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="content">Conteúdo</TabsTrigger>
            <TabsTrigger value="tracks">Trilhas</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="features">Funcionalidades</TabsTrigger>
          </TabsList>

          {/* Visão Geral */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Total de Usuários</CardTitle>
                  <Users className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1</div>
                  <p className="text-xs text-slate-400">Você é o primeiro usuário</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Trilhas Criadas</CardTitle>
                  <BookOpen className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-slate-400">Comece criando trilhas</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Conteúdos</CardTitle>
                  <FileText className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-slate-400">Adicione conteúdos educacionais</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
                <CardDescription className="text-slate-400">
                  Comece a popular o sistema com conteúdo
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Criar Nova Trilha
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Importar Conteúdo
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Users className="h-4 w-4 mr-2" />
                  Convidar Usuário
                </Button>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Ver Relatórios
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Conteúdo */}
          <TabsContent value="content">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Gerenciar Conteúdos</CardTitle>
                <CardDescription className="text-slate-400">
                  Adicione vídeos, PDFs e materiais educacionais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-slate-600" />
                  <p className="text-slate-400 mb-4">Nenhum conteúdo cadastrado ainda</p>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Adicionar Primeiro Conteúdo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trilhas */}
          <TabsContent value="tracks">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Gerenciar Trilhas de Ensino</CardTitle>
                <CardDescription className="text-slate-400">
                  Organize conteúdos em trilhas de aprendizado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-8">
                    <BookOpen className="h-16 w-16 mx-auto mb-4 text-slate-600" />
                    <p className="text-slate-400 mb-4">Nenhuma trilha criada ainda</p>
                    <p className="text-sm text-slate-500 mb-4">
                      Sugestões de trilhas prioritárias:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-w-2xl mx-auto mb-6">
                      {["JavaScript", "Python", "Inglês", "APIs", "GitHub", "N8N", "Hugging Face", "CLI", "Manus", "Fundamentos", "Ciência de Dados"].map((trilha) => (
                        <div key={trilha} className="bg-slate-700 px-3 py-2 rounded text-sm">
                          {trilha}
                        </div>
                      ))}
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Criar Primeira Trilha
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Usuários */}
          <TabsContent value="users">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Gerenciar Usuários</CardTitle>
                <CardDescription className="text-slate-400">
                  Convide novos alunos e gerencie permissões
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                        <span className="text-lg font-bold">M</span>
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-slate-400">{user.email}</p>
                      </div>
                    </div>
                    <div className="bg-purple-600 px-3 py-1 rounded text-sm">Admin</div>
                  </div>

                  <div className="text-center py-8 border-2 border-dashed border-slate-700 rounded-lg">
                    <Users className="h-12 w-12 mx-auto mb-4 text-slate-600" />
                    <p className="text-slate-400 mb-4">Nenhum outro usuário cadastrado</p>
                    <Button className="bg-green-600 hover:bg-green-700">
                      Gerar Link de Convite
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Funcionalidades */}
          <TabsContent value="features">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Funcionalidades do Sistema</CardTitle>
                <CardDescription className="text-slate-400">
                  Status de implementação das features planejadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <FeatureItem 
                    title="Sistema de Gamificação RPG"
                    description="XP, níveis, eras e recompensas"
                    status="implemented"
                  />
                  <FeatureItem 
                    title="Trilhas de Ensino Personalizadas"
                    description="Organização de conteúdo em módulos progressivos"
                    status="implemented"
                  />
                  <FeatureItem 
                    title="Quizzes de Validação"
                    description="Testes para validar conhecimento"
                    status="implemented"
                  />
                  <FeatureItem 
                    title="Sistema de Convites"
                    description="Controle de acesso restrito por convite"
                    status="planned"
                  />
                  <FeatureItem 
                    title="Histórico Detalhado de Progresso"
                    description="Timeline e gráficos de evolução"
                    status="planned"
                  />
                  <FeatureItem 
                    title="Sistema de Analogias"
                    description="Explicações contextualizadas para leigos"
                    status="planned"
                  />
                  <FeatureItem 
                    title="Anotações Pessoais"
                    description="Sistema de notas e marcações"
                    status="planned"
                  />
                  <FeatureItem 
                    title="Upload de PDFs"
                    description="Anexar e visualizar documentos"
                    status="planned"
                  />
                  <FeatureItem 
                    title="Glossário Integrado"
                    description="Definições de termos técnicos"
                    status="planned"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

interface FeatureItemProps {
  title: string;
  description: string;
  status: "implemented" | "in_progress" | "planned";
}

function FeatureItem({ title, description, status }: FeatureItemProps) {
  const statusConfig = {
    implemented: { label: "Implementado", color: "bg-green-600" },
    in_progress: { label: "Em Desenvolvimento", color: "bg-yellow-600" },
    planned: { label: "Planejado", color: "bg-slate-600" }
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-start justify-between p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
      <div className="flex-1">
        <h4 className="font-medium mb-1">{title}</h4>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
      <div className={`${config.color} px-3 py-1 rounded text-sm whitespace-nowrap ml-4`}>
        {config.label}
      </div>
    </div>
  );
}
