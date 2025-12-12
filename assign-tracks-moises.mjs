/**
 * Script para atribuir as 2 trilhas ao usuário Moisés
 * Cria cronograma personalizado com todas as tarefas
 */

import { drizzle } from 'drizzle-orm/mysql2';
import { users, tracks, stages, tasks, userSchedule, userTaskProgress } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';
import dotenv from 'dotenv';

dotenv.config();

const db = drizzle(process.env.DATABASE_URL);

async function assignTracksToMoises() {
  console.log('🎯 Atribuindo trilhas ao usuário Moisés...\n');

  try {
    // Buscar usuário Moisés
    const allUsers = await db.select().from(users);
    const moises = allUsers.find(u => u.name === 'Moisés da Silva Costa');
    
    if (!moises) {
      console.error('❌ Usuário Moisés da Silva Costa não encontrado!');
      console.log('Usuários disponíveis:', allUsers.map(u => u.name));
      process.exit(1);
    }

    console.log(`✅ Usuário encontrado: ${moises.name} (ID: ${moises.id})\n`);

    // Buscar todas as trilhas
    const allTracks = await db.select().from(tracks);
    console.log(`📚 Trilhas disponíveis: ${allTracks.length}\n`);

    const today = new Date();
    let totalTasks = 0;

    for (const track of allTracks) {
      console.log(`📖 Processando trilha: ${track.title}`);
      
      // Buscar estágios da trilha
      const trackStages = await db.select().from(stages).where(eq(stages.trackId, track.id));
      console.log(`   • Estágios: ${trackStages.length}`);

      let currentDate = new Date(today);
      
      for (const stage of trackStages) {
        // Buscar tarefas do estágio
        const stageTasks = await db.select().from(tasks).where(eq(tasks.stageId, stage.id));
        console.log(`   • Tarefas no estágio "${stage.title}": ${stageTasks.length}`);

        for (const task of stageTasks) {
          // Criar registro de progresso
          await db.insert(userTaskProgress).values({
            userId: moises.id,
            taskId: task.id,
            status: 'not_started',
            attempts: 0,
          });

          // Criar item no cronograma
          const scheduledDate = new Date(currentDate);
          const dueDate = new Date(currentDate);
          dueDate.setDate(dueDate.getDate() + 2); // 2 dias para completar cada tarefa

          await db.insert(userSchedule).values({
            userId: moises.id,
            taskId: task.id,
            scheduledDate: scheduledDate,
            dueDate: dueDate,
            priority: task.importanceIndex >= 5 ? 'critical' : task.importanceIndex >= 4 ? 'high' : 'medium',
            completed: 0,
          });

          // Avançar data para próxima tarefa (espaçamento de 1 dia)
          currentDate.setDate(currentDate.getDate() + 1);
          totalTasks++;
        }
      }

      console.log(`   ✅ Trilha "${track.title}" atribuída com sucesso!\n`);
    }

    console.log('🎉 Trilhas atribuídas com sucesso ao Moisés!');
    console.log('\n📊 Resumo:');
    console.log(`   • Usuário: ${moises.name}`);
    console.log(`   • Trilhas atribuídas: ${allTracks.length}`);
    console.log(`   • Total de tarefas no cronograma: ${totalTasks}`);
    console.log(`   • Início: ${today.toLocaleDateString('pt-BR')}`);
    console.log(`   • Status: Pronto para começar! 🚀`);
    
  } catch (error) {
    console.error('❌ Erro ao atribuir trilhas:', error);
    process.exit(1);
  }

  process.exit(0);
}

assignTracksToMoises();
