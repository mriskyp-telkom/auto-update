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
