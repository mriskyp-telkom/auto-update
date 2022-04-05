import { Rapbs } from 'main/models/Rapbs'
import { RapbsPeriode } from 'main/models/RapbsPeriode'
import { RapbsPtk } from 'main/models/RapbsPtk'
import { GetConfig } from 'main/repositories/Config'
import { AddRapbs } from 'main/repositories/Rapbs'
import { AddBulkRapbsPeriode } from 'main/repositories/RapbsPeriode'
import { AddRapbsPtk } from 'main/repositories/RapbsPtk'
import { DetailKegiatan, ResultDetailKegiatan } from 'main/types/Rapbs'
import CommonUtils from 'main/utils/CommonUtils'
import { getConnection } from 'typeorm'
import { GetPenggunaID } from './UserService'
import { CONFIG } from 'global/constants'
import { ok, err, Result } from 'neverthrow'

export async function AddDetailKegiatan(
  data: DetailKegiatan
): Promise<Result<ResultDetailKegiatan, Error>> {
  const now = new Date()
  const idRapbs = CommonUtils.encodeUUID(CommonUtils.uuid())
  const idBarang = data.idBarang == '' ? null : data.idBarang
  const penggunaId = await GetPenggunaID()
  const sekolahId = await GetConfig(CONFIG.sekolahId)
  const res = <ResultDetailKegiatan>{
    idRapbs: idRapbs,
    idRapbsPeriode: [],
  }

  const rapbs = <Rapbs>{
    idRapbs: idRapbs,
    sekolahId: sekolahId,
    idAnggaran: data.idAnggaran,
    idRefKode: data.idRefKode,
    idRefTahunAnggaran: data.idRefTahunAnggaran,
    kodeRekening: data.kodeRekening,
    idBarang: idBarang,
    urutan: data.urutan,
    uraian: data.uraian,
    uraianText: data.uraian,
    volume: data.volume,
    satuan: data.satuan,
    hargaSatuan: data.hargaSatuan,
    jumlah: data.jumlah,
    v1: data.volume,
    s1: data.satuan,
    keterangan: '',
    softDelete: 0,
    createDate: now,
    lastUpdate: now,
    updaterId: penggunaId,
  }

  const rapbsPeriodes: RapbsPeriode[] = []
  data.periode?.forEach((periode) => {
    const idRapbsPeriode = CommonUtils.encodeUUID(CommonUtils.uuid())
    res.idRapbsPeriode.push(idRapbsPeriode)

    rapbsPeriodes.push(<RapbsPeriode>{
      idRapbs: idRapbs,
      idPeriode: periode.idPeriode,
      idRapbsPeriode: idRapbsPeriode,
      volume: periode.volume,
      satuan: periode.satuan,
      hargaSatuan: periode.hargaSatuan,
      jumlah: periode.jumlah,
      v1: periode.volume,
      s1: periode.satuan,
      softDelete: 0,
      createDate: now,
      lastUpdate: now,
      updaterId: penggunaId,
    })
  })

  let rabpsPtk: RapbsPtk
  if (data.ptk !== null && data.ptk !== undefined) {
    rabpsPtk = <RapbsPtk>{
      idRapbs: idRapbs,
      ptkId: data.ptk.idPtk,
      nama: data.ptk.nama,
      createDate: now,
      lastUpdate: now,
    }
  }

  const connection = getConnection()
  const queryRunner = connection.createQueryRunner()

  await queryRunner.connect()
  await queryRunner.startTransaction()

  try {
    await AddRapbs(rapbs)
    if (rapbsPeriodes.length > 0) {
      await AddBulkRapbsPeriode(rapbsPeriodes)
    }

    if (rabpsPtk !== undefined) {
      await AddRapbsPtk(rabpsPtk)
    }

    await queryRunner.commitTransaction()
  } catch (error) {
    await queryRunner.rollbackTransaction()

    console.log('Error runing query:', error)
    return err(new Error(error))
  } finally {
    await queryRunner.release()
  }

  return ok(res)
}
