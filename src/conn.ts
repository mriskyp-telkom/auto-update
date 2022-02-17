import path from 'path'
import { Connection, createConnection } from 'typeorm'
import { BetterSqlite3ConnectionOptions } from 'typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions'
import { Anggaran } from './main/repositories/Anggaran'
import { AppConfig } from './main/repositories/AppConfig'
import { ConfigAnggaran } from './main/repositories/ConfigAnggaran'
import { Instansi } from './main/repositories/Instansi'
import { InstansiPengguna } from './main/repositories/InstansiPengguna'
import { KasUmum } from './main/repositories/KasUmum'
import { KasUmumNota } from './main/repositories/KasUmumNota'
import { MstSekolah } from './main/repositories/MstSekolah'
import { MstWilayah } from './main/repositories/MstWilayah'
import { Pengguna } from './main/repositories/Pengguna'
import { Ptk } from './main/repositories/Ptk'
import { Rapbs } from './main/repositories/Rapbs'
import { RapbsPeriode } from './main/repositories/RapbsPeriode'
import { RapbsPtk } from './main/repositories/RapbsPtk'
import { RefAcuanBarang } from './main/repositories/RefAcuanBarang'
import { RefBku } from './main/repositories/RefBku'
import { RefBulan } from './main/repositories/RefBulan'
import { RefIndikator } from './main/repositories/RefIndikator'
import { RefJabatan } from './main/repositories/RefJabatan'
import { RefJenisInstansi } from './main/repositories/RefJenisInstansi'
import { RefKode } from './main/repositories/RefKode'
import { RefLevelKode } from './main/repositories/RefLevelKode'
import { RefLevelWilayah } from './main/repositories/RefLevelWilayah'
import { RefNegara } from './main/repositories/RefNegara'
import { RefPajak } from './main/repositories/RefPajak'
import { RefPeriode } from './main/repositories/RefPeriode'
import { RefRekening } from './main/repositories/RefRekening'
import { RefRekeningTransfer } from './main/repositories/RefRekeningTransfer'
import { RefSumberDana } from './main/repositories/RefSumberDana'
import { RefTahunAnggaran } from './main/repositories/RefTahunAnggaran'
import { Role } from './main/repositories/Role'
import { Token } from './main/repositories/Token'
import { UserRole } from './main/repositories/UserRole'
import { App } from './main/repositories/App'
import { SekolahPenjab } from './main/repositories/SekolahPenjab'
import { ReportBku } from './main/repositories/ReportBku'
import { getAppData } from './pathConfig'

export const connDB = async (): Promise<Connection> => {
  try {
    const config: BetterSqlite3ConnectionOptions = {
      type: 'better-sqlite3',
      database: path.join(await getAppData(), 'arkas.db'),
      entities: [
        MstSekolah,
        MstWilayah,
        RefKode,
        RefAcuanBarang,
        RefBku,
        RefBulan,
        RefIndikator,
        RefJabatan,
        RefJenisInstansi,
        RefLevelKode,
        RefLevelWilayah,
        RefNegara,
        RefPajak,
        RefPeriode,
        RefRekening,
        RefSumberDana,
        RefRekeningTransfer,
        RefTahunAnggaran,
        Anggaran,
        Rapbs,
        RapbsPeriode,
        RapbsPtk,
        Ptk,
        KasUmum,
        KasUmumNota,
        Pengguna,
        InstansiPengguna,
        Instansi,
        UserRole,
        Role,
        Token,
        ConfigAnggaran,
        AppConfig,
        App,
        SekolahPenjab,
        ReportBku,
      ],
      driver: require('better-sqlite3-multiple-ciphers'),
      prepareDatabase: (db) => {
        db.pragma(`cipher='sqlcipher'`)
        db.pragma(`legacy=4`)
        db.pragma(`key='K3md1kbudRIS3n4yan'`)
      },
    }
    return await createConnection(config)
  } catch (error) {
    console.log(error)
    return
  }
}
