import { getRepository, InsertResult } from 'typeorm'
import { MstWilayah } from '../repositories/MstWilayah'

export const addBulkWilayah = async (
  bulkWilayah: MstWilayah[]
): Promise<InsertResult> => {
  return await getRepository(MstWilayah).upsert(bulkWilayah, ['kodeWilayah'])
}
