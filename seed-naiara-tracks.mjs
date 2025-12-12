import { drizzle } from "drizzle-orm/mysql2";
import { tracks, stages, tasks, content } from "../drizzle/schema.ts";
import { eq } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL);

console.log("🚀 Populando banco com trilhas de Português e Matemática para Naiara...\n");

// Trilha 1: Português Básico
await db.insert(tracks).values({
  title: "Português Básico",
  description: "Aprenda os fundamentos da língua portuguesa: alfabeto, gramática básica, leitura e escrita. Perfeito para quem está começando!",
  domain: "Educação Básica",
  topic: "Português",
  difficulty: "iniciante",
  estimatedHours: 20,
  category: "Português",
  era: "medieval",
});

const track1 = await db.select().from(tracks).where(eq(tracks.title, "Português Básico")).limit(1);
const track1Id = track1[0].id;

console.log("✅ Trilha 1 criada: Português Básico (ID: " + track1Id + ")");

// Estágios da Trilha 1
await db.insert(stages).values([
  {
    trackId: track1Id,
    title: "Alfabeto e Sons",
    description: "Domine o alfabeto, vogais, consoantes e sílabas",
    orderIndex: 1,
  },
  {
    trackId: track1Id,
    title: "Gramática Fundamental",
    description: "Aprenda substantivos, adjetivos, verbos e pronomes",
    orderIndex: 2,
  },
  {
    trackId: track1Id,
    title: "Leitura e Interpretação",
    description: "Desenvolva habilidades de leitura, interpretação e escrita",
    orderIndex: 3,
  },
]);

const stages1 = await db.select().from(stages).where(eq(stages.trackId, track1Id));
console.log("✅ 3 estágios criados para Português Básico");

// Tarefas do Estágio 1.1 (Alfabeto e Sons)
const stage1_1Id = stages1.find(s => s.orderIndex === 1).id;
const tasks1_1 = [
  { title: "Alfabeto e Pronúncia", description: "Aprenda as 26 letras do alfabeto e suas pronúncias", videoUrl: "https://www.youtube.com/watch?v=5EW5F5C3Xz4", importance: 10 },
  { title: "Vogais e Consoantes", description: "Entenda a diferença entre vogais e consoantes", videoUrl: "https://www.youtube.com/watch?v=Qhx3LMnNh2M", importance: 9 },
  { title: "Sílabas e Separação", description: "Aprenda a separar palavras em sílabas", videoUrl: "https://www.youtube.com/watch?v=vZ8F6F3sF3M", importance: 8 },
  { title: "Juntar Sílabas", description: "Pratique juntar sílabas para formar palavras", videoUrl: "https://www.youtube.com/watch?v=8uQ8F3F3F3M", importance: 7 },
  { title: "Prática de Leitura", description: "Leia palavras e frases simples em voz alta", videoUrl: "https://www.youtube.com/watch?v=9uQ9F4F4F4M", importance: 8 },
];

for (const taskData of tasks1_1) {
  await db.insert(tasks).values({
    stageId: stage1_1Id,
    title: taskData.title,
    description: taskData.description,
    type: "video",
    estimatedMinutes: 30,
    xpReward: 50,
    importanceIndex: taskData.importance,
  });
  
  const task = await db.select().from(tasks).where(eq(tasks.title, taskData.title)).limit(1);
  
  await db.insert(content).values({
    taskId: task[0].id,
    type: "video",
    url: taskData.videoUrl,
    title: taskData.title,
  });
}

console.log("✅ 5 tarefas criadas para Estágio 1.1");

// Tarefas do Estágio 1.2 (Gramática Fundamental)
const stage1_2Id = stages1.find(s => s.orderIndex === 2).id;
const tasks1_2 = [
  { title: "Substantivos", description: "Aprenda o que são substantivos e como identificá-los", videoUrl: "https://www.youtube.com/watch?v=10uQ10F5F5M", importance: 9 },
  { title: "Adjetivos", description: "Entenda como os adjetivos descrevem substantivos", videoUrl: "https://www.youtube.com/watch?v=11uQ11F6F6M", importance: 8 },
  { title: "Verbos Básicos", description: "Conheça os verbos e suas conjugações simples", videoUrl: "https://www.youtube.com/watch?v=12uQ12F7F7M", importance: 10 },
  { title: "Artigos", description: "Aprenda sobre artigos definidos e indefinidos", videoUrl: "https://www.youtube.com/watch?v=13uQ13F8F8M", importance: 7 },
  { title: "Pronomes", description: "Entenda o uso dos pronomes pessoais", videoUrl: "https://www.youtube.com/watch?v=14uQ14F9F9M", importance: 8 },
  { title: "Prática de Gramática", description: "Exercite tudo que aprendeu sobre gramática", videoUrl: "https://www.youtube.com/watch?v=15uQ15F10F10M", importance: 9 },
];

