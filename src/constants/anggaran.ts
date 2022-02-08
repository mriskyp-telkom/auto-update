export const STATUS_KERTAS_KERJA = [
  {
    status: 'waiting',
    type: 'warning',
    label: 'Menunggu Pengesahan',
  },
  {
    status: 'not_approve',
    type: 'critical',
    label: 'Tidak Disetujui',
  },
  {
    status: 'draft',
    type: 'informational',
    label: 'Draf',
  },
  {
    status: 'not_created',
    type: 'neutral',
    label: 'Belum Dibuat',
  },
  {
    status: 'approved',
    type: 'success',
    label: 'Sudah Disahkan',
  },
  {
    status: 'disabled',
    type: 'disabled',
    label: 'Non Aktif - Lewat Batas',
  },
]
