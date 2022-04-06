import { AppConfig } from 'main/models/AppConfig'
import { Rapbs } from 'main/models/Rapbs'
import { RapbsPeriode } from 'main/models/RapbsPeriode'
import { RapbsPtk } from 'main/models/RapbsPtk'
import { AddDetailKegiatan } from 'main/services/KertasKerjaService'
import {
  DetailKegiatan,
  Periode,
  Ptk,
  ResultDetailKegiatan,
} from 'main/types/Rapbs'
import { createConnection, getConnection, getRepository } from 'typeorm'
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

test('AddDetailKegiatanEmptyPtkPeriode', async () => {
  const data = <DetailKegiatan>{
    idAnggaran: '1',
    idRefKode: 'nC6K24ZodkO3wkcvW3wvYg',
    idRefTahunAnggaran: 2021,
    kodeRekening: '5.1.02.01.01.0024',
    idBarang: '01.200',
    uraian: 'Kertas HVS Folio',
    satuan: 'Rim',
    urutan: '001',
    volume: 10,
    hargaSatuan: 200,
    jumlah: 2000,
    ptk: null,
    periode: null,
  }

  const res = await AddDetailKegiatan(data)
  expect(res.isOk()).toBe(true)

  let ids = <ResultDetailKegiatan>{}
  res.map((responseData) => {
    ids = responseData
  })

  const rapbs = await getRepository(Rapbs).findOne({
    idRapbs: ids.idRapbs,
  })

  expect(rapbs.idAnggaran).toBe(data.idAnggaran)
  expect(rapbs.idRefKode).toBe(data.idRefKode)
  expect(rapbs.kodeRekening).toBe(data.kodeRekening)
  expect(rapbs.idBarang).toBe(data.idBarang)
  expect(rapbs.uraian).toBe(data.uraian)
  expect(rapbs.satuan).toBe(data.satuan)
  expect(rapbs.volume).toBe(data.volume)
  expect(rapbs.hargaSatuan).toBe(data.hargaSatuan)
  expect(rapbs.jumlah).toBe(data.jumlah)
})

test('AddDetailKegiatanSuccess', async () => {
  const data = <DetailKegiatan>{
    idAnggaran: 'apQwiAb-9EWxv74iwMY6aQ',
    idRefKode: 'nC6K24ZodkO3wkcvW3wvYg',
    idRefTahunAnggaran: 2021,
    kodeRekening: '5.1.02.01.01.0024',
    idBarang: '01.200',
    uraian: 'Kertas HVS Folio',
    satuan: 'Rim',
    urutan: '001',
    volume: 10,
    hargaSatuan: 200,
    jumlah: 2000,
    ptk: <Ptk>{
      idPtk: 'ZhCzoPUuEeCu8uXpSNkwnA',
      nama: 'Test PTK',
    },
    periode: <Periode[]>[
      {
        idPeriode: 84,
        volume: 2000,
        satuan: 'Rim',
        hargaSatuan: 200,
        jumlah: 10,
      },
      {
        idPeriode: 84,
        volume: 2000,
        satuan: 'Rim',
        hargaSatuan: 200,
        jumlah: 10,
      },
    ],
  }

  const res = await AddDetailKegiatan(data)
  expect(res.isOk()).toBe(true)

  let ids = <ResultDetailKegiatan>{}
  res.map((responseData) => {
    ids = responseData
  })

  const rapbs = await getRepository(Rapbs).findOne({
    idRapbs: ids.idRapbs,
  })

  expect(rapbs.idAnggaran).toBe(data.idAnggaran)
  expect(rapbs.idRefKode).toBe(data.idRefKode)
  expect(rapbs.kodeRekening).toBe(data.kodeRekening)
  expect(rapbs.idBarang).toBe(data.idBarang)
  expect(rapbs.uraian).toBe(data.uraian)
  expect(rapbs.satuan).toBe(data.satuan)
  expect(rapbs.volume).toBe(data.volume)
  expect(rapbs.hargaSatuan).toBe(data.hargaSatuan)
  expect(rapbs.jumlah).toBe(data.jumlah)
  expect(rapbs.urutan).toBe('009')

  const periode = await getRepository(RapbsPeriode).findOne({
    idRapbsPeriode: ids.idRapbsPeriode[0],
  })

  expect(periode.idPeriode).toBe(data.periode[0].idPeriode)
  expect(periode.satuan).toBe(data.periode[0].satuan)
  expect(periode.volume).toBe(data.periode[0].volume)
  expect(periode.hargaSatuan).toBe(data.periode[0].hargaSatuan)
  expect(periode.jumlah).toBe(data.periode[0].jumlah)

  const ptk = await getRepository(RapbsPtk).findOne({
    idRapbs: ids.idRapbs,
    ptkId: data.ptk.idPtk,
  })

  expect(ptk.nama).toBe(data.ptk.nama)
})
