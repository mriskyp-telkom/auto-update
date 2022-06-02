import {
  createQueryBuilder,
  getManager,
  getRepository,
  InsertResult,
  UpdateResult,
  getConnection,
} from 'typeorm'
import { Rapbs } from 'main/models/Rapbs'
import { RapbsPeriode } from 'main/models/RapbsPeriode'
import { Anggaran } from 'main/models/Anggaran'
import CommonUtils from 'main/utils/CommonUtils'
import { AnggaranTotal, AnggaranDTO, PaguDTO } from 'main/types/Anggaran'

export const GetAnggaran = async (
  idSumberDana: number,
  tahunAnggaran: number[] | null
): Promise<AnggaranDTO[]> => {
  const data = await createQueryBuilder(Anggaran, 'a')
    .select([
      'a.id_anggaran',
      'r.nama_sumber_dana',
      'a.tahun_anggaran as tahun',
      'a.jumlah ',
      'a.id_ref_sumber_dana',
      'a.tanggal_pengajuan',
      'a.tanggal_pengesahan',
      'a.is_revisi',
      'a.is_approve',
      'a.is_pengesahan',
      'a.create_date',
      'a.last_update',
      'a.alasan_penolakan',
    ])
    .innerJoin(
      (qb) =>
        qb
          .select('tahun_anggaran', 'max(is_revisi) as is_revisi')
          .from(Anggaran, 'b')
          .where('soft_delete=0')
          .andWhere('is_aktif=1')
          .andWhere('id_ref_sumber_dana=:idSumberDana')
          .groupBy('tahun_anggaran'),
      'a.is_revisi = b.is_revisi and a.tahun_anggaran = b.tahun_anggaran'
    )
    .innerJoin(
      'ref_sumber_dana',
      'r',
      'r.id_ref_sumber_dana = a.id_ref_sumber_dana'
    )
    .where(
      'a.soft_delete = 0  ' +
        ' AND a.is_aktif = 1' +
        ' AND a.id_ref_sumber_dana = :idSumberDana ' +
        ' AND a.tahun_anggaran IN (:...tahunAnggaran )',
      { idSumberDana, tahunAnggaran }
    )
    .groupBy('tahun_anggaran')
    .orderBy('a.tahun_anggaran', 'DESC')
    .getRawMany()

  return <AnggaranDTO[]>data
}

export const GetAnggaranById = async (
  idAnggaran: string
): Promise<Anggaran> => {
  return await getRepository(Anggaran).findOne({ idAnggaran: idAnggaran })
}

export const GetPagu = async (idAnggaran: string): Promise<PaguDTO> => {
  const data = await createQueryBuilder(Anggaran, 'a')
    .select([
      'a.tahun_anggaran',
      'max(a.jumlah) as pagu',
      'sum(ifnull(r.jumlah,0)) as total',
      'max(a.jumlah)-sum(ifnull(r.jumlah,0)) as sisa',
    ])
    .leftJoin(Rapbs, 'r', 'a.id_anggaran = r.id_anggaran and r.soft_delete=0')
    .where('a.soft_delete = 0')
    .andWhere('a.id_anggaran = :idAnggaran', {
      idAnggaran,
    })
    .groupBy('a.id_anggaran')
    .addGroupBy('a.tahun_anggaran')
    .getRawOne<PaguDTO>()
  return data
}

export const GetAnggaranBefore = async (
  idRefSumberDana: number,
  tahun: number
): Promise<string> => {
  const getIsRevisiMax =
    (
      await createQueryBuilder(Anggaran, 'a')
        .select('MAX(a.is_revisi)', 'is_revisi')
        .where(
          'a.soft_delete = 0 AND a.tahun_anggaran =:tahun AND a.id_ref_sumber_dana = :idRefSumberDana',
          {
            tahun: tahun - 1,
            idRefSumberDana: idRefSumberDana,
          }
        )
        .getRawOne()
    )?.is_revisi ?? -1
  if (getIsRevisiMax > -1) {
    const getIdAnggaran = await createQueryBuilder(Anggaran, 'a')
      .select('a.id_anggaran as id_anggaran')
      .where(
        'a.soft_delete = 0 AND a.tahun_anggaran =:tahun AND a.is_revisi =:isRevisi AND a.id_ref_sumber_dana =:idRefSumberDana ',
        {
          tahun: tahun - 1,
          isRevisi: getIsRevisiMax,
          idRefSumberDana: idRefSumberDana,
        }
      )
      .getRawOne()
    return getIdAnggaran.id_anggaran ?? ''
  }
  return ''
}

export const AddAnggaran = async (
  anggaran: Anggaran
): Promise<InsertResult> => {
  return await getRepository(Anggaran).insert(anggaran)
}

export const UpsertAnggaran = async (
  anggaran: Anggaran
): Promise<InsertResult> => {
  return await getRepository(Anggaran).upsert(anggaran, ['idAnggaran'])
}

