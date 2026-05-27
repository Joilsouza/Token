/**
 * route-tokens.js — Rota GET /tokens
 *
 * Retorna todos os tokens armazenados no banco de dados,
 * ordenados do mais recente para o mais antigo.
 *
 * Respostas:
 *  200  JSON array com os campos: id, usuario, token, createdAt
 *  500  Erro ao consultar o banco de dados
 */

const express = require("express")
const { Token } = require("./database")

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const tokens = await Token.findAll({
      attributes: ["id", "usuario", "token", "createdAt"],
      order: [["createdAt", "DESC"]], // mais recentes primeiro
    })
    res.json(tokens)
  } catch (err) {
    console.error("Erro ao buscar tokens:", err)
    res.status(500).send("Erro ao buscar tokens no banco de dados.")
  }
})

module.exports = router
