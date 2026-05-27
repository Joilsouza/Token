# Produto

Serviço HTTP leve de geração e validação de tokens JWT. Criado para fins didáticos e de demonstração.

## Funcionalidades

- **Criar token** – gera um JWT assinado para um usuário e persiste no banco
- **Validar token** – verifica a assinatura do JWT e retorna o payload decodificado
- **Listar tokens** – retorna todos os tokens armazenados no banco de dados
- **Health check** – confirma que o serviço está no ar

## Endpoints

| Método | Rota              | Descrição                                        |
|--------|-------------------|--------------------------------------------------|
| GET    | `/new/:usuario`   | Cria e persiste um JWT para o usuário informado  |
| GET    | `/check/:token`   | Valida e decodifica um JWT                       |
| GET    | `/tokens`         | Lista todos os tokens gravados (JSON)            |
| GET    | `/health`         | Retorna `{ status: "OK 200" }`                   |

## Observações

- O segredo JWT está hardcoded como `"123456"` — não adequado para produção.
- Não há autenticação nos endpoints.
- Porta padrão: **8081**.
