import { RapbsPtk } from 'main/models/RapbsPtk'
import { err, ok, Result } from 'neverthrow'

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

export const GetRapbsPtkHonor = async (
  listRapbs: string[]
): Promise<Result<RapbsPtk[], Error>> => {
  try {
    // console.log('ptk param list id rapbs ', listRapbs)
    const query = createQueryBuilder(RapbsPtk, 'rp')
      .select([
        'rp.ptk_id as ptkId',
        'rp.id_rapbs as idRapbs',
        'rk.id_ref_kode as idRefKode',
        'rp.nama as nama',
        'rp.create_date as createdDate',
        'rp.last_update as lastUpdate',
        "case when substr(rk.id_kode,4,2) = '12' then 1 else 0 end as isHonor",
      ])
      .innerJoin('rapbs', 'r', 'r.id_rapbs = rp.id_rapbs')
      .innerJoin('ref_kode', 'rk', 'r.id_ref_kode = rk.id_ref_kode')
      .where('isHonor = 1')
      .andWhere('r.soft_delete = 0')
      .andWhere('idRapbs IN (:...listIdRapbs)', { listIdRapbs: listRapbs })

    const data = await query.getRawMany()
    return ok(data)
  } catch (error) {
    return err(new Error(error))
  }
}
