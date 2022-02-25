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

export interface FormIsiKertasKerjaData {
  kegiatan: string
  rekening_belanja: string
  uraian: string
  harga_satuan: number
  anggaran_bulan: AnggaranBulanData[]
}
