import { SekolahPenjab } from 'main/models/SekolahPenjab'
import {
  GetSekolahPenjabById,
  addSekolahPenjab,
  findSekolahPenjabId,
  updateSekolahPenjab,
} from 'main/repositories/SekolahPenjabRepository'
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

afterEach(async () => {
  const con = getConnection()

  await con.close()
})

test('GetSekolahPenjabById', async () => {
  const data = await GetSekolahPenjabById('3GIqBvF91Em6K_VasjmhTw')

  //  in order to hide user information, using mock this data to hide the information. other than this data, is from db
  const ks = 'Wasidi'
  const nipKs = '123456789'
  const emailKs = 'Wasidi@wartek.belajar.id'
  const telpKs = '123456789'
  const bendahara = 'Wasidi'
  const nipBendahara = '123456789'
  const emailBendahara = 'Wasidi@wartek.belajar.id'
  const telpBendahara = '123456789'
  const komite = 'Wasidi'
  const nipKomite = ''
  const softDelete = 0
  // end of comment to hide user information mocked

  expect(data.idPenjab).toBe('3GIqBvF91Em6K_VasjmhTw')
  expect(data.sekolahId).toBe('XN60oPUuEeC-vv2_lhMTXQ')
  expect(data.tanggalMulai).toBe('2021-01-01')
  expect(data.tanggalSelesai).toBe('2021-12-31')

  //  in order to hide user information, using mock this data to hide the information. other than this data, is from db
  expect(data.ks).toBe(ks)
  expect(data.nipKs).toBe(nipKs)
  expect(data.emailKs).toBe(emailKs)
  expect(data.telpKs).toBe(telpKs)
  expect(data.bendahara).toBe(bendahara)
  expect(data.emailBendahara).toBe(emailBendahara)
  expect(data.nipBendahara).toBe(nipBendahara)
  expect(data.telpBendahara).toBe(telpBendahara)
  expect(data.komite).toBe(komite)
  expect(data.nipKomite).toBe(nipKomite)
  expect(data.softDelete).toBe(softDelete)
  // end of comment to hide user information mocked

  expect(data.updaterId).toBe('XN60oPUuEeC-vv2_lhMTXQ')
})

test('addSekolahPenjab', async () => {
  const idPenjab = '3GIqBvF91Em6K_VasjmhTw'
  const sekolahId = 'XN60oPUuEeC-vv2_lhMTXQ'
  const tanggalMulai = '2021-01-01'
  const tanggalSelesai = '2021-12-31'

  //  in order to hide user information, using mock this data to hide the information. other than this data, is from db
  const ks = 'Wasidi'
  const nipKs = '123456789'
  const emailKs = 'Wasidi@wartek.belajar.id'
  const telpKs = '123456789'
  const bendahara = 'Wasidi'
  const nipBendahara = '123456789'
  const emailBendahara = 'Wasidi@wartek.belajar.id'
  const telpBendahara = '123456789'
  const komite = 'Wasidi'
  const nipKomite = ''
  const softDelete = 0
  // end of comment to hide user information mocked

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
  expect(data.length).toBeGreaterThan(0)
})

test('findSekolahPenjabId', async () => {
  const idPenjab = '3GIqBvF91Em6K_VasjmhTw'
  const sekolahId = '3GIqBvF91Em6K_VasjmhTw'
  const tanggalMulai = '2021-01-01'
  const tanggalSelesai = '2021-12-31'

  //  in order to hide user information, using mock this data to hide the information. other than this data, is from db
  const ks = 'Wasidi'
  const nipKs = '123456789'
  const emailKs = 'Wasidi@wartek.belajar.id'
  const telpKs = '123456789'
  const bendahara = 'Wasidi'
  const nipBendahara = '123456789'
  const emailBendahara = 'Wasidi@wartek.belajar.id'
  const telpBendahara = '123456789'
  const komite = 'Wasidi'
  const nipKomite = ''
  const softDelete = 0
  // end of comment to hide user information mocked

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
  expect(sekolahPenjab).toBe('3GIqBvF91Em6K_VasjmhTw')
})

test('updateSekolahPenjab', async () => {
  const idPenjab = '3GIqBvF91Em6K_VasjmhTw'

  //  in order to hide user information, using mock this data to hide the information. other than this data, is from db
  const ks = 'Wasidi'
  const nipKs = '123456789'
  const emailKs = 'Wasidi@wartek.belajar.id'
  const telpKs = '123456789'
  const bendahara = 'Wasidi'
  const nipBendahara = '123456789'
  const emailBendahara = 'Wasidi@wartek.belajar.id'
  const telpBendahara = '123456789'
  const komite = 'Wasidi'
  const nipKomite = ''
  const softDelete = 0
  // end of comment to hide user information mocked

  const updaterId = 'XN60oPUuEeC-vv2_lhMTXQ'

  const dataSekolahPenjab = new SekolahPenjab()
  dataSekolahPenjab.idPenjab = idPenjab
  dataSekolahPenjab.ks = ks
  dataSekolahPenjab.telpKs = telpKs
  dataSekolahPenjab.emailKs = emailKs
  dataSekolahPenjab.nipKs = nipKs
  dataSekolahPenjab.bendahara = bendahara
  dataSekolahPenjab.emailBendahara = emailBendahara
  dataSekolahPenjab.nipBendahara = nipBendahara
  dataSekolahPenjab.telpBendahara = telpBendahara
  dataSekolahPenjab.komite = komite
  dataSekolahPenjab.nipKomite = nipKomite
  dataSekolahPenjab.softDelete = softDelete
  dataSekolahPenjab.createDate = new Date()
  dataSekolahPenjab.lastUpdate = new Date()
  dataSekolahPenjab.updaterId = updaterId

  const updateResult = await updateSekolahPenjab(dataSekolahPenjab)
  // check generated maps
  const data = updateResult.generatedMaps
  expect(data.length).toBe(0)
})
