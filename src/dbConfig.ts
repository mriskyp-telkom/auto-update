import { getConnection } from 'typeorm'

import { Anggaran } from './main/models/Anggaran'
import { AppConfig } from './main/models/AppConfig'
import { ConfigAnggaran } from './main/models/ConfigAnggaran'
import { Instansi } from './main/models/Instansi'
import { InstansiPengguna } from './main/models/InstansiPengguna'
import { KasUmum } from './main/models/KasUmum'
import { KasUmumNota } from './main/models/KasUmumNota'
import { MstSekolah } from './main/models/MstSekolah'
import { MstWilayah } from './main/models/MstWilayah'
import { Pengguna } from './main/models/Pengguna'
import { Ptk } from './main/models/Ptk'
import { Rapbs } from './main/models/Rapbs'
import { RapbsPeriode } from './main/models/RapbsPeriode'
import { RapbsPtk } from './main/models/RapbsPtk'
import { RefAcuanBarang } from './main/models/RefAcuanBarang'
import { RefBku } from './main/models/RefBku'
import { RefBulan } from './main/models/RefBulan'
import { RefIndikator } from './main/models/RefIndikator'
import { RefJabatan } from './main/models/RefJabatan'
import { RefJenisInstansi } from './main/models/RefJenisInstansi'
import { RefKode } from './main/models/RefKode'
import { RefLevelKode } from './main/models/RefLevelKode'
import { RefLevelWilayah } from './main/models/RefLevelWilayah'
import { RefNegara } from './main/models/RefNegara'
import { RefPajak } from './main/models/RefPajak'
import { RefPeriode } from './main/models/RefPeriode'
import { RefRekening } from './main/models/RefRekening'
import { RefRekeningTransfer } from './main/models/RefRekeningTransfer'
import { RefSumberDana } from './main/models/RefSumberDana'
import { RefSatuan } from './main/models/RefSatuan'
import { RefTahunAnggaran } from './main/models/RefTahunAnggaran'
import { Role } from './main/models/Role'
import { Token } from './main/models/Token'
import { UserRole } from './main/models/UserRole'
import { App } from './main/models/App'
import { SekolahPenjab } from './main/models/SekolahPenjab'
import { ReportBku } from './main/models/ReportBku'

export const entitiesDB = [
  App,
  AppConfig,
  Anggaran,
  ConfigAnggaran,
  Instansi,
  InstansiPengguna,
  KasUmum,
  KasUmumNota,
  MstSekolah,
  MstWilayah,
  Pengguna,
  Ptk,
  Rapbs,
  RapbsPeriode,
  RapbsPtk,
  RefAcuanBarang,
  RefBku,
  RefBulan,
  RefIndikator,
  RefJabatan,
  RefJenisInstansi,
  RefKode,
  RefLevelKode,
  RefLevelWilayah,
  RefNegara,
  RefPajak,
  RefPeriode,
  RefRekening,
  RefSatuan,
  RefSumberDana,
  RefRekeningTransfer,
  RefTahunAnggaran,
  ReportBku,
  Role,
  SekolahPenjab,
  Token,
  UserRole,
]

// do not use this on unit test
export function getSynchronizeConfig(): boolean {
  // return true to modified table and entity
  return true
}

// do not use this on setupdb
export function getSynchronizeConfigUnitTest(): boolean {
  // return true to modified table and entity
  return false
}

// do not use this on unit test
export function getLoggerConfig(): boolean {
  // set this in order to specify logger
  return process.env.NODE_ENV === 'development' ? true : false
}

// do not use this on setupdb
export function getLoggerConfigLocal(): boolean {
  // set this in order to specify logger
  return process.env.NODE_ENV === 'development' ? true : false
}

// do not use this on unit test
export function getPrepareDatabase(): boolean {
  // set prepare database
  return true
}

export async function checkExistsTable(): Promise<any> {
  for (let i = 0; i < entitiesDB.length; i++) {
    try {
      const metadata = await getConnection().hasMetadata(entitiesDB[i])
      // use this to check entities
      // const find = await getConnection().manager.find(entitiesDB[i])

      console.warn('metadata ' + entitiesDB[i] + ' exists ' + metadata)
    } catch (err) {
      console.error('catch err ', err)
    }
  }
}
