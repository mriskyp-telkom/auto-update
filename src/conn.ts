import path from 'path'
import { Connection, createConnection } from 'typeorm'
import { BetterSqlite3ConnectionOptions } from 'typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions'
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
import { RefTahunAnggaran } from './main/models/RefTahunAnggaran'
import { Role } from './main/models/Role'
import { Token } from './main/models/Token'
import { UserRole } from './main/models/UserRole'
import { App } from './main/models/App'
import { SekolahPenjab } from './main/models/SekolahPenjab'
import { ReportBku } from './main/models/ReportBku'
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
