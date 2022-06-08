export interface FormPenerimaanDanaData {
  periode: string
  tanggal_penerimaan: Date
  nominal: string
}

export type FormPenerimaanDanaType =
  | 'periode'
  | 'tanggal_penerimaan'
  | 'nominal'

export interface FormPenarikanTunaiData {
  tanggal_tarik_tunai: Date
  nominal: string
}

export type FormPenarikanTunaiType = 'tanggal_tarik_tunai' | 'nominal'

export interface FormTambahPembelanjaanData {
  transaction_type: string
  payment_date: Date
  store_name: string
  store_address: string
  store_telephone: string
  store_npwp: string
}

export type FormTambahPembelanjaanType =
  | 'transaction_type'
  | 'payment_date'
  | 'store_name'
  | 'store_address'
  | 'store_telephone'
  | 'store_npwp'
