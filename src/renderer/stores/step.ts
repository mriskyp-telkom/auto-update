import create, { State } from 'zustand'

// only use for state that will handle config step api
export interface StepStates extends State {
  isSuccessStepApi: boolean
  setIsSuccessStepApi: (isSuccessStepApi: boolean) => void

  isSuccessStepSyncApi: boolean
  setIsSuccessStepSyncApi: (isSuccessStepSyncApi: boolean) => void

  isStepApiFlowSuccess: boolean
  setFlagStepApiFlowSuccess: (isStepApiFlowSuccess: boolean) => void

  isFoundUndefinedStepApi: boolean
  setFlagFoundUndefinedStepApi: (isFoundUndefinedStepApi: boolean) => void

  isChangeStep: boolean
  setChangeStep: (isChangeStep: boolean) => void

  isFirstStep: boolean
  setFirstStep: (isFirstStep: boolean) => void

  isChangeSyncStep: boolean
  setChangeSyncStep: (isChangeSyncStep: boolean) => void

  isFirstSyncStep: boolean
  setFirstSyncStep: (isFirstSyncStep: boolean) => void
}

export const useStepStore = create<StepStates>((set) => ({
  isSuccessStepApi: false,
  setIsSuccessStepApi: (isSuccessStepApi) => set(() => ({ isSuccessStepApi })),

  isSuccessStepSyncApi: false,
  setIsSuccessStepSyncApi: (isSuccessStepSyncApi) =>
    set(() => ({ isSuccessStepSyncApi })),

  isStepApiFlowSuccess: false,
  setFlagStepApiFlowSuccess: (isStepApiFlowSuccess) =>
    set(() => ({ isStepApiFlowSuccess })),

  isFoundUndefinedStepApi: false,
  setFlagFoundUndefinedStepApi: (isFoundUndefinedStepApi) =>
    set(() => ({ isFoundUndefinedStepApi })),

  isChangeStep: false,
  setChangeStep: (isChangeStep) => set(() => ({ isChangeStep })),

  isFirstStep: false,
  setFirstStep: (isFirstStep) => set(() => ({ isFirstStep })),

  isChangeSyncStep: false,
  setChangeSyncStep: (isChangeSyncStep) => set(() => ({ isChangeSyncStep })),

  isFirstSyncStep: false,
  setFirstSyncStep: (isFirstSyncStep) => set(() => ({ isFirstSyncStep })),
}))
