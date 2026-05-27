---
name: projeto-token
description: Skill com contexto completo do projeto Token — serviço JWT com Express, Sequelize e SQLite
---

# Skill: Projeto Token

## O que é este projeto

Serviço HTTP didático para geração e validação de tokens JWT. Roda na porta **8081** e persiste os tokens em um banco SQLite local.

## Endpoints disponíveis

| Rota                  | O que faz                                                  |
|-----------------------|------------------------------------------------------------|
| `GET /new/:usuario`   | Gera um JWT assinado para o usuário e salva no banco       |
| `GET /check/:token`   | Verifica a assinatura e decodifica o JWT                   |
| `GET /tokens`         | Lista todos os tokens armazenados (JSON)                   |
| `GET /health`         | Health check — retorna `{ status: "OK 200" }`              |

## Arquitetura

- **`index.js`** — ponto de entrada: configura Express, monta as rotas e sincroniza o banco
- **`database.js`** — única fonte de verdade para Sequelize e o model `Token`
- **`route-new.js`** — `GET /new/:usuario` — gera e persiste um JWT
- **`route-check.js`** — `GET /check/:token` — valida e decodifica um JWT
- **`route-tokens.js`** — `GET /tokens` — lista todos os tokens do banco
- **`route-health.js`** — `GET /health` — health check simples
- **`consumer.js`** — script cliente para testar o fluxo completo manualmente
- **`db/tokens`** — arquivo SQLite gerado automaticamente pelo Sequelize

## Model Token (Sequelize)

```js
Token = sequelize.define("Token", {
  usuario: DataTypes.STRING,  // nome do usuário dono do token
  token:   DataTypes.TEXT,    // JWT completo gerado
}, { tableName: "tokens", timestamps: true })
```

Campos gerados automaticamente: `id` (PK), `createdAt`, `updatedAt`.

## Padrões que devem ser seguidos

- CommonJS (`require` / `module.exports`) — não usar ESM (`import`/`export`)
- `async/await` com `try/catch` para todas as operações de banco
- Erros de banco retornam HTTP 500 com mensagem em português
- Novas rotas seguem o padrão `route-<nome>.js` e são montadas em `index.js`
- Acesso ao banco sempre via model importado de `./database` — nunca instanciar Sequelize nas rotas
- Variáveis em camelCase, models em PascalCase, tabelas em snake_case plural
- Comentários JSDoc nos arquivos de rota descrevendo parâmetros e respostas

## Pontos de atenção

- O segredo JWT (`"123456"`) está hardcoded — ao refatorar, mover para variável de ambiente
- O segredo está duplicado em `route-new.js` e `route-check.js` — candidato a centralização em `database.js` ou arquivo de config
- Não há middleware de autenticação nos endpoints
- Sequelize versão 3 — API pode diferir das versões 6+

## Comandos úteis

```bash
# Instalar dependências
npm install

# Subir o servidor
node index.js

# Testar o fluxo completo (servidor deve estar rodando)
node consumer.js
```

## Exemplo de nova rota

```js
// route-deletar.js
const express = require("express")
const { Token } = require("./database")

const router = express.Router()

/**
 * DELETE /:id — Remove um token pelo ID
 * Respostas:
 *  200  JSON { mensagem: "Token removido com sucesso." }
 *  500  Erro ao remover do banco
 */
router.delete("/:id", async (req, res) => {
  try {
    await Token.destroy({ where: { id: req.params.id } })
    res.json({ mensagem: "Token removido com sucesso." })
  } catch (err) {
    console.error("Erro ao remover token:", err)
    res.status(500).send("Erro ao remover token.")
  }
})

module.exports = router
```

Depois registrar em `index.js`:
```js
app.use("/deletar", require("./route-deletar"))
```
