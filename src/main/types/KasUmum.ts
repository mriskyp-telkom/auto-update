export interface Saldo {
  sisaBank: number
  sisaTunai: number
}

export interface TarikTunaiBKU {
  id: string
  bku: string
  tanggalTransaksi: string
  kegiatan: string | null
  uraian: string
  idRefBku: number
  jenisTransaksi: string
  jumlahVolume: number
  jumlahAnggaran: null
  saldoDibelanjakan: number
  pajakWajibLapor: number | null
}
