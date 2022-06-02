export interface BKUCardDashboardBulanType {
  bulan: string
  status: string
  idAnggaran: string
  idPeriode: number
}

export interface BKUCardDashboardTahunType {
  tahun: number
  status: string
  idAnggaran: string
  isAnggaranApproved: boolean
  bulan: BKUCardDashboardBulanType[]
}
