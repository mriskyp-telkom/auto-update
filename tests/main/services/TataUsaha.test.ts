import { STATUS_BKU_PERBULAN, STATUS_BKU_PERTAHUN } from 'global/constants'
import { InformasiToko } from 'global/types/BuktiBelanjaType'
import {
  GetListAnggaranRequest,
  Anggaran as AnggaranData,
  GetTotalSaldoRequest,
  GetTotalAnggaranRequest,
  CashWithdrawalRequest,
  GetListKasUmumRequest,
  TarikTunai,
  GetTotalSaldoByPeriodeRequest,
  Saldo,
  GetLastTransactionDateRequest,
} from 'global/types/TataUsaha'
import { AktivasiBku } from 'main/models/AktivasiBku'
import { Anggaran } from 'main/models/Anggaran'
import { AppConfig } from 'main/models/AppConfig'
import { KasUmum } from 'main/models/KasUmum'
import { KasUmumNota } from 'main/models/KasUmumNota'
import { MstSekolah } from 'main/models/MstSekolah'
import { Rapbs } from 'main/models/Rapbs'
import { RapbsPeriode } from 'main/models/RapbsPeriode'
import { GetConfig } from 'main/repositories/ConfigRepository'
import { TataUsahaService } from 'main/services/TataUsahaService'
import CommonUtils from 'main/utils/CommonUtils'
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
      KasUmumNota,
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

test('GetTotalSaldoByPeriode', async () => {
  const conn = getConnection()
  const tataUsahaService = new TataUsahaService(conn)
  const request = <GetTotalSaldoByPeriodeRequest>{
    idAnggaran: '-ywMrrqE30Ck6P0p08Uj2w',
    idPeriode: 84,
  }

  const res = await tataUsahaService.GetTotalSaldoByPeriode(request)
  const saldo = res.unwrapOr(<Saldo>{})
  expect(saldo.sisaBank).toBe(50)
  expect(saldo.sisaTunai).toBe(25)
})

test('GetTotalSaldoDibelanjakan', async () => {
  const conn = getConnection()
  const tataUsahaService = new TataUsahaService(conn)
  const request = <GetTotalAnggaranRequest>{
    idAnggaran: '3GIqBvF91Em6K_VasjmhTw',
    idPeriode: 92,
  }

  const res = await tataUsahaService.GetTotalSudahDibelanjakan(request)
  expect(res.isOk()).toBe(true)
  expect(res.unwrapOr(0)).toBe(100)
})

