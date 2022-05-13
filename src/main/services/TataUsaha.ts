import { Connection } from 'typeorm'
import { ok, Result } from 'neverthrow'
import {
  GetListAnggaranRequest,
  Anggaran as AnggaranData,
  AktivasiBku as AktivasiData,
} from 'global/types/TataUsahaTypes'
import { GetAnggaran } from 'main/repositories/Anggaran'
import { AktivasiBkuRepository } from 'main/repositories/AktivasiBku'
import { Anggaran, Bku } from 'main/types/TataUsaha'
import { AktivasiBku } from 'main/models/AktivasiBku'
import { STATUS_BKU_PERBULAN, STATUS_BKU_PERTAHUN } from 'global/constants'
import { GetMonthName, MonthList } from 'main/utils/Months'
import { GetStatusAktivasiBku, GetStatusAnggaran } from 'global/status'
import { Anggaran as AnggaranEntity } from 'main/models/Anggaran'

export class TataUsahaService {
  private conn: Connection
  private aktivasiBkuRepo: AktivasiBkuRepository

  constructor(conn: Connection) {
    this.conn = conn
    this.aktivasiBkuRepo = new AktivasiBkuRepository(conn)
  }

  async GetListAnggaran(
    req: GetListAnggaranRequest
  ): Promise<Result<AnggaranData[], Error>> {
    const result: AnggaranData[] = []
    const mapAnggaran = new Map<string, Anggaran>()
    const anggaranList = await GetAnggaran(req.idSumberDana, req.tahunAnggaran)

    const anggaranIDs = []
    for (const anggaran of anggaranList) {
      mapAnggaran.set(anggaran.id_anggaran, <Anggaran>{
        anggaran: anggaran,
        status: STATUS_BKU_PERTAHUN.not_active,
        bkuList: [],
      })

      anggaranIDs.push(anggaran.id_anggaran)
    }

    const bkuList = await this.aktivasiBkuRepo.GetListbyIDs(anggaranIDs)
    for (const bku of bkuList) {
      const populate = this.populateBkuStatus(bku)
      const anggaran = mapAnggaran.get(bku.idAnggaran)

      anggaran.bkuList.push(populate)
      mapAnggaran.set(bku.idAnggaran, anggaran)
    }

    for (const [key, anggaran] of mapAnggaran) {
      for (const month of MonthList) {
        const bku = bkuList.find(
          (bku) => bku.idPeriode === month.id && bku.idAnggaran === key
        )
        if (bku === undefined) {
          anggaran.bkuList.push(<Bku>{
            idPeriode: month.id,
            monthName: month.name,
            bku: null,
            status: STATUS_BKU_PERBULAN.not_created,
          })
        }
      }

      anggaran.bkuList.sort((a, b) => a.idPeriode - b.idPeriode)

      const populate = this.populateAnggaranStatus(anggaran)
      mapAnggaran.set(key, populate)
    }

    for (const [key, a] of mapAnggaran) {
      const bkuList: AktivasiData[] = []
      for (const bku of a.bkuList) {
        bkuList.push(<AktivasiData>{
          idPeriode: bku.idPeriode,
          bulan: bku.monthName,
          status: bku.status,
        })
      }

      result.push(<AnggaranData>{
        tahun: a.anggaran.tahun,
        idAnggaran: key,
        status: a.status,
        isAnggaranApproved: a.isAnggaranApproved,
        bulan: bkuList,
      })
    }

    return ok(result)
  }

  private populateBkuStatus(aktivasiBku: AktivasiBku): Bku {
    return <Bku>{
      bku: aktivasiBku,
      idPeriode: aktivasiBku.idPeriode,
      monthName: GetMonthName(aktivasiBku.idPeriode),
      status: GetStatusAktivasiBku(aktivasiBku),
    }
  }

  private populateAnggaranStatus(a: Anggaran): Anggaran {
    a.isAnggaranApproved =
      a.anggaran.is_approve > 0 || a.anggaran.tanggal_pengesahan !== null

    const aktivasiBkuList = []
    for (const bku of a.bkuList) {
      aktivasiBkuList.push(bku.bku)
    }

    const anggaran = new AnggaranEntity()
    anggaran.idAnggaran = a.anggaran.id_anggaran
    anggaran.isPengesahan = a.anggaran.is_pengesahan
    anggaran.tanggalPengajuan = a.anggaran.tanggal_pengajuan
    anggaran.tanggalPengesahan = a.anggaran.tanggal_pengesahan
    anggaran.isApprove = a.anggaran.is_approve
    anggaran.isRevisi = a.anggaran.is_revisi

    a.status = GetStatusAnggaran(anggaran, aktivasiBkuList)
    return a
  }
}
