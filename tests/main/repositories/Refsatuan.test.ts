import { RefSatuan } from 'main/models/RefSatuan'
import {
  getRefSatuanLastUpdate,
  getRefSatuan,
} from 'main/repositories/RefSatuan'
import { createConnection, getConnection } from 'typeorm'
import { cfg, Migrate } from '../migration'

beforeAll(async () => {
  process.env.NODE_ENV = 'testing'
})

beforeEach(async () => {
  const db = await createConnection({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: false,
    entities: [RefSatuan],
    synchronize: false,
    logging: true,
  })

  await Migrate(db, cfg)
})

afterEach(async () => {
  const con = getConnection()

  await con.close()
})

test('getRefSatuanLastUpdate', async () => {
  const data = await getRefSatuanLastUpdate()

  expect(data).toBe(2020)
})

test('getRefSatuan', async () => {
  const data = await getRefSatuan()

  expect(data.length).toBeGreaterThan(0)
})
