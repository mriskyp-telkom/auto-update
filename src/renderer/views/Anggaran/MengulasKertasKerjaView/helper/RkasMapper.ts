import { RapbsPtk } from 'main/models/RapbsPtk'
import { RapbsPeriode } from 'main/models/RapbsPeriode'
import { Rapbs } from 'main/models/Rapbs'
import {
  ParamRkasPenjabType,
  ParamRkasType,
  ParamRkasDetailType,
  ParamRkasPtkType,
} from './../../../../types/apis/RkasType'
import { SekolahPenjab } from 'main/models/SekolahPenjab'

// due import crypto utils
import ConvertUtils from '../../../../../main/utils/Converts'
import CommonUtils from '../../../../../main/utils/CommonUtils'

// one to many
export const SetterBulkRapbs = (list: Rapbs[]): string[] => {
  const param: string[] = []

  const size = list.length
  for (let i = 0; i < size; i++) {
    const data = list[i]
    param.push(data?.idRapbs)
  }

  return param
}

export const SetterRkasPenjabParam = (
  data: SekolahPenjab
): ParamRkasPenjabType => {
  const lastUpdateFormatted = CommonUtils.formatDateToString(
    data?.lastUpdate,
    'YYYY-MM-DD HH:mm:ss'
  )

  const createDateFormatted = CommonUtils.formatDateToString(
    data?.createDate,
    'YYYY-MM-DD HH:mm:ss'
  )
  try {
    const dataParamRkasPenjab = <ParamRkasPenjabType>{}
    dataParamRkasPenjab.id_penjab = CommonUtils.decodeUUID(data?.idPenjab)
    dataParamRkasPenjab.sekolah_id = CommonUtils.decodeUUID(data?.sekolahId)
    dataParamRkasPenjab.tanggal_mulai = data?.tanggalMulai
    dataParamRkasPenjab.tanggal_selesai = data?.tanggalSelesai
    dataParamRkasPenjab.ks = data?.ks
    dataParamRkasPenjab.nip_ks = data?.nipKs
    dataParamRkasPenjab.email_ks = data?.emailKs
    dataParamRkasPenjab.telp_ks = data?.telpKs
    dataParamRkasPenjab.bendahara = data?.bendahara
    dataParamRkasPenjab.nip_bendahara = data?.nipBendahara
    dataParamRkasPenjab.email_bendahara = data?.emailBendahara
    dataParamRkasPenjab.telp_bendahara = data?.telpBendahara
    dataParamRkasPenjab.komite = data?.komite
    dataParamRkasPenjab.nip_komite = data?.nipKomite
    dataParamRkasPenjab.soft_delete = data?.softDelete
    dataParamRkasPenjab.create_date = createDateFormatted
    dataParamRkasPenjab.last_update = lastUpdateFormatted
    dataParamRkasPenjab.updater_id = CommonUtils.decodeUUID(data?.updaterId)

    return dataParamRkasPenjab
  } catch (e) {
    // console.log(e)
    throw new Error(e)
  }
}

// one to many
export const SetterRkasParam = (list: Rapbs[]): ParamRkasType[] => {
  const param: ParamRkasType[] = []
  // console.log('setter rkas ', list)

  const size = list.length
  for (let i = 0; i < size; i++) {
    const data = list[i]

    // console.log('list idrapbs ', data?.idRapbs)

    const lastUpdateFormatted = CommonUtils.formatDateToString(
      data?.lastUpdate,
      'YYYY-MM-DD HH:mm:ss'
    )

    const createDateFormatted = CommonUtils.formatDateToString(
      data?.createDate,
      'YYYY-MM-DD HH:mm:ss'
    )

    const hargaSatuan = ConvertUtils.convertIntoNumber(data?.hargaSatuan)
    const jumlah = ConvertUtils.convertIntoNumber(data?.jumlah)

    const dataParamRkas = <ParamRkasType>{}
    dataParamRkas.id_rapbs = CommonUtils.decodeUUID(data?.idRapbs)
    dataParamRkas.sekolah_id = CommonUtils.decodeUUID(data?.sekolahId)
    dataParamRkas.id_anggaran = CommonUtils.decodeUUID(data?.idAnggaran)
    dataParamRkas.id_ref_kode = CommonUtils.decodeUUID(data?.idRefKode)
    dataParamRkas.id_ref_tahun_anggaran = data?.idRefTahunAnggaran
    dataParamRkas.kode_rekening = data?.kodeRekening
    dataParamRkas.id_barang = data?.idBarang
    dataParamRkas.urutan = data?.urutan
    dataParamRkas.uraian = data?.uraian
    dataParamRkas.uraian_text = data?.uraianText
    dataParamRkas.volume = data?.volume
    dataParamRkas.satuan = data?.satuan
    dataParamRkas.harga_satuan = hargaSatuan
    dataParamRkas.jumlah = jumlah
    dataParamRkas.v1 = data?.v1
    dataParamRkas.s1 = data?.s1
    dataParamRkas.v2 = data?.v2
    dataParamRkas.s2 = data?.s2
    dataParamRkas.v3 = data?.v3
    dataParamRkas.s3 = data?.s3
    dataParamRkas.v4 = data?.v4
    dataParamRkas.s4 = data?.s4
    dataParamRkas.keterangan = data?.keterangan
    dataParamRkas.soft_delete = data?.softDelete

    dataParamRkas.create_date = createDateFormatted
    dataParamRkas.last_update = lastUpdateFormatted
    dataParamRkas.updater_id = CommonUtils.decodeUUID(data?.updaterId)

    param.push(dataParamRkas)
  }

  return param
}

