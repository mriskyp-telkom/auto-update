import { InstansiPengguna } from 'main/models/InstansiPengguna'
import { UserRole } from 'main/models/UserRole'
import { Pengguna } from 'main/models/Pengguna'
import { AddInstansi } from 'main/repositories/InstansiRepository'
import { AddInstansiPengguna } from 'main/repositories/InstansiPenggunaRepository'
import { AddPengguna, AddUserRole } from 'main/repositories/UserRepository'
import { MstSekolah } from 'main/models/MstSekolah'
import { AddSekolah } from 'main/repositories/SekolahRepository'
import CommonUtils from 'main/utils/CommonUtils'
import { SetConfig } from 'main/repositories/ConfigRepository'
import { Instansi } from 'main/models/Instansi'
import { RegisterData } from 'main/types/Pengguna'

export async function Register(data: RegisterData) {
  const promises = []

  const currentDate = new Date()

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
  dataInstansi.createDate = currentDate
  dataInstansi.lastUpdate = currentDate
  dataInstansi.updaterId = data.registrasi.pengguna_id

  promises.push(AddInstansi(dataInstansi))

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
  dataPengguna.createDate = currentDate
  dataPengguna.lastUpdate = currentDate
  dataPengguna.updaterId = data.registrasi.pengguna_id

  promises.push(AddPengguna(dataPengguna))

  // Add Instansi Pengguna
  const dataInstansiPengguna = new InstansiPengguna()
  dataInstansiPengguna.instansiPenggunaId = data.registrasi.instansi_pengguna_id
  dataInstansiPengguna.penggunaId = data.registrasi.pengguna_id
  dataInstansiPengguna.instansiId = data.registrasi.instansi_id
  dataInstansiPengguna.jabatanId = 10
  dataInstansiPengguna.sk = '-'
  dataInstansiPengguna.softDelete = 0
  dataInstansiPengguna.createDate = currentDate
  dataInstansiPengguna.lastUpdate = currentDate
  dataInstansiPengguna.updaterId = data.registrasi.pengguna_id

  promises.push(AddInstansiPengguna(dataInstansiPengguna))

  // Add User Role
  const dataUserRole = new UserRole()
  dataUserRole.userroleId = data.registrasi.userrole_id
  dataUserRole.instansiPenggunaId = data.registrasi.instansi_pengguna_id
  dataUserRole.roleId = 'kG0LFX0OXEuso0DtvGmniw'
  dataUserRole.softDelete = 0
  dataUserRole.createDate = new Date()
  dataUserRole.lastUpdate = new Date()
  dataUserRole.updaterId = data.registrasi.pengguna_id

  promises.push(AddUserRole(dataUserRole))

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
  dataSekolah.createDate = currentDate
  dataSekolah.lastUpdate = currentDate
  dataSekolah.updaterId = data.registrasi.pengguna_id
  promises.push(AddSekolah(dataSekolah))

  // Add config
  promises.push(
    SetConfig('tahun_aktif', data.registrasi.tahun_aktif.toString())
  )
  promises.push(SetConfig('active', '1'))
  promises.push(SetConfig('sekolah_id', data.sekolah.sekolah_id))
  promises.push(SetConfig('koreg', data.kode_registrasi))

  await Promise.all(promises)
}
