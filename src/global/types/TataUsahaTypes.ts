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
  idAnggaran: string
  status: string
  isAnggaranApproved: boolean
  bulan: AktivasiBku[]
}

export interface AktivasiBku {
  idPeriode: number
  bulan: string
  status: string
}
