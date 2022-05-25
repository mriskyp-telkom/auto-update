import { STATUS_BKU_PERBULAN, STATUS_BKU_PERTAHUN } from 'global/constants'
import {
  GetListAnggaranRequest,
  Anggaran as AnggaranData,
  GetTotalSaldoRequest,
  GetTotalAnggaranRequest,
  CashWithdrawalRequest,
} from 'global/types/TataUsaha'
import { AktivasiBku } from 'main/models/AktivasiBku'
import { Anggaran } from 'main/models/Anggaran'
import { AppConfig } from 'main/models/AppConfig'
import { KasUmum } from 'main/models/KasUmum'
import { MstSekolah } from 'main/models/MstSekolah'
import { Rapbs } from 'main/models/Rapbs'
import { RapbsPeriode } from 'main/models/RapbsPeriode'
import { GetConfig } from 'main/repositories/ConfigRepository'
import { TataUsahaService } from 'main/services/TataUsahaService'
import { Saldo } from 'main/types/KasUmum'
import { GetMonthName } from 'main/utils/Months'
import { createConnection, getConnection, getRepository } from 'typeorm'
import { cfg, Migrate } from '../migration'

beforeEach(async () => {
  const db = await createConnection({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    entities: [
      AktivasiBku,
      AppConfig,
      KasUmum,
      Anggaran,
      MstSekolah,
      Rapbs,
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

test('GetListAnggaran', async () => {
  const conn = getConnection()
  const tataUsahaService = new TataUsahaService(conn)

  const req = <GetListAnggaranRequest>{
    idSumberDana: 1,
    tahunAnggaran: [],
  }

  let tahunAktif = new Date().getFullYear()
  const tahunAktifConfig = await GetConfig('tahun_aktif')
  if (tahunAktifConfig !== '') {
    tahunAktif = parseInt(tahunAktifConfig)
  }

  const numberOfYear = 4
  req.tahunAnggaran = [...Array(numberOfYear)].map(
    (_, i) => tahunAktif - numberOfYear + (i + 1)
  )

  const res = await tataUsahaService.GetListAnggaran(req)
  expect(res.isErr()).toBe(false)

  const data = res.unwrapOr(<AnggaranData[]>[])
  expect(data[0].tahun).toBe(2022)
  expect(data[0].idAnggaran).toBe('ODMMS_baREyJzOtKTDHEdw')
  expect(data[0].status).toBe(STATUS_BKU_PERTAHUN.temporary_inactive)
  expect(data[0].isAnggaranApproved).toBe(false)

  for (const bulan of data[0].bulan) {
    expect(bulan.bulan).toBe(GetMonthName(bulan.idPeriode))

    if (bulan.bulan === 'februari') {
      expect(bulan.status).toBe(STATUS_BKU_PERBULAN.draft)
    } else {
      expect(bulan.status).toBe(STATUS_BKU_PERBULAN.not_created)
    }
  }

  expect(data[1].tahun).toBe(2021)
  expect(data[1].idAnggaran).toBe('-ywMrrqE30Ck6P0p08Uj2w')
  expect(data[1].status).toBe(STATUS_BKU_PERTAHUN.active)
  expect(data[1].isAnggaranApproved).toBe(true)

  for (const bulan of data[1].bulan) {
    expect(bulan.bulan).toBe(GetMonthName(bulan.idPeriode))

    if (bulan.bulan === 'januari' || bulan.bulan === 'februari') {
      expect(bulan.status).toBe(STATUS_BKU_PERBULAN.draft)
    } else {
      expect(bulan.status).toBe(STATUS_BKU_PERBULAN.not_created)
    }
  }

  expect(data[2].tahun).toBe(2020)
  expect(data[2].idAnggaran).toBe('pUe9yWUZHkmYezDiz7DTDA')
  expect(data[2].status).toBe(STATUS_BKU_PERTAHUN.date_over)
  expect(data[2].isAnggaranApproved).toBe(false)
  expect(data[2].bulan.length).toBe(0)

  expect(data[3].tahun).toBe(2019)
  expect(data[3].idAnggaran).toBe('3GIqBvF91Em6K_VasjmhTw')
  expect(data[3].status).toBe(STATUS_BKU_PERTAHUN.done)
  expect(data[3].isAnggaranApproved).toBe(true)

  for (const bulan of data[3].bulan) {
    expect(bulan.bulan).toBe(GetMonthName(bulan.idPeriode))
    expect(bulan.status).toBe(STATUS_BKU_PERBULAN.done)
  }
})

test('GetTotalSaldo', async () => {
  const conn = getConnection()
  const tataUsahaService = new TataUsahaService(conn)
  const request = <GetTotalSaldoRequest>{
    idAnggaran: '-ywMrrqE30Ck6P0p08Uj2w',
    startDate: '2021-01-01',
    endDate: '2021-12-30',
  }

  const res = await tataUsahaService.GetTotalSaldo(request)
  const saldo = res.unwrapOr(<Saldo>{})
  expect(saldo.sisaBank).toBe(50)
  expect(saldo.sisaTunai).toBe(25)
})

test('GetTotalSaldoDibelanjakan', async () => {
  const conn = getConnection()
  const tataUsahaService = new TataUsahaService(conn)
  const request = <GetTotalAnggaranRequest>{
    idAnggaran: '3GIqBvF91Em6K_VasjmhTw',
    idPeriode: [92],
  }

  const res = await tataUsahaService.GetTotalSaldoDibelanjakan(request)
  expect(res).toBe(100)
})

test('GetTotalAnggaranPerBulan', async () => {
  const conn = getConnection()
  const tataUsahaService = new TataUsahaService(conn)
  const request = <GetTotalAnggaranRequest>{
    idAnggaran: 'apQwiAb-9EWxv74iwMY6aQ',
    idPeriode: [92],
  }

  const res = await tataUsahaService.GetTotalAnggaranPerBulan(request)
  expect(res).toBe(26176000)
})

test('GetTotalPerluDianggarkanUlang', async () => {
  const promises = []
  const now = new Date()
  const idAnggaran = 'idAnggaran-1'
  const conn = getConnection()
  const tataUsahaService = new TataUsahaService(conn)

  const seedKasUmum = new KasUmum({
    idAnggaran: idAnggaran,
    idKasUmum: 'idKasUmum-1',
    idRapbsPeriode: 'idRapbsPeriode-1',
    volume: 3000,
    saldo: 1000,
    idRefBku: 4,
    tanggalTransaksi: now,
    uraian: 'uraian',
    createDate: now,
    lastUpdate: now,
  })

  const seedKasUmum2 = new KasUmum({
    idAnggaran: idAnggaran,
    idKasUmum: 'idKasUmum-2',
    idRapbsPeriode: 'idRapbsPeriode-2',
    volume: 3000,
    saldo: 9000,
    idRefBku: 15,
    tanggalTransaksi: now,
    uraian: 'uraian',
    createDate: now,
    lastUpdate: now,
  })

  promises.push(conn.getRepository(KasUmum).insert([seedKasUmum, seedKasUmum2]))

  const seedRapbs = new Rapbs({
    idAnggaran: idAnggaran,
    idRapbs: 'idRapbs-1',
    sekolahId: 'sekolahId-1',
    idRefKode: 'idRefKode-1',
    idRefTahunAnggaran: 2022,
    kodeRekening: '5.1.02.04.01.0003',
    uraian: 'uraian',
    volume: 10,
    satuan: 'Unit',
    hargaSatuan: 10,
    jumlah: 100,
    createDate: now,
    lastUpdate: now,
  })

  promises.push(conn.getRepository(Rapbs).insert(seedRapbs))

  const seedRapbsPeriode = new RapbsPeriode({
    idRapbsPeriode: seedKasUmum.idRapbsPeriode,
    idRapbs: seedRapbs.idRapbs,
    idPeriode: 81,
    volume: 3000,
    satuan: 'Unit',
    hargaSatuan: 10,
    jumlah: 30000,
    createDate: now,
    lastUpdate: now,
  })

  const seedRapbsPeriode2 = new RapbsPeriode({
    idRapbsPeriode: seedKasUmum2.idRapbsPeriode,
    idRapbs: seedRapbs.idRapbs,
    idPeriode: 82,
    volume: 3000,
    satuan: 'Unit',
    hargaSatuan: 10,
    jumlah: 30000,
    createDate: now,
    lastUpdate: now,
  })

  promises.push(
    conn
      .getRepository(RapbsPeriode)
      .insert([seedRapbsPeriode, seedRapbsPeriode2])
  )

  await Promise.all(promises)

  const request = <GetTotalAnggaranRequest>{
    idAnggaran: idAnggaran,
    idPeriode: [80, 81, 82],
  }

  const res = await tataUsahaService.GetTotalPerluDianggarkanUlang(request)
  expect(res).toBe(
    seedRapbsPeriode.jumlah +
      seedRapbsPeriode2.jumlah -
      (seedKasUmum.saldo + seedKasUmum2.saldo)
  )
})

test('CashWithdrawal', async () => {
  const conn = getConnection()
  const tataUsahaService = new TataUsahaService(conn)
  const request = <CashWithdrawalRequest>{
    idAnggaran: 'apQwiAb-9EWxv74iwMY6aQ',
    amount: 90000,
    date: new Date('2022-05-10T00:00:00.000Z'),
  }
  const res = await tataUsahaService.CashWithdrawal(request)

  expect(res.isOk()).toBe(true)

  const kasUmumList = await getRepository(KasUmum).find({
    idAnggaran: request.idAnggaran,
  })

  expect(kasUmumList.length).toBeGreaterThan(0)

  for (const k of kasUmumList) {
    switch (k.idRefBku) {
      case 3:
        expect(k.uraian).toBe('Tarik Tunai')
        expect(k.saldo).toBe(90000)
        expect(k.tanggalTransaksi.toISOString()).toBe(
          '2022-05-10T00:00:00.000Z'
        )
        break
      case 12:
        expect(k.uraian).toBe('Pergeseran Uang di Bank')
        expect(k.saldo).toBe(90000)
        expect(k.tanggalTransaksi.toISOString()).toBe(
          '2022-05-10T00:00:00.000Z'
        )
        break
    }
  }
})
