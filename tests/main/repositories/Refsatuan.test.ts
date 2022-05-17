import { RefSatuan } from 'main/models/RefSatuan'
import {
  addBulkRefSatuan,
  getRefSatuanLastUpdate,
  getRefSatuan,
} from 'main/repositories/RefSatuan'
import CommonUtils from 'main/utils/CommonUtils'
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

  expect(data).toBeDefined()
})

test('getRefSatuan', async () => {
  const data = await getRefSatuan()

  expect(Object.keys(data).length).toBeGreaterThan(0)
})

test('addBulkRefSatuan', async () => {
  const now = new Date()

  const dataRefSatuan: RefSatuan[] = []
  const ref = new RefSatuan()
  ref.refSatuanId = CommonUtils.encodeUUID(CommonUtils.uuid())
  ref.satuan = 'Lembar Test'
  ref.unit = 'Lembar Test'
  ref.createDate = now
  ref.lastUpdate = now
  dataRefSatuan.push(ref)

  const ref2 = new RefSatuan()
  ref2.refSatuanId = CommonUtils.encodeUUID(CommonUtils.uuid())
  ref2.satuan = 'Kertas Test'
  ref2.unit = 'Kertas Test'
  ref2.createDate = now
  ref2.lastUpdate = now
  dataRefSatuan.push(ref2)

  const InsertResult = await addBulkRefSatuan(dataRefSatuan)

  // check generated maps
  const data = InsertResult.generatedMaps
  expect(Object.keys(data).length).toBeGreaterThan(0)
})
