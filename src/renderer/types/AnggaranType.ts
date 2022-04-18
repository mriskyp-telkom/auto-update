export interface KKCardDashboardType {
  id_anggaran: string
  tahun: string
  status: string
  tenggat_waktu: string
  status_updated_at: string
  type: string
  tanggal_pengesahan: string
  id_sumber_dana: number
}

export type ResponseCekStatus = 'approved' | 'in_progress' | 'declined'

export type ResponseMengulas =
  | 'success'
  | 'error_sisa_dana'
  | 'error_data_sentral'

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
  idRapbs: string | null
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
