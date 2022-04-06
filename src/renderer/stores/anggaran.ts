import create, { State } from 'zustand'

import {
  FormIsiKertasKerjaData,
  FormPagu,
  FormPenanggungJawab,
  ResponseMengulas,
} from 'renderer/types/AnggaranType'

export interface AnggaranStates extends State {
  createKertasKerja: boolean
  confirmKertasKerja: boolean
  tempDetailKertasKerja: FormIsiKertasKerjaData
  alertMengulas: boolean
  responseMengulas: ResponseMengulas
  penanggungJawab: FormPenanggungJawab
  penanggungJawabTemp: FormPenanggungJawab
  pagu: FormPagu
  paguTemp: FormPagu
  setCreateKertasKerja: (createKertasKerja: boolean) => void
  setConfirmKertasKerja: (confirmKertasKerja: boolean) => void
  setTempDetailKertasKerja: (
    tempDetailKertasKerja: FormIsiKertasKerjaData
  ) => void
  setAlertMengulas: (alertMengulas: boolean) => void
  setResponseMengulas: (responseMengulas: ResponseMengulas) => void
  setPenanggungJawab: (penanggungJawab: FormPenanggungJawab) => void
  setPenanggungJawabTemp: (penanggungJawab: FormPenanggungJawab) => void
  setPagu: (pagu: FormPagu) => void
  setPaguTemp: (paguTemp: FormPagu) => void
}

export const useAnggaranStore = create<AnggaranStates>((set) => ({
  createKertasKerja: false,
  confirmKertasKerja: false,
  tempDetailKertasKerja: null,
  responseMengulas: null,
  alertMengulas: false,
  penanggungJawab: null,
  penanggungJawabTemp: null,
  pagu: null,
  paguTemp: null,
  setCreateKertasKerja: (createKertasKerja) =>
    set(() => ({ createKertasKerja })),
  setConfirmKertasKerja: (confirmKertasKerja) =>
    set(() => ({ confirmKertasKerja })),
  setTempDetailKertasKerja: (tempDetailKertasKerja) =>
    set(() => ({ tempDetailKertasKerja })),
  setAlertMengulas: (alertMengulas) => set(() => ({ alertMengulas })),
  setResponseMengulas: (responseMengulas) => set(() => ({ responseMengulas })),
  setPenanggungJawab: (penanggungJawab) => set(() => ({ penanggungJawab })),
  setPenanggungJawabTemp: (penanggungJawabTemp) =>
    set(() => ({ penanggungJawabTemp })),
  setPagu: (pagu) => set(() => ({ pagu })),
  setPaguTemp: (paguTemp) => set(() => ({ paguTemp })),
}))
