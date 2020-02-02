/* eslint-env jest */

const Fastify = require('fastify')
const fastifyPosgresjs = require('./')

describe('fasity-postgresjs', () => {
  let fastify

  beforeEach(() => {
    fastify = Fastify()
  })
  afterEach(() => {
    fastify.close()
  })

  it('should decorate fastify instance', async () => {
    expect.assertions(1)

    fastify.register(fastifyPosgresjs, {
      url: 'postgres://postgres@localhost/postgres'
    })

    await fastify.ready()
    expect(fastify.sql).toBeDefined()
  })

  it('should pass uri and postgres options', async () => {
    expect.assertions(1)

    fastify.register(fastifyPosgresjs, {
      url: 'postgres://postgres@localhost/postgres',
      timeout: 10000
    })

    await fastify.ready()
    expect(fastify.sql.options.timeout).toEqual(10000)
  })

  it('should be able to perform a query', async () => {
    expect.assertions(1)

    fastify.register(fastifyPosgresjs, {
      url: 'postgres://postgres@localhost/postgres'
    })

    await fastify.ready()

    const result = await fastify.sql`SELECT 1 AS one`
    expect(result[0].one).toEqual(1)
  })
})
