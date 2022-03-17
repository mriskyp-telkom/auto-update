import { getRepository, InsertResult } from 'typeorm'
import { MstSekolah } from '../repositories/MstSekolah'

export const GetSekolah = async (): Promise<MstSekolah> => {
  return await getRepository(MstSekolah).findOne()
}

export const AddSekolah = async (
  sekolah: MstSekolah
): Promise<InsertResult> => {
  return await getRepository(MstSekolah).upsert(sekolah, ['sekolahId'])
}
