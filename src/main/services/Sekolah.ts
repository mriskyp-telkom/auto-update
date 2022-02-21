import { getRepository, InsertResult } from 'typeorm'
import { MstSekolah } from '../repositories/MstSekolah'

export const GetSekolah = async (): Promise<MstSekolah> => {
  return await getRepository(MstSekolah).findOne()
}

export const addSekolah = async (
  sekolah: MstSekolah
): Promise<InsertResult> => {
  return await getRepository(MstSekolah).insert({
    sekolahId: sekolah.sekolahId,
    kodeWilayah: sekolah.kodeWilayah,
    nama: sekolah.nama,
    npsn: sekolah.npsn,
    alamat: sekolah.alamat,
    statusSekolah: sekolah.statusSekolah,
    bentukPendidikanId: sekolah.bentukPendidikanId,
    telepon: sekolah.telepon,
    kepsek: sekolah.kepsek,
    teleponKepsek: sekolah.teleponKepsek,
    nipKepsek: sekolah.nipKepsek,
    emailKepsek: sekolah.emailKepsek,
    tu: sekolah.tu,
    teleponTu: sekolah.teleponTu,
    nipTu: sekolah.nipTu,
    emailTu: sekolah.emailTu,
    jumlahSiswa: sekolah.jumlahSiswa,
    kodeRegistrasi: sekolah.kodeRegistrasi,
    softDelete: sekolah.softDelete,
    createDate: sekolah.createDate,
    lastUpdate: sekolah.lastUpdate,
    updaterId: sekolah.updaterId,
  })
}
