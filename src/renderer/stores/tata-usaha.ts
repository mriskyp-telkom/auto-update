import { Penerimaan } from 'renderer/types/apis/UtilType'
import create, { State } from 'zustand'

export interface TataUsahaStates extends State {
  isActivationBKUFailed: boolean
  setIsActivationBKUFailed: (isActivationBKUFailed: boolean) => void
  periodeSalurList: Penerimaan[]
  setPeriodeSalurList: (periodeSalurList: Penerimaan[]) => void
}

export const useTataUsahaStore = create<TataUsahaStates>((set) => ({
  isActivationBKUFailed: false,
  setIsActivationBKUFailed: (isActivationBKUFailed) =>
    set(() => ({ isActivationBKUFailed })),

  periodeSalurList: [],
  setPeriodeSalurList: (periodeSalurList) =>
    set(() => ({
      periodeSalurList,
    })),
}))
