export interface BKUCardDashboardBulanType {
  bulan: string
  status: string
}

export interface BKUCardDashboardTahunType {
  tahun: number
  status: string
  idAnggaran: string
  isAnggaranApproved: boolean
  bulan: BKUCardDashboardBulanType[]
}
