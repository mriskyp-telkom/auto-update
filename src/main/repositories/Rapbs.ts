import { ERROR } from 'global/constants'
import { Rapbs } from 'main/models/Rapbs'
import { AnggaranKegiatan } from 'main/types/Anggaran'
import { err, ok, Result } from 'neverthrow'
import { createQueryBuilder, getRepository, InsertResult } from 'typeorm'

export const GetRapbsBulan = async (
  idAnggaran: string,
  idPeriode: number
): Promise<Result<AnggaranKegiatan[], Error>> => {
  try {
    const query = createQueryBuilder(Rapbs, 'r')
      .select([
        'r.id_anggaran as idAnggaran',
        'rp.id_periode as idPeriode',
        'r.id_rapbs as idRapbs',
        'rk3.uraian_kode as programKegiatan',
        'rk.uraian_kode as kegiatan',
        'rr.rekening as rekeningBelanja',
        'r.uraian_text as uraian',
        'rp.volume as jumlah',
        'rp.satuan as satuan',
        'rp.harga_satuan as hargaSatuan',
        'rp.jumlah as total',
        "case when substr(rk2.id_kode,4,2) = '12' then 1 else 0 end as isHonor",
      ])
      .innerJoin('rapbs_periode', 'rp', 'r.id_rapbs = rp.id_rapbs')
      .innerJoin('ref_kode', 'rk', 'r.id_ref_kode = rk.id_ref_kode')
      .innerJoin('ref_kode', 'rk2', 'rk.parent_kode = rk2.id_ref_kode')
      .innerJoin('ref_kode', 'rk3', 'rk2.parent_kode = rk3.id_ref_kode')
      .innerJoin('ref_rekening', 'rr', 'r.kode_rekening = rr.kode_rekening')
      .where(
        ' r.soft_delete = 0' +
          ' AND rp.soft_delete = 0' +
          ' AND r.id_anggaran = :idAnggaran' +
          ' AND rp.id_periode = :idPeriode',
        { idAnggaran, idPeriode }
      )

    const data = await query.getRawMany()

    return ok(<AnggaranKegiatan[]>data)
  } catch (error) {
    return err(new Error(error))
  }
}

export const GetOneRapbsBulan = async (
  idRapbs: string
): Promise<Result<AnggaranKegiatan, Error>> => {
  try {
    const query = createQueryBuilder(Rapbs, 'r')
      .select([
        'r.id_anggaran as idAnggaran',
        'rp.id_periode as idPeriode',
        'r.id_rapbs as idRapbs',
        'rk3.uraian_kode as programKegiatan',
        'rk.uraian_kode as kegiatan',
        'rr.rekening as rekeningBelanja',
        'r.uraian_text as uraian',
        'rp.volume as jumlah',
        'rp.satuan as satuan',
        'rp.harga_satuan as hargaSatuan',
        'rp.jumlah as total',
        "case when substr(rk2.id_kode,4,2) = '12' then 1 else 0 end as isHonor",
      ])
      .innerJoin('rapbs_periode', 'rp', 'r.id_rapbs = rp.id_rapbs')
      .innerJoin('ref_kode', 'rk', 'r.id_ref_kode = rk.id_ref_kode')
      .innerJoin('ref_kode', 'rk2', 'rk.parent_kode = rk2.id_ref_kode')
      .innerJoin('ref_kode', 'rk3', 'rk2.parent_kode = rk3.id_ref_kode')
      .innerJoin('ref_rekening', 'rr', 'r.kode_rekening = rr.kode_rekening')
      .where(
        ' r.soft_delete = 0' +
          ' AND rp.soft_delete = 0' +
          ' AND r.id_rapbs = :idRapbs',
        { idRapbs }
      )

    const data = await query.limit(1).getRawOne()

    return ok(<AnggaranKegiatan>data)
  } catch (error) {
    return err(new Error(error))
  }
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

export async function GetLatestUrutan(
  idAnggaran: string,
  idRefKode: string,
  kodeRekening: string,
  tahun: number
): Promise<Result<string, Error>> {
  const rapbs = await getRepository(Rapbs)
    .createQueryBuilder('a')
    .select('a.urutan')
    .where({
      idAnggaran: idAnggaran,
      idRefKode: idRefKode,
      kodeRekening: kodeRekening,
      idRefTahunAnggaran: tahun,
    })
    .orderBy({ urutan: 'DESC' })
    .limit(1)
    .getOne()

  if (rapbs === undefined) {
    return err(new Error(ERROR.notFound))
  }

  return ok(rapbs.urutan)
}

export function GetNextUrutan(current: string): string {
  let parsed = parseInt(current, 10)

  if (isNaN(parsed)) {
    return '000'
  }

  parsed++
  return parsed.toString().padStart(3, '0')
}

export async function GetRapbsLastUpdate(idAnggaran: string): Promise<Date> {
  const data = await createQueryBuilder(Rapbs, 'r')
    .where('r.id_anggaran = :idAnggaran', { idAnggaran })
    .orderBy('r.last_update', 'DESC')
    .getOne()
  return data != null ? data.lastUpdate : null
}
