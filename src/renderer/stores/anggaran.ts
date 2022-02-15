import create, { State } from 'zustand'

export interface AnggaranStates extends State {
  createKertasKerja: boolean
  confirmKertasKerja: boolean
  setCreateKertasKerja: (createKertasKerja: boolean) => void
  setConfirmKertasKerja: (confirmKertasKerja: boolean) => void
}

export const useAnggaranStore = create<AnggaranStates>((set) => ({
  createKertasKerja: false,
  confirmKertasKerja: false,
  setCreateKertasKerja: (createKertasKerja) =>
    set(() => ({ createKertasKerja })),
  setConfirmKertasKerja: (confirmKertasKerja) =>
    set(() => ({ confirmKertasKerja })),
}))
