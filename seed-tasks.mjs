import { drizzle } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import { tracks, stages, tasks } from "../drizzle/schema.ts";
import "dotenv/config";

const db = drizzle(process.env.DATABASE_URL);

async function seedTasks() {
  console.log("🚀 Populando tarefas...\n");

  // Buscar trilhas
  const allTracks = await db.select().from(tracks);
  const portuguesTrack = allTracks.find(t => t.title.includes("Português"));
  const matematicaTrack = allTracks.find(t => t.title.includes("Matemática"));

  if (!portuguesTrack || !matematicaTrack) {
    console.error("❌ Trilhas não encontradas!");
    process.exit(1);
  }

  // Buscar estágios
  const portuguesStages = await db.select().from(stages).where(eq(stages.trackId, portuguesTrack.id));
  const matematicaStages = await db.select().from(stages).where(eq(stages.trackId, matematicaTrack.id));

  console.log(`✅ Estágios encontrados:`);
  console.log(`   - Português: ${portuguesStages.length} estágios`);
  console.log(`   - Matemática: ${matematicaStages.length} estágios\n`);

  // Tarefas de Português (16 tarefas)
  const portuguesTasks = [
    // Estágio 1: Alfabeto e Sons (5 tarefas)
    { stageId: portuguesStages[0].id, title: "Alfabeto Completo", description: "Aprenda todas as letras do alfabeto", orderIndex: 1, importanceIndex: 10 },
    { stageId: portuguesStages[0].id, title: "Vogais e Consoantes", description: "Diferencie vogais de consoantes", orderIndex: 2, importanceIndex: 9 },
    { stageId: portuguesStages[0].id, title: "Sons das Letras", description: "Pronúncia correta de cada letra", orderIndex: 3, importanceIndex: 9 },
    { stageId: portuguesStages[0].id, title: "Sílabas Simples", description: "Forme e leia sílabas básicas", orderIndex: 4, importanceIndex: 8 },
    { stageId: portuguesStages[0].id, title: "Primeiras Palavras", description: "Leia suas primeiras palavras", orderIndex: 5, importanceIndex: 10 },
    
    // Estágio 2: Gramática Fundamental (6 tarefas)
    { stageId: portuguesStages[1].id, title: "Substantivos", description: "Nomes de pessoas, lugares e coisas", orderIndex: 1, importanceIndex: 9 },
    { stageId: portuguesStages[1].id, title: "Adjetivos", description: "Palavras que descrevem", orderIndex: 2, importanceIndex: 8 },
    { stageId: portuguesStages[1].id, title: "Verbos Básicos", description: "Palavras de ação", orderIndex: 3, importanceIndex: 10 },
    { stageId: portuguesStages[1].id, title: "Artigos", description: "O, a, um, uma", orderIndex: 4, importanceIndex: 7 },
    { stageId: portuguesStages[1].id, title: "Frases Simples", description: "Monte frases completas", orderIndex: 5, importanceIndex: 9 },
    { stageId: portuguesStages[1].id, title: "Pontuação Básica", description: "Ponto, vírgula e interrogação", orderIndex: 6, importanceIndex: 8 },
    
    // Estágio 3: Leitura e Interpretação (5 tarefas)
    { stageId: portuguesStages[2].id, title: "Leitura de Textos Curtos", description: "Leia e compreenda textos simples", orderIndex: 1, importanceIndex: 10 },
    { stageId: portuguesStages[2].id, title: "Interpretação de Textos", description: "Entenda o que você leu", orderIndex: 2, importanceIndex: 10 },
    { stageId: portuguesStages[2].id, title: "Ortografia Correta", description: "Escreva palavras sem erros", orderIndex: 3, importanceIndex: 9 },
    { stageId: portuguesStages[2].id, title: "Produção de Textos", description: "Escreva seus próprios textos", orderIndex: 4, importanceIndex: 9 },
    { stageId: portuguesStages[2].id, title: "Revisão Geral", description: "Pratique tudo que aprendeu", orderIndex: 5, importanceIndex: 10 },
  ];

  // Tarefas de Matemática (16 tarefas)
  const matematicaTasks = [
    // Estágio 1: Operações Básicas (6 tarefas)
    { stageId: matematicaStages[0].id, title: "Adição Simples", description: "Somar números até 100", orderIndex: 1, importanceIndex: 10 },
    { stageId: matematicaStages[0].id, title: "Subtração Simples", description: "Subtrair números até 100", orderIndex: 2, importanceIndex: 10 },
    { stageId: matematicaStages[0].id, title: "Multiplicação Básica", description: "Tabuada do 1 ao 10", orderIndex: 3, importanceIndex: 10 },
    { stageId: matematicaStages[0].id, title: "Divisão Simples", description: "Dividir números inteiros", orderIndex: 4, importanceIndex: 9 },
    { stageId: matematicaStages[0].id, title: "Operações Combinadas", description: "Resolva contas com +, -, ×, ÷", orderIndex: 5, importanceIndex: 9 },
    { stageId: matematicaStages[0].id, title: "Problemas Práticos", description: "Situações do dia a dia", orderIndex: 6, importanceIndex: 10 },
    
    // Estágio 2: Regra de Três e Porcentagem (5 tarefas)
    { stageId: matematicaStages[1].id, title: "Proporção e Razão", description: "Entenda relações entre números", orderIndex: 1, importanceIndex: 8 },
    { stageId: matematicaStages[1].id, title: "Regra de Três Simples", description: "Resolva problemas de proporção", orderIndex: 2, importanceIndex: 10 },
    { stageId: matematicaStages[1].id, title: "Porcentagem Básica", description: "Calcule 10%, 20%, 50%", orderIndex: 3, importanceIndex: 10 },
    { stageId: matematicaStages[1].id, title: "Descontos e Acréscimos", description: "Calcule preços com desconto", orderIndex: 4, importanceIndex: 10 },
    { stageId: matematicaStages[1].id, title: "Problemas de Porcentagem", description: "Situações reais com %", orderIndex: 5, importanceIndex: 9 },
    
    // Estágio 3: Frações e Decimais (5 tarefas)
    { stageId: matematicaStages[2].id, title: "Frações Simples", description: "1/2, 1/4, 1/3", orderIndex: 1, importanceIndex: 9 },
    { stageId: matematicaStages[2].id, title: "Operações com Frações", description: "Somar e subtrair frações", orderIndex: 2, importanceIndex: 8 },
    { stageId: matematicaStages[2].id, title: "Números Decimais", description: "0,5 - 1,25 - 3,75", orderIndex: 3, importanceIndex: 9 },
    { stageId: matematicaStages[2].id, title: "Conversão Fração-Decimal", description: "Transforme frações em decimais", orderIndex: 4, importanceIndex: 8 },
    { stageId: matematicaStages[2].id, title: "Revisão Geral", description: "Pratique tudo que aprendeu", orderIndex: 5, importanceIndex: 10 },
  ];

  // Inserir tarefas
  const allTasksToInsert = [...portuguesTasks, ...matematicaTasks];
  
  for (const task of allTasksToInsert) {
    await db.insert(tasks).values(task);
  }

  console.log(`✅ ${allTasksToInsert.length} tarefas criadas com sucesso!\n`);
  console.log(`   - Português: ${portuguesTasks.length} tarefas`);
  console.log(`   - Matemática: ${matematicaTasks.length} tarefas`);
  console.log(`\n🎉 Banco de dados completo!`);

  process.exit(0);
}

seedTasks().catch((error) => {
  console.error("❌ Erro:", error);
  process.exit(1);
});
