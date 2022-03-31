import { getRepository, InsertResult } from 'typeorm'
import { InstansiPengguna } from '../models/InstansiPengguna'

export const addInstansiPengguna = async (
  instansiPengguna: InstansiPengguna
): Promise<InsertResult> => {
  return await getRepository(InstansiPengguna).insert({
    instansiPenggunaId: instansiPengguna.instansiPenggunaId,
    penggunaId: instansiPengguna.penggunaId,
    instansiId: instansiPengguna.instansiId,
    jabatanId: instansiPengguna.jabatanId,
    sk: instansiPengguna.sk,
    tanggalSk: instansiPengguna.tanggalSk,
    softDelete: instansiPengguna.softDelete,
    createDate: instansiPengguna.createDate,
    lastUpdate: instansiPengguna.lastUpdate,
    updaterId: instansiPengguna.updaterId,
  })
}
