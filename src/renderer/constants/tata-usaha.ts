export const STATUS_BKU_PERTAHUN = {
  not_active: 'not_active',
  active: 'active',
  done: 'done',
  temporary_inactive: 'temporary_inactive',
}

export const LABEL_STATUS_BKU = [
  {
    status: STATUS_BKU_PERTAHUN.not_active,
    type: 'neutral',
    label: 'Belum Aktif',
  },
  {
    status: STATUS_BKU_PERTAHUN.active,
    type: 'critical',
    label: 'Aktif',
  },
  {
    status: STATUS_BKU_PERTAHUN.done,
    type: 'success',
    label: 'Sudah Selesai',
  },
  {
    status: STATUS_BKU_PERTAHUN.temporary_inactive,
    type: 'neutral',
    label: 'Non Aktif Sementara',
  },
]