export const UpdateIsPengesahan = async (
  idAnggaran: string,
  isPengesahan: number
): Promise<UpdateResult> => {
  return await createQueryBuilder()
    .update(Anggaran)
    .set({
      isPengesahan: isPengesahan,
      lastUpdate: new Date(),
    })
    .where('id_anggaran = :idAnggaran', { idAnggaran })
    .execute()
}

export const UpdateTanggalPengajuan = async (
  idAnggaran: string,
  anggaranTanggalPengajuan: string
): Promise<UpdateResult> => {
  return await createQueryBuilder()
    .update(Anggaran)
    .set({
      tanggalPengajuan: anggaranTanggalPengajuan,
      lastUpdate: new Date(),
    })
    .where('id_anggaran = :idAnggaran', { idAnggaran })
    .execute()
}

export const DelAnggaran = async (
  idAnggaran: string
): Promise<UpdateResult> => {
  return await createQueryBuilder()
    .update(Anggaran)
    .set({
      softDelete: 1,
      lastUpdate: new Date(),
    })
    .where('id_anggaran = :idAnggaran', { idAnggaran })
    .execute()
}

export const CopyAnggaran = async (
  idAnggaranBefore: string,
  idRefSumberDana: number,
  sekolahId: string,
  tahun: number,
  volume: number,
  hargaSatuan: number,
  penggunaId: string,
  idPenjab: string
): Promise<string> => {
  const now = new Date()
  const connection = getConnection()
  const queryRunner = connection.createQueryRunner()

  const idAnggaranNew = CommonUtils.encodeUUIDFromV4()
  const dataAnggaran = new Anggaran()
  dataAnggaran.idAnggaran = idAnggaranNew
  dataAnggaran.idRefSumberDana = idRefSumberDana
  dataAnggaran.sekolahId = sekolahId
  dataAnggaran.tahunAnggaran = tahun
  dataAnggaran.volume = volume
  dataAnggaran.hargaSatuan = hargaSatuan
  dataAnggaran.jumlah = volume * hargaSatuan
  dataAnggaran.sisaAnggaran = 0
  dataAnggaran.isApprove = 0
  dataAnggaran.isRevisi = 0
  dataAnggaran.isAktif = 1
  dataAnggaran.softDelete = 0
  dataAnggaran.createDate = now
  dataAnggaran.lastUpdate = now
  dataAnggaran.updaterId = penggunaId
  dataAnggaran.idPenjab = idPenjab

  await queryRunner.connect()
  await queryRunner.startTransaction()

  const query = `
    SELECT r.id_rapbs as idRapbs
      ,r.sekolah_id as sekolahId
      ,r.id_anggaran as idAnggaran
      ,r.id_ref_kode as idRefKode
      ,r.id_ref_tahun_anggaran as idRefTahunAnggaran
      ,r.kode_rekening as kodeRekening
      ,r.id_barang as idBarang
      ,r.urutan as urutan
      ,r.uraian as uraian
      ,r.uraian_text as uraianText
      ,r.volume as volume
      ,r.satuan as satuan
      ,r.harga_satuan as hargaSatuan
      ,r.jumlah as jumlah
      ,r.v1 as v1
      ,r.s1 as s1
      ,r.v2 as v2
      ,r.s2 as s2
      ,r.v3 as v3
      ,r.s3 as s3
      ,r.v4 as v4
      ,r.s4 as s4
      ,r.keterangan as keterangan
      ,r.soft_delete as softDelete
      ,r.create_date as createDate
      ,r.last_update as lastUpdate
      ,r.updater_id as updaterId 
    FROM rapbs r where id_rapbs IN (
    SELECT idRapbs FROM (
    SELECT idRapbs, max(errorReferensi) AS errorReferensi FROM (
    SELECT 
        "r"."id_rapbs" as idRapbs
        , case when rk.expired_date is not null then 1  
        when rr.expired_date is not null then 1   
        when rab.expired_date is not null then 1  
        when rab.id_barang is null and case 
        when "r"."id_barang" = '' then null else "r"."id_barang" end is not null and substr(rk2.id_kode,4,2) <> '12' then 1  
        when rbx.jumlah_barang > 0 and ifnull("r"."id_barang",'') = '' and substr(rk.id_kode,4,2) <> '12' 
        then 1  when substr("r"."kode_rekening",1,3) = '5.2' and ifnull("r"."id_barang",'') = '' 
        then 1  else 0 end as errorReferensi
            FROM "rapbs" "r" 
        INNER JOIN "rapbs_periode" "rp" 
            ON "r"."id_rapbs" = rp.id_rapbs  
        INNER JOIN "ref_kode" "rk" 
            ON "r"."id_ref_kode" = rk.id_ref_kode  
        INNER JOIN "ref_kode" "rk2" 
            ON rk.parent_kode = rk2.id_ref_kode  
        INNER JOIN "ref_kode" "rk3" 
            ON rk2.parent_kode = rk3.id_ref_kode  
        INNER JOIN "ref_rekening" "rr" 
            ON "r"."kode_rekening" = rr.kode_rekening  
        LEFT JOIN "ref_acuan_barang" "rab" 
            ON rab.id_barang = "r"."id_barang"  
        LEFT JOIN (SELECT kode_rekening, count(1) as jumlah_barang 
            FROM "ref_acuan_barang" "r" 
            WHERE expired_date is null AND kode_rekening is not null 
            GROUP BY kode_rekening) "rbx" 
                ON rbx.kode_rekening = "r"."kode_rekening"
        LEFT JOIN "ref_satuan" rs
            ON rp.satuan = rs.unit
        WHERE 
        "r"."soft_delete" = 0 
        AND rp.soft_delete = 0 
        AND "r"."id_anggaran" = :id_anggaran) tbl group by idRapbs) s where s.errorReferensi = 0)
    `

  const result = await getRepository(Rapbs).query(query, [
    { id_anggaran: idAnggaranBefore },
  ])
  const rapbsList = <Rapbs[]>result

  const promises = []
  const rapbsInsert: Rapbs[] = []
  const rapbsPeriodeInsert: RapbsPeriode[] = []

  promises.push(AddAnggaran(dataAnggaran))

  for (const rapbs of rapbsList) {
    const originalIdRapbs = rapbs.idRapbs
    rapbs.idAnggaran = idAnggaranNew
    rapbs.idRapbs = CommonUtils.encodeUUIDFromV4()
    rapbs.idRefTahunAnggaran = tahun
    rapbs.createDate = now
    rapbs.lastUpdate = now
    rapbsInsert.push(rapbs)

    const rapbsPeriodeList = await getRepository(RapbsPeriode).find({
      softDelete: 0,
      idRapbs: originalIdRapbs,
    })

    for (const rapbsPeriode of rapbsPeriodeList) {
      rapbsPeriode.idRapbsPeriode = CommonUtils.encodeUUIDFromV4()
      rapbsPeriode.idRapbs = rapbs.idRapbs
      rapbsPeriode.createDate = now
      rapbsPeriode.lastUpdate = now
      rapbsPeriodeInsert.push(rapbsPeriode)
    }
  }

  if (rapbsInsert.length > 0) {
    promises.push(getRepository(Rapbs).insert(rapbsInsert))
  }

  if (rapbsPeriodeInsert.length > 0) {
    promises.push(getRepository(RapbsPeriode).insert(rapbsPeriodeInsert))
  }

  try {
    await Promise.all(promises)
    await queryRunner.commitTransaction()
    return idAnggaranNew
  } catch (e) {
    await queryRunner.rollbackTransaction()
  } finally {
    await queryRunner.release()
  }
  return ''
}

