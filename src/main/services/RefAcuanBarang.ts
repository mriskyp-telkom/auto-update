import { createQueryBuilder, getRepository, InsertResult } from 'typeorm'
import { RefAcuanBarang } from '../repositories/RefAcuanBarang'

export const addBulkRefAcuanBarang = async (
  bulkRefAcuanBarang: RefAcuanBarang[]
): Promise<InsertResult> => {
  return await getRepository(RefAcuanBarang).upsert(bulkRefAcuanBarang, [
    'idBarang',
  ])
}

export const getLastUpdate = async (): Promise<Date> => {
  const data = await createQueryBuilder(RefAcuanBarang, 'rab')
    .orderBy('rab.last_update', 'DESC')
    .getOne()
  return data != null ? data.lastUpdate : null
}
