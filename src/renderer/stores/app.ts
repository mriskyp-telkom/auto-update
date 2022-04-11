import create, { State } from 'zustand'

export interface AppStates extends State {
  token: string
  alertNoConnection: boolean
  alertLostConnection: boolean
  alertFailedSyncData: boolean
  alertFailedGetToken: boolean
  alertFailedInitSync: boolean
  alertFailedPostAnggaran: boolean
  alertFailedPostPenjab: boolean
  alertFailedPostRkas: boolean
  alertFailedPostRkasDetail: boolean
  alertFailedPostRkasPtk: boolean
  alertFailedPostRkasFinal: boolean
  versi: string
  hddvol: string
  setToken: (token: string) => void
  setAlertNoConnection: (alertNoConnection: boolean) => void
  setAlertLostConnection: (alertLostConnection: boolean) => void
  setAlertFailedSyncData: (alertFailedSyncData: boolean) => void
  setAlertFailedGetToken: (alertFailedGetToken: boolean) => void
  setAlertFailedInitSync: (alertFailedInitSync: boolean) => void
  setAlertFailedPostAnggaran: (alertFailedPostAnggaran: boolean) => void
  setAlertFailedPostPenjab: (alertFailedPostPenjab: boolean) => void
  setAlertFailedPostRkas: (alertFailedPostRkas: boolean) => void
  setAlertFailedPostRkasDetail: (alertFailedPostRkasDetail: boolean) => void
  setAlertFailedPostRkasPtk: (alertFailedPostRkasPtk: boolean) => void
  setAlertFailedPostRkasFinal: (alertFailedPostRkasFinal: boolean) => void
  setVersi: (versi: string) => void
  setHddvol: (hddvol: string) => void
}

export const useAppStore = create<AppStates>((set) => ({
  alertNoConnection: false,
  alertLostConnection: false,
  alertFailedSyncData: false,
  alertFailedGetToken: false,
  alertFailedInitSync: false,
  alertFailedPostAnggaran: false,
  alertFailedPostPenjab: false,
  alertFailedPostRkas: false,
  alertFailedPostRkasDetail: false,
  alertFailedPostRkasPtk: false,
  alertFailedPostRkasFinal: false,
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
  setAlertFailedPostAnggaran: (alertFailedPostAnggaran) =>
    set(() => ({alertFailedPostAnggaran})),
  setAlertFailedPostPenjab: (alertFailedPostPenjab) =>
    set(() => ({alertFailedPostPenjab})),
  setAlertFailedPostRkas: (alertFailedPostRkas) =>
    set(() => ({alertFailedPostRkas})),
  setAlertFailedPostRkasDetail: (alertFailedPostRkasDetail) =>
    set(() => ({alertFailedPostRkasDetail})),
  setAlertFailedPostRkasPtk: (alertFailedPostRkasPtk) =>
    set(() => ({alertFailedPostRkasPtk})),
  setAlertFailedPostRkasFinal: (alertFailedPostRkasFinal) =>
    set(() => ({alertFailedPostRkasFinal})),
  setVersi: (versi) => set(() => ({ versi })),
  setHddvol: (hddvol) => set(() => ({ hddvol })),
}))
