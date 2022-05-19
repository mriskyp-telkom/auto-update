import { Connection } from 'typeorm'
import { ok, err, Result } from 'neverthrow'
import { AktivasiBkuRepository } from 'main/repositories/AktivasiBku'
import { KasUmumRepository } from 'main/repositories/KasUmum'
import { AktivasiBku } from 'main/models/AktivasiBku'
import { KasUmum } from 'main/models/KasUmum'
import { GetMonthsRange } from 'main/utils/Months'
import CommonUtils from 'main/utils/CommonUtils'
import { GetPenggunaID } from './User'
import { SaveBkuRequest } from 'global/types/TataUsaha'
export class BkuService {
  private conn: Connection
  private aktivasiBku: AktivasiBkuRepository
  private kasUmum: KasUmumRepository

  constructor(conn: Connection) {
    this.conn = conn
    this.aktivasiBku = new AktivasiBkuRepository(conn)
    this.kasUmum = new KasUmumRepository(conn)
  }

  async AktivasiBku(req: SaveBkuRequest): Promise<Result<boolean, Error>> {
    const aktivasiList: AktivasiBku[] = []
    const kasUmumList: KasUmum[] = []
    const kasUmumIds: { id: number; bku: string }[] = [
      { id: 6, bku: 'Bunga Bank' },
      { id: 7, bku: 'Pajak Bunga' },
      { id: 8, bku: 'Saldo Awal Bank' },
      { id: 9, bku: 'Saldo Awal Tunai' },
    ]
    const now = new Date()
    const penggunaId = await GetPenggunaID()
    const noBukti = await this.kasUmum.GetNextNoBukti('BBU') // Kode Terima Dana BOS

    const year = req.recieveDate.getFullYear()
    const months = GetMonthsRange(req.recieveDate.getMonth() + 1)
    const monthsLastId = months[months.length - 1]?.id
    for (const m of months) {
      const lastMonth = new Date(Date.UTC(year, m.monthNumber - 1, 1, 0, 0, 0))
      const lastMonthLocale = lastMonth.toLocaleString('id-id', {
        month: 'long',
      })
      const tanggalAktivasi = new Date(
        Date.UTC(year, m.monthNumber, 1, 0, 0, 0)
      )
      const tanggalFinish = new Date(
        new Date(Date.UTC(year, m.monthNumber + 1, 0)).getTime() +
          60 * 60 * 24 * 1000 -
          1000
      )

      const a = new AktivasiBku()
      a.idAnggaran = req.idAnggaran
      a.createDate = now
      a.lastUpdate = now
      a.updaterId = penggunaId
      a.idPeriode = m.id
      a.softDelete = 0

      a.saldoAwalBank = 0
      a.saldoAwalTunai = 0
      a.saldoAkhirBank = 0
      a.saldoAkhirTunai = 0
      a.saldoAwalBankSisa = 0
      a.saldoAwalTunaiSisa = 0
      a.saldoAkhirBankSisa = 0
      a.saldoAkhirTunaiSisa = 0

      a.tanggalAktivasi = tanggalAktivasi
      a.tanggalFinish = tanggalFinish

      if (m.id === monthsLastId) {
        a.saldoAkhirBank = null
        a.saldoAkhirTunai = null
        a.saldoAwalBankSisa = null
        a.saldoAwalTunaiSisa = null
        a.saldoAkhirBankSisa = null
        a.saldoAkhirTunaiSisa = null
        a.saldoAwalBank = req.recieveAmount
        a.saldoAwalTunai = req.recieveAmount
        a.tanggalFinish = null

        const insertIds = [2, 8, 9]
        for (const id of insertIds) {
          const kas = new KasUmum()
          kas.idKasUmum = CommonUtils.encodeUUID(CommonUtils.uuid())
          kas.idAnggaran = req.idAnggaran
          kas.saldo = 0
          kas.uraian = `${
            kasUmumIds.find((element) => element.id === id)?.bku
          } Bulan ${lastMonthLocale} ${lastMonth.getFullYear()}`
          kas.idRefBku = id
          kas.createDate = now
          kas.lastUpdate = now
          kas.updaterId = penggunaId
          kas.tanggalTransaksi = tanggalAktivasi

          if (id === 2) {
            // Terima Dana BOS
            kas.tanggalTransaksi = req.recieveDate
            kas.saldo = req.recieveAmount
            kas.uraian = req.uraian
            kas.noBukti = noBukti
          }

          kasUmumList.push(kas)
        }
      } else {
        for (const id of kasUmumIds) {
          const kas = new KasUmum()
          kas.idKasUmum = CommonUtils.encodeUUID(CommonUtils.uuid())
          kas.idAnggaran = req.idAnggaran
          kas.saldo = 0
          kas.uraian = kasUmumIds.find((element) => element.id === id.id)?.bku
          kas.idRefBku = id.id
          kas.createDate = now
          kas.lastUpdate = now
          kas.updaterId = penggunaId
          kas.tanggalTransaksi = tanggalFinish

          if (id.id === 8 || id.id === 9) {
            kas.uraian = `${
              kas.uraian
            } Bulan ${lastMonthLocale} ${lastMonth.getFullYear()}`
            kas.tanggalTransaksi = tanggalAktivasi
          }

          kasUmumList.push(kas)
        }
      }

      aktivasiList.push(a)
    }

    const tx = this.conn.createQueryRunner()
    await tx.connect()
    await tx.startTransaction()

    try {
      const promises = []
      promises.push(this.aktivasiBku.BulkUpsert(aktivasiList))
      promises.push(this.kasUmum.BulkInsert(kasUmumList))

      await Promise.all(promises)
      await tx.commitTransaction()
    } catch (error) {
      await tx.rollbackTransaction()

      return err(new Error(error))
    } finally {
      await tx.release()
    }

    return ok(true)
  }
}
