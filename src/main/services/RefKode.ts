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