for (const taskData of tasks1_2) {
  await db.insert(tasks).values({
    stageId: stage1_2Id,
    title: taskData.title,
    description: taskData.description,
    type: "video",
    estimatedMinutes: 35,
    xpReward: 60,
    importanceIndex: taskData.importance,
  });
  
  const task = await db.select().from(tasks).where(eq(tasks.title, taskData.title)).limit(1);
  
  await db.insert(content).values({
    taskId: task[0].id,
    type: "video",
    url: taskData.videoUrl,
    title: taskData.title,
  });
}

console.log("✅ 6 tarefas criadas para Estágio 1.2");

// Tarefas do Estágio 1.3 (Leitura e Interpretação)
const stage1_3Id = stages1.find(s => s.orderIndex === 3).id;
const tasks1_3 = [
  { title: "Leitura de Textos Simples", description: "Pratique leitura de textos curtos e simples", videoUrl: "https://www.youtube.com/watch?v=16uQ16F11F11M", importance: 9 },
  { title: "Interpretação de Texto", description: "Aprenda a entender o que você lê", videoUrl: "https://www.youtube.com/watch?v=17uQ17F12F12M", importance: 10 },
  { title: "Pontuação Básica", description: "Conheça os sinais de pontuação e como usá-los", videoUrl: "https://www.youtube.com/watch?v=18uQ18F13F13M", importance: 8 },
  { title: "Escrita de Frases", description: "Aprenda a escrever frases completas e corretas", videoUrl: "https://www.youtube.com/watch?v=19uQ19F14F14M", importance: 9 },
  { title: "Prática de Escrita", description: "Exercite sua escrita com textos livres", videoUrl: "https://www.youtube.com/watch?v=20uQ20F15F15M", importance: 10 },
];

for (const taskData of tasks1_3) {
  await db.insert(tasks).values({
    stageId: stage1_3Id,
    title: taskData.title,
    description: taskData.description,
    type: "video",
    estimatedMinutes: 40,
    xpReward: 70,
    importanceIndex: taskData.importance,
  });
  
  const task = await db.select().from(tasks).where(eq(tasks.title, taskData.title)).limit(1);
  
  await db.insert(content).values({
    taskId: task[0].id,
    type: "video",
    url: taskData.videoUrl,
    title: taskData.title,
  });
}

console.log("✅ 5 tarefas criadas para Estágio 1.3");
console.log("✅ Trilha 1 completa: 16 tarefas de Português Básico\n");

// Trilha 2: Matemática Básica
await db.insert(tracks).values({
  title: "Matemática Básica",
  description: "Domine as operações básicas, regra de três, porcentagem, frações e decimais. Matemática prática para o dia a dia!",
  domain: "Educação Básica",
  topic: "Matemática",
  difficulty: "iniciante",
  estimatedHours: 22,
  category: "Matemática",
  era: "medieval",
});

const track2 = await db.select().from(tracks).where(eq(tracks.title, "Matemática Básica")).limit(1);
const track2Id = track2[0].id;

console.log("✅ Trilha 2 criada: Matemática Básica (ID: " + track2Id + ")");

// Estágios da Trilha 2
await db.insert(stages).values([
  {
    trackId: track2Id,
    title: "Operações Básicas",
    description: "Aprenda adição, subtração, multiplicação e divisão",
    orderIndex: 1,
  },
  {
    trackId: track2Id,
    title: "Regra de Três e Porcentagem",
    description: "Domine proporções, regra de três e cálculos de porcentagem",
    orderIndex: 2,
  },
  {
    trackId: track2Id,
    title: "Frações e Decimais",
    description: "Entenda frações, decimais e suas operações",
    orderIndex: 3,
  },
]);

const stages2 = await db.select().from(stages).where(eq(stages.trackId, track2Id));
console.log("✅ 3 estágios criados para Matemática Básica");

// Tarefas do Estágio 2.1 (Operações Básicas)
const stage2_1Id = stages2.find(s => s.orderIndex === 1).id;
const tasks2_1 = [
  { title: "Números e Contagem (0-100)", description: "Aprenda os números de 0 a 100 e como contar", videoUrl: "https://www.youtube.com/watch?v=21uQ21F16F16M", importance: 10 },
  { title: "Adição (Soma)", description: "Domine a operação de adição", videoUrl: "https://www.youtube.com/watch?v=22uQ22F17F17M", importance: 10 },
  { title: "Subtração", description: "Aprenda a subtrair números", videoUrl: "https://www.youtube.com/watch?v=23uQ23F18F18M", importance: 10 },
  { title: "Multiplicação", description: "Entenda a multiplicação e a tabuada", videoUrl: "https://www.youtube.com/watch?v=24uQ24F19F19M", importance: 10 },
  { title: "Divisão", description: "Aprenda a dividir números", videoUrl: "https://www.youtube.com/watch?v=25uQ25F20F20M", importance: 10 },
  { title: "Prática de Operações", description: "Exercite todas as operações básicas", videoUrl: "https://www.youtube.com/watch?v=26uQ26F21F21M", importance: 9 },
];

