/**
 * index.js — Ponto de entrada da aplicação
 *
 * Responsabilidades:
 *  - Criar e configurar a instância do Express
 *  - Registrar os roteadores de cada endpoint
 *  - Sincronizar o banco de dados via Sequelize
 *  - Subir o servidor HTTP na porta 8081
 *
 * Endpoints disponíveis:
 *  GET /new/:usuario  → cria e persiste um JWT          (route-new.js)
 *  GET /check/:token  → valida e decodifica um JWT      (route-check.js)
 *  GET /tokens        → lista todos os tokens gravados  (route-tokens.js)
 *  GET /health        → health check do serviço         (route-health.js)
 */

const express = require("express")
const { sequelize } = require("./database")

const app = express()

// Suporte a corpos de requisição URL-encoded (formulários HTML)
app.use(express.urlencoded({ extended: false }))

// ── Rotas ─────────────────────────────────────────────────────────────────────
app.use("/new",    require("./route-new"))     // POST /new/:usuario
app.use("/check",  require("./route-check"))   // GET  /check/:token
app.use("/tokens", require("./route-tokens"))  // GET  /tokens
app.use("/health", require("./route-health"))  // GET  /health

// ── Banco de dados ────────────────────────────────────────────────────────────
// sequelize.sync() cria a tabela "tokens" se ainda não existir
sequelize.sync()
  .then(() => console.log("Banco de dados sincronizado."))
  .catch((err) => console.error("Erro ao sincronizar banco:", err))

// ── Servidor ──────────────────────────────────────────────────────────────────
app.listen(8081, () => {
  console.log("Servidor rodando em http://localhost:8081")
})
