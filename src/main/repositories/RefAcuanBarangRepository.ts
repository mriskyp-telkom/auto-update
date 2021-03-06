import { createQueryBuilder, getRepository, InsertResult } from 'typeorm'
import { RefAcuanBarang } from '../models/RefAcuanBarang'

export const addBulkRefAcuanBarang = async (
  bulkRefAcuanBarang: RefAcuanBarang[]
): Promise<InsertResult> => {
  return await getRepository(RefAcuanBarang).upsert(bulkRefAcuanBarang, [
    'idBarang',
  ])
}

export const getLastUpdate = async (): Promise<Date> => {
  const data = await createQueryBuilder(RefAcuanBarang, 'rab')
    .orderBy('rab.last_update', 'DESC')
    .getOne()
  return data != null ? data.lastUpdate : null
}

export const getRefBarangRekening = async (
  kodeRekening: string
): Promise<any> => {
  // Parsing kode rekening 5.1 or 5.2
  let data
  if (kodeRekening.substring(0, 3) == '5.1') {
    data = await createQueryBuilder(RefAcuanBarang, 'rab')
      .select([
        "CAST(REPLACE(rab.id_barang,'.','') AS int) AS id",
        'rab.id_barang as kode',
        'rab.nama_barang as uraian',
        'rab.satuan',
        'rab.batas_bawah',
        'rab.batas_atas',
      ])
      .where('rab.expired_date is null and kode_rekening = :kodeRekening', {
        kodeRekening,
      })
      .getRawMany()
  } else if (kodeRekening.substring(0, 3) == '5.2') {
    data = await createQueryBuilder(RefAcuanBarang, 'rab')
      .select([
        "CAST(REPLACE(rab.id_barang,'.','') AS int) AS id ",
        'rab.id_barang as kode',
        'rab.nama_barang AS uraian',
        'rab.satuan',
        'rab.batas_bawah',
        'rab.batas_atas',
      ])
      .where('rab.expired_date is null and kode_rekening is null')
      .getRawMany()
  }
  return data
}

export const GetListSatuanBarang = async (): Promise<any> => {
  return await createQueryBuilder(RefAcuanBarang, 'rab')
    .select(['rab.satuan'])
    .where('rab.satuan is not null')
    .groupBy('rab.satuan')
    .getRawMany()
}
