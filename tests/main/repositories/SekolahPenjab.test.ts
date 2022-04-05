import { SekolahPenjab } from 'main/models/SekolahPenjab'
import {
  GetSekolahPenjabById,
  addSekolahPenjab,
  findSekolahPenjabId,
  updateSekolahPenjab,
} from 'main/repositories/SekolahPenjab'
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
    entities: [SekolahPenjab],
    synchronize: false,
    logging: true,
  })

  await Migrate(db, cfg)
})

afterEach(() => {
  const conn = getConnection()
  conn.close()
})

test('GetSekolahPenjabById', async () => {
  const data = await GetSekolahPenjabById('3GIqBvF91Em6K_VasjmhTw')

  // console.log("isian data")
  //   console.log(data)

  expect(data.idPenjab).toBe('3GIqBvF91Em6K_VasjmhTw')
  expect(data.sekolahId).toBe('XN60oPUuEeC-vv2_lhMTXQ')
  expect(data.tanggalMulai).toBe('2021-01-01')
  expect(data.tanggalSelesai).toBe('2021-12-31')
  expect(data.ks).toBe('Sarjiyono, S.Pd.,M.Pd.')
  expect(data.nipKs).toBe('196903141993011001')
  expect(data.emailKs).toBe('yono.sarjono.sarji@gmail.com')
  expect(data.telpKs).toBe('081328077124')
  expect(data.bendahara).toBe('Wasidi')
  expect(data.nipBendahara).toBe('197311171999031005')
  expect(data.komite).toBe('Sumijo, S.Pd.SD.')
  expect(data.nipKomite).toBe('')
  expect(data.softDelete).toBe(0)
  expect(data.updaterId).toBe('XN60oPUuEeC-vv2_lhMTXQ')
})

test('addSekolahPenjab', async () => {
  const idPenjab = '3GIqBvF91Em6K_VasjmhTw'
  const sekolahId = '3GIqBvF91Em6K_VasjmhTw'
  const tanggalMulai = '2021-01-01'
  const tanggalSelesai = '2021-12-31'
  const ks = 'Sarjiyono, S.Pd.,M.Pd.'
  const nipKs = '196903141993011001'
  const emailKs = 'yono.sarjono.sarji@gmail.com'
  const telpKs = '081328077124'
  const bendahara = 'Wasidi'
  const nipBendahara = '197311171999031005'
  const emailBendahara = 'wasidi117@gmail.com'
  const telpBendahara = '085228787703'
  const komite = 'Sumijo, S.Pd.SD.'
  const nipKomite = ''
  const softDelete = 0
  const updaterId = 'XN60oPUuEeC-vv2_lhMTXQ'

  const dataSekolahPenjab = new SekolahPenjab()
  dataSekolahPenjab.idPenjab = idPenjab
  dataSekolahPenjab.sekolahId = sekolahId
  dataSekolahPenjab.tanggalMulai = tanggalMulai
  dataSekolahPenjab.tanggalSelesai = tanggalSelesai
  dataSekolahPenjab.ks = ks
  dataSekolahPenjab.nipKs = nipKs
  dataSekolahPenjab.emailKs = emailKs
  dataSekolahPenjab.telpKs = telpKs
  dataSekolahPenjab.bendahara = bendahara
  dataSekolahPenjab.nipBendahara = nipBendahara
  dataSekolahPenjab.emailBendahara = emailBendahara
  dataSekolahPenjab.telpBendahara = telpBendahara
  dataSekolahPenjab.komite = komite
  dataSekolahPenjab.nipKomite = nipKomite
  dataSekolahPenjab.softDelete = softDelete
  dataSekolahPenjab.createDate = new Date()
  dataSekolahPenjab.lastUpdate = new Date()
  dataSekolahPenjab.updaterId = updaterId

  const insertResult = await addSekolahPenjab(dataSekolahPenjab)
  // check generated maps
  const data = insertResult.generatedMaps
  //   console.log(data)
  expect(data.length).toBeGreaterThan(0)
})

test('findSekolahPenjabId', async () => {
  const idPenjab = '3GIqBvF91Em6K_VasjmhTw'
  const sekolahId = '3GIqBvF91Em6K_VasjmhTw'
  const tanggalMulai = '2021-01-01'
  const tanggalSelesai = '2021-12-31'
  const ks = 'Sarjiyono, S.Pd.,M.Pd.'
  const nipKs = '196903141993011001'
  const emailKs = 'yono.sarjono.sarji@gmail.com'
  const telpKs = '081328077124'
  const bendahara = 'Wasidi'
  const nipBendahara = '197311171999031005'
  const emailBendahara = 'wasidi117@gmail.com'
  const telpBendahara = '085228787703'
  const komite = 'Sumijo, S.Pd.SD.'
  const nipKomite = ''
  const softDelete = 0
  const updaterId = 'XN60oPUuEeC-vv2_lhMTXQ'

  const dataSekolahPenjab = new SekolahPenjab()
  dataSekolahPenjab.idPenjab = idPenjab
  dataSekolahPenjab.sekolahId = sekolahId
  dataSekolahPenjab.tanggalMulai = tanggalMulai
  dataSekolahPenjab.tanggalSelesai = tanggalSelesai
  dataSekolahPenjab.ks = ks
  dataSekolahPenjab.nipKs = nipKs
  dataSekolahPenjab.emailKs = emailKs
  dataSekolahPenjab.telpKs = telpKs
  dataSekolahPenjab.bendahara = bendahara
  dataSekolahPenjab.nipBendahara = nipBendahara
  dataSekolahPenjab.emailBendahara = emailBendahara
  dataSekolahPenjab.telpBendahara = telpBendahara
  dataSekolahPenjab.komite = komite
  dataSekolahPenjab.nipKomite = nipKomite
  dataSekolahPenjab.softDelete = softDelete
  dataSekolahPenjab.createDate = new Date()
  dataSekolahPenjab.lastUpdate = new Date()
  dataSekolahPenjab.updaterId = updaterId

  const sekolahPenjab = await findSekolahPenjabId(dataSekolahPenjab)
  // check generated maps
  //   console.log(sekolahPenjab)
  expect(sekolahPenjab).toBe('3GIqBvF91Em6K_VasjmhTw')
})

test('updateSekolahPenjab', async () => {
  const idPenjab = '3GIqBvF91Em6K_VasjmhTw'
  const ks = 'Sarjiyono, S.Pd.,M.Pd.'
  const nipKs = '196903141993011001'
  const bendahara = 'Wasidi'
  const nipBendahara = '197311171999031005'
  const komite = 'Sumijo, S.Pd.SD.'
  const nipKomite = ''
  const updaterId = 'XN60oPUuEeC-vv2_lhMTXQ'

  const dataSekolahPenjab = new SekolahPenjab()
  dataSekolahPenjab.idPenjab = idPenjab
  dataSekolahPenjab.ks = ks
  dataSekolahPenjab.nipKs = nipKs
  dataSekolahPenjab.bendahara = bendahara
  dataSekolahPenjab.nipBendahara = nipBendahara
  dataSekolahPenjab.komite = komite
  dataSekolahPenjab.nipKomite = nipKomite
  dataSekolahPenjab.createDate = new Date()
  dataSekolahPenjab.lastUpdate = new Date()
  dataSekolahPenjab.updaterId = updaterId

  const updateResult = await updateSekolahPenjab(dataSekolahPenjab)
  // check generated maps
  const data = updateResult.generatedMaps
  //   console.log(data)
  expect(data.length).toBe(0)
})
