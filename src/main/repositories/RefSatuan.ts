import { createQueryBuilder, getRepository, InsertResult } from 'typeorm'
import { RefSatuan } from '../models/RefSatuan'

export const getRefSatuanLastUpdate = async (): Promise<Date> => {
  const data = await createQueryBuilder(RefSatuan, 'rs')
    .where('rs.expired_date is null')
    .orderBy('rs.last_update', 'DESC')
    .getOne()
  return data != null ? data.lastUpdate : null
}

export const getRefSatuan = async (): Promise<any> => {
  return await createQueryBuilder(RefSatuan, 'rs')
    .where('rs.expired_date is null')
    .getRawMany()
}

export const addBulkRefSatuan = async (
  bulkRefSatuan: RefSatuan[]
): Promise<InsertResult> => {
  return await getRepository(RefSatuan).upsert(bulkRefSatuan, ['refSatuanId'])
}
