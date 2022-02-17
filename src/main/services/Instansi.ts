import { getRepository, InsertResult } from 'typeorm'
import { Instansi } from '../repositories/Instansi'

export const addInstansi = async (
  instansi: Instansi
): Promise<InsertResult> => {
  return await getRepository(Instansi).insert({
    instansiId: instansi.instansiId,
    insInstansiId: instansi.insInstansiId,
    jenisInstansiId: instansi.jenisInstansiId,
    kodeInstansi: instansi.kodeInstansi,
    nama: instansi.nama,
    alamat: instansi.alamat,
    kodePos: instansi.kodePos,
    kodeWilayah: instansi.kodeWilayah,
    lintang: instansi.lintang,
    bujur: instansi.bujur,
    email: instansi.email,
    telepon: instansi.telepon,
    fax: instansi.fax,
    website: instansi.website,
    tag: instansi.tag,
    softDelete: instansi.softDelete,
    createDate: instansi.createDate,
    lastUpdate: instansi.lastUpdate,
    updaterId: instansi.updaterId,
  })
}
