export interface FormCreateKertasKerjaData {
  nama_kepala_sekolah: string
  nama_bendahara: string
  nama_komite: string
  nip_kepala_sekolah: string
  nip_bendahara: string
  email_komite: string
}

export interface KonfirmasiKertasKerjaData {
  nominal: string
}

export type FormIsiKertasKerjaType =
  | 'program_kegiatan'
  | 'kegiatan'
  | 'rekening_belanja'
  | 'uraian'
  | 'harga_satuan'
  | 'anggaran_bulan'
  | `anggaran_bulan.${number}`
  | `anggaran_bulan.${number}.bulan`
  | `anggaran_bulan.${number}.jumlah`
  | `anggaran_bulan.${number}.satuan`

export interface AnggaranBulanData {
  bulan: string
  jumlah: number
  satuan: string
}

export interface FormIsiKertasKerjaData {
  id: number
  program_kegiatan: string
  kegiatan: string
  rekening_belanja: string
  uraian: string
  harga_satuan: string
  anggaran_bulan: AnggaranBulanData[]
}

export interface CardDashboardType {
  id_anggaran: number
  tahun: string
  status: string
  tenggat_waktu: string
  status_updated_at: string
  type: string
  tanggal_pengesahan: string
}
