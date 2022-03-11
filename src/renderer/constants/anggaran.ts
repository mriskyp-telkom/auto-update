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
