export interface SaveBkuRequest {
  idAnggaran: string
  recieveDate: Date
  recieveAmount: number
  uraian: string
}

export interface GetListAnggaranRequest {
  idSumberDana: number
  tahunAnggaran: number[]
}

export interface Anggaran {
  tahun: number
  idAnggaran: string | null
  status: string
  isAnggaranApproved: boolean
  bulan: AktivasiBku[]
}

export interface AktivasiBku {
  idPeriode: number
  bulan: string
  status: string
}

export interface GetTotalSaldoRequest {
  idAnggaran: string
  startDate: string
  endDate: string
}

export interface GetTotalAnggaranRequest {
  idAnggaran: string
  idPeriode: number[]
}

export interface CashWithdrawalRequest {
  idAnggaran: string
  date: Date
  amount: number
}

export interface GetListKasUmumRequest {
  idAnggaran: string
  idPeriode: number
}

export interface TarikTunaiData {
  jumlah: number
  date: string
  messageTemplate: string
  message: string
  id: string
  tanggal?: string | null
  kegiatan: string
  uraian: string
  jenisTransaksi: string
  anggaran?: number
  dibelanjakan?: number | null
  pajakWajibLapor?: number | null
}

export interface TarikTunai {
  type: string
  data: TarikTunaiData
}
