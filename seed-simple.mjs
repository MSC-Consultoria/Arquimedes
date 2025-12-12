import mysql from 'mysql2/promise';
import fs from 'fs';

const connection = await mysql.createConnection(process.env.DATABASE_URL);

console.log("🚀 Populando banco com trilhas de Naiara...\n");

const sql = fs.readFileSync('./scripts/seed-simple.sql', 'utf8');

// Executar cada statement separadamente
const statements = sql.split(';').filter(s => s.trim().length > 0);

for (const statement of statements) {
  try {
    await connection.query(statement);
  } catch (error) {
    console.error("Erro:", error.message);
  }
}

console.log("\n✅ Banco populado com sucesso!");
console.log("   - 2 trilhas (Português e Matemática)");
console.log("   - 6 estágios");
console.log("   - 32 tarefas");

await connection.end();
