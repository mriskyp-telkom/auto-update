import fs from 'fs'
import path from 'path'
import { execFile } from 'child_process'
import { promisify } from 'util'
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
import { createConnection, getRepository } from 'typeorm'
import { getAppData } from './pathConfig'

async function encryptDB(): Promise<void> {
  const appDataPath = path.join(await getAppData(), 'arkas.db')
  /* eslint @typescript-eslint/no-var-requires: "off" */
  const db = require('better-sqlite3-multiple-ciphers')(appDataPath)
  try {
    db.pragma("cipher='sqlcipher'")
    db.pragma(`legacy=4`)
    db.pragma("rekey='K3md1kbudRIS3n4yan'")
    db.close()
  } catch {
    db.pragma("cipher='sqlcipher'")
    db.pragma(`legacy=4`)
    db.pragma("key='K3md1kbudRIS3n4yan'")
    db.close()
  }
  return
}

async function addApp(): Promise<void> {
  const app = new App()
  app.appId = 'CNhMM6obP06_yBqZAw2PZg'
  app.nama = 'ARKAS 4.0'
  app.urlLogin = 'https://arkas.kemdikbud.go.id/app/'
  app.urlPost = '-'
  app.loginInfo = '-'
  app.tag = 1
  app.createDate = new Date()
  app.lastUpdate = new Date()
  await app.save()
  return
}

async function addRole(): Promise<void> {
  const role = new Role()
  role.roleId = 'CNhMM6obP06_yBqZAw2PZg'
  role.appId = 'kG0LFX0OXEuso0DtvGmniw'
  role.nama = 'App'
  role.tag = 0
  role.softDelete = 0
  role.createDate = new Date()
  role.lastUpdate = new Date()
  role.updaterId = ''
  await role.save()
  return
}

