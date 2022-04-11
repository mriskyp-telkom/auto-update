export interface AnggaranTotal {
  id_anggaran: string
  total: number
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
