import { AnggaranBulanData } from 'renderer/types/datas/AnggaranType'

export interface FormPaguData {
  nominal: string
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

export interface FormPenanggungJawabData {
  nama_kepala_sekolah: string
  nama_bendahara: string
  nama_komite: string
  nip_kepala_sekolah: string
  nip_bendahara: string
  email_komite: string
}

export type FormPenanggungJawabType =
  | 'nama_kepala_sekolah'
  | 'nama_bendahara'
  | 'nama_komite'
  | 'nip_kepala_sekolah'
  | 'nip_bendahara'
  | 'email_komite'

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
