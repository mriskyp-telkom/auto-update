import { createConnection, getConnection, getRepository } from 'typeorm'
import { Anggaran } from 'main/models/Anggaran'
import { MstSekolah } from 'main/models/MstSekolah'
import { AppConfig } from 'main/models/AppConfig'
import { RefSumberDana } from 'main/models/RefSumberDana'
import CommonUtils from 'main/utils/CommonUtils'
import { GetConfig } from 'main/repositories/Config'
import { AddAnggaran, GetAnggaran } from 'main/repositories/Anggaran'
import { cfg, Migrate } from '../migration'

beforeAll(async () => {
  process.env.NODE_ENV = 'testing'
})

beforeEach(async () => {
  const db = await createConnection({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    entities: [Anggaran, MstSekolah, AppConfig, RefSumberDana],
    synchronize: false,
    logging: true,
  })

  await Migrate(db, cfg)
})

afterEach(async () => {
  const con = getConnection()

  await con.close()
})

test('AddAnggaran and GetAnggaran', async () => {
  const newDate = new Date()
  const data = {
    id_ref_sumber_dana: 1,
    tahun: 2022,
    volume: 10,
    harga_satuan: 10000,
    create_date: newDate,
    pengguna_id: '222',
    id_penjab: '343',
  }

  const idAnggaran = CommonUtils.encodeUUID(CommonUtils.uuid())
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
  dataAnggaran.createDate = new Date(data.create_date)
  dataAnggaran.lastUpdate = newDate
  dataAnggaran.updaterId = data.pengguna_id
  dataAnggaran.idPenjab = data.id_penjab

  const sekolahId = '123'
  const kodeWilayah = '123'
  const npsn = '123'
  const alamat = '123'
  const statusSekolah = 1
  const bentukPendidikanId = 1
  const kepsek = 'kepsek'
  const createdDate = newDate
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

  await AddAnggaran(dataAnggaran)

  let refSumberDana = new RefSumberDana()
  refSumberDana.idRefSumberDana = data.id_ref_sumber_dana
  refSumberDana.kode = 'aa'
  refSumberDana.namaSumberDana = 'aa'
  refSumberDana.createDate = createdDate
  refSumberDana.lastUpdate = createdDate

  refSumberDana = await getRepository(RefSumberDana).save(refSumberDana)
  expect(refSumberDana.idRefSumberDana).toBe(data.id_ref_sumber_dana)

  const tahunAnggaran = [data.tahun]

  const anggaran = await GetAnggaran(data.id_ref_sumber_dana, tahunAnggaran)
  expect(anggaran.length).toBe(1)
})
