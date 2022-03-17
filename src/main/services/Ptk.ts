import { createQueryBuilder, getRepository, InsertResult } from 'typeorm'
import { Ptk } from 'main/repositories/Ptk'

export const AddBulkPtk = async (bulkPtk: Ptk[]): Promise<InsertResult> => {
  return await getRepository(Ptk).upsert(bulkPtk, [
    'sekolahId',
    'ptkId',
    'tahunAjaranId',
  ])
}

export const GetLastUpdate = async (): Promise<Date> => {
  const data = await createQueryBuilder(Ptk, 'ptk')
    .orderBy('ptk.last_update', 'DESC')
    .getOne()
  return data != null ? data.lastUpdate : null
}
