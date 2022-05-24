import { Anggaran } from 'main/models/Anggaran'
import { IPCUpsertAnggaran } from 'main/services/AnggaranService'
import { createConnection, getConnection } from 'typeorm'
import { cfg, Migrate } from '../migration'
import { Anggaran as AnggaranData } from 'global/types/Anggaran'
import CommonUtils from 'main/utils/CommonUtils'
import { MstSekolah } from 'main/models/MstSekolah'
import { AppConfig } from 'main/models/AppConfig'
import { RefSumberDana } from 'main/models/RefSumberDana'
import { Rapbs } from 'main/models/Rapbs'
import { RefRekening } from 'main/models/RefRekening'
import { RefKode } from 'main/models/RefKode'
import { RefAcuanBarang } from 'main/models/RefAcuanBarang'
import { RapbsPeriode } from 'main/models/RapbsPeriode'
import { GetAnggaranById } from 'main/repositories/AnggaranRepository'

beforeEach(async () => {
  const db = await createConnection({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    entities: [
      Anggaran,
      MstSekolah,
      AppConfig,
      RefSumberDana,
      Rapbs,
      RefRekening,
      RefKode,
      RefAcuanBarang,
      RapbsPeriode,
    ],
    synchronize: false,
    logging: true,
  })

  await Migrate(db, cfg)
})

afterEach(async () => {
  const conn = getConnection()
  await conn.close()
})

test('IPCUpsertAnggaran', async () => {
  const data = <AnggaranData>{
    id_anggaran: CommonUtils.encodeUUID('d1ccb1b1-b4c3-4fb0-a30e-9b9c794c5c00'),
    id_ref_sumber_dana: 1,
    sekolah_id: CommonUtils.encodeUUID('6094c65c-2ef5-e011-83e7-014cdd781a59'),
    volume: 19,
    harga_satuan: 950000.0,
    jumlah: 18050000.0,
    sisa_anggaran: 0.0,
    is_pengesahan: 0,
    tanggal_pengajuan: '05/19/2022 12:19:26',
    tanggal_pengesahan: null,
    is_approve: 0,
    is_revisi: 0,
    alasan_penolakan: null,
    is_aktif: 1,
    soft_delete: 0,
    create_date: '05/19/2022 12:18:10',
    last_update: '05/19/2022 12:19:26',
    updater_id: CommonUtils.encodeUUID('45e20f94-ae9d-4aa8-a50f-717ff33ae8c3'),
    id_penjab: CommonUtils.encodeUUID('6350e6aa-911e-42a9-a386-90537ab7fc17'),
  }

  await IPCUpsertAnggaran(data)

  const result = await GetAnggaranById(data.id_anggaran)
  expect(result.idRefSumberDana).toBe(data.id_ref_sumber_dana)
  expect(result.volume).toBe(data.volume)
  expect(result.hargaSatuan).toBe(data.harga_satuan)
  expect(result.jumlah).toBe(data.jumlah)
  expect(result.hargaSatuan).toBe(data.harga_satuan)
  expect(result.sisaAnggaran).toBe(data.sisa_anggaran)
  expect(result.isPengesahan).toBe(data.is_pengesahan)
  expect(result.tanggalPengajuan.toISOString()).toBe('2022-05-19T05:19:26.000Z')
  expect(result.tanggalPengesahan).toBe(data.tanggal_pengesahan)
  expect(result.isApprove).toBe(data.is_approve)
  expect(result.isRevisi).toBe(data.is_revisi)
  expect(result.alasanPenolakan).toBe(data.alasan_penolakan)
  expect(result.isAktif).toBe(data.is_aktif)
})
