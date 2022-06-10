import { Connection } from 'typeorm'
import { ok, err, Result } from 'neverthrow'
import {
  GetListAnggaranRequest,
  Anggaran as AnggaranData,
  AktivasiBku as AktivasiData,
  GetTotalSaldoRequest,
  GetTotalAnggaranRequest,
  CashWithdrawalRequest,
  GetListKasUmumRequest,
  TarikTunai,
  TarikTunaiData,
  GetTotalSaldoByPeriodeRequest,
  Saldo,
  GetLastTransactionDateRequest,
  Kegiatan,
  InformasiToko,
  GetRekeningBelanjaByPeriodeRequest,
  RekeningBelanja,
} from 'global/types/TataUsaha'
import {
  GetAnggaran,
  GetAnggaranById,
} from 'main/repositories/AnggaranRepository'
import { AktivasiBkuRepository } from 'main/repositories/AktivasiBkuRepository'
import { KasUmumRepository } from 'main/repositories/KasUmumRepository'
import { Anggaran, Bku, NamaToko } from 'main/types/TataUsaha'
import { AktivasiBku } from 'main/models/AktivasiBku'
import { CONFIG, KAS_UMUM_TYPE, STATUS_BKU_PERTAHUN } from 'global/constants'
import { GetMonth, GetMonthDateRange, GetMonthName } from 'main/utils/Months'
import { GetStatusAktivasiBku, GetStatusAnggaran } from 'global/status'
import { Anggaran as AnggaranEntity } from 'main/models/Anggaran'
import { GetConfig } from 'main/repositories/ConfigRepository'
import CommonUtils from 'main/utils/CommonUtils'
import { AnggaranDTO } from 'main/types/Anggaran'
import { TarikTunaiBKU } from 'main/types/KasUmum'
import {
  GetTotalAnggaranPerBulan,
  RapbsRepository,
} from 'main/repositories/RapbsRepository'
import { KasUmum } from 'main/models/KasUmum'
import { GetPenggunaID } from './UserService'
import { format } from 'global/format'
import { range } from 'global/numbers'

import { KasUmumNota } from 'main/models/KasUmumNota'
import { KasUmumNotaRepository } from 'main/repositories/KasUmumNotaRepository'

export class TataUsahaService {
  private aktivasiBkuRepo: AktivasiBkuRepository
  private kasUmumRepo: KasUmumRepository
  private kasUmumNotaRepo: KasUmumNotaRepository
  private rapbsRepo: RapbsRepository

