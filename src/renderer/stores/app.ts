import create, { State } from 'zustand'

export interface AppStates extends State {
  token: string
  setToken: (token: string) => void

  alertNoConnection: boolean
  setAlertNoConnection: (alertNoConnection: boolean) => void

  alertLostConnection: boolean
  setAlertLostConnection: (alertLostConnection: boolean) => void

  alertFailedSyncData: boolean
  setAlertFailedSyncData: (alertFailedSyncData: boolean) => void
}

export const useAppStore = create<AppStates>((set) => ({
  alertNoConnection: false,
  setAlertNoConnection: (alertNoConnection) =>
    set(() => ({ alertNoConnection })),

  alertLostConnection: false,
  setAlertLostConnection: (alertLostConnection) =>
    set(() => ({ alertLostConnection })),

  alertFailedSyncData: false,
  setAlertFailedSyncData: (alertFailedSyncData) =>
    set(() => ({ alertFailedSyncData })),

  token: '',
  setToken: (token) => set(() => ({ token })),
}))
