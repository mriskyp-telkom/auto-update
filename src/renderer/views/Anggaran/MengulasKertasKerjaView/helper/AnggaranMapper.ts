import { ParamAnggaranType } from 'renderer/types/apis/AnggaranType'
import { Anggaran } from 'main/models/Anggaran'

// due import crypto utils
import ConvertUtils from '../../../../../main/utils/Converts'
import CommonUtils from '../../../../../main/utils/CommonUtils'

export const SetterAnggaranParam = (data: Anggaran): ParamAnggaranType => {
  const hargaSatuan = ConvertUtils.convertIntoNumber(data?.hargaSatuan)
  const sisaAnggaran = ConvertUtils.convertIntoNumber(data?.sisaAnggaran)
  const jumlah = ConvertUtils.convertIntoNumber(data?.jumlah)

  const tanggalPengajuan = new Date()

  const dataParamAnggaran = <ParamAnggaranType>{}
  dataParamAnggaran.id_anggaran = CommonUtils.decodeUUID(data?.idAnggaran)
  dataParamAnggaran.id_ref_sumber_dana = data?.idRefSumberDana
  dataParamAnggaran.sekolah_id = CommonUtils.decodeUUID(data?.sekolahId)
  dataParamAnggaran.volume = data?.volume
  dataParamAnggaran.harga_satuan = hargaSatuan
  dataParamAnggaran.jumlah = jumlah
  dataParamAnggaran.sisa_anggaran = sisaAnggaran
  dataParamAnggaran.is_pengesahan = data?.isPengesahan

  // due from db tanggal_pengajuan null, and wants to create pengajuan, then create a tanggal
  const tanggalPengajuanFormatted = CommonUtils.formatDateToString(
    tanggalPengajuan,
    'YYYY-MM-DD HH:mm:ss'
  )

  dataParamAnggaran.tanggal_pengajuan = tanggalPengajuanFormatted

  // as for now, menunggu konfirmasi mas fuad terkait tanggal pengesahan null
  dataParamAnggaran.tanggal_pengesahan =
    data.tanggalPengesahan != null
      ? CommonUtils.formatDateToString(
          data?.tanggalPengesahan,
          'YYYY-MM-DD HH:mm:ss'
        )
      : null

  // dataParamAnggaran.tanggal_pengesahan = tanggalPengesahan
  dataParamAnggaran.is_approve = data?.isApprove
  dataParamAnggaran.is_revisi = data?.isRevisi
  dataParamAnggaran.alasan_penolakan = data?.alasanPenolakan
  dataParamAnggaran.is_aktif = data?.isAktif
  dataParamAnggaran.soft_delete = data?.softDelete

  const createDate = CommonUtils.formatDateToString(
    data?.createDate,
    'YYYY-MM-DD HH:mm:ss'
  )
  const lastUpdate = CommonUtils.formatDateToString(
    data?.lastUpdate,
    'YYYY-MM-DD HH:mm:ss'
  )
  dataParamAnggaran.create_date = createDate

  dataParamAnggaran.last_update = lastUpdate
  dataParamAnggaran.updater_id = CommonUtils.decodeUUID(data?.updaterId)
  dataParamAnggaran.id_penjab = CommonUtils.decodeUUID(data?.idPenjab)

  return dataParamAnggaran
}
