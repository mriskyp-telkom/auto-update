import { getRepository, InsertResult } from 'typeorm'
import { RefKode } from '../repositories/RefKode'

export const addBulkRefKode = async (
  bulkRefKode: RefKode[]
): Promise<InsertResult> => {
  return await getRepository(RefKode).upsert(bulkRefKode, ['idRefKode'])
}
