import { Anggaran } from 'main/models/Anggaran'
import { AppConfig } from 'main/models/AppConfig'
import { Instansi } from 'main/models/Instansi'
import { Register } from 'main/services/RegistrationService'
import { MstSekolah } from 'main/models/MstSekolah'
import { MstWilayah } from 'main/models/MstWilayah'
import { InstansiPengguna } from 'main/models/InstansiPengguna'
import { Pengguna } from 'main/models/Pengguna'
import { UserRole } from 'main/models/UserRole'
import {
  RegisterData,
  RegistrationResponse,
  SchoolResponse,
} from 'main/types/Pengguna'
import { GetConfig } from 'main/repositories/ConfigRepository'
import CommonUtils from 'main/utils/CommonUtils'
import { createConnection, getConnection, getRepository } from 'typeorm'
import { cfg, Migrate } from '../migration'

beforeAll(async () => {
  process.env.NODE_ENV = 'testing'
})

beforeEach(async () => {
  const db = await createConnection({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    entities: [
      Pengguna,
      InstansiPengguna,
      UserRole,
      Instansi,
      MstWilayah,
      MstSekolah,
      Anggaran,
      AppConfig,
    ],
    synchronize: false,
    logging: true,
  })

  await Migrate(db, cfg)
})

afterEach(async () => {
  const conn = getConnection()

  await conn.close()
})

test('Register', async () => {
  const registration: RegistrationResponse = {
    data: {
      instansi_id: 'XJj5sPUuEeCuyFu-9v3TZw',
      instansi_pengguna_id: 'ZnnRHK18GUecrx8i-G1fnw',
      pengguna_id: 'urUy2fJ51EKnhMNFBQ6DCQ',
      sekolah_id: 'XJj5sPUuEeCuyFu-9v3TZw',
      status_code: 1,
      tahun_aktif: 2022,
      userrole_id: 'GmkVVh6EE0eqKaGM-A7I5Q',
    },
  }

  const sekolah: SchoolResponse = {
    data: {
      alamat: 'Trengguno',
      bendahara: 'Wasini',
      bentuk_pendidikan_id: 5,
      email_kepsek: 'khang_ono@yahoo.com',
      jumlah_siswa: 0,
      kepsek: 'Sartana',
      kode_wilayah: '040307  ',
      komite: 'Marsiyanto',
      nama: 'SDN TRENGGUNO PONJONG',
      nip_bendahara: '197008281993082002',
      nip_kepsek: '196611061994011002',
      nip_komite: '',
      sekolah_id: 'XJj5sPUuEeCuyFu-9v3TZw',
      status_sekolah: 1,
      telepon_kepsek: '081227864710',
      email_bendahara: null,
      telepon_bendahara: null,
      npsn: '20401785',
    },
  }

  const data: RegisterData = {
    registrasi: registration.data,
    sekolah: sekolah.data,
    kode_registrasi: 'GR04',
    password: '12345678',
    email: 'ponjong@arkas.com',
  }

  let err = false
  try {
    await Register(data)
  } catch (error) {
    err = true
  }

  expect(err).toBe(false)

  const instansi = await getRepository(Instansi).findOne({
    instansiId: registration.data.instansi_id,
  })
  expect(instansi.nama).toBe(sekolah.data.nama)
  expect(instansi.alamat).toBe(sekolah.data.alamat)
  expect(instansi.kodeWilayah).toBe(sekolah.data.kode_wilayah)

  const pengguna = await getRepository(Pengguna).findOne({
    penggunaId: registration.data.pengguna_id,
  })
  expect(pengguna.password).toBe(
    CommonUtils.getMD5(data.password).toUpperCase()
  )
  expect(pengguna.email).toBe(data.email)
  expect(pengguna.kodeWilayah).toBe(sekolah.data.kode_wilayah)

  const instansiPengguna = await getRepository(InstansiPengguna).findOne({
    instansiPenggunaId: registration.data.instansi_pengguna_id,
  })
  expect(instansiPengguna.penggunaId).toBe(registration.data.pengguna_id)
  expect(instansiPengguna.instansiId).toBe(registration.data.instansi_id)
  expect(instansiPengguna.jabatanId).toBe(10)

  const userRole = await getRepository(UserRole).findOne({
    instansiPenggunaId: registration.data.instansi_pengguna_id,
  })
  expect(userRole.roleId).toBe('kG0LFX0OXEuso0DtvGmniw')
  expect(userRole.userroleId).toBe(registration.data.userrole_id)

  const mstSekolah = await getRepository(MstSekolah).findOne({
    sekolahId: sekolah.data.sekolah_id,
  })
  expect(mstSekolah.kodeWilayah).toBe(sekolah.data.kode_wilayah)
  expect(mstSekolah.kepsek).toBe(sekolah.data.kepsek)
  expect(mstSekolah.jumlahSiswa).toBe(sekolah.data.jumlah_siswa)

  const tahunAktif = await GetConfig('tahun_aktif')
  expect(tahunAktif).toBe(registration.data.tahun_aktif.toString())

  const active = await GetConfig('active')
  expect(active).toBe('1')

  const sekolahID = await GetConfig('sekolah_id')
  expect(sekolahID).toBe(sekolah.data.sekolah_id)

  const kodeRegistrasi = await GetConfig('koreg')
  expect(kodeRegistrasi).toBe(data.kode_registrasi)
})
