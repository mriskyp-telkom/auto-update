import create, { State } from 'zustand'

export interface TataUsahaStates extends State {
  isActivationBKUFailed: boolean
  setIsActivationBKUFailed: (isActivationBKUFailed: boolean) => void
}

export const useTataUsahaStore = create<TataUsahaStates>((set) => ({
  isActivationBKUFailed: false,
  setIsActivationBKUFailed: (isActivationBKUFailed) =>
    set(() => ({ isActivationBKUFailed })),
}))
