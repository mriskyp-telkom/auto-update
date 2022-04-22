import { GetAnggaran, GetAnggaranById } from 'main/repositories/Anggaran'
import { GetConfig } from 'main/repositories/Config'

import CommonUtils from 'main/utils/CommonUtils'

import { STATUS_KERTAS_KERJA, VERSI_ANGGARAN } from 'global/constants'

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
