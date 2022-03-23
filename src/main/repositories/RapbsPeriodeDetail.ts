export interface RapbsDetail {
  parent_kode: string
  urut: string
  level_1_id: string
  level: number
  kode: string
  uraian: string
  volume: number
  harga_satuan: number
  volume_januari: number
  januari: number
  volume_februari: number
  februari: number
  volume_maret: number
  maret: number
  volume_april: number
  april: number
  volume_mei: number
  mei: number
  volume_juni: number
  juni: number
  volume_juli: number
  juli: number
  volume_agustus: number
  agustus: number
  volume_september: number
  september: number
  volume_oktober: number
  oktober: number
  volume_november: number
  november: number
  volume_desember: number
  desember: number
  total: number
}

export interface Kegiatan {
  kode: string
  label: string
  total: number
  rekening_belanja: RekeningBelanja[]
}

export interface RekeningBelanja {
  parent_id: string
  kode: string
  label: string
  total: number
  uraian: UraianBelanja[]
}

export interface UraianBelanja {
  label: string
  volume: number
  harga_satuan: number
  bulan: Bulan
}

export interface Bulan {
  januari: BulanDetail
  februari: BulanDetail
  maret: BulanDetail
  april: BulanDetail
  mei: BulanDetail
  juni: BulanDetail
  juli: BulanDetail
  agustus: BulanDetail
  september: BulanDetail
  oktober: BulanDetail
  november: BulanDetail
  desember: BulanDetail
}

export interface BulanDetail {
  volume: number
  total: number
}
