import create, { State } from 'zustand'

export interface SyncStates extends State {
  dateTimeLocal: string
  setDateTimeLocal: (dateTimeLocal: string) => void

  typeSession: string
  setTypeSession: (typeSession: string) => void

  versi: string
  setVersi: (versi: string) => void

  isSuccessSync: boolean
  setFlagSync: (isSuccessSync: boolean) => void
}

export const useSyncStore = create<SyncStates>((set) => ({
  dateTimeLocal: '',
  setDateTimeLocal: (dateTimeLocal) => set(() => ({ dateTimeLocal })),

  typeSession: '',
  setTypeSession: (typeSession) => set(() => ({ typeSession })),

  versi: '',
  setVersi: (versi) => set(() => ({ versi })),

  isSuccessSync: false,
  setFlagSync: (isSuccessSync) => set(() => ({ isSuccessSync })),
}))
