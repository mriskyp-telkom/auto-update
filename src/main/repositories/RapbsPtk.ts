import { RapbsPtk } from 'main/models/RapbsPtk'
import {
  createQueryBuilder,
  DeleteResult,
  getRepository,
  InsertResult,
} from 'typeorm'

export async function AddRapbsPtk(rapbsPtk: RapbsPtk): Promise<InsertResult> {
  return await getRepository(RapbsPtk).upsert(rapbsPtk, ['idRapbs', 'ptkId'])
}

export async function GetRapbsPtk(idRapbs: string): Promise<RapbsPtk> {
  return await getRepository(RapbsPtk).findOne({
    idRapbs: idRapbs,
  })
}

export async function DeleteRapbsPtk(
  idRapbs: string,
  idPtk: string
): Promise<DeleteResult> {
  return await createQueryBuilder()
    .delete()
    .from(RapbsPtk)
    .where('id_rapbs = :idRapbs AND ptk_id = :idPtk', { idRapbs, idPtk })
    .execute()
}
