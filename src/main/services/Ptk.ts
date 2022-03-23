import { createQueryBuilder, getRepository, InsertResult } from 'typeorm'
import { Ptk } from 'main/repositories/Ptk'

export const AddBulkPtk = async (bulkPtk: Ptk[]): Promise<InsertResult> => {
  return await getRepository(Ptk).upsert(bulkPtk, [
    'sekolahId',
    'ptkId',
    'tahunAjaranId',
  ])
}

export const GetLastUpdate = async (): Promise<Date> => {
  const data = await createQueryBuilder(Ptk, 'ptk')
    .orderBy('ptk.last_update', 'DESC')
    .getOne()
  return data != null ? data.lastUpdate : null
}

export const GetPtk = async (tahunAktif: number): Promise<any> => {
  const data = await createQueryBuilder(Ptk, 'ptk')
    .select([
      'ptk_id as id',
      'nuptk as kode',
      'nama as uraian',
      "case when jenis_kelamin = 'P' then 'Perempuan' else 'Laki-Laki' end as jenis_kelamin",
      'masa_kerja_tahun',
      'masa_kerja_bulan',
    ])
    .where('soft_delete = 0')
    .andWhere('tahun_ajaran_id = :tahunAktif', { tahunAktif })
    .getRawMany()
  return data
}
