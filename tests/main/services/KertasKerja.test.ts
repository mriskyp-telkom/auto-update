import { AppConfig } from 'main/models/AppConfig'
import { Rapbs } from 'main/models/Rapbs'
import { RapbsPeriode } from 'main/models/RapbsPeriode'
import { RapbsPtk } from 'main/models/RapbsPtk'
import { GetDetailKegiatan } from 'main/services/KertasKerja'
import { DetailAnggaranKegiatan } from 'main/types/Anggaran'
import { createConnection, getConnection } from 'typeorm'
import { cfg, Migrate } from '../migration'

beforeEach(async () => {
  const db = await createConnection({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    entities: [Rapbs, RapbsPeriode, RapbsPtk, AppConfig],
    synchronize: false,
    logging: true,
  })

  await Migrate(db, cfg)
})

afterEach(async () => {
  const conn = getConnection()
  await conn.close()
})

test('GetDetailKegiatan', async () => {
  const res = await GetDetailKegiatan('oscfVRfYC0-MnRVq8OIIbQ')
  const dataTest1 = res.unwrapOr(<DetailAnggaranKegiatan>{})

  expect(res.isErr()).toBe(false)
  expect(dataTest1.anggaran.idAnggaran).toBe('apQwiAb-9EWxv74iwMY6aQ')
  expect(dataTest1.anggaran.idPeriode).toBe(92)
  expect(dataTest1.anggaran.idRapbs).toBe('oscfVRfYC0-MnRVq8OIIbQ')
  expect(dataTest1.anggaran.idRefKode).toBe('rBdJhBgAdU2dU2DF6JFfhA')
  expect(dataTest1.anggaran.kodeRekening).toBe('5.1.02.01.01.0055')
  expect(dataTest1.anggaran.idBarang).toBe('')
  expect(dataTest1.anggaran.isHonor).toBe(0)
  expect(dataTest1.anggaran.programKegiatan).toBe('Pengembangan Standar Isi')
  expect(dataTest1.anggaran.kegiatan).toBe('Penyusunan Kurikulum')
  expect(dataTest1.anggaran.rekeningBelanja).toBe(
    'Belanja Makanan dan Minuman pada Fasilitas Pelayanan Urusan Pendidikan'
  )
  expect(dataTest1.anggaran.uraian).toBe(
    'Belanja makan minum Workshop Peningkatan Kapasitas Guru'
  )

  expect(dataTest1.periode[0].bulan).toBe('desember')
  expect(dataTest1.periode[0].periode).toBe(92)
  expect(dataTest1.periode[0].satuan).toBe('Orang')
  expect(dataTest1.periode[0].jumlah).toBe(100)
  expect(dataTest1.periode[0].hargaSatuan).toBe(20000)
  expect(dataTest1.periode[0].total).toBe(2000000)

  const resIsHonor = await GetDetailKegiatan('XN60oPUuEeC-vv2_lhMTXQ')
  const dataTest2 = resIsHonor.unwrapOr(<DetailAnggaranKegiatan>{})

  expect(dataTest2.anggaran.idAnggaran).toBe('apQwiAb-9EWxv74iwMY6aQ')
  expect(dataTest2.anggaran.idPeriode).toBe(92)
  expect(dataTest2.anggaran.idRapbs).toBe('XN60oPUuEeC-vv2_lhMTXQ')
  expect(dataTest2.anggaran.idRefKode).toBe('JfpVF35Cd0aOZmb0bhN2iA')
  expect(dataTest2.anggaran.kodeRekening).toBe('5.1.02.01.01.0055')
  expect(dataTest2.anggaran.idBarang).toBe('02.04.01.09.17')
  expect(dataTest2.anggaran.isHonor).toBe(1)
  expect(dataTest2.anggaran.programKegiatan).toBe(
    'Pengembangan standar pembiayaan'
  )
  expect(dataTest2.anggaran.kegiatan).toBe('Pembayaran Honor Guru')
  expect(dataTest2.anggaran.rekeningBelanja).toBe(
    'Belanja Makanan dan Minuman pada Fasilitas Pelayanan Urusan Pendidikan'
  )
  expect(dataTest2.anggaran.uraian).toBe(
    'Belanja makan minum Workshop Peningkatan Kapasitas Guru'
  )
  expect(dataTest2.anggaran.errorUraian).toBe(0)
  expect(dataTest2.anggaran.errorKegiatan).toBe(0)
  expect(dataTest2.anggaran.errorRekening).toBe(0)

  expect(dataTest2.periode[0].bulan).toBe('desember')
  expect(dataTest2.periode[0].periode).toBe(92)
  expect(dataTest2.periode[0].satuan).toBe('Orang')
  expect(dataTest2.periode[0].jumlah).toBe(100)
  expect(dataTest2.periode[0].hargaSatuan).toBe(20000)
  expect(dataTest2.periode[0].total).toBe(2000000)
  expect(dataTest2.rapbsPtk.nama).toBe('Rumi Wasi Yajie')
  expect(dataTest2.rapbsPtk.idPtk).toBe('ZhCzoPUuEeCu8uXpSNkwnA')
})
