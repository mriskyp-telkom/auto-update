export interface AnggaranTotal {
  id_anggaran: string
  total: number
}

export interface AnggaranKegiatan {
  idAnggaran: string
  idPeriode: string
  idRapbs: string
  idRefKode: string
  kodeRekening: string
  idBarang: string
  programKegiatan: string
  kegiatan: string
  rekeningBelanja: string
  uraian: string
  jumlah: number
  satuan: string
  hargaSatuan: number
  total: number
  isHonor: number
  errorReferensi: number
}

export interface DetailAnggaranKegiatan {
  anggaran: AnggaranKegiatan
  periode: AnggaranPeriode[]
  rapbsPtk: AnggaranPtk | null
}

export interface AnggaranPeriode {
  bulan: string
  periode: number
  satuan: string
  hargaSatuan: number
  jumlah: number
  total: number
}

export interface AnggaranPtk {
  idRapbs: string
  idPtk: string
  nama: string
}

export interface AnggaranDTO {
  id_anggaran: string
  nama_sumber_dana: string
  tahun: number
  jumlah: number
  id_ref_sumber_dana: number
  tanggal_pengajuan: Date
  tanggal_pengesahan: Date
  is_revisi: number
  is_pengesahan: number
  create_date: Date
  last_update: Date
  alasan_penolakan: string
}

export interface PaguDTO {
  tahun_anggaran: number
  jumlah: number
  total: number
  sisa: number
}
