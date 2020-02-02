const fastify = require('fastify')()

const url = 'postgres://postgres@localhost/postgres'

const options = { /* postgres.js options */ }

fastify.register(require('./'), {
  url, ...options
})

fastify.get('/users/:id', async (req, reply) => {
  const users = await fastify.sql`
    select * from users
    where id = ${req.params.id}
  `
  return users
})

fastify.listen(3000, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})