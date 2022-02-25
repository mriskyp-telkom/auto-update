import create, { State } from 'zustand'

export interface AppStates extends State {
  token: string
  setToken: (token: string) => void
}

export const useAppStore = create<AppStates>((set) => ({
  token: '',
  setToken: (token) => set(() => ({ token })),
}))
