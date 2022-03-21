import { RefAcuanBarang } from 'main/repositories/RefAcuanBarang'
import { createQueryBuilder, getRepository, InsertResult } from 'typeorm'
import { RefRekening } from '../repositories/RefRekening'

export const addBulkRefRekening = async (
  bulkRefRekening: RefRekening[]
): Promise<InsertResult> => {
  return await getRepository(RefRekening).upsert(bulkRefRekening, [
    'kodeRekening',
  ])
}

export const getLastUpdate = async (): Promise<Date> => {
  const data = await createQueryBuilder(RefRekening, 'rr')
    .orderBy('rr.last_update', 'DESC')
    .getOne()
  return data != null ? data.lastUpdate : null
}

export const getRefRekening = async (): Promise<any> => {
  return await createQueryBuilder(RefRekening, 'rr')
    .where('rr.expired_date is null')
    .getRawMany()
}

export const getRefRekeningList = async (): Promise<any> => {
  return await createQueryBuilder(RefRekening, 'rr')
    .select([
      'rr.kode_rekening as kode_rekening',
      "case when substr(rr.kode_rekening,1,3) = '5.1.' then 'Operasional' else 'Modal' end as jenis_rekening",
      'rr.rekening',
      "case when b.jumlah is not null or substr(rr.kode_rekening,1,3) = '5.2' then 1 else 0 end as is_list_barang",
    ])
    .leftJoin(
      (qb) =>
        qb
          .select(['a.kode_rekening', 'count(1) as jumlah'])
          .from(RefAcuanBarang, 'a')
          .where('a.expired_date is null and a.kode_rekening is not null')
          .groupBy('a.kode_rekening')
          .getRawMany(),
      'b',
      'rr.kode_rekening = b.kode_rekening'
    )
    .where('rr.expired_date is null')
    .getRawMany()
}