async function addRefBKU(): Promise<void> {
  const repoRefBku = getRepository(RefBku)
  const refBKUData = [
    {
      idRefBku: 1,
      bku: 'Saldo Awal',
      kodeBku: '',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefBku: 2,
      bku: 'Terima Dana BOS',
      kodeBku: 'BBU',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefBku: 3,
      bku: 'Tarik Tunai',
      kodeBku: 'BBU',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefBku: 4,
      bku: 'Kas Keluar',
      kodeBku: 'BPU',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefBku: 5,
      bku: 'Setor Tunai',
      kodeBku: 'SAB',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefBku: 6,
      bku: 'Bunga Bank',
      kodeBku: 'BBU',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefBku: 7,
      bku: 'Pajak Bunga',
      kodeBku: 'BPU',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefBku: 8,
      bku: 'Saldo Awal Bank',
      kodeBku: 'SAB',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefBku: 9,
      bku: 'Saldo Awal Tunai',
      kodeBku: 'SAT',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefBku: 10,
      bku: 'Pajak Belanja Terima',
      kodeBku: 'PBT',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefBku: 11,
      bku: 'Pajak Belanja Setor',
      kodeBku: 'PBS',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefBku: 12,
      bku: 'Pergeseran Tunai',
      kodeBku: 'PBS',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefBku: 13,
      bku: 'Pergeseran Setor',
      kodeBku: 'PSS',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefBku: 14,
      bku: 'Pengembalian Dana BOS',
      kodeBku: 'STS',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefBku: 15,
      bku: 'Kas Keluar Non Tunai',
      kodeBku: 'BNU',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefBku: 23,
      bku: 'Tarik Tunai Sisa',
      kodeBku: 'BBU',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefBku: 24,
      bku: 'Kas Keluar Sisa',
      kodeBku: 'BBU',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefBku: 25,
      bku: 'Setor Tunai Sisa',
      kodeBku: 'BBU',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefBku: 26,
      bku: 'Bunga Bank Sisa',
      kodeBku: 'BBU',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefBku: 27,
      bku: 'Pajak Bunga Sisa',
      kodeBku: 'BPU',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefBku: 28,
      bku: 'Saldo Awal Bank Sisa',
      kodeBku: 'SAB',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefBku: 29,
      bku: 'Saldo Awal Tunai Sisa',
      kodeBku: 'SAT',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefBku: 30,
      bku: 'Pajak Belanja Terima Sisa',
      kodeBku: 'PBT',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefBku: 31,
      bku: 'Pajak Belanja Setor Sisa',
      kodeBku: 'PBS',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefBku: 32,
      bku: 'Pergeseran Tunai',
      kodeBku: 'PBS',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefBku: 33,
      bku: 'Pergeseran Setor',
      kodeBku: 'PSS',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefBku: 34,
      bku: 'Pengembalian Dana BOS',
      kodeBku: 'PTS',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefBku: 35,
      bku: 'Kas Keluar Sisa Non Tunai',
      kodeBku: 'BNU',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
  ]
  await repoRefBku.save(refBKUData)
  return
}

async function addRefJabatan(): Promise<void> {
  const repoRefJabatan = getRepository(RefJabatan)
  const refJabatanData = [
    {
      jabatanId: 1,
      nama: 'Admin Dinas Pendidikan',
      levelJabatan: 1,
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      jabatanId: 10,
      nama: 'Operator Sekolah',
      levelJabatan: 10,
      createDate: new Date(),
      lastUpdate: new Date(),
    },
  ]
  await repoRefJabatan.save(refJabatanData)
  return
}

async function addRefJenisInstansi(): Promise<void> {
  const repoRefJenisInstansi = getRepository(RefJenisInstansi)
  const refJenisInstansiData = [
    {
      jenisInstansiId: 3,
      nama: 'Dinas Pendidikan',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      jenisInstansiId: 4,
      nama: 'UPTD',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      jenisInstansiId: 5,
      nama: 'Sekolah',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
  ]
  await repoRefJenisInstansi.save(refJenisInstansiData)
  return
}

async function addRefLevelKode(): Promise<void> {
  const repoRefLevelKode = getRepository(RefLevelKode)
  const refLevelKodeData = [
    {
      idLevelKode: 1,
      nama: 'Program',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idLevelKode: 2,
      nama: 'Komponen',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idLevelKode: 3,
      nama: 'Kegiatan',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
  ]
  await repoRefLevelKode.save(refLevelKodeData)
  return
}

async function addRefLevelWilayah(): Promise<void> {
  const repoRefLevelWilayah = getRepository(RefLevelWilayah)
  const refLevelwilayahData = [
    {
      idLevelWilayah: 0,
      levelWilayah: 'Nasional',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idLevelWilayah: 1,
      levelWilayah: 'Propinsi',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idLevelWilayah: 2,
      levelWilayah: 'Kab / Kota',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idLevelWilayah: 3,
      levelWilayah: 'Kecamatan',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idLevelWilayah: 4,
      levelWilayah: 'Desa',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
  ]
  await repoRefLevelWilayah.save(refLevelwilayahData)
  return
}

async function addRefNegara(): Promise<void> {
  const refNegara = new RefNegara()
  refNegara.negaraId = 'ID'
  refNegara.nama = 'Indonesia'
  refNegara.luarNegeri = false
  refNegara.createDate = new Date()
  refNegara.lastUpdate = new Date()
  await refNegara.save()
  return
}

async function addRefPeriode(): Promise<void> {
  const repoRefPeriode = getRepository(RefPeriode)
  const refPeriodeData = [
    {
      idPeriode: 1,
      periode: 'Triwulan 1',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idPeriode: 2,
      periode: 'Triwulan 2',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idPeriode: 3,
      periode: 'Triwulan 3',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idPeriode: 4,
      periode: 'Triwulan 4',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idPeriode: 81,
      periode: 'Januari',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idPeriode: 82,
      periode: 'Februari',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idPeriode: 83,
      periode: 'Maret',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idPeriode: 84,
      periode: 'April',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idPeriode: 85,
      periode: 'Mei',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idPeriode: 86,
      periode: 'Juni',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idPeriode: 87,
      periode: 'Juli',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idPeriode: 88,
      periode: 'Agustus',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idPeriode: 89,
      periode: 'September',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idPeriode: 90,
      periode: 'Oktober',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idPeriode: 91,
      periode: 'November',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idPeriode: 92,
      periode: 'Desember',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
  ]
  await repoRefPeriode.save(refPeriodeData)
  return
}

async function addRefSumberDana(): Promise<void> {
  const repoRefSumberDana = getRepository(RefSumberDana)
  const refSumberDanaData = [
    {
      idRefSumberDana: 1,
      kode: '4.3.1.01.',
      namaSumberDana: 'BOS Reguler',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefSumberDana: 3,
      kode: '4.3.1.03.',
      namaSumberDana: 'BOS Daerah',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefSumberDana: 5,
      kode: '4.3.1.05.',
      namaSumberDana: 'Lainnya',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefSumberDana: 11,
      kode: '4.3.1.11',
      namaSumberDana: 'BOS Afirmasi',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefSumberDana: 12,
      kode: '4.3.1.12',
      namaSumberDana: 'BOS Kinerja',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefSumberDana: 33,
      kode: '4.3.1.33.',
      namaSumberDana: 'SiLPA BOS Reguler',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefSumberDana: 34,
      kode: '4.3.1.34',
      namaSumberDana: 'SiLPA BOS Afirmasi',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefSumberDana: 35,
      kode: '4.3.1.35',
      namaSumberDana: 'SiLPA BOS Kinerja',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
    {
      idRefSumberDana: 99,
      kode: '0',
      namaSumberDana: 'Saldo Awal',
      createDate: new Date(),
      lastUpdate: new Date(),
    },
  ]
  await repoRefSumberDana.save(refSumberDanaData)
  return
}

async function addAppConfig(): Promise<void> {
  const repoAppConfig = getRepository(AppConfig)
  const appConfigData = [
    { varname: 'active', varvalue: '0' },
    { varname: 'sekolah_id', varvalue: '0' },
    { varname: 'koreg', varvalue: '0' },
    { varname: 'koreg_invalid', varvalue: '0' },
    { varname: 'requestReset', varvalue: '0' },
    { varname: 'hdd_vol', varvalue: '' },
    { varname: 'hdd_vol_old', varvalue: '' },
  ]
  await repoAppConfig.save(appConfigData)
  return
}

async function createDBLocal(appDataPath: string): Promise<void> {
  if (!fs.existsSync(path.join(appDataPath, 'arkas.db'))) {
    const connDBLocal = await createConnection({
      type: 'better-sqlite3',
      database: path.join(appDataPath, 'arkas.db'),
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
      synchronize: true,
    })

    await addApp()
    await addRole()
    await addRefBKU()
    await addRefJabatan()
    await addRefJenisInstansi()
    await addRefLevelKode()
    await addRefLevelWilayah()
    await addRefNegara()
    await addRefPeriode()
    await addRefSumberDana()
    await addAppConfig()
    await connDBLocal.close()
  }
  await encryptDB()
  return
}

export const setupDB = async (): Promise<void> => {
  const appDataPath = await getAppData()

  if (!fs.existsSync(appDataPath)) {
    fs.mkdirSync(appDataPath)
  }

  if (
    process.platform == 'win32' &&
    !fs.existsSync(path.join(appDataPath, 'arkas.db'))
  ) {
    let paramStr = ''
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
      paramStr = ''
    } else {
      paramStr = path.join(appDataPath, 'arkas.db')
    }
    const execPromisify = promisify(execFile)
    return execPromisify(
      path.join(__dirname, 'convert', 'ConvertArkasToVer4.exe'),
      [paramStr]
    )
      .then(() => {
        return createDBLocal(appDataPath)
      })
      .catch((err) => {
        throw err
      })
  } else {
    await createDBLocal(appDataPath)
    return
  }
}
