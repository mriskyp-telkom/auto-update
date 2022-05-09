import { Rapbs } from 'main/models/Rapbs'
import { RapbsPeriode } from 'main/models/RapbsPeriode'
import { RapbsPtk } from 'main/models/RapbsPtk'
import { GetConfig } from 'main/repositories/Config'
import {
  AddRapbs,
  GetLatestUrutan,
  GetNextUrutan,
  GetOneRapbsBulan,
  DelRapbsByRapbsId,
  GetRapbs,
} from 'main/repositories/Rapbs'
import {
  AddBulkRapbsPeriode,
  BulkUpsertByRapbsId,
  GetManyRapbsPeriode,
  DelRapbsPeriodeByRapbsId,
} from 'main/repositories/RapbsPeriode'
import { AddRapbsPtk, GetRapbsPtk } from 'main/repositories/RapbsPtk'
import {
  DetailKegiatan,
  ResultAddDetailKegiatan,
  ResultDeleteRapbs,
} from 'main/types/Rapbs'
import CommonUtils from 'main/utils/CommonUtils'
import { getConnection } from 'typeorm'
import { GetPenggunaID } from './User'
import { CONFIG } from 'global/constants'
import { ok, err, Result } from 'neverthrow'
import { GetMonthName } from 'main/utils/Months'
import {
  AnggaranKegiatan,
  DetailAnggaranKegiatan,
  AnggaranPeriode,
  AnggaranPtk,
} from 'main/types/Anggaran'

export async function AddDetailKegiatan(
  data: DetailKegiatan
): Promise<Result<ResultAddDetailKegiatan, Error>> {
  const now = new Date()
  const idRapbs = CommonUtils.encodeUUIDFromV4()
  const idBarang = data.idBarang == '' ? null : data.idBarang
  const penggunaId = await GetPenggunaID()
  const sekolahId = await GetConfig(CONFIG.sekolahId)
  const res = <ResultAddDetailKegiatan>{
    idRapbs: idRapbs,
    idRapbsPeriode: [],
  }

  let urutan = '001'

  const latestUrutan = await GetLatestUrutan(
    data.idAnggaran,
    data.idRefKode,
    data.kodeRekening,
    data.idRefTahunAnggaran
  )

  if (latestUrutan.isOk()) {
    const v = latestUrutan.unwrapOr('000')
    urutan = GetNextUrutan(v)
  }

  const rapbs = <Rapbs>{
    idRapbs: idRapbs,
    sekolahId: sekolahId,
    idAnggaran: data.idAnggaran,
    idRefKode: data.idRefKode,
    idRefTahunAnggaran: data.idRefTahunAnggaran,
    kodeRekening: data.kodeRekening,
    idBarang: idBarang,
    urutan: urutan,
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
    const promises = []
    promises.push(AddRapbs(rapbs))
    if (rapbsPeriodes.length > 0) {
      promises.push(AddBulkRapbsPeriode(rapbsPeriodes))
    }

    if (rabpsPtk !== undefined) {
      promises.push(AddRapbsPtk(rabpsPtk))
    }

    await Promise.all(promises)
    await queryRunner.commitTransaction()
  } catch (error) {
    await queryRunner.rollbackTransaction()

    return err(new Error(error))
  } finally {
    await queryRunner.release()
  }

  return ok(res)
}

export async function DeleteRapbsByRapbsId(
  rapbsId: string
): Promise<Result<ResultDeleteRapbs, Error>> {
  const idRapbs = rapbsId

  const res = <ResultDeleteRapbs>{
    idRapbs: rapbsId,
  }

  try {
    const deletedRapbs = await DelRapbsByRapbsId(idRapbs)

    const deletedRapbsPeriode = await DelRapbsPeriodeByRapbsId(idRapbs)

    if (deletedRapbs.affected && deletedRapbsPeriode.affected) {
      res.isDeleted = true
    } else {
      res.isError = true
      res.errMessage = 'no affected rows'
    }
    return ok(res)
  } catch (error) {
    res.isError = true
    res.errMessage = error
    return ok(res)
  }
}

export async function GetDetailKegiatan(
  idRapbs: string
): Promise<Result<DetailAnggaranKegiatan, Error>> {
  const rapbs = await GetOneRapbsBulan(idRapbs)
  if (rapbs.isErr()) {
    return err(rapbs.error)
  }

  const rapbsPeriode = await GetManyRapbsPeriode(idRapbs)
  const res: DetailAnggaranKegiatan = {
    anggaran: rapbs.unwrapOr(<AnggaranKegiatan>{}),
    periode: [],
    rapbsPtk: null,
  }

  if (res.anggaran.isHonor === 1) {
    const r = await GetRapbsPtk(res.anggaran.idRapbs)
    if (r !== undefined) {
      res.rapbsPtk = <AnggaranPtk>{
        idRapbs: r.idRapbs,
        idPtk: r.ptkId,
        nama: r.nama,
      }
    }
  }

  for (const v of rapbsPeriode) {
    res.periode.push(<AnggaranPeriode>{
      bulan: GetMonthName(v.idPeriode),
      periode: v.idPeriode,
      satuan: v.satuan,
      jumlah: v.volume,
      hargaSatuan: v.hargaSatuan,
      total: v.jumlah,
    })
  }

  return ok(res)
}

export async function UpdateDetailKegiatan(
  data: DetailKegiatan
): Promise<Result<boolean, Error>> {
  const now = new Date()
  const idBarang = data.idBarang == '' ? null : data.idBarang
  const penggunaId = await GetPenggunaID()
  const sekolahId = await GetConfig(CONFIG.sekolahId)
  const idRapbs = data.idRapbs

  const currentRapbs = await GetRapbs(idRapbs)
  if (currentRapbs === undefined) {
    return err(new Error('Rapbs not found'))
  }

  if (
    data.idRefKode !== currentRapbs.idRefKode ||
    data.kodeRekening !== currentRapbs.kodeRekening
  ) {
    data.urutan = '001'

    const latestUrutan = await GetLatestUrutan(
      data.idAnggaran,
      data.idRefKode,
      data.kodeRekening,
      data.idRefTahunAnggaran
    )

    if (latestUrutan.isOk()) {
      const v = latestUrutan.unwrapOr(data.urutan)
      data.urutan = GetNextUrutan(v)
    }
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
    createDate: currentRapbs.createDate,
    lastUpdate: now,
    updaterId: penggunaId,
  }

  const rapbsPeriodes: RapbsPeriode[] = []
  data.periode?.forEach((periode) => {
    rapbsPeriodes.push(<RapbsPeriode>{
      idRapbs: idRapbs,
      idPeriode: periode.idPeriode,
      volume: periode.volume,
      satuan: periode.satuan,
      hargaSatuan: periode.hargaSatuan,
      jumlah: periode.jumlah,
      v1: periode.volume,
      s1: periode.satuan,
      softDelete: 0,
      updaterId: penggunaId,
    })
  })

  const connection = getConnection()
  const queryRunner = connection.createQueryRunner()

  await queryRunner.connect()
  await queryRunner.startTransaction()

  try {
    const promises = []
    promises.push(AddRapbs(rapbs))
    promises.push(BulkUpsertByRapbsId(idRapbs, rapbsPeriodes))

    await Promise.all(promises)
    await queryRunner.commitTransaction()
  } catch (error) {
    await queryRunner.rollbackTransaction()

    return err(new Error(error))
  } finally {
    await queryRunner.release()
  }

  return ok(true)
}
