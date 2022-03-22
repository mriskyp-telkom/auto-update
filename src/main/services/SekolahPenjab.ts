import {
  getConnection,
  getRepository,
  InsertResult,
  UpdateResult,
} from 'typeorm'
import { SekolahPenjab } from 'main/repositories/SekolahPenjab'

export const GetSekolahPenjabById = async (idPenjab: string): Promise<any> => {
  const data = await getRepository(SekolahPenjab).findOne({
    idPenjab: idPenjab,
  })
  return data
}

export const addSekolahPenjab = async (
  sekolahPenjab: SekolahPenjab
): Promise<InsertResult> => {
  return await getRepository(SekolahPenjab).upsert(sekolahPenjab, ['idPenjab'])
}

export const findSekolahPenjabId = async (
  sekolahPenjab: SekolahPenjab
): Promise<string> => {
  try {
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
      )?.idPenjab ?? null
    )
  } catch (e) {
    console.log('ERROR ', e)
  }
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
