import { KasUmum } from 'main/models/KasUmum'
import { KasUmumRepository } from 'main/repositories/KasUmumRepository'
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

test('GetLastTransactionDate', async () => {
  const bulan = 4
  const idAnggaran = '-ywMrrqE30Ck6P0p08Uj2w'
  const date = await kasUmumRepo.GetLastTransactionDate(idAnggaran, bulan)
  expect(date).toBe('2021-04-22')

  const bulan2 = 12
  const idAnggaran2 = '-ywMrrqE30Ck6P0p08Uj2w'
  const date2 = await kasUmumRepo.GetLastTransactionDate(idAnggaran2, bulan2)
  expect(date2).toBe(null)
})