  constructor(conn: Connection) {
    this.aktivasiBkuRepo = new AktivasiBkuRepository(conn)
    this.kasUmumRepo = new KasUmumRepository(conn)
    this.kasUmumNotaRepo = new KasUmumNotaRepository(conn)
    this.rapbsRepo = new RapbsRepository(conn)
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

  async GetTotalSaldoByPeriode(
    request: GetTotalSaldoByPeriodeRequest
  ): Promise<Result<Saldo, Error>> {
    const anggaran = await GetAnggaranById(request.idAnggaran)
    const month = GetMonth(request.idPeriode)
    const monthDate = GetMonthDateRange(
      anggaran.tahunAnggaran,
      month.monthNumber
    )
    const endDateMs = monthDate.endDate.setDate(monthDate.endDate.getDate() + 1)
    const endDate = new Date(endDateMs)
    return await this.kasUmumRepo.GetTotalSaldo(
      request.idAnggaran,
      monthDate.startDate,
      endDate
    )
  }

  async GetTotalSudahDibelanjakan(
    request: GetTotalAnggaranRequest
  ): Promise<Result<number, Error>> {
    let result: number
    try {
      result = await this.kasUmumRepo.GetTotalSaldoDibelanjakan(
        request.idAnggaran,
        range(request.idPeriode - 80, 81)
      )
    } catch (error) {
      return err(new Error(error))
    }

    return ok(result)
  }

  async GetTotalBisaDibelanjakan(
    request: GetTotalAnggaranRequest
  ): Promise<Result<number, Error>> {
    let result: number
    try {
      result = await GetTotalAnggaranPerBulan(
        request.idAnggaran,
        range(request.idPeriode - 80, 81)
      )
    } catch (error) {
      return err(new Error(error))
    }

    return ok(result)
  }

  async GetTotalPerluDianggarkanUlang(
    request: GetTotalAnggaranRequest
  ): Promise<Result<number, Error>> {
    let result: number
    try {
      result = await this.kasUmumRepo.GetTotalPerluDianggarkanUlang(
        request.idAnggaran,
        range(request.idPeriode - 80, 81)
      )
    } catch (error) {
      return err(new Error(error))
    }

    return ok(result)
  }

  async CashWithdrawal(
    request: CashWithdrawalRequest
  ): Promise<Result<boolean, Error>> {
    const kasUmumList: KasUmum[] = []
    const refBkuList: { id: number; bku: string }[] = [
      { id: 3, bku: 'Tarik Tunai' },
      { id: 12, bku: 'Pergeseran Uang di Bank' },
    ]
    const now = new Date()
    const penggunaId = await GetPenggunaID()
    for (const refBku of refBkuList) {
      const kas = new KasUmum()
      kas.idKasUmum = CommonUtils.encodeUUID(CommonUtils.uuid())
      kas.idAnggaran = request.idAnggaran
      kas.idRefBku = refBku.id
      kas.uraian = refBku.bku
      kas.saldo = request.amount
      kas.tanggalTransaksi = request.date
      kas.createDate = now
      kas.lastUpdate = now
      kas.updaterId = penggunaId
      kasUmumList.push(kas)
    }
    try {
      await this.kasUmumRepo.BulkInsert(kasUmumList)
    } catch (error) {
      return err(new Error(error))
    }
    return ok(true)
  }

  async GetListKasUmum(
    request: GetListKasUmumRequest
  ): Promise<Result<Array<TarikTunai>, Error>> {
    let tarikTunaiList: Array<TarikTunaiBKU> = []
    const result: Array<TarikTunai> = []
    const getComponentType = (idRefBku: number): string => {
      switch (idRefBku) {
        case 4:
        case 15:
        case 24:
        case 35:
          return KAS_UMUM_TYPE.row
        case 3:
        case 5:
        case 23:
        case 25:
          return KAS_UMUM_TYPE.line
        default:
          return ''
      }
    }

    const month = GetMonth(request.idPeriode)
    try {
      tarikTunaiList = await this.kasUmumRepo.GetListTarikTunaiBKU(
        request.idAnggaran,
        month.monthNumber + 1
      )
    } catch (error) {
      return err(new Error(error))
    }

    for (const tarikTunai of tarikTunaiList) {
      let data: TarikTunaiData
      const tType = getComponentType(tarikTunai.idRefBku)
      if (tType === KAS_UMUM_TYPE.line) {
        const msgTemplate = `Anda telah melakukan <span style="font-weight: 500;padding: unset">${tarikTunai.bku.toLowerCase()} Rp. %s </span> pada %s`
        data = <TarikTunaiData>{
          jumlah: tarikTunai.saldoDibelanjakan,
          date: tarikTunai.tanggalTransaksi,
          messageTemplate: msgTemplate,
          message: format(
            msgTemplate,
            tarikTunai.saldoDibelanjakan,
            tarikTunai.tanggalTransaksi
          ),
        }
      } else if (tType === KAS_UMUM_TYPE.row) {
        data = <TarikTunaiData>{
          id: tarikTunai.id,
          tanggal: tarikTunai.tanggalTransaksi,
          kegiatan: tarikTunai.kegiatan,
          uraian: tarikTunai.uraian,
          jenisTransaksi: tarikTunai.jenisTransaksi,
          anggaran: tarikTunai.jumlahAnggaran,
          dibelanjakan: tarikTunai.saldoDibelanjakan,
          pajakWajibLapor: tarikTunai.pajakWajibLapor,
        }
      }

      const tunai = <TarikTunai>{
        type: tType,
        data: data,
      }
      result.push(tunai)
    }

    return ok(result)
  }

  async GetLastTransactionDate(
    request: GetLastTransactionDateRequest
  ): Promise<Result<Date, Error>> {
    const month = GetMonth(request.idPeriode)
    try {
      let latestDate = await this.kasUmumRepo.GetLastTransactionDate(
        request.idAnggaran,
        month.monthNumber + 1
      )
      if (latestDate == null) {
        latestDate = new Date()
      }
      return ok(latestDate)
    } catch (error) {
      return err(new Error(error))
    }
  }

  async GetInformasiToko(
    namaToko: string
  ): Promise<Result<InformasiToko, Error>> {
    let kasUmumNota: KasUmumNota

    try {
      kasUmumNota = await this.kasUmumNotaRepo.GetTokoByName(namaToko)
    } catch (error) {
      return err(new Error(error))
    }

    if (kasUmumNota === undefined) {
      return err(new Error('not found'))
    }

    const result = <InformasiToko>{
      nama: kasUmumNota.namaToko,
      npwp: kasUmumNota.npwp,
    }

    let phoneNumber = ''

    const additionalInformation = kasUmumNota.alamatToko.split('|')
    if (additionalInformation[0] !== undefined) {
      result.alamat = additionalInformation[0]
    }

    // no hp
    if (
      additionalInformation[3] !== undefined &&
      additionalInformation[3] !== ''
    ) {
      phoneNumber = additionalInformation[3]
    } else {
      // no telp
      if (additionalInformation[1] !== undefined) {
        phoneNumber = phoneNumber + additionalInformation[1]
      }

      if (additionalInformation[2] !== undefined) {
        phoneNumber = phoneNumber + additionalInformation[2]
      }
    }

    result.telpon = phoneNumber
    return ok(result)
  }

  async GetListToko(): Promise<Result<string[], Error>> {
    try {
      const result: NamaToko[] = await this.kasUmumNotaRepo.GetListToko()
      const data = result.map((d: NamaToko) => d.namaToko)
      return ok(data)
    } catch (error) {
      return err(new Error(error))
    }
  }

  async GetKegiatanByPeriode(
    idAnggaran: string,
    idPeriode: number
  ): Promise<Result<Kegiatan[], Error>> {
    try {
      const res = await this.rapbsRepo.GetKegiatan(idAnggaran, idPeriode)
      return ok(res)
    } catch (error) {
      return err(new Error(error))
    }
  }

  async GetRekeningBelanjaByPeriode(
    request: GetRekeningBelanjaByPeriodeRequest
  ): Promise<Result<RekeningBelanja[], Error>> {
    try {
      const res = await this.rapbsRepo.GetRekeningBelanjaByPeriode(request)
      return ok(res)
    } catch (error) {
      return err(new Error(error))
    }
  }
}
