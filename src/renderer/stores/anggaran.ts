import create, { State } from 'zustand'

import {
  FormPagu,
  FormPenanggungJawab,
  ResponseMengulas,
  FormTableKertasKerjaData,
} from 'renderer/types/AnggaranType'

export interface AnggaranStates extends State {
  tempDetailKertasKerja: FormTableKertasKerjaData
  alertMengulas: boolean
  responseMengulas: ResponseMengulas
  penanggungJawab: FormPenanggungJawab
  penanggungJawabTemp: FormPenanggungJawab
  pagu: FormPagu
  paguTemp: FormPagu
  setTempDetailKertasKerja: (
    tempDetailKertasKerja: FormTableKertasKerjaData
  ) => void
  setAlertMengulas: (alertMengulas: boolean) => void
  setResponseMengulas: (responseMengulas: ResponseMengulas) => void
  setPenanggungJawab: (penanggungJawab: FormPenanggungJawab) => void
  setPenanggungJawabTemp: (penanggungJawab: FormPenanggungJawab) => void
  setPagu: (pagu: FormPagu) => void
  setPaguTemp: (paguTemp: FormPagu) => void
}

export const useAnggaranStore = create<AnggaranStates>((set) => ({
  tempDetailKertasKerja: null,
  responseMengulas: null,
  alertMengulas: false,
  penanggungJawab: null,
  penanggungJawabTemp: null,
  pagu: null,
  paguTemp: null,
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
