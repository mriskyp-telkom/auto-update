import { createQueryBuilder, getRepository, InsertResult } from 'typeorm'
import { RefKode } from '../repositories/RefKode'

export const addBulkRefKode = async (
  bulkRefKode: RefKode[]
): Promise<InsertResult> => {
  return await getRepository(RefKode).upsert(bulkRefKode, ['idRefKode'])
}

export const getLastUpdate = async (): Promise<Date> => {
  const data = await createQueryBuilder(RefKode, 'rk')
    .orderBy('rk.last_update', 'DESC')
    .getOne()
  return data != null ? data.lastUpdate : null
}

export const getRefKode = async (): Promise<any> => {
  return await createQueryBuilder(RefKode, 'rk')
    .where('rk.expired_date is null')
    .getRawMany()
}

export const getRefKodeList = async (
  bentukPendidikan: number
): Promise<any> => {
  return createQueryBuilder(RefKode, 'rk3')
    .select([
      'rk3.id_kode as id_kode',
      'rk1.uraian_kode as program',
      'rk2.uraian_kode as komponen',
      'rk3.uraian_kode as kegiatan',
      "case when substr(rk2.id_kode,4,2) = '12' then 1 else 0 end as flag_honor",
    ])
    .innerJoin(RefKode, 'rk2', 'rk3.parent_kode = rk2.id_ref_kode')
    .innerJoin(RefKode, 'rk1', 'rk2.parent_kode = rk1.id_ref_kode')
    .where(
      'rk3.expired_date is null' +
        'AND rk2.expired_date is null' +
        'AND rk1.expired_date is null' +
        'AND rk3.bentuk_pendidikan_id =:bentukPendidikan',
      { bentukPendidikan: bentukPendidikan }
    )
    .getRawMany()
}
