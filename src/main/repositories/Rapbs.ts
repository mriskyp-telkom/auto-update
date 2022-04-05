import { Rapbs } from 'main/models/Rapbs'
import { RapbsPeriode } from 'main/models/RapbsPeriode'
import { RefKode } from 'main/models/RefKode'
import { RefRekening } from 'main/models/RefRekening'
import { createQueryBuilder, getRepository, InsertResult } from 'typeorm'

export const GetRapbsBulan = async (
  idAnggaran: string,
  idPeriode: number
): Promise<any> => {
  const data = await createQueryBuilder(Rapbs, 'r')
    .select([
      'r.id_rapbs',
      'rk3.uraian_kode as program',
      'rk.uraian_kode as kegiatan',
      'rr.rekening as rekening',
      'r.uraian_text as uraian',
      'rp.volume as jumlah',
      'rp.satuan as satuan',
      'rp.harga_satuan as harga_satuan',
      'rp.volume*rp.harga_satuan as total',
    ])
    .innerJoin(RapbsPeriode, 'rp', 'r.id_rapbs = rp.id_rapbs')
    .innerJoin(RefKode, 'rk', 'r.id_ref_kode = rk.id_ref_kode')
    .innerJoin(RefKode, 'rk2', 'rk.parent_kode = rk2.id_ref_kode')
    .innerJoin(RefKode, 'rk3', 'rk2.parent_kode = rk3.id_ref_kode')
    .innerJoin(RefRekening, 'rr', 'r.kode_rekening = rr.kode_rekening')
    .where(
      'r.soft_delete = 0  ' +
        ' AND rp.soft_delete = 0' +
        ' AND r.id_anggaran = :idAnggaran ' +
        ' AND rp.id_periode = :idPeriode',
      { idAnggaran, idPeriode }
    )
    .getRawMany()
  return data
}

export const GetRapbs = async (idRapbs: string): Promise<Rapbs> => {
  return await getRepository(Rapbs).findOne({ idRapbs: idRapbs })
}

export const AddRapbs = async (rapbs: Rapbs): Promise<InsertResult> => {
  return await getRepository(Rapbs).upsert(rapbs, ['idRapbs'])
}

export const DelRapbs = async (idRapbs: string): Promise<any> => {
  return await createQueryBuilder()
    .update(Rapbs)
    .set({
      softDelete: 1,
      lastUpdate: new Date(),
    })
    .where('id_rapbs = :idRapbs', { idRapbs })
    .execute()
}
