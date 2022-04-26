import {
  ParamRkasPenjabType,
  ParamRkasPtkType,
  ParamRkasType,
  ParamRkasDetailType,
} from './../types/apis/RkasType'
import create, { State } from 'zustand'

export interface RkasStates extends State {
  idSekolah: string
  setIdSekolah: (idSekolah: string) => void

  idPenjab: string
  setIdPenjab: (idPenjab: string) => void

  listIdRapbs: string[]
  setListIdRapbs: (listIdRapbs: string[]) => void

  listSyncRkasPenjab: ParamRkasPenjabType[]
  setListSyncRkasPenjab: (listSyncRkasPenjab: ParamRkasPenjabType[]) => void

  listSyncRkas: ParamRkasType[]
  setListSyncRkas: (listSyncRkas: ParamRkasType[]) => void

  listSyncRkasPtk: ParamRkasPtkType[]
  setListSyncRkasPtk: (listSyncRkasPtk: ParamRkasPtkType[]) => void

  listSyncRkasDetail: ParamRkasDetailType[]
  setListSyncRkasDetail: (listSyncRkasPtk: ParamRkasDetailType[]) => void

  // boolean step api state
  isSuccessSyncAnggaran: boolean
  setFlagSyncAnggaran: (isSuccessSyncAnggaran: boolean) => void

  isSuccessRkasPenjab: boolean
  setFlagRkasPenjab: (isSuccessRkasPenjab: boolean) => void

  isSuccessRkas: boolean
  setFlagRkas: (isSuccessRkas: boolean) => void

  isSuccessRkasDetail: boolean
  setFlagRkasDetail: (isSuccessRkasDetail: boolean) => void

  isSuccessRkasPtk: boolean
  setFlagRkasPtk: (isSuccessRkasPtk: boolean) => void

  isSuccessRkasFinal: boolean
  setFlagRkasFinal: (isSuccessRkasFinal: boolean) => void
}

export const useRkasStore = create<RkasStates>((set) => ({
  idSekolah: '',
  setIdSekolah: (idSekolah) => set(() => ({ idSekolah })),

  idPenjab: '',
  setIdPenjab: (idPenjab) => set(() => ({ idPenjab })),

  listIdRapbs: [],
  setListIdRapbs: (listIdRapbs) => set(() => ({ listIdRapbs })),

  listSyncRkasPenjab: [],
  setListSyncRkasPenjab: (listSyncRkasPenjab) =>
    set(() => ({ listSyncRkasPenjab })),

  listSyncRkas: [],
  setListSyncRkas: (listSyncRkas) => set(() => ({ listSyncRkas })),

  listSyncRkasPtk: [],
  setListSyncRkasPtk: (listSyncRkasPtk) => set(() => ({ listSyncRkasPtk })),

  listSyncRkasDetail: [],
  setListSyncRkasDetail: (listSyncRkasDetail) =>
    set(() => ({ listSyncRkasDetail })),

  // flag step api
  isSuccessSyncAnggaran: false,
  setFlagSyncAnggaran: (isSuccessSyncAnggaran) =>
    set(() => ({ isSuccessSyncAnggaran })),

  isSuccessRkasPenjab: false,
  setFlagRkasPenjab: (isSuccessRkasPenjab) =>
    set(() => ({ isSuccessRkasPenjab })),

  isSuccessRkas: false,
  setFlagRkas: (isSuccessRkas) => set(() => ({ isSuccessRkas })),

  isSuccessRkasDetail: false,
  setFlagRkasDetail: (isSuccessRkasDetail) =>
    set(() => ({ isSuccessRkasDetail })),

  isSuccessRkasPtk: false,
  setFlagRkasPtk: (isSuccessRkasPtk) => set(() => ({ isSuccessRkasPtk })),

  isSuccessRkasFinal: false,
  setFlagRkasFinal: (isSuccessRkasFinal) => set(() => ({ isSuccessRkasFinal })),
}))
