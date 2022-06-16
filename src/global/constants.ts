export const STATUS_KERTAS_KERJA = {
  waiting_approval: 'waiting_approval',
  not_approved: 'not_approved',
  draft: 'draft',
  not_created: 'not_created',
  approved: 'approved',
  disabled: 'disabled',
  sending: 'sending',
  retry: 'retry',
}

export const VERSI_ANGGARAN = {
  perubahan: { code: 'perubahan', label: 'Perubahan' },
  pergeseran: { code: 'pergeseran', label: 'Pergeseran' },
}

export const CONFIG = {
  sekolahId: 'sekolah_id',
  penggunaId: 'pengguna_id',
  sessionId: 'sessionId',
  tahunAktif: 'tahun_aktif',
}

export const ERROR = {
  notFound: 'not found',
}

export const INPUT_TYPE_PLACEHOLDER = {
  itNPSNSekolah: 'Masukkan NPSN sekolah',
  itActivationCode: 'Masukkan kode aktivasi',
  itEmail: 'email',
  itPassword: 'password',
}

export const INPUT_TYPE_CONTENT = {
  icActivationCode:
    'Kode aktivasi yang didapatkan dari dinas ketika aktivasi akun',
  icQuit: 'Batal',
}

export const WARNING_ERROR = {
  errNpsnNotRegistered: 'npsn_tidak_terdaftar',
  errNpsnDapodikUnregistered:
    'NPSN tidak terdaftar di Dapodik. Silakan periksa kembali.',
  warningWrongActivationCode: 'Kode aktivasi salah',
}
export const CONST_PENGESAHAN = {
  requestConfirmation: 'Ajukan Pengesahan',
}

export const CONST_PENGAJUAN = {
  submissionSent: 'Pengajuan Terkirim',
  waitingSubmission: 'Pengajuan Masih Diproses',
  waitingSubmissionDesc:
    'Mohon menunggu beberapa waktu atau hubungi dinas setempat jika sudah lebih dari 7 hari.',
  onWaitingDinasSubmission:
    'Dinas memerlukan beberapa hari kerja untuk memproses pengajuan Anda. Silakan cek status terbaru secara berkala.',
}

export const CONST_CHECK = {
  checkNewStatus: 'Cek Status Terbaru',
}

export const CONST_AGREEMENT = {
  waUnderstand: 'Saya Mengerti',
}

export const CONST_WARNING_NPSN = {
  wNPSNDuplicated: 'NPSN Anda sudah terdaftar di perangkat lain',
  wWarningNpsn:
    'Anda hanya bisa menggunakan ARKAS di 1 perangkat. Gunakan perangkat yang biasa dipakai untuk masuk ke ARKAS, atau hubungi dinas pendidikan setempat untuk menghapus perangkat lama dan mengaktifkan perangkat ini.',
}

export const CONST_WARNING_ACCOUNT = {
  wLoggedOut:
    'Setelah keluar, Anda perlu mengisi email dan password kembali untuk masuk ke ARKAS.',
}

export const CONST_SYNC = {
  wAlertRetry:
    'Maaf, terjadi gangguan di sistem kami. Silakan coba lagi dalam beberapa saat.',
  wFailedSync: 'Gagal Sinkronisasi Data',
  wNeedInternet: 'membutuhkan koneksi internet',
  wRetrySync: 'Sinkronisasi Ulang',
}

export const CONST_CONNECTION = {
  wCheckRetry: 'Periksa kembali koneksi internet Anda lalu sinkronisasi ulang.',
  wDisconnected: 'Koneksi Internet Terputus',
  wReturn: 'Kembali',

  wNoConnection: 'Tidak Ada Koneksi Internet',
  wConnectSyncAgain: 'Koneksikan perangkat Anda lalu sinkronisasi ulang.',
}

export const CONST_NOTFOUND = {
  wBackDashboard: 'Back to dashboard',
  w404NotFound: '404 Page Not Found',
}

export const CONST_ACCOUNT = {
  wAlertCreateNewPassword:
    'Anda sudah bisa membuat password baru untuk akun Anda.',
  wCheckStatus: 'Cek Status',
  wCreateNewPassword: 'Buat Password Baru',
  wForgotPassword: 'Lupa Password?',
  wPassword: 'Password',
  wResetAccount: 'Reset Akun',
  wSignIn: 'Masuk',
  wSubmitResetAccount: 'Ajukan Reset Akun',
  wWaitingReset: 'Pengajuan Reset Akun Masih Diproses',
  wRetryRegistration: 'Registrasi Ulang',

  wLoginByEmailSekolah: 'Masukkan email yang terdaftar di sekolah',
  wDeviceAlreadyUsed: 'Akun anda teridentifikasi pada perangkat lain',
}

export const STATUS_INVALID_PENGESAHAN = {
  invalidSisaDana: 2,
  invalidDataCentral: 3,
  mengirimKertasKerja: 4,
  gagalMengirim: 5,
}

export const STATUS_BKU_PERBULAN = {
  not_created: 'not_created',
  done: 'done',
  request_to_edit: 'request_to_edit',
  request_to_delete: 'request_to_delete',
  not_reported_tax: 'not_reported_tax',
  draft: 'draft',
}

export const STATUS_BKU_PERTAHUN = {
  not_active: 'not_active',
  active: 'active',
  done: 'done',
  temporary_inactive: 'temporary_inactive',
  date_over: 'date_over',
}

export const KAS_UMUM_TYPE = {
  line: 'line',
  row: 'row',
}

export const TIME_CHECK_UPDATE_APP = {
  hour: 8,
}
