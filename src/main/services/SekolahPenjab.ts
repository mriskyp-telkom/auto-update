import {
  getConnection,
  getRepository,
  InsertResult,
  UpdateResult,
} from 'typeorm'
import { SekolahPenjab } from '../repositories/SekolahPenjab'

export const addSekolahPenjab = async (
  sekolahPenjab: SekolahPenjab
): Promise<InsertResult> => {
  return await getRepository(SekolahPenjab).upsert(sekolahPenjab, ['idPenjab'])
}

export const findSekolahPenjabId = async (
  sekolahPenjab: SekolahPenjab
): Promise<string> => {
  return (
    (
      await getRepository(SekolahPenjab).findOne({
        ks: sekolahPenjab.ks,
        nipKs: sekolahPenjab.nipKs,
        bendahara: sekolahPenjab.bendahara,
        nipBendahara: sekolahPenjab.nipBendahara,
        komite: sekolahPenjab.komite,
        nipKomite: sekolahPenjab.nipKomite,
      })
    )?.idPenjab ?? ''
  )
}

export const updateSekolahPenjab = async (
  sekolahPenjab: SekolahPenjab
): Promise<UpdateResult> => {
  return await getConnection()
    .createQueryBuilder()
    .update(SekolahPenjab)
    .set({
      ks: sekolahPenjab.ks,
      nipKs: sekolahPenjab.nipKs,
      bendahara: sekolahPenjab.bendahara,
      nipBendahara: sekolahPenjab.nipBendahara,
      komite: sekolahPenjab.komite,
      nipKomite: sekolahPenjab.nipKomite,
    })
    .where({ idPenjab: sekolahPenjab.idPenjab })
    .execute()
}
