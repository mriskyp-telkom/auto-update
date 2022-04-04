import { AppConfig } from 'main/models/AppConfig'
import { GetConfig } from 'main/repositories/Config'
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
    entities: [AppConfig],
    synchronize: false,
    logging: true,
  })

  await Migrate(db, cfg)
})

afterEach(() => {
  const conn = getConnection()
  conn.close()
})

test('GetConfig', async () => {
  const sekolah_id = await GetConfig('sekolah_id')
  expect(sekolah_id).toBe('XN60oPUuEeC-vv2_lhMTXQ')
})
