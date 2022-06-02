import { Ptk } from 'main/models/Ptk'
import {
  AddBulkPtk,
  GetLastUpdate,
  GetPtk,
} from 'main/repositories/PtkRepository'
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
    entities: [Ptk],
    synchronize: false,
    logging: true,
  })

  await Migrate(db, cfg)
})

afterEach(async () => {
  const con = getConnection()

  await con.close()
})

test('AddBulkPtk', async () => {
  const newDate = new Date()
  const dataPtk: any = []
  dataPtk.push({
    sekolahId: 'XN60oPUuEeC-vv2_lhMTXQ',
    ptkId: 'ZhCzoPUuEeCu8uXpSNkwnA',
    tahunAjaranId: 2022,
    nama: 'Rumi Wasi Yajie',
    jenisKelamin: 'P',
    masaKerjaTahun: 0,
    masaKerjaBulan: 0,
    nuptk: '8957760661200022',
    jenisPtkArkas: 10,
    pernahSerfikasi: 0,
    isCutOff: 0,
    createDate: newDate,
    lastUpdate: newDate,
    softDelete: 0,
  })

  const data = await AddBulkPtk(dataPtk)

  // check generated maps
  const insertMaps = data.raw

  expect(insertMaps).toBeGreaterThan(0)
})

test('GetLastUpdate', async () => {
  const lastUpdate = await GetLastUpdate()
  expect(lastUpdate).toBeDefined()
})

test('GetPtk', async () => {
  const tahunPtk = 2022

  const getResult = await GetPtk(tahunPtk)
  expect(getResult.length).toBeGreaterThan(0)
})
