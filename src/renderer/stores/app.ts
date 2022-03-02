import create, { State } from 'zustand'

export interface AppStates extends State {
  token: string
  alertNoConnection: boolean
  setToken: (token: string) => void
  setAlertNoConnection: (alertNoConnection: boolean) => void
}

export const useAppStore = create<AppStates>((set) => ({
  alertNoConnection: false,
  token: '',
  setToken: (token) => set(() => ({ token })),
  setAlertNoConnection: (alertNoConnection) =>
    set(() => ({ alertNoConnection })),
}))
