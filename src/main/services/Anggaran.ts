import {
  GetAnggaran,
  GetAnggaranById,
  UpsertAnggaran,
} from 'main/repositories/Anggaran'
import { GetConfig } from 'main/repositories/Config'

import CommonUtils from 'main/utils/CommonUtils'

import { STATUS_KERTAS_KERJA, VERSI_ANGGARAN } from 'global/constants'
import { Anggaran as AnggaranData } from 'global/types/Anggaran'
import { Anggaran } from 'main/models/Anggaran'
import { err, ok, Result } from 'neverthrow'
import { InsertResult } from 'typeorm'

export const GetAnggaranList = async (idSumberDana: number) => {
  const configTahunAktif = await GetConfig('tahun_aktif')
  const tahunAktif = parseInt(configTahunAktif)
  const listTahun = Array.from({ length: 3 }, (_, i) => tahunAktif - i)
  const dataAnggaran = await GetAnggaran(idSumberDana, listTahun)
  const listAnggaran = []

  for (let tahun = tahunAktif; tahun > tahunAktif - 3; tahun--) {
    const data = dataAnggaran.find((a: any) => a.tahun === tahun)
    const anggaran = {
      id_anggaran: '',
      tahun: `${tahun}`,
      status: '',
      tenggat_waktu: `${tahun}-12-30`,
      status_updated_at: '',
      type: '',
      tanggal_pengesahan: '',
      id_sumber_dana: idSumberDana,
    }

    anggaran.status = await GetStatusAnggaran(data, tahun, tahunAktif)

    if (data != null) {
      const countPerubahan = Math.floor(data.is_revisi / 100)
      const pergeseran = data.is_revisi % 100
      if (countPerubahan >= 1) {
        anggaran.type = VERSI_ANGGARAN.perubahan.code //'Perubahan'
      }
      if (pergeseran > 0) {
        anggaran.type = VERSI_ANGGARAN.pergeseran.code //'Pergeseran'
      }
      anggaran.id_anggaran = data.id_anggaran
      anggaran.tanggal_pengesahan =
        data.tanggal_pengesahan != null
          ? CommonUtils.formatDateToString(
              data.tanggal_pengesahan,
              'YYYY-MM-DD HH:mm'
            )
          : ''
      anggaran.status_updated_at =
        data.last_update != null
          ? CommonUtils.formatDateToString(data.last_update, 'YYYY-MM-DD HH:mm')
          : ''
    }
    listAnggaran.push(anggaran)
  }
  return listAnggaran
}

export const GetDetailAnggaran = async (idAnggaran: string) => {
  const dataAnggaran = await GetAnggaranById(idAnggaran)
  const restructured = {
    ...dataAnggaran,
    tanggal_pengajuan: dataAnggaran.tanggalPengajuan,
    tanggal_pengesahan: dataAnggaran.tanggalPengesahan,
    alasan_penolakan: dataAnggaran.alasanPenolakan,
    is_pengesahan: dataAnggaran.isPengesahan,
  }
  return {
    ...restructured,
    status: await GetStatusAnggaran(restructured),
  }
}

export const GetStatusAnggaran = async (
  data: any = null,
  tahun: number = null,
  tahunAktif: number = null
) => {
  const notApproveStatus = [2, 3]
  if (data !== null) {
    if (
      data.tanggal_pengajuan === null &&
      data.tanggal_pengesahan === null &&
      data.is_pengesahan === 0 &&
      (data.alasan_penolakan === null || data.alasan_penolakan === '')
    ) {
      return STATUS_KERTAS_KERJA.draft
    }
    if (
      data.tanggal_pengajuan !== null &&
      data.tanggal_pengesahan === null &&
      (data.alasan_penolakan === null || data.alasan_penolakan === '')
    ) {
      return STATUS_KERTAS_KERJA.waiting_approval
    }
    if (
      data.tanggal_pengesahan !== null &&
      (data.alasan_penolakan === null || data.alasan_penolakan === '')
    ) {
      return STATUS_KERTAS_KERJA.approved
    }
    if (
      (data.alasan_penolakan != null && data.alasan_penolakan !== '') ||
      notApproveStatus.includes(data.is_pengesahan)
    ) {
      return STATUS_KERTAS_KERJA.not_approved
    }
  } else {
    if (tahun !== null && tahunAktif !== null && tahun < tahunAktif) {
      return STATUS_KERTAS_KERJA.disabled
    }
    return STATUS_KERTAS_KERJA.not_created
  }
}

export const IPCUpsertAnggaran = async (
  data: AnggaranData
): Promise<Result<InsertResult, Error>> => {
  const now = new Date()

  const anggaran = new Anggaran()
  anggaran.idAnggaran = data.id_anggaran
  anggaran.idRefSumberDana = data.id_ref_sumber_dana
  anggaran.sekolahId = data.sekolah_id
  anggaran.tahunAnggaran = data.tahun_anggaran
  anggaran.volume = data.volume
  anggaran.hargaSatuan = data.harga_satuan
  anggaran.jumlah = data.jumlah
  anggaran.sisaAnggaran = data.sisa_anggaran
  anggaran.isPengesahan = data.is_pengesahan
  anggaran.isApprove = data.is_approve
  anggaran.isRevisi = data.is_revisi
  anggaran.alasanPenolakan = data.alasan_penolakan
  anggaran.isAktif = data.is_aktif
  anggaran.softDelete = 0
  anggaran.lastUpdate = now
  anggaran.updaterId = await GetConfig('pengguna_id')
  anggaran.idPenjab = data.id_penjab

  if (data.tanggal_pengajuan !== '' && data.tanggal_pengajuan !== null) {
    anggaran.tanggalPengajuan = new Date(data.tanggal_pengajuan)
  }

  if (data.tanggal_pengesahan !== '' && data.tanggal_pengesahan !== null) {
    anggaran.tanggalPengesahan = new Date(data.tanggal_pengesahan)
  }

  if (data.create_date !== '' && data.create_date !== null) {
    anggaran.createDate = new Date(data.create_date)
  } else {
    anggaran.createDate = now
  }

  let result: InsertResult
  try {
    result = await UpsertAnggaran(anggaran)
  } catch (error) {
    return err(new Error(error))
  }

  return ok(result)
}
