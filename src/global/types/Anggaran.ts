export interface Anggaran {
  id_anggaran: string
  id_ref_sumber_dana: number
  sekolah_id: string
  volume: number | null
  harga_satuan: number | null
  jumlah: number | null
  sisa_anggaran: number | null
  is_pengesahan: number | null
  tanggal_pengajuan: string | null
  tanggal_pengesahan: string | null
  is_approve: number
  is_revisi: number
  alasan_penolakan: string | null
  is_aktif: number
  soft_delete: number
  create_date: string
  last_update: string
  updater_id: string | null
  id_penjab: string | null
  tahun_anggaran: number
}

export interface AnggaranReset {
  idAnggaran: string
  tanggalPengajuan: Date
  isPengesahan: number
}
