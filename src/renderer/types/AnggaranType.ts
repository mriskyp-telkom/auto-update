export type FormPenanggungJawabType =
  | 'nama_kepala_sekolah'
  | 'nama_bendahara'
  | 'nama_komite'
  | 'nip_kepala_sekolah'
  | 'nip_bendahara'
  | 'email_komite'

export interface FormPenanggungJawabData {
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
  id_bulan: number
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

export interface FormTableKertasKerjaData {
  idRapbs: number
  programKegiatan: string
  kegiatan: string
  rekeningBelanja: string
  satuan: string
  uraian: string
}

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

export type ResponseMengulas =
  | 'success'
  | 'error_sisa_dana'
  | 'error_data_sentral'

export interface FormPenanggungJawab {
  id_penjab: string
  sekolah_id: string
  kepsek: string
  bendahara: string
  komite: string
  nip_kepsek: string
  nip_bendahara: string
  nip_komite: string
  email_kepsek: string
  email_bendahara: string
  email_komite: string
  telepon_kepsek: string
  telepon_bendahara: string
}

export interface FormPagu {
  sekolah_id: string
  sumber_dana_id: number
  allow_edit: boolean
  volume: number
  harga_satuan: number
  jumlah: number
}

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

export interface ParamAnggaranType {
  id_anggaran: string
  id_ref_sumber_dana: number
  sekolah_id: string
  volume: number
  harga_satuan: number
  jumlah: number
  sisa_anggaran: number
  is_pengesahan: number
  tanggal_pengajuan: number
  tanggal_pengesahan: number
  is_approve: number
  is_revisi: number
  alasan_penolakan: string
  is_aktif: number
  soft_delete: number
  create_date: string
  last_update: string
  updater_id: string
  id_penjab: string
}
