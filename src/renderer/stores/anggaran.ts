import create, { State } from 'zustand'

import { ResponseMengulas } from 'renderer/types/AnggaranType'

import {
  FormPagu,
  FormPenanggungJawab,
  FormTableKertasKerjaData,
} from 'renderer/types/forms/AnggaranType'

import { ParamAnggaranType } from 'renderer/types/apis/AnggaranType'

export interface AnggaranStates extends State {
  tempDetailKertasKerja: FormTableKertasKerjaData
  setTempDetailKertasKerja: (
    tempDetailKertasKerja: FormTableKertasKerjaData
  ) => void

  alertMengulas: boolean
  setAlertMengulas: (alertMengulas: boolean) => void

  responseMengulas: ResponseMengulas
  setResponseMengulas: (responseMengulas: ResponseMengulas) => void

  penanggungJawab: FormPenanggungJawab
  setPenanggungJawab: (penanggungJawab: FormPenanggungJawab) => void

  penanggungJawabTemp: FormPenanggungJawab
  setPenanggungJawabTemp: (penanggungJawab: FormPenanggungJawab) => void

  pagu: FormPagu
  setPagu: (pagu: FormPagu) => void

  paguTemp: FormPagu
  setPaguTemp: (paguTemp: FormPagu) => void

  isFocused: boolean
  setIsFocused: (isFocused: boolean) => void

  isAfterCheckSisaDana: boolean
  setIsAfterCheckSisaDana: (isAfterCheckSisaDana: boolean) => void

  isSuccessCheckSisaDana: boolean
  setIsSuccessCheckSisaDana: (isSuccessCheckSisaDana: boolean) => void

  listSyncAnggaran: ParamAnggaranType[]
  setListSyncAnggaran: (listSyncAnggaran: ParamAnggaranType[]) => void

  anggaranTanggalPengajuan: string
  setAnggaranTanggalPengajuan: (anggaranTanggalPengajuan: string) => void
}

export const useAnggaranStore = create<AnggaranStates>((set) => ({
  tempDetailKertasKerja: null,
  setTempDetailKertasKerja: (tempDetailKertasKerja) =>
    set(() => ({ tempDetailKertasKerja })),

  responseMengulas: null,
  setResponseMengulas: (responseMengulas) => set(() => ({ responseMengulas })),

  alertMengulas: false,
  setAlertMengulas: (alertMengulas) => set(() => ({ alertMengulas })),

  penanggungJawab: null,
  setPenanggungJawab: (penanggungJawab) => set(() => ({ penanggungJawab })),

  penanggungJawabTemp: null,
  setPenanggungJawabTemp: (penanggungJawabTemp) =>
    set(() => ({ penanggungJawabTemp })),

  pagu: null,
  setPagu: (pagu) => set(() => ({ pagu })),

  paguTemp: null,
  setPaguTemp: (paguTemp) => set(() => ({ paguTemp })),

  isFocused: false,
  setIsFocused: (isFocused) => set(() => ({ isFocused })),

  isAfterCheckSisaDana: false,
  setIsAfterCheckSisaDana: (isAfterCheckSisaDana) =>
    set(() => ({ isAfterCheckSisaDana })),

  isSuccessCheckSisaDana: false,
  setIsSuccessCheckSisaDana: (isSuccessCheckSisaDana) =>
    set(() => ({ isSuccessCheckSisaDana })),

  listSyncAnggaran: [],
  setListSyncAnggaran: (listSyncAnggaran) => set(() => ({ listSyncAnggaran })),

  anggaranTanggalPengajuan: '',
  setAnggaranTanggalPengajuan: (anggaranTanggalPengajuan) =>
    set(() => ({ anggaranTanggalPengajuan })),
}))
