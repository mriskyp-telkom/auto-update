import create, { State } from 'zustand'

import { FormIsiKertasKerjaData } from 'renderer/types/AnggaranType'

export interface AnggaranStates extends State {
  createKertasKerja: boolean
  confirmKertasKerja: boolean
  tempDetailKertasKerja: FormIsiKertasKerjaData
  setCreateKertasKerja: (createKertasKerja: boolean) => void
  setConfirmKertasKerja: (confirmKertasKerja: boolean) => void
  setTempDetailKertasKerja: (
    tempDetailKertasKerja: FormIsiKertasKerjaData
  ) => void
}

export const useAnggaranStore = create<AnggaranStates>((set) => ({
  createKertasKerja: false,
  confirmKertasKerja: false,
  tempDetailKertasKerja: null,
  setCreateKertasKerja: (createKertasKerja) =>
    set(() => ({ createKertasKerja })),
  setConfirmKertasKerja: (confirmKertasKerja) =>
    set(() => ({ confirmKertasKerja })),
  setTempDetailKertasKerja: (tempDetailKertasKerja) =>
    set(() => ({ tempDetailKertasKerja })),
}))
