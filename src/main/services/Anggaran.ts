import { createQueryBuilder } from 'typeorm'
import { Anggaran } from '../repositories/Anggaran'
import { RefSumberDana } from '../repositories/RefSumberDana'

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
