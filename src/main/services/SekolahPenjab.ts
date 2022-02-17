import { getRepository, InsertResult } from 'typeorm'
import { SekolahPenjab } from '../repositories/SekolahPenjab'

export const addSekolahPenjab = async (
  sekolahPenjab: SekolahPenjab
): Promise<InsertResult> => {
  return await getRepository(SekolahPenjab).insert({
    idPenjab: sekolahPenjab.idPenjab,
    sekolahId: sekolahPenjab.sekolahId,
    tanggalMulai: sekolahPenjab.tanggalMulai,
    tanggalSelesai: sekolahPenjab.tanggalSelesai,
    ks: sekolahPenjab.ks,
    nipKs: sekolahPenjab.nipKs,
    emailKs: sekolahPenjab.emailKs,
    telpKs: sekolahPenjab.telpKs,
    bendahara: sekolahPenjab.bendahara,
    nipBendahara: sekolahPenjab.nipBendahara,
    emailBendahara: sekolahPenjab.emailBendahara,
    telpBendahara: sekolahPenjab.telpBendahara,
    komite: sekolahPenjab.komite,
    nipKomite: sekolahPenjab.nipKomite,
    softDelete: sekolahPenjab.softDelete,
    createDate: sekolahPenjab.createDate,
    lastUpdate: sekolahPenjab.lastUpdate,
    updaterId: sekolahPenjab.updaterId,
  })
}
