import { STATUS_KERTAS_KERJA } from 'global/constants'

export const copyKertasKerja = (status = '') => {
  if (status === STATUS_KERTAS_KERJA.approved) {
    return 'RKAS'
  }
  return 'Kertas Kerja'
}
