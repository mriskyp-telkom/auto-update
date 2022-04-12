export interface Ptk {
  idPtk: string
  nama: string
}

export interface Periode {
  idPeriode: number
  volume: number
  satuan: string
  hargaSatuan: number
  jumlah: number
}

export interface DetailKegiatan {
  idAnggaran: string
  idRefKode: string
  idRefTahunAnggaran: number
  kodeRekening: string
  idBarang: string | null
  uraian: string
  satuan: string
  urutan: string
  hargaSatuan: number
  volume: number
  jumlah: number
  ptk: Ptk | null
  periode: Periode[]
}

export interface ResultDetailKegiatan {
  idRapbs: string | null
  idRapbsPeriode: string[]
}

export interface ResultDeleteRapbs {
  idRapbs: string | null
  isDeleted: boolean
  isError: boolean
  errMessage: string | null
}
