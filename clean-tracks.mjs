import { drizzle } from 'drizzle-orm/mysql2';
import { eq, and, inArray } from 'drizzle-orm';
import { tracks, stages, tasks } from './drizzle/schema.js';

const db = drizzle(process.env.DATABASE_URL);

console.log('🔍 Consultando trilhas no banco...\n');

// Buscar todas as trilhas
const allTracks = await db.select().from(tracks);

console.log(`Total de trilhas encontradas: ${allTracks.length}\n`);

allTracks.forEach((track, index) => {
  console.log(`${index + 1}. ID: ${track.id}`);
  console.log(`   Título: ${track.title}`);
  console.log(`   Domínio: ${track.domain}`);
  console.log(`   Tópico: ${track.topic}`);
  console.log('');
});

// Identificar trilhas de Português e Matemática
const keepTracks = allTracks.filter(t => 
  t.title === 'Português Básico' || t.title === 'Matemática Básica'
);

const removeTracks = allTracks.filter(t => 
  t.title !== 'Português Básico' && t.title !== 'Matemática Básica'
);

console.log(`\n✅ Trilhas a MANTER (${keepTracks.length}):`);
keepTracks.forEach(t => console.log(`   - ${t.title} (ID: ${t.id})`));

console.log(`\n❌ Trilhas a REMOVER (${removeTracks.length}):`);
removeTracks.forEach(t => console.log(`   - ${t.title} (ID: ${t.id})`));

if (removeTracks.length > 0) {
  console.log('\n🗑️  Removendo trilhas extras...\n');
  
  const removeIds = removeTracks.map(t => t.id);
  
  // 1. Buscar todos os estágios das trilhas a remover
  const stagesToRemove = await db.select().from(stages).where(
    inArray(stages.trackId, removeIds)
  );
  const stageIds = stagesToRemove.map(s => s.id);
  
  console.log(`   Estágios a remover: ${stageIds.length}`);
  
  // 2. Remover tarefas dos estágios
  if (stageIds.length > 0) {
    const deletedTasks = await db.delete(tasks).where(
      inArray(tasks.stageId, stageIds)
    );
    console.log(`   ✓ Tarefas removidas`);
  }
  
  // 3. Remover estágios
  if (stageIds.length > 0) {
    await db.delete(stages).where(
      inArray(stages.id, stageIds)
    );
    console.log(`   ✓ Estágios removidos`);
  }
  
  // 4. Remover trilhas
  await db.delete(tracks).where(
    inArray(tracks.id, removeIds)
  );
  console.log(`   ✓ Trilhas removidas`);
  
  console.log('\n✅ Limpeza concluída!\n');
  
  // Verificar resultado final
  const finalTracks = await db.select().from(tracks);
  console.log(`📊 Trilhas restantes: ${finalTracks.length}`);
  finalTracks.forEach(t => console.log(`   - ${t.title}`));
} else {
  console.log('\n✅ Nenhuma trilha para remover. Banco já está limpo!\n');
}

process.exit(0);
