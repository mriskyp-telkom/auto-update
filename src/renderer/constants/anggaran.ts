export const STATUS_KERTAS_KERJA = {
  waiting_approval: 'waiting_approval',
  not_approved: 'not_approved',
  draft: 'draft',
  not_created: 'not_created',
  approved: 'approved',
  disabled: 'disabled',
}

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
}

export const ALERT_MENGULAS = {
  [RESPONSE_PENGESAHAN.success]: {
    type: 'success',
    icon: 'done',
    title: 'Kertas Kerja Terkirim!',
    desc: 'Dinas memerlukan 7-14 hari kerja untuk memeriksa dan melakukan pengesahan. Silakan cek status terbaru secara berkala.',
    btnCancelText: 'Tutup',
    btnActionText: 'Cek Status',
  },
  [RESPONSE_PENGESAHAN.error_sisa_dana]: {
    type: 'failed',
    icon: 'close',
    title: 'Kertas Kerja belum memenuhi syarat',
    desc: 'Anda masih memiliki sisa dana yang belum dihabiskan. Silakan revisi Kertas Kerja Anda dan ajukan pengesahan kembali.',
    btnCancelText: '',
    btnActionText: 'Revisi Kertas Kerja',
  },
  [RESPONSE_PENGESAHAN.error_data_sentral]: {
    type: 'failed',
    icon: 'close',
    title: 'Maaf, Kertas Kerja perlu disesuaikan',
    desc: 'Ada perubahan di data referensi barang/jasa yang mempengaruhi anggaran Anda. Mohon sesuaikan berdasarkan panduan dan ajukan pengesahan kembali.',
    btnCancelText: '',
    btnActionText: 'Revisi Kertas Kerja',
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
