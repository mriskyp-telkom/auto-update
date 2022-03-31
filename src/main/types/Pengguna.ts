export interface RegisterData {
  registrasi: RegistrationData
  sekolah: SchoolData
  kode_registrasi: string
  password: string
  email: string
}

export interface RegistrationResponse {
  data: RegistrationData
}

export interface RegistrationData {
  instansi_id: string
  instansi_pengguna_id: string
  pengguna_id: string
  sekolah_id: string
  status_code: number
  tahun_aktif: number
  userrole_id: string
}

export interface SchoolResponse {
  data: SchoolData
}

export interface SchoolData {
  npsn: string
  alamat: string
  bendahara: string
  bentuk_pendidikan_id: number
  email_kepsek: string
  jumlah_siswa: number
  kepsek: string
  kode_wilayah: string
  komite: string
  nama: string
  nip_bendahara: string
  nip_kepsek: string
  nip_komite: string
  sekolah_id: string
  status_sekolah: number
  telepon_kepsek: string
  email_bendahara: string | null
  telepon_bendahara: string | null
}
