import { createQueryBuilder, getRepository } from 'typeorm'
import { Rapbs } from 'main/repositories/Rapbs'
import { RapbsPeriode } from 'main/repositories/RapbsPeriode'
import { Anggaran } from 'main/repositories/Anggaran'
import { RefSumberDana } from 'main/repositories/RefSumberDana'
import { RefRekening } from 'main/repositories/RefRekening'
import { RefKode } from 'main/repositories/RefKode'
import { RefAcuanBarang } from 'main/repositories/RefAcuanBarang'
import { getBentukPendidikan } from 'main/services/Sekolah'
import CommonUtils from '../utils/CommonUtils'

export const GetAnggaran = async (
  idSumberDana: number,
  tahunAnggaran: number[] | null
): Promise<any> => {
  const data = await createQueryBuilder(Anggaran, 'a')
    .select([
      'a.id_anggaran',
      'r.nama_sumber_dana',
      'a.tahun_anggaran as tahun',
      'a.jumlah ',
      'a.id_ref_sumber_dana',
      'a.tanggal_pengajuan',
      'a.tanggal_pengesahan',
      'a.is_revisi',
      'a.is_pengesahan',
      'a.create_date',
      'a.last_update',
      'MAX(a.is_revisi) as is_revisi',
      'a.alasan_penolakan',
    ])
    .innerJoin(
      RefSumberDana,
      'r',
      'r.id_ref_sumber_dana = a.id_ref_sumber_dana'
    )
    .where(
      'a.soft_delete = 0  ' +
        ' AND a.is_aktif = 1' +
        ' AND a.id_ref_sumber_dana = :idSumberDana ' +
        ' AND a.tahun_anggaran IN (:...tahunAnggaran )',
      { idSumberDana, tahunAnggaran }
    )
    .groupBy('tahun_anggaran')
    .orderBy('a.tahun_anggaran', 'DESC')
    .getRawMany()
  return data
}

export const GetPagu = async (idAnggaran: string): Promise<any> => {
  const data = await createQueryBuilder(Anggaran, 'a')
    .select([
      'max(a.jumlah) as pagu',
      'sum(ifnull(r.jumlah,0)) as total',
      'max(a.jumlah)-sum(ifnull(r.jumlah,0)) as sisa',
    ])
    .leftJoin(Rapbs, 'r', 'a.id_anggaran = r.id_anggaran and r.soft_delete=0')
    .where('a.soft_delete = 0  ' + ' AND a.id_anggaran = :idAnggaran ', {
      idAnggaran,
    })
    .groupBy('a.id_anggaran')
    .getRawOne()
  return data
}

export const GetAnggaranBefore = async (
  sumberDana: number,
  tahun: number
): Promise<string> => {
  const getIsRevisiMax =
    (
      await createQueryBuilder(Anggaran, 'a')
        .select('MAX(a.is_revisi)', 'is_revisi')
        .where(
          'a.soft_delete = 0 AND a.tahun_anggaran =:tahun AND a.id_ref_sumber_dana = :sumberDana',
          {
            tahun: tahun - 1,
            sumberDana: sumberDana,
          }
        )
        .getRawOne()
    )?.is_revisi ?? -1
  if (getIsRevisiMax > -1) {
    const getIdAnggaran = await createQueryBuilder(Anggaran, 'a')
      .select('a.id_anggaran as id_anggaran')
      .where(
        'a.soft_delete = 0 AND a.tahun_anggaran =:tahun AND a.is_revisi =:isRevisi AND a.id_ref_sumber_dana =:sumberDana ',
        {
          tahun: tahun - 1,
          isRevisi: getIsRevisiMax,
          sumberDana: sumberDana,
        }
      )
      .getRawOne()
    return getIdAnggaran.id_anggaran ?? ''
  }
  return ''
}

export const AddAnggaran = async (anggaran: Anggaran): Promise<any> => {
  return await getRepository(Anggaran).insert(anggaran)
}

export const DelAnggaran = async (idAnggaran: string): Promise<any> => {
  return await createQueryBuilder()
    .update(Anggaran)
    .set({
      softDelete: 1,
      lastUpdate: new Date(),
    })
    .where('id_anggaran = :idAnggaran', { idAnggaran })
    .execute()
}

export const CopyAnggaran = async (
  idAnggaranSource: string,
  idAnggaranNew: string
): Promise<boolean> => {
  let idRapbs: string
  let refRek
  let refKode
  let refBarang
  let getRapbsPeriode
  const getBentuk = await getBentukPendidikan()
  const getRapbsSource = await createQueryBuilder(Rapbs, 'r')
    .where('r.soft_delete=0' + ' AND r.id_anggaran=:idAnggaran', {
      idAnggaran: idAnggaranSource,
    })
    .getRawMany()
  try {
    getRapbsSource?.forEach(async (el) => {
      refRek = await createQueryBuilder(RefRekening)
        .where('expired_date is null and kode_rekening=:kodeRekening', {
          kodeRekening: el.kode_rekening,
        })
        .getCount()

      refKode = await createQueryBuilder(RefKode)
        .where(
          'expired_date is null ' +
            'and bentuk_pendidikan_id=:bentukPendidikan ' +
            'and id_ref_kode=:idRefKode',
          {
            bentukPendidikan: getBentuk,
            idRefKode: el.id_ref_kode,
          }
        )
        .getCount()

      refBarang =
        el.id_barang ?? '' == ''
          ? await createQueryBuilder(RefAcuanBarang)
              .where('expired_date is null and id_barang=:idBarang', {
                idBarang: el.id_barang,
              })
              .getCount()
          : 1

      if (refKode > 0 && refRek > 0 && refBarang > 0) {
        idRapbs = CommonUtils.encodeUUID(CommonUtils.uuid())
        el.id_anggaran = idAnggaranNew
        el.id_rapbs = idRapbs
        el.create_date = new Date()
        el.last_update = new Date()
        await getRepository(Rapbs).insert(el)

        getRapbsPeriode = await createQueryBuilder(RapbsPeriode)
          .where('soft_delete=0 and id_rapbs=:idRapbs', { idRapbs: idRapbs })
          .getRawMany()

        getRapbsPeriode?.forEach(async (eld) => {
          eld.id_rapbs_periode = CommonUtils.encodeUUID(CommonUtils.uuid())
          eld.id_rapbs = idRapbs
          eld.create_date = new Date()
          eld.last_update = new Date()

          await getRepository(RapbsPeriode).insert(eld)
        })
      }
    })
    return true
  } catch {
    return false
  }
}
