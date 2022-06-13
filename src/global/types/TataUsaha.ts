export interface SaveBkuRequest {
  idAnggaran: string
  recieveDate: Date
  recieveAmount: number
  uraian: string
}

export interface GetListAnggaranRequest {
  idSumberDana: number
  tahunAnggaran: number[]
}

interface CommonRequest {
  idAnggaran: string
  idPeriode: number
}

export interface Anggaran {
  tahun: number
  idAnggaran: string | null
  status: string
  isAnggaranApproved: boolean
  bulan: AktivasiBku[]
}

export interface AktivasiBku {
  idPeriode: number
  bulan: string
  status: string
}

export interface GetTotalSaldoRequest {
  idAnggaran: string
  startDate: string
  endDate: string
}

export interface GetTotalSaldoByPeriodeRequest {
  idAnggaran: string
  idPeriode: number
}

export interface GetLastTransactionDateRequest {
  idAnggaran: string
  idPeriode: number
}

export interface GetTotalAnggaranRequest {
  idAnggaran: string
  idPeriode: number
}

export interface CashWithdrawalRequest {
  idAnggaran: string
  date: Date
  amount: number
}

export interface GetListKasUmumRequest {
  idAnggaran: string
  idPeriode: number
}

export interface TarikTunaiData {
  jumlah: number
  date: string
  messageTemplate: string
  message: string
  id: string
  tanggal?: string | null
  kegiatan: string
  uraian: string
  jenisTransaksi: string
  anggaran?: number
  dibelanjakan?: number | null
  pajakWajibLapor?: number | null
}

export interface TarikTunai {
  type: string
  data: TarikTunaiData
}

export interface Saldo {
  sisaBank: number
  sisaTunai: number
}

export interface InformasiToko {
  nama: string
  alamat: string
  telpon: string
  npwp: string
}

export interface Kegiatan {
  idAnggaran: string
  idPeriode: number
  kode: string
  program: string
  idKegiatan: string
  kegiatan: string
}

export type GetKegiatanByPeriodeRequest = CommonRequest

export interface GetRekeningBelanjaByPeriodeRequest extends CommonRequest {
  idKegiatan: string
}

export interface GetUraianByKegiatanRequest extends CommonRequest {
  idKegiatan: string
  kode: string
}

export interface RekeningBelanja {
  idAnggaran: string
  idPeriode: number
  kode: string
  jenisBelanja: string
  rekeningBelanja: string
}

export interface UraianBelanja {
  jenisBelanja: string
  rekeningBelanja: string
  uraian: string
  jumlah: number
  satuan: string
  hargaSatuan: number
  total: number
}
