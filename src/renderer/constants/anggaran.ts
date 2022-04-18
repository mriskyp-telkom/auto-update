import { STATUS_KERTAS_KERJA } from 'global/constants'

export const LABEL_STATUS_KERTAS_KERJA = [
  {
    status: STATUS_KERTAS_KERJA.waiting_approval,
    type: 'warning',
    label: 'Menunggu Pengesahan',
  },
  {
    status: STATUS_KERTAS_KERJA.not_approved,
    type: 'critical',
    label: 'Perlu Revisi',
  },
  {
    status: STATUS_KERTAS_KERJA.draft,
    type: 'informational',
    label: 'Draf',
  },
  {
    status: STATUS_KERTAS_KERJA.not_created,
    type: 'neutral',
    label: 'Belum Dibuat',
  },
  {
    status: STATUS_KERTAS_KERJA.approved,
    type: 'success',
    label: 'Sudah Disahkan',
  },
  {
    status: STATUS_KERTAS_KERJA.disabled,
    type: 'disabled',
    label: 'Non Aktif - Lewat Batas',
  },
]

export const RESPONSE_PENGESAHAN = {
  success: 'success',
  error_sisa_dana: 'error_sisa_dana',
  error_data_sentral: 'error_data_sentral',
  failed_sync_data: 'failed_sync_data',
}

export const ALERT_MENGULAS = {
  [RESPONSE_PENGESAHAN.success]: {
    type: 'success',
    icon: 'done',
    title: 'RKAS Terkirim!',
    desc: 'Dinas memerlukan 7-14 hari kerja untuk memeriksa dan melakukan pengesahan. Silakan cek status terbaru secara berkala.',
    btnCancelText: 'Tutup',
    btnActionText: 'Cek Status',
  },
  [RESPONSE_PENGESAHAN.failed_sync_data]: {
    type: 'failed',
    icon: 'close',
    title: 'Gagal Sinkronisasi Data',
    desc: 'Maaf, terjadi gangguan di sistem kami. Silakan coba lagi dalam beberapa saat.',
    btnCancelText: '',
    btnActionText: 'Revisi RKAS',
  },
  [RESPONSE_PENGESAHAN.error_data_sentral]: {
    type: 'failed',
    icon: 'close',
    title: 'Maaf, RKAS perlu disesuaikan',
    desc: 'Ada perubahan di data referensi barang/jasa yang mempengaruhi anggaran Anda. Mohon sesuaikan berdasarkan panduan dan ajukan pengesahan kembali.',
    btnCancelText: '',
    btnActionText: 'Revisi RKAS',
  },
  [RESPONSE_PENGESAHAN.error_sisa_dana]: {
    type: 'failed',
    icon: 'close',
    title: 'RKAS belum memenuhi syarat',
    desc: 'Anda masih memiliki sisa dana yang belum dihabiskan. Silakan revisi RKAS Anda dan ajukan pengesahan kembali.',
    btnCancelText: '',
    btnActionText: 'Revisi RKAS',
  },
}

export const RESPONSE_CEK_STATUS = {
  approved: 'approved',
  in_progress: 'in_progress',
  declined: 'declined',
}

export const ALERT_CEK_STATUS = {
  [RESPONSE_CEK_STATUS.approved]: {
    type: 'success',
    icon: 'done',
    title: 'RKAS Sudah Disahkan!',
    desc: 'Sesuai peraturan yang berlaku, Anda sudah dapat melakukan pembelanjaan setelah menerima dana. Silakan cetak RKAS sebagai pelengkap laporan pembelanjaan.',
    btnCancelText: 'Tutup',
    btnActionText: 'Cetak RKAS',
  },
  [RESPONSE_CEK_STATUS.in_progress]: {
    type: 'warning',
    icon: 'hourglass_bottom',
    title: 'RKAS masih dalam proses',
    desc: 'Dinas memerlukan 7-14 hari kerja untuk memeriksa dan melakukan pengesahan. Silahkan cek status terbaru secara berkala.',
    btnCancelText: 'Tutup',
    btnActionText: 'Lihat RKAS',
  },
  [RESPONSE_CEK_STATUS.declined]: {
    type: 'failed',
    icon: 'close',
    title: 'Maaf, RKAS belum disetujui',
    desc: 'Berdasarkan pemeriksaan dinas, ada beberapa hal di RKAS Anda yang belum sesuai dengan peraturan yang berlaku. Silakan lakukan revisi sesuai catatan yang diberikan.',
    btnCancelText: 'Tutup',
    btnActionText: 'Revisi RKAS',
  },
}

export const ID_SUMBER_DANA = {
  BOS_REGULER: 1,
  BOS_DAERAH: 3,
  LAINNYA: 5,
  BOS_AFIRMASI: 11,
  BOS_KINERJA: 12,
  SILPA_BOS_REGULER: 33,
  SILPA_BOS_AFIRMASI: 34,
  SILPA_BOS_KINERJA: 35,
}

export const MODE_MENGULAS = {
  tahap: 'tahap',
  tahun: 'tahun',
}

export const LABEL_MODE_MENGULAS = [
  { id: 1, key: MODE_MENGULAS.tahap, label: 'Lihat per tahapan' },
  { id: 2, key: MODE_MENGULAS.tahun, label: 'Lihat per tahun' },
]

export const MODE_CREATE_KERTAS_KERJA = {
  new: 'new',
  salin: 'salin',
}
