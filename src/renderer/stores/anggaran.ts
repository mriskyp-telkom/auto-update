import create, { State } from 'zustand'

import {
  FormIsiKertasKerjaData,
  ResponseMengulas,
} from 'renderer/types/AnggaranType'

export interface AnggaranStates extends State {
  createKertasKerja: boolean
  confirmKertasKerja: boolean
  tempDetailKertasKerja: FormIsiKertasKerjaData
  alertMengulas: boolean
  responseMengulas: ResponseMengulas
  setCreateKertasKerja: (createKertasKerja: boolean) => void
  setConfirmKertasKerja: (confirmKertasKerja: boolean) => void
  setTempDetailKertasKerja: (
    tempDetailKertasKerja: FormIsiKertasKerjaData
  ) => void
  setAlertMengulas: (alertMengulas: boolean) => void
  setResponseMengulas: (responseMengulas: ResponseMengulas) => void
}

export const useAnggaranStore = create<AnggaranStates>((set) => ({
  createKertasKerja: false,
  confirmKertasKerja: false,
  tempDetailKertasKerja: null,
  responseMengulas: null,
  alertMengulas: false,
  setCreateKertasKerja: (createKertasKerja) =>
    set(() => ({ createKertasKerja })),
  setConfirmKertasKerja: (confirmKertasKerja) =>
    set(() => ({ confirmKertasKerja })),
  setTempDetailKertasKerja: (tempDetailKertasKerja) =>
    set(() => ({ tempDetailKertasKerja })),
  setAlertMengulas: (alertMengulas) => set(() => ({ alertMengulas })),
  setResponseMengulas: (responseMengulas) => set(() => ({ responseMengulas })),
}))
