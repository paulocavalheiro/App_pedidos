# App_pedidos
app cardapio e pedidos

## backend
Nestjs : npm rum start:dev

## Frontend 
NextJs 14 : npm run dev

## database 
PostgreSql

## Config
Para rodar o projeto com Docker, acesse a raiz do projeto e execute o comando docker-compose up -d. Certifique-se de ter configurado o Docker Desktop com as permissões necessárias.

Se preferir rodar o projeto sem o Docker, ajuste o arquivo .env do backend, alterando DB_HOST=db para DB_HOST=localhost, e no arquivo app.module, na linha host: 'db', altere para host: 'localhost'.

Após criar o container do banco de dados, execute as instruções para criar as tabelas usando o arquivo restaurante.sql, que está localizado na raiz do projeto.

Também há um arquivo JSON com todos os endpoints disponíveis para auxiliar, chamado backendRestaurante.postman_collection.json.
