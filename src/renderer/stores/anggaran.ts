import create, { State } from 'zustand'

export interface AnggaranStates extends State {
  createKertasKerja: boolean
  confirmKertasKerja: boolean
  isiKertasKerja: boolean
  setCreateKertasKerja: (createKertasKerja: boolean) => void
  setConfirmKertasKerja: (confirmKertasKerja: boolean) => void
  setIsiKertasKerja: (isiKertasKerja: boolean) => void
}

export const useAnggaranStore = create<AnggaranStates>((set) => ({
  createKertasKerja: false,
  confirmKertasKerja: false,
  isiKertasKerja: false,
  setCreateKertasKerja: (createKertasKerja) =>
    set(() => ({ createKertasKerja })),
  setConfirmKertasKerja: (confirmKertasKerja) =>
    set(() => ({ confirmKertasKerja })),
  setIsiKertasKerja: (isiKertasKerja) => set(() => ({ isiKertasKerja })),
}))
