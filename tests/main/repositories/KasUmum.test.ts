import { KasUmum } from 'main/models/KasUmum'
import { KasUmumRepository } from 'main/repositories/KasUmum'
import CommonUtils from 'main/utils/CommonUtils'
import { createConnection, getConnection, getRepository } from 'typeorm'
import { cfg, Migrate } from '../migration'

let kasUmumRepo: KasUmumRepository

beforeAll(async () => {
  process.env.NODE_ENV = 'testing'
})

beforeEach(async () => {
  const db = await createConnection({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: false,
    entities: [KasUmum],
    synchronize: false,
    logging: true,
  })

  await Migrate(db, cfg)

  kasUmumRepo = new KasUmumRepository(getConnection())
})

afterEach(async () => {
  const con = getConnection()

  await con.close()
})

test('GetNextNoBukti', async () => {
  const now = new Date()
  const kas = new KasUmum()
  kas.idKasUmum = CommonUtils.encodeUUID(CommonUtils.uuid())
  kas.idAnggaran = 'apQwiAb-9EWxv74iwMY6aQ'
  kas.saldo = 0
  kas.uraian = ''
  kas.idRefBku = 2
  kas.createDate = now
  kas.lastUpdate = now
  kas.updaterId = 'apQwiAb-9EWxv74iwMY6aQ'
  kas.tanggalTransaksi = now
  kas.noBukti = 'BBU01'

  await getRepository(KasUmum).insert(kas)

  const nextNoBukti1 = await kasUmumRepo.GetNextNoBukti('TEST')
  expect(nextNoBukti1).toBe('TEST01')

  const nextNoBukti2 = await kasUmumRepo.GetNextNoBukti('BBU')
  expect(nextNoBukti2).toBe('BBU02')
})
