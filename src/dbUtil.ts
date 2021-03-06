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
import { AktivasiBku } from 'main/models/AktivasiBku'
import { KasUmumPajak } from 'main/models/KasUmumPajak'

import { BaseEntity, getRepository } from 'typeorm'

export const dbFile = (): string => {
  return 'arkas.db'
}

export const dbPragmaConfigDefault = (db: any, isReKey: boolean) => {
  db.pragma("cipher='sqlcipher'")
  db.pragma('legacy=4')
  isReKey
    ? db.pragma("rekey='K3md1kbudRIS3n4yan'")
    : db.pragma("key='K3md1kbudRIS3n4yan'")
}

export const getEntities = (): typeof BaseEntity[] => {
  return [
    Anggaran,
    AppConfig,
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
    RefRekeningTransfer,
    RefSumberDana,
    RefSatuan,
    RefTahunAnggaran,
    Role,
    Token,
    UserRole,
    App,
    SekolahPenjab,
    ReportBku,
    AktivasiBku,
    KasUmumPajak,
  ]
}

export const initData = {
  insert: async () => {
    const promises = []
    promises.push(initData.addApp())
    promises.push(initData.addAppConfig())
    promises.push(initData.addRefBKU())
    promises.push(initData.addRefJabatan())
    promises.push(initData.addRefJenisInstansi())
    promises.push(initData.addRefLevelKode())
    promises.push(initData.addRefLevelWilayah())
    promises.push(initData.addRefNegara())
    promises.push(initData.addRefPeriode())
    promises.push(initData.addRefSumberDana())
    promises.push(initData.addRole())

    await Promise.all(promises)
  },
  addApp: async () => {
    const currentTime = new Date()
    const app = new App()
    app.appId = 'CNhMM6obP06_yBqZAw2PZg'
    app.nama = 'ARKAS 4.0'
    app.urlLogin = 'https://arkas.kemdikbud.go.id/app/'
    app.urlPost = '-'
    app.loginInfo = '-'
    app.tag = 1
    app.createDate = currentTime
    app.lastUpdate = currentTime
    await app.save()
  },
  addRole: async () => {
    const currentTime = new Date()
    const role = new Role()
    role.roleId = 'CNhMM6obP06_yBqZAw2PZg'
    role.appId = 'kG0LFX0OXEuso0DtvGmniw'
    role.nama = 'App'
    role.tag = 0
    role.softDelete = 0
    role.createDate = currentTime
    role.lastUpdate = currentTime
    role.updaterId = ''
    await role.save()
  },
  addAppConfig: async () => {
    const repoAppConfig = getRepository(AppConfig)
    const appConfigData = [
      {
        varname: 'active',
        varvalue: '0',
      },
      {
        varname: 'sekolah_id',
        varvalue: '0',
      },
      {
        varname: 'koreg',
        varvalue: '0',
      },
      {
        varname: 'koreg_invalid',
        varvalue: '0',
      },
      {
        varname: 'requestReset',
        varvalue: '0',
      },
      {
        varname: 'hdd_vol',
        varvalue: '',
      },
      {
        varname: 'hdd_vol_old',
        varvalue: '',
      },
    ]
    await repoAppConfig.save(appConfigData)
  },
  addRefBKU: async () => {
    const currentTime = new Date()
    const repoRefBku = getRepository(RefBku)
    const refBKUData = [
      {
        idRefBku: 1,
        bku: 'Saldo Awal',
        kodeBku: '',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefBku: 2,
        bku: 'Terima Dana BOS',
        kodeBku: 'BBU',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefBku: 3,
        bku: 'Tarik Tunai',
        kodeBku: 'BBU',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefBku: 4,
        bku: 'Kas Keluar',
        kodeBku: 'BPU',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefBku: 5,
        bku: 'Setor Tunai',
        kodeBku: 'SAB',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefBku: 6,
        bku: 'Bunga Bank',
        kodeBku: 'BBU',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefBku: 7,
        bku: 'Pajak Bunga',
        kodeBku: 'BPU',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefBku: 8,
        bku: 'Saldo Awal Bank',
        kodeBku: 'SAB',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefBku: 9,
        bku: 'Saldo Awal Tunai',
        kodeBku: 'SAT',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefBku: 10,
        bku: 'Pajak Belanja Terima',
        kodeBku: 'PBT',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefBku: 11,
        bku: 'Pajak Belanja Setor',
        kodeBku: 'PBS',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefBku: 12,
        bku: 'Pergeseran Tunai',
        kodeBku: 'PBS',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefBku: 13,
        bku: 'Pergeseran Setor',
        kodeBku: 'PSS',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefBku: 14,
        bku: 'Pengembalian Dana BOS',
        kodeBku: 'STS',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefBku: 15,
        bku: 'Kas Keluar Non Tunai',
        kodeBku: 'BNU',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefBku: 23,
        bku: 'Tarik Tunai Sisa',
        kodeBku: 'BBU',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefBku: 24,
        bku: 'Kas Keluar Sisa',
        kodeBku: 'BBU',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefBku: 25,
        bku: 'Setor Tunai Sisa',
        kodeBku: 'BBU',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefBku: 26,
        bku: 'Bunga Bank Sisa',
        kodeBku: 'BBU',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefBku: 27,
        bku: 'Pajak Bunga Sisa',
        kodeBku: 'BPU',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefBku: 28,
        bku: 'Saldo Awal Bank Sisa',
        kodeBku: 'SAB',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefBku: 29,
        bku: 'Saldo Awal Tunai Sisa',
        kodeBku: 'SAT',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefBku: 30,
        bku: 'Pajak Belanja Terima Sisa',
        kodeBku: 'PBT',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefBku: 31,
        bku: 'Pajak Belanja Setor Sisa',
        kodeBku: 'PBS',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefBku: 32,
        bku: 'Pergeseran Tunai',
        kodeBku: 'PBS',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefBku: 33,
        bku: 'Pergeseran Setor',
        kodeBku: 'PSS',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefBku: 34,
        bku: 'Pengembalian Dana BOS',
        kodeBku: 'PTS',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefBku: 35,
        bku: 'Kas Keluar Sisa Non Tunai',
        kodeBku: 'BNU',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
    ]
    await repoRefBku.save(refBKUData)
  },
  addRefJabatan: async () => {
    const currentTime = new Date()
    const repoRefJabatan = getRepository(RefJabatan)
    const refJabatanData = [
      {
        jabatanId: 1,
        nama: 'Admin Dinas Pendidikan',
        levelJabatan: 1,
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        jabatanId: 10,
        nama: 'Operator Sekolah',
        levelJabatan: 10,
        createDate: currentTime,
        lastUpdate: currentTime,
      },
    ]
    await repoRefJabatan.save(refJabatanData)
  },
  addRefJenisInstansi: async () => {
    const currentTime = new Date()
    const repoRefJenisInstansi = getRepository(RefJenisInstansi)
    const refJenisInstansiData = [
      {
        jenisInstansiId: 3,
        nama: 'Dinas Pendidikan',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        jenisInstansiId: 4,
        nama: 'UPTD',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        jenisInstansiId: 5,
        nama: 'Sekolah',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
    ]
    await repoRefJenisInstansi.save(refJenisInstansiData)
  },
  addRefLevelKode: async () => {
    const currentTime = new Date()
    const repoRefLevelKode = getRepository(RefLevelKode)
    const refLevelKodeData = [
      {
        idLevelKode: 1,
        nama: 'Program',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idLevelKode: 2,
        nama: 'Komponen',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idLevelKode: 3,
        nama: 'Kegiatan',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
    ]
    await repoRefLevelKode.save(refLevelKodeData)
  },
  addRefLevelWilayah: async () => {
    const newDate = new Date()

    const repoRefLevelWilayah = getRepository(RefLevelWilayah)
    const refLevelwilayahData = [
      {
        idLevelWilayah: 0,
        levelWilayah: 'Nasional',
        createDate: newDate,
        lastUpdate: newDate,
      },
      {
        idLevelWilayah: 1,
        levelWilayah: 'Propinsi',
        createDate: newDate,
        lastUpdate: newDate,
      },
      {
        idLevelWilayah: 2,
        levelWilayah: 'Kab / Kota',
        createDate: newDate,
        lastUpdate: newDate,
      },
      {
        idLevelWilayah: 3,
        levelWilayah: 'Kecamatan',
        createDate: newDate,
        lastUpdate: newDate,
      },
      {
        idLevelWilayah: 4,
        levelWilayah: 'Desa',
        createDate: newDate,
        lastUpdate: newDate,
      },
    ]
    await repoRefLevelWilayah.save(refLevelwilayahData)
  },
  addRefNegara: async () => {
    const newDate = new Date()
    const refNegara = new RefNegara()
    refNegara.negaraId = 'ID'
    refNegara.nama = 'Indonesia'
    refNegara.luarNegeri = false
    refNegara.createDate = newDate
    refNegara.lastUpdate = newDate
    await refNegara.save()
  },
  addRefPeriode: async () => {
    const currentTime = new Date()
    const repoRefPeriode = getRepository(RefPeriode)
    const refPeriodeData = [
      {
        idPeriode: 1,
        periode: 'Triwulan 1',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idPeriode: 2,
        periode: 'Triwulan 2',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idPeriode: 3,
        periode: 'Triwulan 3',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idPeriode: 4,
        periode: 'Triwulan 4',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idPeriode: 81,
        periode: 'Januari',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idPeriode: 82,
        periode: 'Februari',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idPeriode: 83,
        periode: 'Maret',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idPeriode: 84,
        periode: 'April',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idPeriode: 85,
        periode: 'Mei',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idPeriode: 86,
        periode: 'Juni',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idPeriode: 87,
        periode: 'Juli',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idPeriode: 88,
        periode: 'Agustus',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idPeriode: 89,
        periode: 'September',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idPeriode: 90,
        periode: 'Oktober',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idPeriode: 91,
        periode: 'November',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idPeriode: 92,
        periode: 'Desember',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
    ]
    await repoRefPeriode.save(refPeriodeData)
  },
  addRefSumberDana: async () => {
    const currentTime = new Date()
    const repoRefSumberDana = getRepository(RefSumberDana)
    const refSumberDanaData = [
      {
        idRefSumberDana: 1,
        kode: '4.3.1.01.',
        namaSumberDana: 'BOS Reguler',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefSumberDana: 3,
        kode: '4.3.1.03.',
        namaSumberDana: 'BOS Daerah',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefSumberDana: 5,
        kode: '4.3.1.05.',
        namaSumberDana: 'Lainnya',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefSumberDana: 11,
        kode: '4.3.1.11',
        namaSumberDana: 'BOS Afirmasi',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefSumberDana: 12,
        kode: '4.3.1.12',
        namaSumberDana: 'BOS Kinerja',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefSumberDana: 33,
        kode: '4.3.1.33.',
        namaSumberDana: 'SiLPA BOS Reguler',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefSumberDana: 34,
        kode: '4.3.1.34',
        namaSumberDana: 'SiLPA BOS Afirmasi',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefSumberDana: 35,
        kode: '4.3.1.35',
        namaSumberDana: 'SiLPA BOS Kinerja',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
      {
        idRefSumberDana: 99,
        kode: '0',
        namaSumberDana: 'Saldo Awal',
        createDate: currentTime,
        lastUpdate: currentTime,
      },
    ]
    await repoRefSumberDana.save(refSumberDanaData)
  },
}
