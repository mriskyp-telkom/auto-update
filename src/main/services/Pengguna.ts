import { getRepository } from 'typeorm'
import { Pengguna } from 'main/repositories/Pengguna'

export const GetPengguna = async (): Promise<Pengguna> => {
  return await getRepository(Pengguna).findOne()
}
