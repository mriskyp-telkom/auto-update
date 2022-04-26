import { createConnection, getConnection, getRepository } from 'typeorm'
import { Rapbs } from 'main/models/Rapbs'
import { Anggaran } from 'main/models/Anggaran'
import { MstSekolah } from 'main/models/MstSekolah'
import { AppConfig } from 'main/models/AppConfig'
import { RefSumberDana } from 'main/models/RefSumberDana'
import CommonUtils from 'main/utils/CommonUtils'
import { GetConfig } from 'main/repositories/Config'
import {
  AddAnggaran,
  GetAnggaran,
  GetAnggaranById,
  GetPagu,
  GetAnggaranBefore,
  DelAnggaran,
  CopyAnggaran,
  GetTotalAnggaran,
  UpdateIsPengesahan,
  UpdateTanggalPengajuan,
} from 'main/repositories/Anggaran'
import { cfg, Migrate } from '../migration'

beforeAll(async () => {
  process.env.NODE_ENV = 'testing'
})

beforeEach(async () => {
  const db = await createConnection({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: false,
    entities: [Anggaran, MstSekolah, AppConfig, RefSumberDana, Rapbs],
    synchronize: false,
    logging: true,
  })

  await Migrate(db, cfg)
})

afterEach(async () => {
  const con = getConnection()

  await con.close()
})

test('AddAnggaran', async () => {
  const createdDate = new Date()

  const data = {
    id_ref_sumber_dana: 1,
    tahun: 2022,
    volume: 10,
    harga_satuan: 10000,
    create_date: createdDate,
    pengguna_id: '222',
    id_penjab: '343',
  }

  const idAnggaran = CommonUtils.encodeUUIDFromV4()
  const dataAnggaran = new Anggaran()
  dataAnggaran.idAnggaran = idAnggaran
  dataAnggaran.idRefSumberDana = data.id_ref_sumber_dana
  dataAnggaran.sekolahId = await GetConfig('sekolah_id')
  dataAnggaran.tahunAnggaran = data.tahun
  dataAnggaran.volume = data.volume
  dataAnggaran.hargaSatuan = data.harga_satuan
  dataAnggaran.jumlah = data.volume * data.harga_satuan
  dataAnggaran.sisaAnggaran = 0
  dataAnggaran.isApprove = 0
  dataAnggaran.isRevisi = 0
  dataAnggaran.isAktif = 1
  dataAnggaran.softDelete = 0
  dataAnggaran.createDate = createdDate
  dataAnggaran.lastUpdate = createdDate
  dataAnggaran.updaterId = data.pengguna_id
  dataAnggaran.idPenjab = data.id_penjab

  const sekolahId = '123'
  const kodeWilayah = '123'
  const npsn = '123'
  const alamat = '123'
  const statusSekolah = 1
  const bentukPendidikanId = 1
  const kepsek = 'kepsek'
  const updaterId = 'updaterId'

  let mstSekolah = new MstSekolah()
  mstSekolah.sekolahId = sekolahId
  mstSekolah.kodeWilayah = kodeWilayah
  mstSekolah.npsn = npsn
  mstSekolah.alamat = alamat
  mstSekolah.statusSekolah = statusSekolah
  mstSekolah.bentukPendidikanId = bentukPendidikanId
  mstSekolah.kepsek = kepsek
  mstSekolah.createDate = createdDate
  mstSekolah.lastUpdate = createdDate
  mstSekolah.updaterId = updaterId

  mstSekolah = await getRepository(MstSekolah).save(mstSekolah)

  expect(mstSekolah.sekolahId).toBe(sekolahId)
  expect(mstSekolah.kodeWilayah).toBe(kodeWilayah)
  expect(mstSekolah.npsn).toBe(npsn)
  expect(mstSekolah.alamat).toBe(alamat)
  expect(mstSekolah.statusSekolah).toBe(statusSekolah)
  expect(mstSekolah.bentukPendidikanId).toBe(bentukPendidikanId)
  expect(mstSekolah.createDate).toBe(createdDate)
  expect(mstSekolah.lastUpdate).toBe(createdDate)
  expect(mstSekolah.updaterId).toBe(updaterId)

  dataAnggaran.mstsekolah = mstSekolah

  const insertResult = await AddAnggaran(dataAnggaran)

  expect(insertResult.identifiers.length).toBe(1)
})

