import { drizzle } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import { users, tracks, userSchedule } from "../drizzle/schema.ts";
import "dotenv/config";

const db = drizzle(process.env.DATABASE_URL);

async function setupNaiara() {
  console.log("🚀 Configurando Naiara Monteiro...\n");

  // 1. Buscar usuário Naiara
  const [naiara] = await db
    .select()
    .from(users)
    .where(eq(users.name, "Naiara Monteiro"))
    .limit(1);

  if (!naiara) {
    console.error("❌ Usuário Naiara Monteiro não encontrado!");
    process.exit(1);
  }

  console.log(`✅ Usuário encontrado: ${naiara.name} (ID: ${naiara.id})\n`);

  // 2. Buscar trilhas de Português e Matemática
  const allTracks = await db.select().from(tracks);
  
  const portuguesTrack = allTracks.find(t => 
    t.title.toLowerCase().includes("português") || 
    t.title.toLowerCase().includes("portugues")
  );
  
  const matematicaTrack = allTracks.find(t => 
    t.title.toLowerCase().includes("matemática") || 
    t.title.toLowerCase().includes("matematica")
  );

  if (!portuguesTrack || !matematicaTrack) {
    console.error("❌ Trilhas de Português ou Matemática não encontradas!");
    console.log("Trilhas disponíveis:", allTracks.map(t => t.title));
    process.exit(1);
  }

  console.log(`✅ Trilhas encontradas:`);
  console.log(`   - ${portuguesTrack.title} (ID: ${portuguesTrack.id})`);
  console.log(`   - ${matematicaTrack.title} (ID: ${matematicaTrack.id})\n`);

  // 3. Buscar todas as tarefas das duas trilhas
  const { stages } = await import("../drizzle/schema.ts");
  const { tasks } = await import("../drizzle/schema.ts");
  
  const portuguesStages = await db
    .select()
    .from(stages)
    .where(eq(stages.trackId, portuguesTrack.id));
  
  const matematicaStages = await db
    .select()
    .from(stages)
    .where(eq(stages.trackId, matematicaTrack.id));

  const allStages = [...portuguesStages, ...matematicaStages];
  
  let allTasks = [];
  for (const stage of allStages) {
    const stageTasks = await db
      .select()
      .from(tasks)
      .where(eq(tasks.stageId, stage.id));
    allTasks = [...allTasks, ...stageTasks];
  }

  console.log(`✅ Total de tarefas encontradas: ${allTasks.length}\n`);

  // 4. Criar cronograma para Naiara
  const today = new Date();
  const scheduleEntries = allTasks.map((task, index) => {
    const dueDate = new Date(today);
    dueDate.setDate(dueDate.getDate() + index); // Uma tarefa por dia

    return {
      userId: naiara.id,
      taskId: task.id,
      scheduledDate: dueDate,
      dueDate: dueDate,
    };
  });

  // Limpar cronograma anterior da Naiara
  await db.delete(userSchedule).where(eq(userSchedule.userId, naiara.id));

  // Inserir novo cronograma
  if (scheduleEntries.length > 0) {
    await db.insert(userSchedule).values(scheduleEntries);
    console.log(`✅ Cronograma criado: ${scheduleEntries.length} tarefas agendadas\n`);
  }

  // 5. Inicializar gamificação (atualizar role se necessário)
  // A gamificação será inicializada automaticamente quando Naiara fizer login
  console.log("✅ Gamificação será inicializada no primeiro login\n");

  console.log("🎉 Configuração concluída com sucesso!");
  console.log(`\n📊 Resumo:`);
  console.log(`   - Usuário: ${naiara.name}`);
  console.log(`   - Trilhas: 2 (Português + Matemática)`);
  console.log(`   - Tarefas: ${allTasks.length}`);
  console.log(`   - Cronograma: ${scheduleEntries.length} dias`);
  console.log(`\n✨ Naiara está pronta para começar!`);

  process.exit(0);
}

setupNaiara().catch((error) => {
  console.error("❌ Erro ao configurar Naiara:", error);
  process.exit(1);
});
