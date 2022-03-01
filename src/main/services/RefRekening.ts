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
