/**
 * route-new.js — Rota GET /new/:user
 *
 * Gera um JWT assinado para o usuário informado na URL e persiste
 * o par (usuario, token) na tabela "tokens" do banco SQLite.
 *
 * Parâmetros de rota:
 *  :user  — identificador do usuário (string livre)
 *
 * Respostas:
 *  200  HTML com o JWT gerado
 *  500  Erro ao gravar no banco de dados
 */

const express = require("express")
const jwt = require("jsonwebtoken")
const { Token } = require("./database")

const router = express.Router()

// Segredo usado para assinar o JWT
// ⚠️  Hardcoded para fins didáticos — em produção usar variável de ambiente
const secret = "123456"

router.get("/:user", async (req, res) => {
  const userInformado = req.params.user

  // Gera o JWT com o id do usuário; expira em 1 dia
  const tokenCriado = jwt.sign({ id: userInformado }, secret, { expiresIn: "1d" })

  // Persiste o token no banco antes de responder
  try {
    await Token.create({ usuario: userInformado, token: tokenCriado })
  } catch (err) {
    console.error("Erro ao gravar token no banco:", err)
    return res.status(500).send("Erro ao gravar token no banco de dados.")
  }

  res.send("<h1>Token gerado com sucesso:</h1>" + tokenCriado)
})

module.exports = router
