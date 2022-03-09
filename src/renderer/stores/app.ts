import create, { State } from 'zustand'

export interface AppStates extends State {
  token: string
  alertNoConnection: boolean
  alertLostConnection: boolean
  alertFailedSyncData: boolean
  setToken: (token: string) => void
  setAlertNoConnection: (alertNoConnection: boolean) => void
  setAlertLostConnection: (alertLostConnection: boolean) => void
  setAlertFailedSyncData: (alertFailedSyncData: boolean) => void
}

export const useAppStore = create<AppStates>((set) => ({
  alertNoConnection: false,
  alertLostConnection: false,
  alertFailedSyncData: false,
  token: '',
  setToken: (token) => set(() => ({ token })),
  setAlertNoConnection: (alertNoConnection) =>
    set(() => ({ alertNoConnection })),
  setAlertLostConnection: (alertLostConnection) =>
    set(() => ({ alertLostConnection })),
  setAlertFailedSyncData: (alertFailedSyncData) =>
    set(() => ({ alertFailedSyncData })),
}))
