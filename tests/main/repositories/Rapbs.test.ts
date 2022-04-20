import { Rapbs } from 'main/models/Rapbs'
import {
  GetLatestUrutan,
  GetNextUrutan,
  GetRapbsBulan,
} from 'main/repositories/Rapbs'
import { createConnection, getConnection } from 'typeorm'
import { cfg, Migrate } from '../migration'
import { AnggaranKegiatan } from 'main/types/Anggaran'

beforeEach(async () => {
  const db = await createConnection({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: false,
    entities: [Rapbs],
    synchronize: false,
    logging: process.env.NODE_ENV === 'development' ? true : false,
  })

  await Migrate(db, cfg)
})

afterEach(async () => {
  const con = getConnection()

  await con.close()
})

test('GetLatestAndNextUrutan', async () => {
  const urutan = await GetLatestUrutan(
    'apQwiAb-9EWxv74iwMY6aQ',
    'rBdJhBgAdU2dU2DF6JFfhA',
    '5.1.02.02.01.0003',
    2021
  )
  const v = urutan.unwrapOr('000')
  const nextUrutan = GetNextUrutan(v)

  expect(urutan.isOk()).toBe(true)
  expect(v).toBe('007')
  expect(nextUrutan).toBe('008')
})

test('GetRapbsBulan', async () => {
  const res = await GetRapbsBulan('apQwiAb-9EWxv74iwMY6aQ', 92)

  expect(res.isOk()).toBe(true)
  const rapbsBulanan = res.unwrapOr(<AnggaranKegiatan[]>[])
  expect(rapbsBulanan.length).toBeGreaterThanOrEqual(3)
  expect(rapbsBulanan[0].idAnggaran).toBe('apQwiAb-9EWxv74iwMY6aQ')
  expect(rapbsBulanan[0].idPeriode).toBe(92)
  expect(rapbsBulanan[0].idRapbs).toBe('oscfVRfYC0-MnRVq8OIIbQ')
  expect(rapbsBulanan[0].programKegiatan).toBe('Pengembangan Standar Isi')
  expect(rapbsBulanan[0].kegiatan).toBe('Penyusunan Kurikulum')
  expect(rapbsBulanan[0].rekeningBelanja).toBe(
    'Belanja Makanan dan Minuman pada Fasilitas Pelayanan Urusan Pendidikan'
  )
  expect(rapbsBulanan[0].uraian).toBe(
    'Belanja makan minum Workshop Peningkatan Kapasitas Guru'
  )
  expect(rapbsBulanan[0].jumlah).toBe(100)
  expect(rapbsBulanan[0].satuan).toBe('Orang')
  expect(rapbsBulanan[0].hargaSatuan).toBe(20000)
  expect(rapbsBulanan[0].total).toBe(2000000)
})
