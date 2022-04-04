import { getRepository, InsertResult } from 'typeorm'
import { MstSekolah } from '../models/MstSekolah'

export const GetSekolah = async (): Promise<MstSekolah> => {
  return await getRepository(MstSekolah).findOne()
}

export const AddSekolah = async (
  sekolah: MstSekolah
): Promise<InsertResult> => {
  return await getRepository(MstSekolah).upsert(sekolah, ['sekolahId'])
}

export const getBentukPendidikan = async (): Promise<number> => {
  return (await getRepository(MstSekolah).findOne())?.bentukPendidikanId ?? 0
}
