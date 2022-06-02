export interface ParamRkasType {
  id_rapbs: string
  sekolah_id: string
  id_anggaran: string
  id_ref_kode: string
  id_ref_tahun_anggaran: number
  kode_rekening: string
  id_barang: string
  urutan: string
  uraian: string
  uraian_text: string
  volume: number
  satuan: string
  harga_satuan: number
  jumlah: number
  v1: number
  s1: string
  v2: number
  s2: string
  v3: number
  s3: string
  v4: number
  s4: string
  keterangan: string
  soft_delete: number
  create_date: string
  last_update: string
  updater_id: string
}

export interface ParamRkasPenjabType {
  id_penjab: string
  sekolah_id: string
  tanggal_mulai: string
  tanggal_selesai: string
  soft_delete: number
  ks: string
  nip_ks: string
  email_ks: string
  telp_ks: string
  bendahara: string
  nip_bendahara: string
  email_bendahara: string
  telp_bendahara: string
  komite: string
  nip_komite: string
  create_date: string
  last_update: string
  updater_id: string
}

export interface ParamRkasDetailType {
  id_rapbs_periode: string
  id_rapbs: string
  id_periode: number
  volume: number
  satuan: string
  harga_satuan: number
  jumlah: number
  v1: number
  s1: string
  v2: number
  s2: string
  v3: number
  s3: string
  v4: number
  s4: string
  soft_delete: number
  create_date: string
  last_update: string
  updater_id: string
}

export interface ParamRkasPtkType {
  id_rapbs: string
  ptk_id: string
  nama: string
  create_date: string
  last_update: string
}
