import { ERROR } from 'global/constants'
import { Rapbs } from 'main/models/Rapbs'
import { AnggaranKegiatan } from 'main/types/Anggaran'
import { err, ok, Result } from 'neverthrow'
import {
  createQueryBuilder,
  getRepository,
  InsertResult,
  UpdateResult,
} from 'typeorm'

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
        'case when rs.unit is not null then rs.unit else rp.satuan end as satuan',
        'rp.harga_satuan as hargaSatuan',
        'rp.jumlah as total',
        "case when substr(rk2.id_kode,4,2) = '12' then 1 else 0 end as isHonor",
        'r.id_ref_kode as idRefKode',
        'r.kode_rekening as kodeRekening',
        'r.id_barang as idBarang',
        'case when rk.expired_date is not null then 1 ' +
          ' when rr.expired_date is not null then 1  ' +
          ' when rab.expired_date is not null then 1 ' +
          " when rab.id_barang is null and case when r.id_barang = '' then null else r.id_barang end is not null and substr(rk2.id_kode,4,2) <> '12' then 1 " +
          " when rbx.jumlah_barang > 0 and ifnull(r.id_barang,'') = '' and substr(rk2.id_kode,4,2) <> '12' then 1 " +
          " when substr(r.kode_rekening,1,3) = '5.2' and ifnull(r.id_barang,'') = '' then 1 " +
          ' else 0 end as errorReferensi',
      ])
      .innerJoin('rapbs_periode', 'rp', 'r.id_rapbs = rp.id_rapbs')
      .innerJoin('ref_kode', 'rk', 'r.id_ref_kode = rk.id_ref_kode')
      .innerJoin('ref_kode', 'rk2', 'rk.parent_kode = rk2.id_ref_kode')
      .innerJoin('ref_kode', 'rk3', 'rk2.parent_kode = rk3.id_ref_kode')
      .innerJoin('ref_rekening', 'rr', 'r.kode_rekening = rr.kode_rekening')
      .leftJoin('ref_acuan_barang', 'rab', 'rab.id_barang = r.id_barang')
      .leftJoin(
        (qb) =>
          qb
            .select(['kode_rekening', 'count(1) as jumlah_barang'])
            .from('ref_acuan_barang', 'r')
            .where('expired_date is null')
            .andWhere('kode_rekening is not null')
            .groupBy('kode_rekening'),
        'rbx',
        'rbx.kode_rekening = r.kode_rekening '
      )
      .leftJoin('ref_satuan', 'rs', 'rp.satuan = rs.satuan')
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
        'case when rs.unit is not null then rs.unit else rp.satuan end as satuan',
        'rp.harga_satuan as hargaSatuan',
        'rp.jumlah as total',
        "case when substr(rk2.id_kode,4,2) = '12' then 1 else 0 end as isHonor",
        'r.id_ref_kode as idRefKode',
        'r.kode_rekening as kodeRekening',
        'r.id_barang as idBarang',
        'case ' +
          ' when rk.expired_date is not null then 1 else 0 end as errorKegiatan ',
        'case ' +
          ' when rr.expired_date is not null then 1 else 0 end as errorRekening ',
        'case ' +
          ' when rab.expired_date is not null then 1 ' +
          " when rab.id_barang is null and case when r.id_barang = '' then null else r.id_barang end is not null and substr(rk2.id_kode,4,2) <> '12' then 1 " +
          " when rbx.jumlah_barang > 0 and ifnull(r.id_barang,'') = '' and substr(rk2.id_kode,4,2) <> '12' then 1 " +
          " when substr(r.kode_rekening,1,3) = '5.2' and ifnull(r.id_barang,'') = '' then 1 " +
          ' else 0 end as errorUraian',
      ])
      .innerJoin('rapbs_periode', 'rp', 'r.id_rapbs = rp.id_rapbs')
      .innerJoin('ref_kode', 'rk', 'r.id_ref_kode = rk.id_ref_kode')
      .innerJoin('ref_kode', 'rk2', 'rk.parent_kode = rk2.id_ref_kode')
      .innerJoin('ref_kode', 'rk3', 'rk2.parent_kode = rk3.id_ref_kode')
      .innerJoin('ref_rekening', 'rr', 'r.kode_rekening = rr.kode_rekening')
      .leftJoin('ref_acuan_barang', 'rab', 'rab.id_barang = r.id_barang')
      .leftJoin(
        (qb) =>
          qb
            .select(['kode_rekening', 'count(1) as jumlah_barang'])
            .from('ref_acuan_barang', 'r')
            .where('expired_date is null')
            .andWhere('kode_rekening is not null')
            .groupBy('kode_rekening'),
        'rbx',
        'rbx.kode_rekening = r.kode_rekening '
      )
      .leftJoin('ref_satuan', 'rs', 'rp.satuan = rs.satuan')
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

// one to many
export const GetRapbsByAnggaranId = async (
  idAnggaran: string
): Promise<Rapbs[]> => {
  const data = await createQueryBuilder(Rapbs, 'r')
    .select([
      'r.id_rapbs as idRapbs',
      'r.sekolah_id as sekolahId',
      'r.id_anggaran as idAnggaran',
      'r.id_ref_kode as idRefKode',
      'r.id_ref_tahun_anggaran as idRefTahunAnggaran',
      'r.kode_rekening as kodeRekening',
      'r.id_barang as idBarang',
      'r.urutan as urutan',
      'r.uraian as uraian',
      'r.uraian_text as uraianText',
      'r.volume as volume',
      'r.satuan as satuan',
      'r.harga_satuan as hargaSatuan',
      'r.jumlah as jumlah',
      'r.v1 as v1',
      'r.s1 as s1',
      'r.v2 as v2',
      'r.s2 as s2',
      'r.v3 as v3',
      'r.s3 as s3',
      'r.v4 as v4',
      'r.s4 as s4',
      'r.keterangan as keterangan',
      'r.soft_delete as softDelete',
      'r.updater_id as updaterId',
    ])
    .where('r.soft_delete = 0')
    .andWhere('r.id_anggaran = :idAnggaran', { idAnggaran })
    .getRawMany()
  return data
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

export const AddRapbs = async (rapbs: Rapbs): Promise<InsertResult> => {
  return await getRepository(Rapbs).upsert(rapbs, ['idRapbs'])
}

export const DelRapbsByRapbsId = async (
  idRapbs: string
): Promise<UpdateResult> => {
  return await createQueryBuilder()
    .update(Rapbs)
    .set({
      softDelete: 1,
      lastUpdate: new Date(),
    })
    .where('id_rapbs = :idRapbs', { idRapbs })
    .execute()
}

export const GetTotalAnggaranPerBulan = async (
  idAnggaran: string,
  idPeriode: number[]
): Promise<number> => {
  const result = await createQueryBuilder('rapbs', 'r')
    .select('ifnull(sum(rp.jumlah),0) as totalAnggaranPerBulan')
    .innerJoin('rapbs_periode', 'rp', 'rp.id_rapbs = r.id_rapbs')
    .where('r.id_anggaran = :idAnggaran AND rp.id_periode in (:...idPeriode)', {
      idAnggaran,
      idPeriode,
    })
    .andWhere('soft_delete = 0')
    .getRawOne()

  if (result !== undefined) {
    return result.totalAnggaranPerBulan
  }

  return 0
}
