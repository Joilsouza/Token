/**
 * route-check.js — Rota GET /check/:token
 *
 * Verifica a assinatura de um JWT e retorna o resultado da validação
 * junto com o payload decodificado.
 *
 * Parâmetros de rota:
 *  :token — JWT a ser verificado (string completa)
 *
 * Respostas:
 *  200  Texto indicando "Valido" ou "Bugado" + payload decodificado
 *
 * Observação: jwt.decode() é chamado separadamente para exibir o payload
 * mesmo quando o token é inválido (assinatura incorreta ou expirado).
 */

const express = require("express")
const jwt = require("jsonwebtoken")

const router = express.Router()

// Segredo usado para verificar a assinatura do JWT
// ⚠️  Hardcoded para fins didáticos — em produção usar variável de ambiente
const secret = "123456"

router.get("/:token", (req, res) => {
  const tokenRecebido = req.params.token

  // jwt.verify retorna o erro via callback; null significa token válido
  const tokenErro = jwt.verify(tokenRecebido, secret, function(err) {
    return err
  })

  const resultado = tokenErro ? "Bugado" : "Valido"

  // jwt.decode não valida assinatura — apenas decodifica o payload Base64
  const tokenDecodificado = jwt.decode(tokenRecebido)

  res.send(
    "O Token eh " + resultado +
    "  - O Token decodificado eh " + JSON.stringify(tokenDecodificado)
  )
})

module.exports = router