test('GetTotalAnggaranPerBulan', async () => {
  const conn = getConnection()
  const tataUsahaService = new TataUsahaService(conn)
  const request = <GetTotalAnggaranRequest>{
    idAnggaran: 'apQwiAb-9EWxv74iwMY6aQ',
    idPeriode: 92,
  }

  const res = await tataUsahaService.GetTotalBisaDibelanjakan(request)
  expect(res.isOk()).toBe(true)
  expect(res.unwrapOr(0)).toBe(147285000)
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
    idPeriode: 82,
  }

  const res = await tataUsahaService.GetTotalPerluDianggarkanUlang(request)
  expect(res.isOk()).toBe(true)
  expect(res.unwrapOr(0)).toBe(
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

test('GetListKasUmum ', async () => {
  const idAnggaran = '-ywMrrqE30Ck6P0p08Uj2w'
  const now = new Date()
  const conn = getConnection()
  const promises = []
  const seedRapbs = new Rapbs({
    idAnggaran: idAnggaran,
    idRapbs: 'idRapbs-1',
    sekolahId: 'sekolahId-1',
    idRefKode: '22OId5G6YUOZTaSawYOvcw',
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
    idRapbsPeriode: '6WX3WYnrKUOQRXNkdsbYuw',
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
    idRapbsPeriode: 'idRapbsPeriode-1',
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

  promises.push([
    conn
      .createQueryBuilder()
      .update(KasUmum)
      .set({
        volume: 1000,
        saldo: 1500,
        idRapbsPeriode: seedRapbsPeriode2.idRapbsPeriode,
        lastUpdate: new Date(),
      })
      .where(`id_kas_umum = :idKasUmum`, {
        idKasUmum: 'KvVuixtqKUucPfTel5YTSg',
      })
      .execute(),
    conn
      .createQueryBuilder()
      .update(KasUmum)
      .set({
        volume: 1001,
        saldo: 1501,
        lastUpdate: new Date(),
      })
      .where(`id_kas_umum = :idKasUmum`, {
        idKasUmum: 'LJZ9AK3F8UK5tyIVNfl0Kg',
      })
      .execute(),
  ])

  await Promise.all(promises)

  const tataUsahaService = new TataUsahaService(conn)
  const request = <GetListKasUmumRequest>{
    idAnggaran: idAnggaran,
    idPeriode: 84,
  }

  const res = await tataUsahaService.GetListKasUmum(request)
  expect(res.isOk()).toBe(true)

  const list = res.unwrapOr(Array<TarikTunai>())
  expect(list[0].type).toBe('line')
  expect(list[0].data.jumlah).toBe(1500)
  expect(list[0].data.date).toBe('2021-04-01')
  expect(list[0].data.message).toBe(
    'Anda telah melakukan <b>Setor Tunai Rp. 1500 </b> pada 2021-04-01'
  )

  expect(list[1].type).toBe('line')
  expect(list[1].data.jumlah).toBe(1501)
  expect(list[1].data.date).toBe('2021-04-22')
  expect(list[1].data.message).toBe(
    'Anda telah melakukan <b>Tarik Tunai Rp. 1501 </b> pada 2021-04-22'
  )

  expect(list[2].type).toBe('row')
  expect(list[2].data.id).toBe('BNU02')
  expect(list[2].data.tanggal).toBe('2021-04-01')
  expect(list[2].data.kegiatan).toBe(null)
  expect(list[2].data.uraian).toBe('Belanja langganan telepon 1')
  expect(list[2].data.jenisTransaksi).toBe('Non Tunai')
  expect(list[2].data.anggaran).toBe(null)
  expect(list[2].data.dibelanjakan).toBe(100)
  expect(list[2].data.pajakWajibLapor).toBe(null)
})

test('GetLastTransactionDate', async () => {
  const conn = getConnection()
  const tataUsahaService = new TataUsahaService(conn)
  const request: GetLastTransactionDateRequest = {
    idAnggaran: '-ywMrrqE30Ck6P0p08Uj2w',
    idPeriode: 84,
  }

  const request2: GetLastTransactionDateRequest = {
    idAnggaran: '-ywMrrqE30Ck6P0p08Uj2w',
    idPeriode: 90,
  }

  const res = await tataUsahaService.GetLastTransactionDate(request)
  expect(res.isOk()).toBe(true)
  const date = res.unwrapOr(Date())
  expect(date).toBe('2021-04-22')

  const res2 = await tataUsahaService.GetLastTransactionDate(request2)
  expect(res2.isOk()).toBe(true)
  const date2 = res2.unwrapOr(Date()) as Date
  expect(CommonUtils.formatDateToString(date2)).toBe(
    CommonUtils.formatDateToString(new Date())
  )
})

test('GetInformasiToko', async () => {
  const conn = getConnection()
  const tataUsahaService = new TataUsahaService(conn)

  const res = await tataUsahaService.GetInformasiToko('ADARA MAKMUR')
  expect(res.isOk()).toBe(true)

  const tokoAdaraMakmur = res.unwrapOr(<InformasiToko>{})
  expect(tokoAdaraMakmur.nama).toBe('ADARA MAKMUR')
  expect(tokoAdaraMakmur.npwp).toBe('90.655.179.1-542.000')
  expect(tokoAdaraMakmur.alamat).toBe('Ngemplak, Kabupaten Sleman')
  expect(tokoAdaraMakmur.telpon).toBe('085742549494')

  const res2 = await tataUsahaService.GetInformasiToko('CV. ACITYA')
  expect(res2.isOk()).toBe(true)

  const tokoACITYA = res2.unwrapOr(<InformasiToko>{})
  expect(tokoACITYA.nama).toBe('CV. ACITYA')
  expect(tokoACITYA.npwp).toBe('41.294.835.8-545.000')
  expect(tokoACITYA.alamat).toBe(
    'Jl. Wonosari-Karangmojo, Selang 1, Selang,Wonosari'
  )
  expect(tokoACITYA.telpon).toBe('02115221')
})

test('GetListToko', async () => {
  const conn = getConnection()
  const tataUsahaService = new TataUsahaService(conn)

  const res = await tataUsahaService.GetListToko()
  expect(res.isOk()).toBe(true)
  const list = res.unwrapOr(Array<string>())
  expect(list.length).toBe(5)
  expect(list[0]).toBe('ADARA MAKMUR')
  expect(list[1]).toBe('Berkah Santosa')
})
