# App_pedidos
app cardapio e pedidos

## Config
Rodar projeto com docke - acesse raiz e rode docker compose up-d (lembre-se de ter configurado o docker desktop com os acessos)
Para rodar o projeto sem uso do docker ajuste o arquivo .env do backend mudar 'DB_HOST=db' para 'DB_HOST=localhost', 
e em app.module na linha  host: 'db', para  host: 'localhost'.

* Após criar container db: rode as intruções de criação de tabela com arquivo restaurante.sql localizado na raiz. existe mais um arquivo jso com todos endpoints para auxiliar na raiz, (backendRestaurante.postman_collection.json).


## backend
Nestjs : npm rum start:dev

## Frontend 
NextJs 14 : npm run dev

## database 
PostgreSql
