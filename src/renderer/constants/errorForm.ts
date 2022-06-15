export const ERROR_REQUIRED = 'Wajib Diisi'
export const ERROR_NUMBER_ONLY = 'Isi dengan format angka'
export const ERROR_ALPHABET_ONLY = 'Isi dengan format huruf'
export const ERROR_NOMINAL_MINLENGTH = (label: string, digit: number) =>
  `${label} minimal ${digit} digit angka`
export const ERROR_LENGTH = (label: string, digit: number) =>
  `${label} harus terdiri dari ${digit} angka`

/* Nama */
export const NAMA_ERROR_VALIDATION =
  'Hanya huruf dan simbol . , - _ yang diperbolehkan'

/* Email */
export const EMAIL_ERROR_FORMAT =
  'Masukkan email dengan contoh format arini@yahoo.com'
export const EMAIL_ERROR_VALIDATION =
  'Hanya huruf, angka, dan simbol . , - _ yang diperbolehkan'
export const EMAIL_ERROR_REGISTERED =
  'Email sudah terdaftar. Silakan gunakan email lain.'
export const EMAIL_ERROR_NOT_REGISTERED = 'Email tidak terdaftar'

/* Password */
export const PASSWORD_ERROR_MINLENGTH = 'Minimal 8 karakter'
export const PASSWORD_ERROR_WRONG = 'Password salah'

/* NPSN */
export const NPSN_ERROR_LENGTH = 'NPSN harus terdiri dari 8 angka'
export const NPSN_ERROR_NOT_REGISTERED =
  'NPSN tidak terdaftar di Dapodik. Silakan periksa kembali.'

/* Kode Aktivasi */
export const KODE_AKTIVASI_ERROR_WRONG = 'Kode aktivasi salah'

/* Harga Satuan */
export const HARGA_SATUAN_ERROR_LESS_THAN = 'Harga kurang dari batas bawah SSH'
export const HARGA_SATUAN_ERROR_MORE_THAN = 'Harga melebihi batas atas SSH'

/* Data Sentral */
export const KEGIATAN_ERROR_DATA_SENTRAL =
  'Daftar kegiatan berubah. Silakan pilih ulang.'
export const REKENING_BELANJA_ERROR_DATA_SENTRAL =
  'Daftar rekening belanja berubah. Silakan pilih ulang.'
export const URAIAN_ERROR_DATA_SENTRAL =
  'Referensi daftar barang/jasa berubah. Silakan pilih ulang.'
export const HARGA_SATUAN_ERROR_DATA_SENTRAL =
  'Batas harga berubah. Silakan masukkan ulang.'

/* Tarik Tunai Nominal */
export const NOMINAL_TARIK_TUNAI_ERROR_MORE_THAN =
  'Penarikan tunai tidak bisa melebihi total saldo'
