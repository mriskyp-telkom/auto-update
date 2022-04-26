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
import { RefSumberDana } from 'main/models/RefSumberDana'
import { RefRekening } from 'main/models/RefRekening'
import { RefKode } from 'main/models/RefKode'
import { RefAcuanBarang } from 'main/models/RefAcuanBarang'
import { getBentukPendidikan } from 'main/repositories/Sekolah'
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
      RefSumberDana,
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
  let idRapbsNew: string
  let refRek, refKode, refBarang

  const now = new Date()

  const connection = getConnection()
  const queryRunner = connection.createQueryRunner()

  await queryRunner.connect()
  await queryRunner.startTransaction()

  try {
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

    await AddAnggaran(dataAnggaran)

    const getBentuk = await getBentukPendidikan()
    const arrayOfRapbs = await getRepository(Rapbs).find({
      softDelete: 0,
      idAnggaran: idAnggaranBefore,
    })

    for (let i = 0; i < arrayOfRapbs.length; i++) {
      const rapbs = arrayOfRapbs[i]
      const refPromises = []

      refPromises.push(
        createQueryBuilder(RefRekening)
          .where('expired_date is null and kode_rekening=:kodeRekening', {
            kodeRekening: rapbs.kodeRekening,
          })
          .getCount()
      )

      refPromises.push(
        createQueryBuilder(RefKode)
          .where(
            'expired_date is null ' +
              'and bentuk_pendidikan_id=:bentukPendidikan ' +
              'and id_ref_kode=:idRefKode',
            {
              bentukPendidikan: getBentuk,
              idRefKode: rapbs.idRefKode,
            }
          )
          .getCount()
      )

      refPromises.push(
        createQueryBuilder(RefAcuanBarang)
          .where('expired_date is null and id_barang=:idBarang', {
            idBarang: rapbs.idBarang,
          })
          .getCount()
      )

      const result = await Promise.all(refPromises)

      refRek = result[0]
      refKode = result[1]
      refBarang = rapbs.idBarang ?? '' == '' ? result[2] : 1

      if (refKode > 0 && refRek > 0 && refBarang > 0) {
        const originalIdRapbs = rapbs.idRapbs
        idRapbsNew = CommonUtils.encodeUUIDFromV4()
        rapbs.idAnggaran = idAnggaranNew
        rapbs.idRapbs = idRapbsNew
        rapbs.idRefTahunAnggaran = tahun
        rapbs.createDate = now
        rapbs.lastUpdate = now
        await getRepository(Rapbs).insert(rapbs)

        const arrayOfOriginalRabpsPeriode = await getRepository(
          RapbsPeriode
        ).find({
          softDelete: 0,
          idRapbs: originalIdRapbs,
        })

        const arrayOfRabpsPeriode = []
        for (let i = 0; i < arrayOfOriginalRabpsPeriode.length; i++) {
          const rapbsPeriode = arrayOfOriginalRabpsPeriode[i]
          rapbsPeriode.idRapbsPeriode = CommonUtils.encodeUUID(
            CommonUtils.uuid()
          )
          rapbsPeriode.idRapbs = idRapbsNew
          rapbsPeriode.createDate = now
          rapbsPeriode.lastUpdate = now
          arrayOfRabpsPeriode.push(rapbsPeriode)
        }

        await getRepository(RapbsPeriode).insert(arrayOfRabpsPeriode)
      }
    }
    await queryRunner.commitTransaction()
    return idAnggaranNew
  } catch {
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
