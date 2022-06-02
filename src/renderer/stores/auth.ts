import create, { State } from 'zustand'

export interface AuthStates extends State {
  syncLogin: boolean
  setSyncLogin: (syncLogin: boolean) => void

  npsn: string
  setNpsn: (npsn: string) => void

  tahunAktif: string
  setTahunAktif: (tahunAktif: string) => void

  koreg: string
  setKoreg: (koreg: string) => void

  email: string
  setEmail: (email: string) => void

  isMultipleDevice: boolean
  setMultipleDevice: (isMultipleDevice: boolean) => void

  // boolean step api state
  isSuccessSyncInfoConnection: boolean
  setFlagSyncInfoConnection: (isSuccessSyncInfoConnection: boolean) => void

  isSuccessSyncToken: boolean
  setFlagSyncToken: (isSuccessSyncToken: boolean) => void
}

export const useAuthStore = create<AuthStates>((set) => ({
  syncLogin: false,
  setSyncLogin: (syncLogin) => set(() => ({ syncLogin })),

  npsn: '',
  setNpsn: (npsn) => set(() => ({ npsn })),

  tahunAktif: '',
  setTahunAktif: (tahunAktif) => set(() => ({ tahunAktif })),

  koreg: '',
  setKoreg: (koreg) => set(() => ({ koreg })),

  email: '',
  setEmail: (email) => set(() => ({ email })),

  isMultipleDevice: false,
  setMultipleDevice: (isMultipleDevice) => set(() => ({ isMultipleDevice })),

  // boolean step api state
  isSuccessSyncInfoConnection: false,
  setFlagSyncInfoConnection: (isSuccessSyncInfoConnection) =>
    set(() => ({ isSuccessSyncInfoConnection })),

  isSuccessSyncToken: false,
  setFlagSyncToken: (isSuccessSyncToken) => set(() => ({ isSuccessSyncToken })),
}))
