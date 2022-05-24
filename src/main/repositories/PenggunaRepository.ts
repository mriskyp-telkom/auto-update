import { getRepository } from 'typeorm'
import { Pengguna } from 'main/models/Pengguna'

export const GetPengguna = async (): Promise<Pengguna> => {
  return await getRepository(Pengguna).findOne()
}
