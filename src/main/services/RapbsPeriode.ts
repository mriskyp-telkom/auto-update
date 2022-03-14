import { RapbsPeriode } from 'main/repositories/RapbsPeriode'
import { createQueryBuilder, getRepository } from 'typeorm'

export const GetRapbsPeriode = async (
  idRapbs: string
): Promise<RapbsPeriode> => {
  return await getRepository(RapbsPeriode).findOne({ idRapbs: idRapbs })
}

export const AddRapbsPeriode = async (
  rapbsPeriode: RapbsPeriode
): Promise<any> => {
  return await getRepository(RapbsPeriode).upsert(rapbsPeriode, [
    'idRapbsPeriode',
  ])
}

export const DelRapbsPeriode = async (idRapbsPeriode: string): Promise<any> => {
  return await createQueryBuilder()
    .update(RapbsPeriode)
    .set({
      softDelete: 1,
      lastUpdate: new Date(),
    })
    .where('id_rapbs_periode = :idRapbsPeriode', { idRapbsPeriode })
    .execute()
}
