import { createQueryBuilder, getRepository, InsertResult } from 'typeorm'
import { RefSatuan } from '../models/RefSatuan'

export const getRefSatuanLastUpdate = async (): Promise<Date> => {
  try {
    const data = await createQueryBuilder(RefSatuan, 'rs')
      .where('rs.expired_date is null')
      .orderBy('rs.last_update', 'DESC')
      .getOne()
    return data != null ? data.lastUpdate : null
  } catch (e) {
    throw new Error(e)
  }
}

export const getRefSatuan = async (): Promise<RefSatuan> => {
  try {
    const data = await createQueryBuilder(RefSatuan, 'rs')
      .where('rs.expired_date is null')
      .getRawMany()
    const getResult = data as unknown as Promise<RefSatuan>
    return getResult
  } catch (e) {
    throw new Error(e)
  }
}

export const addBulkRefSatuan = async (
  bulkRefSatuan: RefSatuan[]
): Promise<InsertResult> => {
  try {
    return await getRepository(RefSatuan).upsert(bulkRefSatuan, ['refSatuanId'])
  } catch (e) {
    throw new Error(e)
  }
}
