export interface FormPenerimaanDanaData {
  periode: string
  tanggal_penerimaan: Date
  nominal: string
}

export type FormPenanggungJawabType =
  | 'periode'
  | 'tanggal_penerimaan'
  | 'nominal'
