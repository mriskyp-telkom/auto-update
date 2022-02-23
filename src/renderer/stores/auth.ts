import create, { State } from 'zustand'

export interface AuthStates extends State {
  syncLogin: boolean
  setSyncLogin: (syncLogin: boolean) => void
}

export const useAuthStore = create<AuthStates>((set) => ({
  syncLogin: false,
  setSyncLogin: (syncLogin) => set(() => ({ syncLogin })),
}))
