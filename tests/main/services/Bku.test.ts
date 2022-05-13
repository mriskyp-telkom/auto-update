import { SaveBkuRequest } from 'global/types/TataUsahaTypes'
import { AktivasiBku } from 'main/models/AktivasiBku'
import { AppConfig } from 'main/models/AppConfig'
import { KasUmum } from 'main/models/KasUmum'
import { BkuService } from 'main/services/Bku'
import { createConnection, getConnection, getRepository } from 'typeorm'
import { cfg, Migrate } from '../migration'

beforeEach(async () => {
  const db = await createConnection({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    entities: [AktivasiBku, AppConfig, KasUmum],
    synchronize: false,
    logging: true,
  })

  await Migrate(db, cfg)
})

afterEach(async () => {
  const conn = getConnection()
  await conn.close()
})

test('AktivasiBku', async () => {
  const conn = getConnection()
  const bkuService = new BkuService(conn)

  const req = <SaveBkuRequest>{
    idAnggaran: 'apQwiAb-9EWxv74iwMY6aQ',
    recieveDate: new Date('2022-03-10T00:00:00.000Z'),
    recieveAmount: 20000,
    uraian: 'Bku Januari sampai Maret 2022',
  }

  const res = await bkuService.AktivasiBku(req)
  expect(res.isErr()).toBe(false)

  const kasUmumList = await getRepository(KasUmum).find({
    idAnggaran: req.idAnggaran,
  })
  const aktivasiBkuList = await getRepository(AktivasiBku).find({
    idAnggaran: req.idAnggaran,
  })

  expect(kasUmumList.length).toBe(11)
  expect(aktivasiBkuList.length).toBe(3)

  for (const k of kasUmumList) {
    if (k.idRefBku === 2) {
      expect(k.idRefBku).toBe(2)
      expect(k.idRapbsPeriode).toBe(null)
      expect(k.noBukti).toBe('BBU01')
      expect(k.uraian).toBe(req.uraian)
      expect(k.saldo).toBe(req.recieveAmount)
      expect(k.tanggalTransaksi.toString()).toBe(req.recieveDate.toString())
    } else {
      expect(k.saldo).toBe(0)
    }

    switch (k.idRefBku) {
      case 6:
        expect(k.uraian).toBe('Bunga Bank')
        break
      case 7:
        expect(k.uraian).toBe('Pajak Bunga')
        break
    }
  }

  // kas umum bulan januari
  expect(kasUmumList[0].tanggalTransaksi.toISOString()).toBe(
    '2022-01-31T23:59:59.000Z'
  )
  expect(kasUmumList[1].tanggalTransaksi.toISOString()).toBe(
    '2022-01-31T23:59:59.000Z'
  )
  expect(kasUmumList[2].tanggalTransaksi.toISOString()).toBe(
    '2022-01-01T00:00:00.000Z'
  )
  expect(kasUmumList[3].tanggalTransaksi.toISOString()).toBe(
    '2022-01-01T00:00:00.000Z'
  )

  // kas umum bulan februari
  expect(kasUmumList[4].tanggalTransaksi.toISOString()).toBe(
    '2022-02-28T23:59:59.000Z'
  )
  expect(kasUmumList[5].tanggalTransaksi.toISOString()).toBe(
    '2022-02-28T23:59:59.000Z'
  )
  expect(kasUmumList[6].tanggalTransaksi.toISOString()).toBe(
    '2022-02-01T00:00:00.000Z'
  )
  expect(kasUmumList[7].tanggalTransaksi.toISOString()).toBe(
    '2022-02-01T00:00:00.000Z'
  )

  // kas umum bulan maret
  expect(kasUmumList[9].tanggalTransaksi.toISOString()).toBe(
    '2022-03-01T00:00:00.000Z'
  )
  expect(kasUmumList[10].tanggalTransaksi.toISOString()).toBe(
    '2022-03-01T00:00:00.000Z'
  )

  // bulan januari
  expect(aktivasiBkuList.length).toBe(3)
  expect(aktivasiBkuList[0].idPeriode).toBe(81)
  expect(aktivasiBkuList[0].tanggalAktivasi.toISOString()).toBe(
    '2022-01-01T00:00:00.000Z'
  )
  expect(aktivasiBkuList[0].tanggalFinish.toISOString()).toBe(
    '2022-01-31T23:59:59.000Z'
  )
  expect(aktivasiBkuList[0].saldoAwalBank).toBe(0)
  expect(aktivasiBkuList[0].saldoAwalTunai).toBe(0)
  expect(aktivasiBkuList[0].saldoAkhirBank).toBe(0)
  expect(aktivasiBkuList[0].saldoAkhirTunai).toBe(0)
  expect(aktivasiBkuList[0].saldoAwalBankSisa).toBe(0)
  expect(aktivasiBkuList[0].saldoAwalTunaiSisa).toBe(0)
  expect(aktivasiBkuList[0].saldoAkhirBankSisa).toBe(0)
  expect(aktivasiBkuList[0].saldoAkhirTunaiSisa).toBe(0)

  // bulan februari
  expect(aktivasiBkuList[1].idPeriode).toBe(82)
  expect(aktivasiBkuList[1].tanggalAktivasi.toISOString()).toBe(
    '2022-02-01T00:00:00.000Z'
  )
  expect(aktivasiBkuList[1].tanggalFinish.toISOString()).toBe(
    '2022-02-28T23:59:59.000Z'
  )
  expect(aktivasiBkuList[1].saldoAwalBank).toBe(0)
  expect(aktivasiBkuList[1].saldoAwalTunai).toBe(0)
  expect(aktivasiBkuList[1].saldoAkhirBank).toBe(0)
  expect(aktivasiBkuList[1].saldoAkhirTunai).toBe(0)
  expect(aktivasiBkuList[1].saldoAwalBankSisa).toBe(0)
  expect(aktivasiBkuList[1].saldoAwalTunaiSisa).toBe(0)
  expect(aktivasiBkuList[1].saldoAkhirBankSisa).toBe(0)
  expect(aktivasiBkuList[1].saldoAkhirTunaiSisa).toBe(0)

  // bulan maret
  expect(aktivasiBkuList[2].idPeriode).toBe(83)
  expect(aktivasiBkuList[2].tanggalAktivasi.toISOString()).toBe(
    '2022-03-01T00:00:00.000Z'
  )
  expect(aktivasiBkuList[2].tanggalFinish).toBe(null)
  expect(aktivasiBkuList[2].saldoAwalBank).toBe(20000)
  expect(aktivasiBkuList[2].saldoAwalTunai).toBe(20000)
  expect(aktivasiBkuList[2].saldoAkhirBank).toBe(null)
  expect(aktivasiBkuList[2].saldoAkhirTunai).toBe(null)
  expect(aktivasiBkuList[2].saldoAwalBankSisa).toBe(null)
  expect(aktivasiBkuList[2].saldoAwalTunaiSisa).toBe(null)
  expect(aktivasiBkuList[2].saldoAkhirBankSisa).toBe(null)
  expect(aktivasiBkuList[2].saldoAkhirTunaiSisa).toBe(null)
})
