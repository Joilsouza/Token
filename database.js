/**
 * database.js — Configuração do Sequelize e definição do model Token
 *
 * Este é o único arquivo que instancia o Sequelize e define models.
 * As rotas importam apenas o model Token daqui — nunca instanciam
 * o Sequelize diretamente.
 *
 * Exporta:
 *  - sequelize  → instância da conexão (usada em index.js para .sync())
 *  - Token      → model Sequelize mapeado para a tabela "tokens"
 */

const { Sequelize, DataTypes } = require("sequelize")
const path = require("path")

// Conexão com o SQLite — o arquivo do banco fica em db/tokens
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "db", "tokens"),
  logging: false, // desativa logs SQL no console
})

/**
 * Model Token
 *
 * Campos:
 *  - id         (INTEGER, PK, auto-increment) — gerado pelo Sequelize
 *  - usuario    (STRING, NOT NULL)            — nome do usuário dono do token
 *  - token      (TEXT, NOT NULL)              — JWT completo gerado
 *  - createdAt  (DATE)                        — timestamp automático
 *  - updatedAt  (DATE)                        — timestamp automático
 */
const Token = sequelize.define("Token", {
  usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: "tokens",
  timestamps: true, // habilita createdAt e updatedAt
})

module.exports = { sequelize, Token }
