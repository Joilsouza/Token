/**
 * route-health.js — Rota GET /health
 *
 * Health check simples para confirmar que o serviço está no ar.
 * Útil para monitoramento e verificações de disponibilidade.
 *
 * Respostas:
 *  200  JSON { status: "OK 200" }
 */

const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
  res.json({ status: "OK 200" })
})

module.exports = router
