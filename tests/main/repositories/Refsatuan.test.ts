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
  dataRefSatuan.push(<RefSatuan>{
    refSatuanId: CommonUtils.encodeUUID(CommonUtils.uuid()),
    satuan: 'Lembar Test',
    unit: 'Lembar Test',
    softDelete: 0,
    createDate: now,
    lastUpdate: now,
    expiredDate: null,
  })

  dataRefSatuan.push(<RefSatuan>{
    refSatuanId: CommonUtils.encodeUUID(CommonUtils.uuid()),
    satuan: 'Kegiatan Test',
    unit: 'Kegiatan Test',
    softDelete: 0,
    createDate: now,
    lastUpdate: now,
    expiredDate: null,
  })

  const InsertResult = await addBulkRefSatuan(dataRefSatuan)

  // check generated maps
  const data = InsertResult.generatedMaps
  expect(Object.keys(data).length).toBeGreaterThan(0)
})
