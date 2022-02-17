import { getRepository, InsertResult } from 'typeorm'
import { RefAcuanBarang } from '../repositories/RefAcuanBarang'

export const addBulkRefAcuanBarang = async (
  bulkRefAcuanBarang: RefAcuanBarang[]
): Promise<InsertResult> => {
  return await getRepository(RefAcuanBarang).upsert(bulkRefAcuanBarang, [
    'idBarang',
  ])
}