/**
 * Return total and id anggaran
 * @param {number} id_tahap tahap penyaluran eg. 1,2,3
 * @param {string} id_anggaran id anggaran
 * @return {Object} contains total and id_anggaran
 */
export const GetTotalAnggaran = async (
  id_tahap: number,
  id_anggaran: string
): Promise<AnggaranTotal> => {
  const query = ` SELECT  a.id_anggaran, SUM(rp.jumlah) AS total
                  FROM anggaran a 
                      JOIN rapbs r 
                      ON a.id_anggaran = r.id_anggaran
                      JOIN rapbs_periode rp 
                      ON r.id_rapbs = rp.id_rapbs 
                  WHERE
                      a.soft_delete=0 
                      AND r.soft_delete=0 
                      AND a.id_anggaran=:id_anggaran 
                      AND CASE 
                            WHEN :id_tahap=0 THEN rp.id_periode IN (81,82,83,84,85,86,87,88,89,90,91,92) 
                            WHEN :id_tahap=1 THEN rp.id_periode IN (81,82,83) 
                            WHEN :id_tahap=2 THEN rp.id_periode IN (84,85,86,87,88) 
                            WHEN :id_tahap=3 THEN rp.id_periode IN (89,90,91,92) 
                            WHEN :id_tahap=21 THEN rp.id_periode IN (1) 
                            WHEN :id_tahap=22 THEN rp.id_periode IN (2) 
                            WHEN :id_tahap=23 THEN rp.id_periode IN (3) 
                            WHEN :id_tahap=24 THEN rp.id_periode IN (4)
                       END             
                  GROUP BY a.id_anggaran`

  const entityManager = getManager()

  const result = await entityManager
    .query(query, [{ id_tahap: id_tahap, id_anggaran: id_anggaran }])
    .catch((e) => {
      console.error('Error when fetching query:', e)
    })
  if (result != null) {
    return <AnggaranTotal>result[0]
  }
  return {} as AnggaranTotal
}
