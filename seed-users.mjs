/**
 * Script para popular o banco de dados com os 6 usuários iniciais do sistema MSC
 * Usuários: moises.costa (admin), rebeca.costa, isaias.costa, valeria.costa, naiara.monteiro, gabriel.oliveira
 */

import { drizzle } from 'drizzle-orm/mysql2';
import { users } from '../drizzle/schema.js';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

const db = drizzle(process.env.DATABASE_URL);

const initialUsers = [
  {
    openId: 'moises.costa',
    name: 'Moisés da Silva Costa',
    email: 'moises@mscconsultoria.com',
    loginMethod: 'username',
    role: 'admin', // Usuário principal e administrador
  },
  {
    openId: 'rebeca.costa',
    name: 'Rebeca Costa',
    email: 'rebeca@mscconsultoria.com',
    loginMethod: 'username',
    role: 'user',
  },
  {
    openId: 'isaias.costa',
    name: 'Isaias Costa',
    email: 'isaias@mscconsultoria.com',
    loginMethod: 'username',
    role: 'user',
  },
  {
    openId: 'valeria.costa',
    name: 'Valéria Costa',
    email: 'valeria@mscconsultoria.com',
    loginMethod: 'username',
    role: 'user',
  },
  {
    openId: 'naiara.monteiro',
    name: 'Naiara Monteiro',
    email: 'naiara@mscconsultoria.com',
    loginMethod: 'username',
    role: 'user',
  },
  {
    openId: 'gabriel.oliveira',
    name: 'Gabriel Oliveira',
    email: 'gabriel@mscconsultoria.com',
    loginMethod: 'username',
    role: 'user',
  },
];

async function seedUsers() {
  console.log('🌱 Iniciando seed de usuários...');

  try {
    for (const user of initialUsers) {
      console.log(`   Criando usuário: ${user.openId} (${user.name})...`);
      
      await db.insert(users).values({
        ...user,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      }).onDuplicateKeyUpdate({
        set: {
          name: user.name,
          email: user.email,
          role: user.role,
          updatedAt: new Date(),
        },
      });
      
      console.log(`   ✅ Usuário ${user.openId} criado/atualizado com sucesso!`);
    }

    console.log('\n✅ Seed de usuários concluído com sucesso!');
    console.log(`📊 Total de usuários: ${initialUsers.length}`);
    console.log(`👑 Admin: moises.costa`);
    console.log(`👥 Usuários: ${initialUsers.filter(u => u.role === 'user').map(u => u.openId).join(', ')}`);
    
  } catch (error) {
    console.error('❌ Erro ao fazer seed de usuários:', error);
    process.exit(1);
  }

  process.exit(0);
}

seedUsers();
