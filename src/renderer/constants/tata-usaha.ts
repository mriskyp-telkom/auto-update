export const STATUS_BKU_PERTAHUN = {
  not_active: 'not_active',
  active: 'active',
  done: 'done',
  temporary_inactive: 'temporary_inactive',
}

export const LABEL_STATUS_BKU_PERTAHUN = [
  {
    status: STATUS_BKU_PERTAHUN.not_active,
    type: 'soft-gray-with-border',
    label: 'Belum Aktif',
  },
  {
    status: STATUS_BKU_PERTAHUN.active,
    type: 'soft-blue-with-border',
    label: 'Aktif',
  },
  {
    status: STATUS_BKU_PERTAHUN.done,
    type: 'success',
    label: 'Sudah Selesai',
  },
  {
    status: STATUS_BKU_PERTAHUN.temporary_inactive,
    type: 'disabled-with-border',
    label: 'Non Aktif Sementara',
  },
]

export const STATUS_BKU_PERBULAN = {
  not_created: 'not_created',
  done: 'done',
  request_to_edit: 'request_to_edit',
  request_to_delete: 'request_to_delete',
  not_reported_tax: 'not_reported_tax',
  draft: 'draft',
}

export const LABEL_STATUS_BKU_PERBULAN = [
  {
    status: STATUS_BKU_PERBULAN.not_created,
    type: 'neutral-with-border',
    label: 'Belum Dibuat',
  },
  {
    status: STATUS_BKU_PERBULAN.done,
    type: 'success',
    label: 'Sudah Selesai',
  },
  {
    status: STATUS_BKU_PERBULAN.request_to_edit,
    type: 'warning',
    label: 'Dalam Pengajuan Edit',
  },
  {
    status: STATUS_BKU_PERBULAN.request_to_delete,
    type: 'warning',
    label: 'Dalam Pengajuan Hapus',
  },
  {
    status: STATUS_BKU_PERBULAN.not_reported_tax,
    type: 'warning',
    label: 'Belum Lapor Pajak',
  },
  {
    status: STATUS_BKU_PERBULAN.draft,
    type: 'informational',
    label: 'Draft',
  },
]
