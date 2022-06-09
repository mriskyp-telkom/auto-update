import { AktivasiBku } from 'main/models/AktivasiBku'
import { AnggaranDTO } from './Anggaran'

export interface Anggaran {
  anggaran: AnggaranDTO | null
  status: string
  isAnggaranApproved: boolean
  bkuList: Bku[]
}

export interface Bku {
  idPeriode: number
  monthName: string
  bku: AktivasiBku | null
  status: string
}

export interface NamaToko {
  namaToko: string
}
