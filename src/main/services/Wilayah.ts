import { getRepository, InsertResult } from 'typeorm'
import { MstWilayah } from '../repositories/MstWilayah'

export const AddBulkWilayah = async (
  bulkWilayah: MstWilayah[]
): Promise<InsertResult> => {
  return await getRepository(MstWilayah).upsert(bulkWilayah, ['kodeWilayah'])
}

export const AddWilayah = async (
  wilayah: MstWilayah
): Promise<InsertResult> => {
  return await getRepository(MstWilayah).upsert([wilayah], ['kodeWilayah'])
}
