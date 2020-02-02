# fastify-postgresjs

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/) [![Build Status](https://travis-ci.org/fastify/fastify-postgres.svg?branch=master)](https://travis-ci.org/fastify/fastify-postgresjs)

Fastify PostgreSQL connection plugin, based on [postgres](https://github.com/porsager/postgres).

## Install

```
npm i pg fastify-postgresjs --save
```

## Usage

Add it to you project with `register` and you are done!
This plugin will add the `sql` namespace in your Fastify instance.

Example:

```js
const fastify = require("fastify")();

fastify.register(require("fastify-postgresjs"), {
  url: "postgres://postgres@localhost/postgres"
});

fastify.get("/users/:id", async (req, reply) => {
  const users = await fastify.sql`
    select * from users
    where id = ${req.params.id}
  `;
  return users;
});

fastify.listen(3000, err => {
  if (err) throw err;
  console.log(`server listening on ${fastify.server.address().port}`);
});
```

## Development and Testing

First, start postgres with:

```
$ docker run --rm -d -p 5432:5432 --name fastify-postgresjs postgres:11-alpine
```

```
$ npm test
```
