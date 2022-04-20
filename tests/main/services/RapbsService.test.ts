import { AppConfig } from 'main/models/AppConfig'
import { Rapbs } from 'main/models/Rapbs'
import { RapbsPeriode } from 'main/models/RapbsPeriode'
import { RapbsPtk } from 'main/models/RapbsPtk'
import {
  AddDetailKegiatan,
  UpdateDetailKegiatan,
} from 'main/services/KertasKerjaService'
import {
  DetailKegiatan,
  Periode,
  Ptk,
  ResultAddDetailKegiatan,
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
    logging: process.env.NODE_ENV === 'development' ? true : false,
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

  let ids = <ResultAddDetailKegiatan>{}
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

test('AddandUpdateDetailKegiatanSuccess', async () => {
  const data = <DetailKegiatan>{
    idAnggaran: 'apQwiAb-9EWxv74iwMY6aQ',
    idRefKode: 'nC6K24ZodkO3wkcvW3wvYg',
    idRefTahunAnggaran: 2021,
    kodeRekening: '5.1.02.01.01.0024',
    idBarang: '01.200',
    uraian: 'Kertas HVS Folio',
    satuan: 'Rim',
    urutan: '009',
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
        idPeriode: 85,
        volume: 2500,
        satuan: 'Buah',
        hargaSatuan: 2500,
        jumlah: 10,
      },
    ],
  }

  const res = await AddDetailKegiatan(data)
  expect(res.isOk()).toBe(true)

  let ids = <ResultAddDetailKegiatan>{}
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
  expect(rapbs.urutan).toBe(data.urutan)
  expect(rapbs.uraian).toBe(data.uraian)
  expect(rapbs.satuan).toBe(data.satuan)
  expect(rapbs.volume).toBe(data.volume)
  expect(rapbs.hargaSatuan).toBe(data.hargaSatuan)
  expect(rapbs.jumlah).toBe(data.jumlah)
  expect(rapbs.urutan).toBe('009')

  const periode = await getRepository(RapbsPeriode).find({
    idRapbs: ids.idRapbs,
    softDelete: 0,
  })

  expect(periode.length).toBe(2)
  expect(periode[0].idPeriode).toBe(data.periode[0].idPeriode)
  expect(periode[0].satuan).toBe(data.periode[0].satuan)
  expect(periode[0].volume).toBe(data.periode[0].volume)
  expect(periode[0].hargaSatuan).toBe(data.periode[0].hargaSatuan)
  expect(periode[0].jumlah).toBe(data.periode[0].jumlah)

  expect(periode[1].idPeriode).toBe(data.periode[1].idPeriode)
  expect(periode[1].satuan).toBe(data.periode[1].satuan)
  expect(periode[1].volume).toBe(data.periode[1].volume)
  expect(periode[1].hargaSatuan).toBe(data.periode[1].hargaSatuan)
  expect(periode[1].jumlah).toBe(data.periode[1].jumlah)

  const ptk = await getRepository(RapbsPtk).findOne({
    idRapbs: ids.idRapbs,
    ptkId: data.ptk.idPtk,
  })

  expect(ptk.nama).toBe(data.ptk.nama)

  const currentRapbsId = ids.idRapbs
  const dataUpdate = <DetailKegiatan>{
    idRapbs: currentRapbsId,
    idAnggaran: 'apQwiAb-9EWxv74iwMY6aQ',
    idRefKode: 'nC6K24ZodkO3wkcvW3wvYg',
    idRefTahunAnggaran: 2021,
    kodeRekening: '5.1.02.01.01.0021',
    idBarang: '01.200',
    uraian: 'Pensil 2B Joyko P-88 Hijau (12 Pcs)',
    satuan: 'Paket',
    urutan: '009',
    volume: 5,
    hargaSatuan: 10000,
    jumlah: 50000,
    createDate: rapbs.createDate,
    ptk: null,
    periode: <Periode[]>[
      {
        idPeriode: 84,
        volume: 5,
        satuan: 'Buah',
        hargaSatuan: 10000,
        jumlah: 50000,
      },
      {
        idPeriode: 86,
        volume: 1,
        satuan: 'Buah',
        hargaSatuan: 15000,
        jumlah: 15000,
      },
      {
        idPeriode: 87,
        volume: 7,
        satuan: 'Buah',
        hargaSatuan: 300,
        jumlah: 21000,
      },
    ],
  }

  const resUpdate = await UpdateDetailKegiatan(dataUpdate)
  expect(resUpdate.isOk()).toBe(true)

  const rapbsUpdate = await getRepository(Rapbs).findOne({
    idRapbs: currentRapbsId,
    softDelete: 0,
  })

  expect(rapbsUpdate.idAnggaran).toBe(dataUpdate.idAnggaran)
  expect(rapbsUpdate.idRefKode).toBe(dataUpdate.idRefKode)
  expect(rapbsUpdate.kodeRekening).toBe(dataUpdate.kodeRekening)
  expect(rapbsUpdate.idBarang).toBe(dataUpdate.idBarang)
  expect(rapbsUpdate.urutan).toBe('001') // new urutan number because kodeRekening changed
  expect(rapbsUpdate.uraian).toBe(dataUpdate.uraian)
  expect(rapbsUpdate.satuan).toBe(dataUpdate.satuan)
  expect(rapbsUpdate.volume).toBe(dataUpdate.volume)
  expect(rapbsUpdate.hargaSatuan).toBe(dataUpdate.hargaSatuan)
  expect(rapbsUpdate.jumlah).toBe(dataUpdate.jumlah)
  expect(rapbsUpdate.urutan).toBe(dataUpdate.urutan)

  const periodeUpdate = await getRepository(RapbsPeriode).find({
    idRapbs: currentRapbsId,
    softDelete: 0,
  })

  expect(periodeUpdate.length).toBe(3)
  expect(periodeUpdate[0].idPeriode).toBe(dataUpdate.periode[0].idPeriode)
  expect(periodeUpdate[0].satuan).toBe(dataUpdate.periode[0].satuan)
  expect(periodeUpdate[0].volume).toBe(dataUpdate.periode[0].volume)
  expect(periodeUpdate[0].hargaSatuan).toBe(dataUpdate.periode[0].hargaSatuan)
  expect(periodeUpdate[0].jumlah).toBe(dataUpdate.periode[0].jumlah)

  expect(periodeUpdate[1].idPeriode).toBe(dataUpdate.periode[1].idPeriode)
  expect(periodeUpdate[1].satuan).toBe(dataUpdate.periode[1].satuan)
  expect(periodeUpdate[1].volume).toBe(dataUpdate.periode[1].volume)
  expect(periodeUpdate[1].hargaSatuan).toBe(dataUpdate.periode[1].hargaSatuan)
  expect(periodeUpdate[1].jumlah).toBe(dataUpdate.periode[1].jumlah)

  expect(periodeUpdate[2].idPeriode).toBe(dataUpdate.periode[2].idPeriode)
  expect(periodeUpdate[2].satuan).toBe(dataUpdate.periode[2].satuan)
  expect(periodeUpdate[2].volume).toBe(dataUpdate.periode[2].volume)
  expect(periodeUpdate[2].hargaSatuan).toBe(dataUpdate.periode[2].hargaSatuan)
  expect(periodeUpdate[2].jumlah).toBe(dataUpdate.periode[2].jumlah)
})
