import { getRepository, InsertResult } from 'typeorm'
import { RefRekening } from '../repositories/RefRekening'

export const addBulkRefRekening = async (
  bulkRefRekening: RefRekening[]
): Promise<InsertResult> => {
  return await getRepository(RefRekening).upsert(bulkRefRekening, [
    'kodeRekening',
  ])
}
