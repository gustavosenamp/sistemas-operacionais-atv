
SEQUÊNCIA PARA CRIAR O PROJETO

Criar o projeto
### npx typeorm init --name backend --database mysql

Instalar express, cors e mysql2
### npm install express cors express-async-errors mysql2

Instalar as especificações do express e cors
### npm install @types/express @types/cors ts-node-dev -D

Criar a migration Clientes
### npm run typeorm migration:create src/database/migrations/CreateClientes

Criar a migration Pets
### npm run typeorm migration:create src/database/migrations/CreatePets

Criar a migration Produtos
### npm run typeorm migration:create src/database/migrations/CreateProdutos

Criar a migration Servicos
### npm run typeorm migration:create src/database/migrations/CreateServicos

Criar a migration Compras
### npm run typeorm migration:create src/database/migrations/CreateCompras

Rodar migrations (Se a migration estiver registrada no banco ela não irá ler um novo envio da mesma)
### npm run typeorm -- -d ./src/database/data-source.ts migration:run