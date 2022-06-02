/* Anggaran */

/* BKU */
export const DASHBOARD_BKU_PAGE_URL = '/tata-usaha'
export const DETAIL_BKU_PAGE_URL = (idAnggaran: string, idPeriode: number) =>
  `/tata-usaha/detail/${idAnggaran}/${idPeriode}`
export const FORM_PENARIKAN_TUNAI_PAGE_URL = (
  idAnggaran: string,
  idPeriode: number
) => `/form/penarikan-tunai/${idAnggaran}/${idPeriode}`
