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

export interface AnggaranBulanData {
  id: string
  bulan: string
  jumlah: number
  satuan: number
}

export type FormIsiKertasKerjaType =
  | 'program_kegiatan'
  | 'kegiatan'
  | 'rekening_belanja'
  | 'uraian'
  | 'harga_satuan'
  | 'anggaran_bulan'
  | `anggaran_bulan.${number}`
  | `anggaran_bulan.${number}.id`
  | `anggaran_bulan.${number}.bulan`
  | `anggaran_bulan.${number}.jumlah`
  | `anggaran_bulan.${number}.satuan`

export interface FormIsiKertasKerjaData {
  program_kegiatan: string
  kegiatan: string
  rekening_belanja: string
  uraian: string
  harga_satuan: string
  anggaran_bulan: AnggaranBulanData[]
}
