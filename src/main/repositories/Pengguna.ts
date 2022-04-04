import { getRepository } from 'typeorm'
import { Pengguna } from 'main/models/Pengguna'
import { InstansiPengguna } from 'main/models/InstansiPengguna'
import { UserRole } from 'main/models/UserRole'
import { AddInstansi } from 'main/repositories/Instansi'
import { AddInstansiPengguna } from 'main/repositories/InstansiPengguna'
import { AddPengguna, AddUserRole } from 'main/repositories/User'
import { MstSekolah } from 'main/models/MstSekolah'
import { AddSekolah } from 'main/repositories/Sekolah'
import CommonUtils from 'main/utils/CommonUtils'
import { SetConfig } from 'main/repositories/Config'
import { Instansi } from 'main/models/Instansi'
import { RegisterData } from 'main/types/Pengguna'

export const GetPengguna = async (): Promise<Pengguna> => {
  return await getRepository(Pengguna).findOne()
}

export async function Register(data: RegisterData) {
  const dataInstansi = new Instansi()
  dataInstansi.instansiId = data.registrasi.instansi_id
  dataInstansi.jenisInstansiId = 5
  dataInstansi.kodeInstansi = data.sekolah.npsn
  dataInstansi.nama = data.sekolah.nama
  dataInstansi.alamat = data.sekolah.alamat
  dataInstansi.kodePos = 0
  dataInstansi.kodeWilayah = data.sekolah.kode_wilayah
  dataInstansi.lintang = null
  dataInstansi.bujur = null
  dataInstansi.softDelete = 0
  dataInstansi.createDate = new Date()
  dataInstansi.lastUpdate = new Date()
  dataInstansi.updaterId = data.registrasi.pengguna_id

  await AddInstansi(dataInstansi)

  // Add Pengguna
  const dataPengguna = new Pengguna()
  dataPengguna.penggunaId = data.registrasi.pengguna_id
  dataPengguna.email = data.email
  dataPengguna.password = CommonUtils.getMD5(data.password).toUpperCase()
  dataPengguna.nama = ''
  dataPengguna.tanggalLahir = new Date('1901-01-01')
  dataPengguna.tempatLahir = '-'
  dataPengguna.jenisKelamin = 'L'
  dataPengguna.kodePos = 0
  dataPengguna.kodeWilayah = data.sekolah.kode_wilayah
  dataPengguna.statusApproval = 1
  dataPengguna.softDelete = 0
  dataPengguna.createDate = new Date()
  dataPengguna.lastUpdate = new Date()
  dataPengguna.updaterId = data.registrasi.pengguna_id

  await AddPengguna(dataPengguna)

  // Add Instansi Pengguna
  const dataInstansiPengguna = new InstansiPengguna()
  dataInstansiPengguna.instansiPenggunaId = data.registrasi.instansi_pengguna_id
  dataInstansiPengguna.penggunaId = data.registrasi.pengguna_id
  dataInstansiPengguna.instansiId = data.registrasi.instansi_id
  dataInstansiPengguna.jabatanId = 10
  dataInstansiPengguna.sk = '-'
  dataInstansiPengguna.softDelete = 0
  dataInstansiPengguna.createDate = new Date()
  dataInstansiPengguna.lastUpdate = new Date()
  dataInstansiPengguna.updaterId = data.registrasi.pengguna_id

  await AddInstansiPengguna(dataInstansiPengguna)

  // Add User Role
  const dataUserRole = new UserRole()
  dataUserRole.userroleId = data.registrasi.userrole_id
  dataUserRole.instansiPenggunaId = data.registrasi.instansi_pengguna_id
  dataUserRole.roleId = 'kG0LFX0OXEuso0DtvGmniw'
  dataUserRole.softDelete = 0
  dataUserRole.createDate = new Date()
  dataUserRole.lastUpdate = new Date()
  dataUserRole.updaterId = data.registrasi.pengguna_id

  await AddUserRole(dataUserRole)

  // Add Sekolah
  const dataSekolah = new MstSekolah()
  dataSekolah.sekolahId = data.sekolah.sekolah_id
  dataSekolah.kodeWilayah = data.sekolah.kode_wilayah
  dataSekolah.nama = data.sekolah.nama
  dataSekolah.alamat = data.sekolah.alamat
  dataSekolah.statusSekolah = data.sekolah.status_sekolah
  dataSekolah.bentukPendidikanId = data.sekolah.bentuk_pendidikan_id
  dataSekolah.kepsek = data.sekolah.kepsek
  dataSekolah.teleponKepsek = data.sekolah.telepon_kepsek
  dataSekolah.nipKepsek = data.sekolah.nip_kepsek
  dataSekolah.emailKepsek = data.sekolah.email_kepsek
  dataSekolah.jumlahSiswa = data.sekolah.jumlah_siswa
  dataSekolah.kodeRegistrasi = data.kode_registrasi
  dataSekolah.npsn = data.sekolah.npsn
  dataSekolah.softDelete = 0
  dataSekolah.createDate = new Date()
  dataSekolah.lastUpdate = new Date()
  dataSekolah.updaterId = data.registrasi.pengguna_id
  await AddSekolah(dataSekolah)

  // Add config
  await SetConfig('tahun_aktif', data.registrasi.tahun_aktif.toString())
  await SetConfig('active', '1')
  await SetConfig('sekolah_id', data.sekolah.sekolah_id)
  await SetConfig('koreg', data.kode_registrasi)
}
