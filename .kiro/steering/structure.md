# Estrutura do Projeto

```
token/
├── index.js          # Ponto de entrada — configura o Express, registra rotas e sobe o servidor
├── database.js       # Configuração do Sequelize e definição do model Token
├── route-new.js      # Rota GET /new/:usuario    — gera e persiste um JWT
├── route-check.js    # Rota GET /check/:token    — verifica e decodifica um JWT
├── route-tokens.js   # Rota GET /tokens          — lista todos os tokens do banco
├── route-health.js   # Rota GET /health          — health check simples
├── consumer.js       # Script cliente para testar o servidor manualmente
├── db/
│   └── tokens        # Arquivo SQLite gerado automaticamente pelo Sequelize
├── package.json      # Dependências do projeto
└── .kiro/
    ├── steering/     # Regras e contexto para o assistente de IA
    └── skills/       # Skills com contexto aprofundado do projeto
```

## Padrões de organização

- **Uma rota por arquivo** — cada `route-*.js` exporta um `express.Router()` e é montado em `index.js`
- **Acesso ao banco centralizado** — `database.js` é o único lugar que instancia o Sequelize e define models; as rotas importam apenas o model `Token`
- **Sem pastas de camadas** — projeto plano, sem separação em `controllers/`, `services/` ou `models/`; adequado para o escopo didático

## Convenção de nomenclatura

| Tipo            | Padrão              | Exemplo           |
|-----------------|---------------------|-------------------|
| Arquivo de rota | `route-<nome>.js`   | `route-new.js`    |
| Variáveis       | camelCase           | `tokenCriado`     |
| Model           | PascalCase          | `Token`           |
| Tabela SQL      | snake_case plural   | `tokens`          |
