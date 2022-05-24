import { STATUS_BKU_PERBULAN, STATUS_BKU_PERTAHUN } from 'global/constants'
import {
  GetListAnggaranRequest,
  Anggaran as AnggaranData,
  GetTotalSaldoRequest,
  GetTotalSaldoDibelanjakanRequest,
  GetTotalAnggaranPerBulanRequest,
} from 'global/types/TataUsaha'
import { AktivasiBku } from 'main/models/AktivasiBku'
import { Anggaran } from 'main/models/Anggaran'
import { AppConfig } from 'main/models/AppConfig'
import { KasUmum } from 'main/models/KasUmum'
import { MstSekolah } from 'main/models/MstSekolah'
import { Rapbs } from 'main/models/Rapbs'
import { GetConfig } from 'main/repositories/Config'
import { TataUsahaService } from 'main/services/TataUsaha'
import { Saldo } from 'main/types/KasUmum'
import { GetMonthName } from 'main/utils/Months'
import { createConnection, getConnection } from 'typeorm'
import { cfg, Migrate } from '../migration'

beforeEach(async () => {
  const db = await createConnection({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    entities: [AktivasiBku, AppConfig, KasUmum, Anggaran, MstSekolah, Rapbs],
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
  const request = <GetTotalSaldoDibelanjakanRequest>{
    idAnggaran: '3GIqBvF91Em6K_VasjmhTw',
    idPeriode: [92],
  }

  const res = await tataUsahaService.GetTotalSaldoDibelanjakan(request)
  expect(res).toBe(100)
})

test('GetTotalAnggaranPerBulan', async () => {
  const conn = getConnection()
  const tataUsahaService = new TataUsahaService(conn)
  const request = <GetTotalAnggaranPerBulanRequest>{
    idAnggaran: 'apQwiAb-9EWxv74iwMY6aQ',
    idPeriode: [92],
  }

  const res = await tataUsahaService.GetTotalAnggaranPerBulan(request)
  expect(res).toBe(26176000)
})
