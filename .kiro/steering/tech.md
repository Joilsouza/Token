# Tecnologia

## Stack

- **Runtime:** Node.js (CommonJS — `require`/`module.exports`)
- **Framework HTTP:** Express 5
- **Autenticação:** jsonwebtoken 9
- **ORM:** Sequelize 3
- **Banco de dados:** SQLite 3 (arquivo local em `db/tokens`)

## Dependências principais

| Pacote         | Versão   | Uso                              |
|----------------|----------|----------------------------------|
| express        | ^5.2.1   | Servidor HTTP e roteamento       |
| jsonwebtoken   | ^9.0.3   | Geração e verificação de JWT     |
| sequelize      | ^3.35.1  | ORM para acesso ao SQLite        |
| sqlite3        | ^6.0.1   | Driver do banco de dados         |

## Comandos

```bash
# Instalar dependências
npm install

# Iniciar o servidor (porta 8081)
node index.js

# Executar o cliente de teste (servidor deve estar rodando)
node consumer.js
```

## Convenções de código

- Módulos CommonJS (`require` / `module.exports`) — não usar ESM (`import`/`export`)
- `async/await` com `try/catch` para todas as operações assíncronas com banco de dados
- Erros de banco retornam HTTP 500 com mensagem descritiva em português
- Segredo JWT definido como constante `secret` em cada arquivo de rota
- Comentários JSDoc nos arquivos de rota descrevendo parâmetros e respostas possíveis