test('GetAnggaran', async () => {
  const createdDate = new Date()

  const data = {
    id_ref_sumber_dana: 1,
    tahun: 2022,
  }

  let refSumberDana = new RefSumberDana()
  refSumberDana.idRefSumberDana = data.id_ref_sumber_dana
  refSumberDana.kode = 'aa'
  refSumberDana.namaSumberDana = 'aa'
  refSumberDana.createDate = createdDate
  refSumberDana.lastUpdate = createdDate

  refSumberDana = await getRepository(RefSumberDana).save(refSumberDana)

  expect(refSumberDana.idRefSumberDana).toBe(data.id_ref_sumber_dana)

  const tahunAnggaran = [data.tahun]

  const arrayOfAnggaran = await GetAnggaran(
    data.id_ref_sumber_dana,
    tahunAnggaran
  )

  expect(arrayOfAnggaran.length).toBeGreaterThan(0)

  const anggaran = arrayOfAnggaran[0]

  expect(anggaran.tahun).toBe(data.tahun)
  expect(anggaran.id_ref_sumber_dana).toBe(data.id_ref_sumber_dana)
})

test('GetAnggaranById', async () => {
  const idAnggaran = 'ODMMS_baREyJzOtKTDHEdw'
  const anggaran = await GetAnggaranById(idAnggaran)

  expect(anggaran.idAnggaran).toBe(idAnggaran)
})

test('GetPagu', async () => {
  const idAnggaran = 'ODMMS_baREyJzOtKTDHEdw'
  const pagu = await GetPagu(idAnggaran)

  expect(pagu.tahun_anggaran).toBe(2022)
})

test('GetAnggaranBefore', async () => {
  const data = {
    id_ref_sumber_dana: 1,
    tahun: 2022,
  }

  const idAnggaranBeforeCurrentYear = await GetAnggaranBefore(
    data.id_ref_sumber_dana,
    data.tahun
  )

  expect(idAnggaranBeforeCurrentYear).toBe('-ywMrrqE30Ck6P0p08Uj2w')
})

test('DelAnggaran', async () => {
  const result = await DelAnggaran('apQwiAb-9EWxv74iwMY6aQ')

  expect(result.affected).toBe(1)
})

test('CopyAnggaran', async () => {
  const idAnggaranBefore = 'ODMMS_baREyJzOtKTDHEdw',
    idRefSumberDana = 1,
    sekolahId = 'XN60oPUuEeC-vv2_lhMTXQ',
    tahun = 2022,
    volume = 267,
    hargaSatuan = 1100000,
    penggunaId = 'pUe9yWUZHkmYezDiz7DTDA',
    idPenjab = '3GIqBvF91Em6K_VasjmhTw'

  const newIdAnggaran = await CopyAnggaran(
    idAnggaranBefore,
    idRefSumberDana,
    sekolahId,
    tahun,
    volume,
    hargaSatuan,
    penggunaId,
    idPenjab
  )

  expect(newIdAnggaran).not.toBeNull()

  const anggaran = await GetAnggaranById(newIdAnggaran)

  expect(anggaran.idAnggaran).toBe(newIdAnggaran)
})

test('GetTotalAnggaran', async () => {
  const idTahap = 0
  const idAnggaran = 'apQwiAb-9EWxv74iwMY6aQ'

  const totalAnggaranData = await GetTotalAnggaran(idTahap, idAnggaran)

  expect(totalAnggaranData.total).toBe(108095000)
  expect(totalAnggaranData.id_anggaran).toBe(idAnggaran)
})

test('UpdateIsPengesahan', async () => {
  const idAnggaran = 'ODMMS_baREyJzOtKTDHEdw'
  await UpdateIsPengesahan(idAnggaran, 3)

  const anggaran = await GetAnggaranById(idAnggaran)
  expect(anggaran.isPengesahan).toBe(3)
})

test('UpdateTanggalPengajuan', async () => {
  const idAnggaran = 'ODMMS_baREyJzOtKTDHEdw'

  // date param from renderer, this repositories set by param renderer
  const anggaran = await UpdateTanggalPengajuan(
    idAnggaran,
    '2022-03-16 16:55:09.000'
  )
  expect(anggaran.affected).toBe(1)
})
