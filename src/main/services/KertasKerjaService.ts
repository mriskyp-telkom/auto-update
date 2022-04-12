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
} from 'main/repositories/Rapbs'
import {
  AddBulkRapbsPeriode,
  GetManyRapbsPeriode,
  DelRapbsPeriodeByRapbsId,
} from 'main/repositories/RapbsPeriode'
import { AddRapbsPtk, GetRapbsPtk } from 'main/repositories/RapbsPtk'
import {
  DetailKegiatan,
  ResultDetailKegiatan,
  ResultDeleteRapbs,
} from 'main/types/Rapbs'
import CommonUtils from 'main/utils/CommonUtils'
import { getConnection } from 'typeorm'
import { GetPenggunaID } from './UserService'
import { CONFIG } from 'global/constants'
import { ok, err, Result } from 'neverthrow'
import { GetMonth } from 'main/utils/Months'
import {
  AnggaranKegiatan,
  DetailAnggaranKegiatan,
  AnggaranPeriode,
  AnggaranPtk,
} from 'main/types/Anggaran'

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
    rapbs.mapErr((e) => {
      return err(e)
    })
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
      bulan: GetMonth(v.idPeriode),
      periode: v.idPeriode,
      satuan: v.satuan,
      jumlah: v.volume,
      hargaSatuan: v.hargaSatuan,
      total: v.jumlah,
    })
  }

  return ok(res)
}
