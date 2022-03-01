import create, { State } from 'zustand'

export interface AuthStates extends State {
  syncLogin: boolean
  npsn: string
  tahunAktif: string
  koreg: string
  email: string
  isMultipleDevice: boolean
  setSyncLogin: (syncLogin: boolean) => void
  setNpsn: (npsn: string) => void
  setTahunAktif: (tahunAktif: string) => void
  setKoreg: (koreg: string) => void
  setEmail: (email: string) => void
  setMultipleDevice: (isMultipleDevice: boolean) => void
}

export const useAuthStore = create<AuthStates>((set) => ({
  syncLogin: false,
  npsn: '',
  tahunAktif: '',
  koreg: '',
  email: '',
  isMultipleDevice: false,
  setSyncLogin: (syncLogin) => set(() => ({ syncLogin })),
  setNpsn: (npsn) => set(() => ({ npsn })),
  setTahunAktif: (tahunAktif) => set(() => ({ tahunAktif })),
  setKoreg: (koreg) => set(() => ({ koreg })),
  setEmail: (email) => set(() => ({ email })),
  setMultipleDevice: (isMultipleDevice) => set(() => ({ isMultipleDevice })),
}))
