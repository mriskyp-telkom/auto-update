export interface BKUCardDashboardBulanType {
  bulan: string
  status: string
}

export interface BKUCardDashboardTahunType {
  tahun: number
  status: string
  bulan: BKUCardDashboardBulanType[]
}
