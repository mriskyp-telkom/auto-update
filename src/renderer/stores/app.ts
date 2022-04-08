import create, { State } from 'zustand'

export interface AppStates extends State {
  token: string
  alertNoConnection: boolean
  alertLostConnection: boolean
  alertFailedSyncData: boolean
  alertFailedGetToken: boolean
  alertFailedInitSync: boolean
  versi: string
  hddvol: string
  setToken: (token: string) => void
  setAlertNoConnection: (alertNoConnection: boolean) => void
  setAlertLostConnection: (alertLostConnection: boolean) => void
  setAlertFailedSyncData: (alertFailedSyncData: boolean) => void
  setAlertFailedGetToken: (alertFailedGetToken: boolean) => void
  setAlertFailedInitSync: (alertFailedInitSync: boolean) => void
  setVersi: (versi: string) => void
  setHddvol: (hddvol: string) => void
}

export const useAppStore = create<AppStates>((set) => ({
  alertNoConnection: false,
  alertLostConnection: false,
  alertFailedSyncData: false,
  alertFailedGetToken: false,
  alertFailedInitSync: false,
  token: '',
  versi: '',
  hddvol: '',
  setToken: (token) => set(() => ({ token })),
  setAlertNoConnection: (alertNoConnection) =>
  set(() => ({ alertNoConnection })),
  setAlertLostConnection: (alertLostConnection) =>
  set(() => ({ alertLostConnection })),
  setAlertFailedSyncData: (alertFailedSyncData) =>
  set(() => ({ alertFailedSyncData })),
  setAlertFailedGetToken: (alertFailedGetToken) =>
  set(() => ({alertFailedGetToken})),
  setAlertFailedInitSync: (alertFailedInitSync) =>
  set(() => ({alertFailedInitSync})),
  setVersi: (versi) => set(() => ({ versi })),
  setHddvol: (hddvol) => set(() => ({ hddvol })),
}))
