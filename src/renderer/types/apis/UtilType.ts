export interface ParamHDDVolType {
  hdd_vol: string
  hdd_vol_old: string
}

export interface ParamCheckActivation {
  npsn: string
  koreg: string
  hdd_vol: string
}

export interface ParamConfigPagu {
  idSumberData: number
  isRevisi: number
}

export interface ParamSalur {
  tahun: number
  sumberDana: number
}

export interface Penerimaan {
  tahap: number
  label: string
  tanggal: string
  ttotal: number
}

export interface SalurResponse {
  type: string
  penerimaan: Penerimaan[]
}