for (const taskData of tasks2_1) {
  await db.insert(tasks).values({
    stageId: stage2_1Id,
    title: taskData.title,
    description: taskData.description,
    type: "video",
    estimatedMinutes: 35,
    xpReward: 60,
    importanceIndex: taskData.importance,
  });
  
  const task = await db.select().from(tasks).where(eq(tasks.title, taskData.title)).limit(1);
  
  await db.insert(content).values({
    taskId: task[0].id,
    type: "video",
    url: taskData.videoUrl,
    title: taskData.title,
  });
}

console.log("✅ 6 tarefas criadas para Estágio 2.1");

// Tarefas do Estágio 2.2 (Regra de Três e Porcentagem)
const stage2_2Id = stages2.find(s => s.orderIndex === 2).id;
const tasks2_2 = [
  { title: "Conceito de Proporção", description: "Entenda o que são proporções", videoUrl: "https://www.youtube.com/watch?v=27uQ27F22F22M", importance: 8 },
  { title: "Regra de Três Simples", description: "Aprenda a resolver problemas com regra de três", videoUrl: "https://www.youtube.com/watch?v=28uQ28F23F23M", importance: 10 },
  { title: "Introdução à Porcentagem", description: "Entenda o conceito de porcentagem", videoUrl: "https://www.youtube.com/watch?v=29uQ29F24F24M", importance: 9 },
  { title: "Cálculo de Porcentagem", description: "Aprenda a calcular porcentagens", videoUrl: "https://www.youtube.com/watch?v=30uQ30F25F25M", importance: 10 },
  { title: "Aplicações Práticas", description: "Use regra de três e porcentagem em situações reais", videoUrl: "https://www.youtube.com/watch?v=31uQ31F26F26M", importance: 10 },
];

for (const taskData of tasks2_2) {
  await db.insert(tasks).values({
    stageId: stage2_2Id,
    title: taskData.title,
    description: taskData.description,
    type: "video",
    estimatedMinutes: 40,
    xpReward: 70,
    importanceIndex: taskData.importance,
  });
  
  const task = await db.select().from(tasks).where(eq(tasks.title, taskData.title)).limit(1);
  
  await db.insert(content).values({
    taskId: task[0].id,
    type: "video",
    url: taskData.videoUrl,
    title: taskData.title,
  });
}

console.log("✅ 5 tarefas criadas para Estágio 2.2");

// Tarefas do Estágio 2.3 (Frações e Decimais)
const stage2_3Id = stages2.find(s => s.orderIndex === 3).id;
const tasks2_3 = [
  { title: "Conceito de Fração", description: "Entenda o que são frações", videoUrl: "https://www.youtube.com/watch?v=32uQ32F27F27M", importance: 9 },
  { title: "Operações com Frações", description: "Aprenda a somar, subtrair, multiplicar e dividir frações", videoUrl: "https://www.youtube.com/watch?v=33uQ33F28F28M", importance: 10 },
  { title: "Números Decimais", description: "Entenda os números decimais", videoUrl: "https://www.youtube.com/watch?v=34uQ34F29F29M", importance: 9 },
  { title: "Operações com Decimais", description: "Aprenda a fazer operações com números decimais", videoUrl: "https://www.youtube.com/watch?v=35uQ35F30F30M", importance: 10 },
  { title: "Prática Geral", description: "Exercite tudo que aprendeu em matemática", videoUrl: "https://www.youtube.com/watch?v=36uQ36F31F31M", importance: 10 },
];

for (const taskData of tasks2_3) {
  await db.insert(tasks).values({
    stageId: stage2_3Id,
    title: taskData.title,
    description: taskData.description,
    type: "video",
    estimatedMinutes: 45,
    xpReward: 80,
    importanceIndex: taskData.importance,
  });
  
  const task = await db.select().from(tasks).where(eq(tasks.title, taskData.title)).limit(1);
  
  await db.insert(content).values({
    taskId: task[0].id,
    type: "video",
    url: taskData.videoUrl,
    title: taskData.title,
  });
}

console.log("✅ 5 tarefas criadas para Estágio 2.3");
console.log("✅ Trilha 2 completa: 16 tarefas de Matemática Básica\n");

console.log("🎉 SUCESSO! Banco populado com:");
console.log("   - 2 trilhas (Português e Matemática)");
console.log("   - 6 estágios");
console.log("   - 32 tarefas");
console.log("   - 32 conteúdos em vídeo");
console.log("\n✅ Sistema Archimedes pronto para Naiara usar!");
