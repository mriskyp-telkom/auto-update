import { Rapbs } from 'main/models/Rapbs'
import { GetLatestUrutan, GetNextUrutan } from 'main/repositories/Rapbs'
import { createConnection, getConnection } from 'typeorm'
import { cfg, Migrate } from '../migration'

beforeEach(async () => {
  const db = await createConnection({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: false,
    entities: [Rapbs],
    synchronize: false,
    logging: true,
  })

  await Migrate(db, cfg)
})

afterEach(async () => {
  const con = getConnection()

  await con.close()
})

test('GetLatestAndNextUrutan', async () => {
  const urutan = await GetLatestUrutan(
    'apQwiAb-9EWxv74iwMY6aQ',
    'rBdJhBgAdU2dU2DF6JFfhA',
    '5.1.02.02.01.0003',
    2021
  )
  const v = urutan.unwrapOr('000')
  const nextUrutan = GetNextUrutan(v)

  expect(urutan.isOk()).toBe(true)
  expect(v).toBe('007')
  expect(nextUrutan).toBe('008')
})
