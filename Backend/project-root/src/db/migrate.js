// src/db/migrate.js
import fs from "fs";
import path from "path";
import { pool } from "./connection.js"; // importa o pool da tua versão

async function runMigrations() {
  console.log("🧱 Iniciando execução das migrações...\n");

  try {
    // Caminho do arquivo SQL
    const filePath = path.resolve("./src/db/migrations.sql");

    // Lê o conteúdo do arquivo
    const sql = fs.readFileSync(filePath, "utf-8");

    if (!sql.trim()) {
      console.warn("⚠️  O arquivo migrations.sql está vazio!");
      return;
    }

    console.log("📂 Executando script de migração...");
    await pool.query(sql);

    console.log("\n✅ Migrações executadas com sucesso!");
  } catch (error) {
    console.error("\n❌ Erro ao executar migrações:");
    console.error(error.message);
  } finally {
    console.log("\n🔌 Encerrando conexão com o banco de dados...");
    await pool.end();
    console.log("👋 Conexão encerrada.");
  }
}

// Executa automaticamente
runMigrations();
