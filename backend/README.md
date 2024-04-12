<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


## config
  Para rodar com docker-compose
  
  docker exec -it db psql -U postgres -d restaurante_1

  *criar as tabelas que estão no arquivo restaurante.sql dentro do backend
  e inserir

  *Insira os registros da categoria
  INSERT INTO categoria (nome, status, icone) VALUES ('Sopas', true, 'RamenDiningIcon');
  INSERT INTO categoria (nome, status, icone) VALUES ('Grelhados', true, 'SetMealIcon');
  INSERT INTO categoria (nome, status, icone) VALUES ('Pratos caseiros', true, 'CabinIcon');
  INSERT INTO categoria (nome, status, icone) VALUES ('Pizzas', true, 'LocalPizzaIcon');
  INSERT INTO categoria (nome, status, icone) VALUES ('Sobremesas', true, 'IcecreamIcon');

  *consulta pode ser feita com postman, na raiz já tem a collection do postman para ser importado as chamadas.

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
