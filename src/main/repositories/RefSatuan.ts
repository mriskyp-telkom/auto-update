import { ReferensiSatuan } from 'main/types/Referensi'
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

export const getRefSatuan = async (): Promise<ReferensiSatuan[]> => {
  try {
    return await createQueryBuilder(RefSatuan, 'rs')
      .select([
        'ref_satuan_id as id',
        'satuan',
        'unit',
        'created_date AS createDate',
        'last_update AS lastUpdate',
      ])
      .where('rs.expired_date is null')
      .getRawMany()
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
