'use strict'

const postgres = require('postgres')
const fp = require('fastify-plugin')

function fastifyPostgres(fastify, options, next) {
  const { url, ...pgOptions } = options
  const sql = postgres(url, pgOptions)

  fastify.addHook('onClose', (fastify, done) => sql.end({ timeout: null }))

  if (fastify.sql) {
    return next(new Error('fastify-postgresjs has already been registered'))
  }

  fastify.decorate('sql', sql)

  next()
}

module.exports = fp(fastifyPostgres, {
  fastify: '>=1.1.0',
  name: 'fastify-postgresjs'
})
