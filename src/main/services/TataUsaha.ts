import { Connection } from 'typeorm'
import { ok, Result } from 'neverthrow'
import {
  GetListAnggaranRequest,
  Anggaran as AnggaranData,
  AktivasiBku as AktivasiData,
  GetTotalSaldoRequest,
  GetTotalSaldoDibelanjakanRequest,
  GetTotalAnggaranPerBulanRequest,
} from 'global/types/TataUsaha'
import { GetAnggaran } from 'main/repositories/Anggaran'
import { AktivasiBkuRepository } from 'main/repositories/AktivasiBku'
import {
  KasUmumRepository,
  GetTotalSaldoDibelanjakan,
} from 'main/repositories/KasUmum'
import { Anggaran, Bku } from 'main/types/TataUsaha'
import { AktivasiBku } from 'main/models/AktivasiBku'
import { CONFIG, STATUS_BKU_PERTAHUN } from 'global/constants'
import { GetMonthName } from 'main/utils/Months'
import { GetStatusAktivasiBku, GetStatusAnggaran } from 'global/status'
import { Anggaran as AnggaranEntity } from 'main/models/Anggaran'
import { GetConfig } from 'main/repositories/Config'
import CommonUtils from 'main/utils/CommonUtils'
import { AnggaranDTO } from 'main/types/Anggaran'
import { Saldo } from 'main/types/KasUmum'
import { GetTotalAnggaranPerBulan } from 'main/repositories/Rapbs'

export class TataUsahaService {
  private aktivasiBkuRepo: AktivasiBkuRepository
  private kasUmumRepo: KasUmumRepository

  constructor(conn: Connection) {
    this.aktivasiBkuRepo = new AktivasiBkuRepository(conn)
    this.kasUmumRepo = new KasUmumRepository(conn)
  }

  async GetListAnggaran(
    req: GetListAnggaranRequest
  ): Promise<Result<AnggaranData[], Error>> {
    const result: AnggaranData[] = []
    const mapAnggaran = new Map<string, Anggaran>()
    const anggaranList = await GetAnggaran(req.idSumberDana, req.tahunAnggaran)
    const activeYearCfg = await GetConfig(CONFIG.tahunAktif)
    const activeYear = parseInt(activeYearCfg)

    const anggaranIDs = []
    for (const year of req.tahunAnggaran) {
      const anggaran = anggaranList.find((anggaran) => anggaran.tahun === year)

      if (anggaran === undefined) {
        mapAnggaran.set(CommonUtils.encodeUUIDFromV4(), <Anggaran>{
          anggaran: <AnggaranDTO>{
            tahun: year,
            id_anggaran: null,
          },
          status: STATUS_BKU_PERTAHUN.not_active,
          bkuList: [],
        })
      } else {
        mapAnggaran.set(anggaran.id_anggaran, <Anggaran>{
          anggaran: anggaran,
          status: STATUS_BKU_PERTAHUN.not_active,
          bkuList: [],
        })

        anggaranIDs.push(anggaran.id_anggaran)
      }
    }

    const bkuList = await this.aktivasiBkuRepo.GetListbyIDs(anggaranIDs)
    for (const bku of bkuList) {
      const populate = this.populateBkuStatus(bku)
      const anggaran = mapAnggaran.get(bku.idAnggaran)

      if (anggaran !== undefined) {
        anggaran.bkuList.push(populate)
        mapAnggaran.set(bku.idAnggaran, anggaran)
      }
    }

    for (const [key, anggaran] of mapAnggaran) {
      anggaran.bkuList.sort((a, b) => a.idPeriode - b.idPeriode)

      const populate = this.populateAnggaranStatus(activeYear, anggaran)
      mapAnggaran.set(key, populate)
    }

    for (const [, a] of mapAnggaran) {
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
        idAnggaran: a.anggaran.id_anggaran,
        status: a.status,
        isAnggaranApproved: a.isAnggaranApproved,
        bulan: bkuList,
      })
    }

    result.sort((a, b) => b.tahun - a.tahun)
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

  private populateAnggaranStatus(activeYear: number, a: Anggaran): Anggaran {
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
    anggaran.tahunAnggaran = a.anggaran.tahun

    a.status = GetStatusAnggaran(activeYear, anggaran, aktivasiBkuList)
    return a
  }

  async GetTotalSaldo(
    request: GetTotalSaldoRequest
  ): Promise<Result<Saldo, Error>> {
    const now = new Date()
    let startDate = now
    let endDate = now

    if (request.startDate !== '') {
      startDate = new Date(request.startDate)
    }

    if (request.endDate !== '') {
      endDate = new Date(request.endDate)
    }

    return await this.kasUmumRepo.GetTotalSaldo(
      request.idAnggaran,
      startDate,
      endDate
    )
  }

  async GetTotalSaldoDibelanjakan(
    request: GetTotalSaldoDibelanjakanRequest
  ): Promise<number> {
    return await GetTotalSaldoDibelanjakan(
      request.idAnggaran,
      request.idPeriode
    )
  }

  async GetTotalAnggaranPerBulan(
    request: GetTotalAnggaranPerBulanRequest
  ): Promise<number> {
    return await GetTotalAnggaranPerBulan(request.idAnggaran, request.idPeriode)
  }
}
