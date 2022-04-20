import { AppConfig } from 'main/models/AppConfig'
import {
  GetConfig,
  SetConfig,
  DeleteConfig,
  SetBulkConfig,
} from 'main/repositories/Config'
import { createConnection, getConnection } from 'typeorm'
import { cfg, Migrate } from '../migration'
import {
  getLoggerConfigLocal,
  getSynchronizeConfigUnitTest,
} from '../../../src/dbConfig'

beforeAll(async () => {
  process.env.NODE_ENV = 'testing'
})

beforeEach(async () => {
  const db = await createConnection({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: false,
    entities: [AppConfig],
    synchronize: getSynchronizeConfigUnitTest(),
    logging: getLoggerConfigLocal(),
  })

  await Migrate(db, cfg)
})

afterEach(async () => {
  const con = getConnection()

  await con.close()
})

test('GetConfig', async () => {
  const sekolah_id = await GetConfig('sekolah_id')
  expect(sekolah_id).toBe('XN60oPUuEeC-vv2_lhMTXQ')
})

test('SetConfig', async () => {
  const result = await SetConfig('is_lokasi_terpencil', 'true')
  expect(result.identifiers[0].varname).toBe('is_lokasi_terpencil')
})

test('DeleteConfig', async () => {
  const result = await DeleteConfig('sekolah_id')
  expect(result.affected).toBeGreaterThan(0)
})

test('SetBulkConfig', async () => {
  const data = []
  data.push({ varname: 'is_sekolah_terpencil', varvalue: 'true' })
  data.push({ varname: 'is_ada_listrik', varvalue: 'false' })

  const result = await SetBulkConfig(data)
  expect(result.identifiers[1].varname).toBe('is_ada_listrik')
})
