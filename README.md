# API de Transferências e Usuários

Esta API permite o registro, login, consulta de usuários, depósitos, adição de favorecidos e transferências de valores entre usuários. O banco de dados é em memória, ideal para aprendizado de testes e automação de APIs.

## Instalação

1. Clone o repositório ou copie os arquivos para seu ambiente local.
2. Instale as dependências:

```bash
npm install express swagger-ui-express
```

## Executando a API

```bash
node server.js
```

A API estará disponível em `http://localhost:3000`.

## Documentação Swagger

Acesse a documentação interativa em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Endpoints

- `POST /register` — Registro de novo usuário
- `POST /login` — Login de usuário
- `GET /users` — Listar usuários
- `POST /transfer` — Transferir valores
- `POST /favorecido` — Adicionar favorecido
- `POST /deposit` — Depositar valor em conta

Consulte exemplos de payloads e respostas na documentação Swagger.

## Regras de Negócio

- Login exige usuário e senha.
- Não é permitido registrar usuários duplicados.
- Transferências acima de R$ 5.000,00 só podem ser feitas para favorecidos.
- O banco de dados é em memória (os dados são perdidos ao reiniciar o servidor).

## Testes

A aplicação está preparada para ser testada com Supertest, importando o `app.js` sem o método `listen()`.

---

Desenvolvido para fins educacionais.