export const MapperRkasDetailParam = (
  dataPeriode: RapbsPeriode[]
): ParamRkasDetailType[] => {
  const dataParamRkasPeriode: ParamRkasDetailType[] = []

  for (let i = 0; i < dataPeriode.length; i++) {
    const data = dataPeriode[i]

    const lastUpdateFormatted = CommonUtils.formatDateToString(
      data?.lastUpdate,
      'YYYY-MM-DD HH:mm:ss'
    )

    const createDateFormatted = CommonUtils.formatDateToString(
      data?.createDate,
      'YYYY-MM-DD HH:mm:ss'
    )

    // convertIntoNumber
    const hargaSatuan = ConvertUtils.convertIntoNumber(data?.hargaSatuan)
    const jumlah = ConvertUtils.convertIntoNumber(data?.jumlah)

    dataParamRkasPeriode.push(<ParamRkasDetailType>{
      id_rapbs: CommonUtils.decodeUUID(data?.idRapbs),
      id_rapbs_periode: CommonUtils.decodeUUID(data?.idRapbsPeriode),
      id_periode: data?.idPeriode,
      volume: data?.volume,
      satuan: data?.satuan,
      harga_satuan: hargaSatuan,
      jumlah: jumlah,
      v1: data?.v1,
      s1: data?.s1,
      v2: data?.v2,
      s2: data?.s2,
      v3: data?.v3,
      s3: data?.s3,
      v4: data?.v4,
      s4: data?.s4,
      create_date: createDateFormatted,
      last_update: lastUpdateFormatted,
      updater_id: CommonUtils.decodeUUID(data?.updaterId),
    })
  }
  return dataParamRkasPeriode
}

// 1 to many
export const SetterRkasDetailParam = (
  data: RapbsPeriode
): ParamRkasDetailType => {
  const createDateFormatted = CommonUtils.formatDateToString(
    data?.createDate,
    'YYYY-MM-DD HH:mm:ss'
  )

  const lastUpdateFormatted = CommonUtils.formatDateToString(
    data?.lastUpdate,
    'YYYY-MM-DD HH:mm:ss'
  )

  const hargaSatuan = ConvertUtils.convertIntoNumber(data?.hargaSatuan)
  const jumlah = ConvertUtils.convertIntoNumber(data?.jumlah)

  const dataParamRkasDetail = <ParamRkasDetailType>{}
  dataParamRkasDetail.id_rapbs = CommonUtils.decodeUUID(data?.idRapbs)
  dataParamRkasDetail.id_rapbs_periode = CommonUtils.decodeUUID(
    data?.idRapbsPeriode
  )
  dataParamRkasDetail.id_periode = data?.idPeriode
  dataParamRkasDetail.volume = data?.volume
  dataParamRkasDetail.satuan = data?.satuan
  dataParamRkasDetail.harga_satuan = hargaSatuan
  dataParamRkasDetail.jumlah = jumlah
  dataParamRkasDetail.v1 = data?.v1
  dataParamRkasDetail.s1 = data?.s1
  dataParamRkasDetail.v2 = data?.v2
  dataParamRkasDetail.s2 = data?.s2
  dataParamRkasDetail.v3 = data?.v3
  dataParamRkasDetail.s3 = data?.s3
  dataParamRkasDetail.v4 = data?.v4
  dataParamRkasDetail.s4 = data?.s4
  dataParamRkasDetail.soft_delete = data?.softDelete
  dataParamRkasDetail.create_date = createDateFormatted
  dataParamRkasDetail.last_update = lastUpdateFormatted
  dataParamRkasDetail.updater_id = CommonUtils.decodeUUID(data?.updaterId)

  return dataParamRkasDetail
}

export const MapperRkasPtkParam = (list: RapbsPtk[]): ParamRkasPtkType[] => {
  const size = list.length
  const dataParamRkasPtk: ParamRkasPtkType[] = []

  for (let i = 0; i < size; i++) {
    const data = list[i]

    const lastUpdateFormatted = CommonUtils.formatDateToString(
      data?.lastUpdate,
      'YYYY-MM-DD HH:mm:ss'
    )

    const createDateFormatted = CommonUtils.formatDateToString(
      data?.createDate,
      'YYYY-MM-DD HH:mm:ss'
    )

    const paramPtkType = <ParamRkasPtkType>{}
    paramPtkType.id_rapbs = CommonUtils.decodeUUID(data?.idRapbs)
    paramPtkType.ptk_id = CommonUtils.decodeUUID(data?.ptkId)
    paramPtkType.nama = data?.nama
    paramPtkType.create_date = createDateFormatted
    paramPtkType.last_update = lastUpdateFormatted

    dataParamRkasPtk.push(paramPtkType)
  }

  return dataParamRkasPtk
}
