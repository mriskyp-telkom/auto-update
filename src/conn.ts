import path from 'path'
import { Connection, createConnection } from 'typeorm'
import { BetterSqlite3ConnectionOptions } from 'typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions'
import { Anggaran } from './repositories/Anggaran'
import { AppConfig } from './repositories/AppConfig'
import { ConfigAnggaran } from './repositories/ConfigAnggaran'
import { Instansi } from './repositories/Instansi'
import { InstansiPengguna } from './repositories/InstansiPengguna'
import { KasUmum } from './repositories/KasUmum'
import { KasUmumNota } from './repositories/KasUmumNota'
import { MstSekolah } from './repositories/MstSekolah'
import { MstWilayah } from './repositories/MstWilayah'
import { Pengguna } from './repositories/Pengguna'
import { Ptk } from './repositories/Ptk'
import { Rapbs } from './repositories/Rapbs'
import { RapbsPeriode } from './repositories/RapbsPeriode'
import { RapbsPtk } from './repositories/RapbsPtk'
import { RefAcuanBarang } from './repositories/RefAcuanBarang'
import { RefBku } from './repositories/RefBku'
import { RefBulan } from './repositories/RefBulan'
import { RefIndikator } from './repositories/RefIndikator'
import { RefJabatan } from './repositories/RefJabatan'
import { RefJenisInstansi } from './repositories/RefJenisInstansi'
import { RefKode } from './repositories/RefKode'
import { RefLevelKode } from './repositories/RefLevelKode'
import { RefLevelWilayah } from './repositories/RefLevelWilayah'
import { RefNegara } from './repositories/RefNegara'
import { RefPajak } from './repositories/RefPajak'
import { RefPeriode } from './repositories/RefPeriode'
import { RefRekening } from './repositories/RefRekening'
import { RefRekeningTransfer } from './repositories/RefRekeningTransfer'
import { RefSumberDana } from './repositories/RefSumberDana'
import { RefTahunAnggaran } from './repositories/RefTahunAnggaran'
import { Role } from './repositories/Role'
import { Token } from './repositories/Token'
import { UserRole } from './repositories/UserRole'
import { App } from './repositories/App'
import { SekolahPenjab } from './repositories/SekolahPenjab'
import { ReportBku } from './repositories/ReportBku'
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
