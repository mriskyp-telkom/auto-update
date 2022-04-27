import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { AnggaranStates, useAnggaranStore } from 'renderer/stores/anggaran'
import { AppStates, useAppStore } from 'renderer/stores/app'
import { AuthStates, useAuthStore } from 'renderer/stores/auth'
import { RkasStates, useRkasStore } from 'renderer/stores/rkas'
import { StepStates, useStepStore } from 'renderer/stores/step'
import { SyncStates, useSyncStore } from 'renderer/stores/sync'

import { SetterAnggaranParam } from 'renderer/views/Anggaran/MengulasKertasKerjaView/helper/AnggaranMapper'

import {
  SetterRkasPenjabParam,
  SetterRkasParam,
  SetterBulkRapbs,
  MapperRkasDetailParam,
  MapperRkasPtkParam,
} from 'renderer/views/Anggaran/MengulasKertasKerjaView/helper/RkasMapper'

import { ParamAnggaranType } from 'renderer/types/apis/AnggaranType'

import {
  APP_CONFIG,
  APP_VERSION,
  TYPE_SESSION,
} from 'renderer/constants/appConfig'

import { useAPIGetToken } from 'renderer/apis/token'
import { useAPIInfoConnection } from 'renderer/apis/utils'
import { useAPIGetReferensi } from 'renderer/apis/referensi'
import { useAPISync } from 'renderer/apis/sync'
import { useAPIAnggaranSync } from 'renderer/apis/anggaran'
import {
  useAPIRKASDetailSync,
  useAPIRKASFinalSync,
  useAPIRKASPenjabSync,
  useAPIRKASPtkSync,
  useAPIRKASSync,
} from 'renderer/apis/rkas'

import SyncDialogComponent from 'renderer/components/Dialog/SyncDialogComponent'

import { RESPONSE_PENGESAHAN } from 'renderer/constants/anggaran'

import { ResponseMengulas } from 'renderer/types/AnggaranType'

import {
  IPC_ANGGARAN,
  IPC_KK,
  IPC_PENJAB,
  IPC_PTK,
  IPC_RAPBS,
} from 'global/ipc'

import { STATUS_INVALID_PENGESAHAN } from 'global/constants'

import { ParamRkasPenjabType } from 'renderer/types/apis/RkasType'

// due import crypto utils
import CommonUtils from '../../../../main/utils/CommonUtils'

const ipcRenderer = window.require('electron').ipcRenderer

const stepApi = [
  'infoConnection',
  'getToken',
  'refKode',
  'refRekening',
  'refBarang',
]

/** TO DO
 *  **GET** /api/utils/info_connection
 *  **GET** /token
 *  **POST** /api/sync/init
 *  **POST** /api/anggaran
 *  **POST** /api/rkas/penjab
 *  **POST** /api/rkas
 *  **POST** /api/rkas/detail
 *  **POST** /api/rkas/Ptk
 *  **POST** api/rkas/final
 */
const stepSyncApi = [
  'infoConnection',
  'getToken',
  'syncInit',
  'anggaran',
  'rkasPenjab',
  'rkas',
  'rkasDetail',
  'rkasPtk',
  'rkasFinal',
]

const SyncMengulasKertasKerjaView: FC = () => {
  const { q_id_anggaran } = useParams()

  // ambil rapbs dari id anggaran
  const idAnggaran = decodeURIComponent(q_id_anggaran)

  const navigate = useNavigate()
  const [api, setApi] = useState('')
  const [apiSync, setApiSync] = useState('')

  // step sync init
  const syncTypeSession = useSyncStore((state: SyncStates) => state.typeSession)
  const syncVersi = useSyncStore((state: SyncStates) => state.versi)

  const syncDateTimeLocal = useSyncStore(
    (state: SyncStates) => state.dateTimeLocal
  )

  const setTypeSession = useSyncStore(
    (state: SyncStates) => state.setTypeSession
  )
  const setVersi = useSyncStore((state: SyncStates) => state.setVersi)

  // step sync anggaran
  const syncListAnggaran = useAnggaranStore(
    (state: AnggaranStates) => state.listSyncAnggaran
  )
  const setListSyncAnggaran = useAnggaranStore(
    (state: AnggaranStates) => state.setListSyncAnggaran
  )

  const isChangeStep = useStepStore((state: StepStates) => state.isChangeStep)

  const setChangeStep = useStepStore((state: StepStates) => state.setChangeStep)

  const isChangeSyncStep = useStepStore(
    (state: StepStates) => state.isChangeSyncStep
  )

  const setChangeSyncStep = useStepStore(
    (state: StepStates) => state.setChangeSyncStep
  )

  const isFirstStep = useStepStore((state: StepStates) => state.isFirstStep)

  const setFirstStep = useStepStore((state: StepStates) => state.setFirstStep)

  const isFirstSyncStep = useStepStore(
    (state: StepStates) => state.isFirstSyncStep
  )

  const setFirstSyncStep = useStepStore(
    (state: StepStates) => state.setFirstSyncStep
  )

  const isSuccessSyncInfoConnection = useAuthStore(
    (state: AuthStates) => state.isSuccessSyncInfoConnection
  )

  const isSuccessSyncToken = useAuthStore(
    (state: AuthStates) => state.isSuccessSyncToken
  )

  const setFlagSyncToken = useAuthStore(
    (state: AuthStates) => state.setFlagSyncToken
  )

  const isSuccessSync = useSyncStore((state: SyncStates) => state.isSuccessSync)

  const setFlagSync = useSyncStore((state: SyncStates) => state.setFlagSync)

  const isSuccessSyncAnggaran = useRkasStore(
    (state: RkasStates) => state.isSuccessSyncAnggaran
  )

  const setFlagSyncAnggaran = useRkasStore(
    (state: RkasStates) => state.setFlagSyncAnggaran
  )

  const anggaranTanggalPengajuan = useAnggaranStore(
    (state: AnggaranStates) => state.anggaranTanggalPengajuan
  )

  const setAnggaranTanggalPengajuan = useAnggaranStore(
    (state: AnggaranStates) => state.setAnggaranTanggalPengajuan
  )

  // step sync rkas penjab

  const syncIdPenjab = useRkasStore((state: RkasStates) => state.idPenjab)
  const setSyncIdPenjab = useRkasStore((state: RkasStates) => state.setIdPenjab)

  const syncListIdRapbs = useRkasStore((state: RkasStates) => state.listIdRapbs)
  const setSyncListIdRapbs = useRkasStore(
    (state: RkasStates) => state.setListIdRapbs
  )

  const syncListRkasPenjab = useRkasStore(
    (state: RkasStates) => state.listSyncRkasPenjab
  )
  const setListSyncRkasPenjab = useRkasStore(
    (state: RkasStates) => state.setListSyncRkasPenjab
  )
  const isSuccessRkasPenjab = useRkasStore(
    (state: RkasStates) => state.isSuccessRkasPenjab
  )
  const setFlagRkasPenjab = useRkasStore(
    (state: RkasStates) => state.setFlagRkasPenjab
  )

  // step sync rkas
  const syncListRkas = useRkasStore((state: RkasStates) => state.listSyncRkas)
  const setListSyncRkas = useRkasStore(
    (state: RkasStates) => state.setListSyncRkas
  )
  const isSuccessRkas = useRkasStore((state: RkasStates) => state.isSuccessRkas)
  const setFlagRkas = useRkasStore((state: RkasStates) => state.setFlagRkas)

  // step sync rkas detail
  const syncListRkasDetail = useRkasStore(
    (state: RkasStates) => state.listSyncRkasDetail
  )
  const setListSyncRkasDetail = useRkasStore(
    (state: RkasStates) => state.setListSyncRkasDetail
  )
  const isSuccessRkasDetail = useRkasStore(
    (state: RkasStates) => state.isSuccessRkasDetail
  )
  const setFlagRkasDetail = useRkasStore(
    (state: RkasStates) => state.setFlagRkasDetail
  )

  // step sync rkas ptk
  const syncListRkasPtk = useRkasStore(
    (state: RkasStates) => state.listSyncRkasPtk
  )

  const setListSyncRkasPtk = useRkasStore(
    (state: RkasStates) => state.setListSyncRkasPtk
  )

  const isSuccessRkasPtk = useRkasStore(
    (state: RkasStates) => state.isSuccessRkasPtk
  )

  const setFlagRkasPtk = useRkasStore(
    (state: RkasStates) => state.setFlagRkasPtk
  )

  // step sync rkas final
  const isSuccessRkasFinal = useRkasStore(
    (state: RkasStates) => state.isSuccessRkasFinal
  )
  const setFlagRkasFinal = useRkasStore(
    (state: RkasStates) => state.setFlagRkasFinal
  )

  // flow end
  const isSuccessStepSyncApi = useStepStore(
    (state: StepStates) => state.isSuccessStepSyncApi
  )
  const setIsSuccessStepSyncApi = useStepStore(
    (state: StepStates) => state.setIsSuccessStepSyncApi
  )

  ///////////////////////////////////////////////////////////////////////
  /**
   * const sync pengajuan pengesahan
   */

  //////////////////////////////////////////////////////////////////////
  /**
   * const pagu sisa dana and data central
   */

  const npsn = useAuthStore((state: AuthStates) => state.npsn)
  const tahunAktif = useAuthStore((state: AuthStates) => state.tahunAktif)
  const koreg = useAuthStore((state: AuthStates) => state.koreg)

  const setNpsn = useAuthStore((state: AuthStates) => state.setNpsn)
  const setTahunAktif = useAuthStore((state: AuthStates) => state.setTahunAktif)
  const setKoreg = useAuthStore((state: AuthStates) => state.setKoreg)

  const [sekolahId, setSekolahId] = useState(null)
  const [hddVol, setHddVol] = useState(null)
  const [percentage, setPercentage] = useState(0)
  const [percentageValidate, setPercentageValidate] = useState(0)
  const [percentageSync, setPercentageSync] = useState(0)
  const [isPercentageCompleted, setIsPercentageCompleted] = useState(false)

  // attribute setter
  const [lastUpdateKode, setLastUpdateKode] = useState('')
  const [lastUpdateRekening, setLastUpdateRekening] = useState('')
  const [lastUpdateBarang, setLastUpdateBarang] = useState('')

  const isAfterCheckSisaDana = useAnggaranStore(
    (state: AnggaranStates) => state.isAfterCheckSisaDana
  )

  const setIsAfterCheckSisaDana = useAnggaranStore(
    (state: AnggaranStates) => state.setIsAfterCheckSisaDana
  )

  const isSuccessCheckSisaDana = useAnggaranStore(
    (state: AnggaranStates) => state.isSuccessCheckSisaDana
  )

  const setIsSuccessCheckSisaDana = useAnggaranStore(
    (state: AnggaranStates) => state.setIsSuccessCheckSisaDana
  )

  const isSuccessStepApi = useStepStore(
    (state: StepStates) => state.isSuccessStepApi
  )

  // flow end
  const setIsSuccessStepApi = useStepStore(
    (state: StepStates) => state.setIsSuccessStepApi
  )

  const isStepApiFlowSuccess = useStepStore(
    (state: StepStates) => state.isStepApiFlowSuccess
  )

  const setFlagStepApiFlowSuccess = useStepStore(
    (state: StepStates) => state.setFlagStepApiFlowSuccess
  )

  const isFoundUndefinedStepApi = useStepStore(
    (state: StepStates) => state.isFoundUndefinedStepApi
  )

  const setFlagFoundUndefinedStepApi = useStepStore(
    (state: StepStates) => state.setFlagFoundUndefinedStepApi
  )

  ////////////////////////////////////////////////////////////////////////

  const removeCacheData = () => {
    removeInfoConnection()
    removeToken()
    removeRefKode()
    removeRefRekening()
    removeRefBarang()
  }

  const removeCacheSyncData = () => {
    removeInfoSyncConnection()
    removeSyncToken()
    removeSync()
    removeSyncAnggaran()
    removeSyncRkasPenjab()
    removeSyncRkas()
    removeSyncRkasDetail()
    removeSyncRkasPtk()
    removeSyncRkasFinal()
  }

  const closeModal = () => {
    navigate(-1)
  }

  const setAlertMengulas = useAnggaranStore(
    (state: AnggaranStates) => state.setAlertMengulas
  )

  const setResponseMengulas = useAnggaranStore(
    (state: AnggaranStates) => state.setResponseMengulas
  )

  const setToken = useAppStore((state: AppStates) => state.setToken)
  /////////////////////////////////////////////////////////////////////////
  /**
   * const to check sync konfirmasi pengajuan pengesahan
   *
   */

  const {
    // read from api to sync from endpoint
    data: infoSyncConnection,
    isError: isInfoSyncConnError, // alias for isError
    isSuccess: syncInfoConnectionSuccess,
    remove: removeInfoSyncConnection,
  } = useAPIInfoConnection({
    retry: 0,
    enabled: apiSync === stepSyncApi[0] && !isSuccessSyncInfoConnection,
  })

  const {
    // if run only if there are changes. refer to this
    // read from api to sync from endpoint
    data: dataSyncToken,
    isError: isSyncTokenError, // alias for isError
    isSuccess: syncTokenSuccess,
    remove: removeSyncToken,
  } = useAPIGetToken(
    {
      username: `${npsn}${tahunAktif}`,
      password: koreg,
    },
    {
      retry: 0,
      enabled:
        apiSync === stepSyncApi[1] &&
        npsn !== '' &&
        tahunAktif !== '' &&
        koreg !== '' &&
        !isSuccessSyncToken &&
        !isFirstSyncStep,
    }
  )

  const {
    data: dataSync,
    isError: isSyncError, // alias for isError
    isSuccess: syncSuccess,
    remove: removeSync,
  } = useAPISync(
    {
      tahun: tahunAktif,
      kode_registrasi: koreg,
      date_time_local: syncDateTimeLocal,
      sekolah_id: sekolahId,
      versi: syncVersi,
      type_session: syncTypeSession,
      hdd_vol: hddVol,
      npsn: npsn,
    },
    {
      retry: 0,
      enabled:
        apiSync === stepSyncApi[2] &&
        syncTypeSession !== '' &&
        syncVersi !== '' &&
        !isSuccessSync &&
        !isFirstSyncStep,
    }
  )

  const {
    data: dataSyncAnggaran,
    isError: isSyncAnggaranError, // alias for isError
    isSuccess: syncAnggaranSuccess,
    remove: removeSyncAnggaran,
    // error: errorSyncAnggaran,
  } = useAPIAnggaranSync(syncListAnggaran, {
    retry: 0,
    enabled: apiSync === stepSyncApi[3] && !isSuccessSyncAnggaran,
  })

  const {
    data: dataSyncRkasPenjab,
    isError: isSyncRkasPenjabError, // alias for isError
    isSuccess: syncRkasPenjabSuccess,
    remove: removeSyncRkasPenjab,
  } = useAPIRKASPenjabSync(syncListRkasPenjab, {
    retry: 0,
    enabled: apiSync === stepSyncApi[4] && !isSuccessRkasPenjab,
  })

  const {
    data: dataSyncRkas,
    isError: isSyncRkasError, // alias for isError
    isSuccess: syncRkasSuccess,
    remove: removeSyncRkas,
  } = useAPIRKASSync(syncListRkas, {
    retry: 0,
    enabled: apiSync === stepSyncApi[5] && !isSuccessRkas,
  })

  const {
    data: dataSyncRkasDetail,
    isError: isSyncRkasDetailError, // alias for isError
    isSuccess: syncRkasDetailSuccess,
    remove: removeSyncRkasDetail,
  } = useAPIRKASDetailSync(syncListRkasDetail, {
    retry: 0,
    enabled: apiSync === stepSyncApi[6] && !isSuccessRkasDetail,
  })

  const {
    data: dataSyncRkasPtk,
    isError: isSyncRkasPtkError, // alias for isError
    isSuccess: syncRkasPtkSuccess,
    remove: removeSyncRkasPtk,
  } = useAPIRKASPtkSync(syncListRkasPtk, {
    retry: 0,
    enabled: apiSync === stepSyncApi[7] && !isSuccessRkasPtk,
  })

  const {
    data: dataSyncRkasFinal,
    isError: isSyncRkasFinalError, // alias for isError
    isSuccess: syncRkasFinalSuccess,
    remove: removeSyncRkasFinal,
  } = useAPIRKASFinalSync(null, {
    retry: 0,
    enabled: apiSync === stepSyncApi[8] && !isSuccessRkasFinal,
  })

  ////////////////////////////////////////////////////////////////////////

  /**
   *
   * const to check pagu sisa dana and data central
   */
  const {
    // read from api to sync from endpoint
    data: infoConnection,
    isError: isInfoConnError, // alias for isError
    remove: removeInfoConnection,
  } = useAPIInfoConnection({
    retry: 0,
    enabled: api === stepApi[0] && !isFirstStep && !isChangeStep,
  })

  const {
    // if run only if there are changes. refer to this
    // read from api to sync from endpoint
    data: dataToken,
    isError: isTokenError, // alias for isError
    remove: removeToken,
  } = useAPIGetToken(
    {
      username: `${npsn}${tahunAktif}`,
      password: koreg,
    },
    {
      retry: 0,
      enabled:
        api === stepApi[1] &&
        npsn !== '' &&
        tahunAktif !== '' &&
        koreg !== '' &&
        !isFirstStep &&
        !isChangeStep,
    }
  )

  const {
    // read from api to sync from endpoint
    data: dataRefKode,
    isError: isGetRefKodeError, // alias for isError
    remove: removeRefKode,
  } = useAPIGetReferensi(
    { referensi: 'kode', lastUpdate: lastUpdateKode },
    {
      enabled: api === stepApi[2] && lastUpdateKode !== '' && !isChangeStep,
      retry: 0,
    }
  )
  const {
    // read from api to sync from endpoint
    data: dataRefRekening,
    isError: isGetRefRekeningError, // alias for isError
    remove: removeRefRekening,
  } = useAPIGetReferensi(
    { referensi: 'rekening', lastUpdate: lastUpdateRekening },
    {
      enabled: api === stepApi[3] && lastUpdateRekening !== '' && !isChangeStep,
    }
  )
  const {
    // read from api to sync from endpoint
    data: dataRefBarang,
    isError: isGetRefBarangError, // alias for isError
    remove: removeRefBarang,
  } = useAPIGetReferensi(
    { referensi: 'barang', lastUpdate: lastUpdateBarang },
    { enabled: api === stepApi[4] && lastUpdateBarang !== '' && !isChangeStep }
  )

  const directPage = (response: ResponseMengulas) => {
    if (response === RESPONSE_PENGESAHAN.success) {
      closeModal()
    } else {
      navigate(`/anggaran/menyusun/update/${encodeURIComponent(q_id_anggaran)}`)
    }
  }

  const failedSyncData = () => {
    const response = RESPONSE_PENGESAHAN.failed_sync_data as ResponseMengulas
    directPage(response)
    setResponseMengulas(response)
    removeCacheSyncData()
    setAlertMengulas(true)
  }

  // use renderer when reading from sql lite
  const checkSisaDana = () => {
    const pagu = ipcRenderer.sendSync(IPC_ANGGARAN.getPagu, idAnggaran)
    const sisaPagu = pagu?.sisa
    if (sisaPagu > 0) {
      ipcRenderer.sendSync(
        IPC_ANGGARAN.updateIsPengesahan,
        idAnggaran,
        STATUS_INVALID_PENGESAHAN.invalidSisaDana
      )
    }
    return sisaPagu
  }

  ////////////////////////////////////////////////////////////////////////
  /**
   * Use Effect Sync Pengajuan Pengesahan
   *
   */

  useEffect(() => {
    if (!isFirstSyncStep) {
      if (isSuccessStepApi && infoSyncConnection) {
        if (Number(infoSyncConnection.data) === 1) {
          if (syncInfoConnectionSuccess && !syncTokenSuccess) {
            setApiSync(stepSyncApi[1])
          }
        } else {
          failedSyncData()
        }
      }
    }
  }, [
    isSuccessStepApi,
    infoSyncConnection,
    syncInfoConnectionSuccess,
    syncTokenSuccess,
    isFirstSyncStep,
  ])

  useEffect(() => {
    if (!isFirstSyncStep) {
      if (isSuccessStepApi && syncTokenSuccess && dataSyncToken) {
        // result data token save to store
        if (dataSyncToken !== undefined) {
          setFlagSyncToken(true)
          // valid step sync api sync token flow

          setToken(dataSyncToken?.data.access_token)
          // console.log(dataSyncToken?.data.access_token)
          setVersi(APP_VERSION)
          setTypeSession(TYPE_SESSION.pengajuanKK)
          setApiSync(stepSyncApi[2])
        }
      }
    }
  }, [isSuccessStepApi, dataSyncToken, syncTokenSuccess, isFirstSyncStep])

  useEffect(() => {
    if (isSuccessStepApi && syncSuccess && dataSync && !syncAnggaranSuccess) {
      setFirstSyncStep(true)

      if (dataSync !== undefined) {
        setFlagSync(true)

        // valid step sync api sync init flow
        const anggaranData = ipcRenderer.sendSync(
          IPC_ANGGARAN.getAnggaranById,
          idAnggaran
        )
        const param: ParamAnggaranType[] = []
        // set state and replace tanggal pengajuan for param anggaran

        if (anggaranData !== undefined && anggaranData !== null) {
          const anggaranParam = SetterAnggaranParam(anggaranData)
          param.push(anggaranParam)

          setSyncIdPenjab(anggaranData?.idPenjab)

          // set state tanggal pengajuan
          const nowFormatted = CommonUtils.formatDateToString(
            new Date(),
            'YYYY-MM-DD HH:mm:ss'
          )
          setAnggaranTanggalPengajuan(nowFormatted)
          setListSyncAnggaran(param)
          // if (!syncAnggaranSuccess) {
          setApiSync(stepSyncApi[3])
          // }
        }
      }
    }
  }, [isSuccessStepApi, syncSuccess, dataSync, syncAnggaranSuccess])

  useEffect(() => {
    // post rkas penjab
    if (isSuccessStepApi && syncAnggaranSuccess && !isSuccessSyncAnggaran) {
      if (dataSyncAnggaran !== undefined) {
        setFlagSyncAnggaran(true)
        if (Number(dataSyncAnggaran.data) === 1) {
          const penjabData = ipcRenderer.sendSync(
            IPC_PENJAB.getPenjabById,
            syncIdPenjab
          )

          if (penjabData !== undefined && penjabData !== null) {
            const param: ParamRkasPenjabType[] = []
            const rkasPenjabParam = SetterRkasPenjabParam(penjabData)
            param.push(rkasPenjabParam)

            setListSyncRkasPenjab(param)
            setApiSync(stepSyncApi[4])
          } else {
            // if found undefined
            setFlagFoundUndefinedStepApi(true)
          }
        } else {
          failedSyncData()
        }
      }
    }
  }, [
    isSuccessStepApi,
    dataSyncAnggaran,
    isSuccessSyncAnggaran,
    syncAnggaranSuccess,
  ])

  useEffect(() => {
    // post rkas

    if (
      isSuccessStepApi &&
      syncRkasPenjabSuccess &&
      dataSyncRkasPenjab &&
      !isSuccessRkasPenjab
    ) {
      // result data sync save to store
      if (dataSyncRkasPenjab !== undefined) {
        setFlagRkasPenjab(true)

        if (dataSyncRkasPenjab !== null && dataSyncRkasPenjab?.data === 1) {
          // valid step sync api rkas penjab flow

          // one to many
          const rapbsData = ipcRenderer.sendSync(
            IPC_RAPBS.GetRapbsByAnggaranId,
            idAnggaran
          )
          // set list all rapbs

          if (rapbsData !== undefined && rapbsData !== null) {
            const dataIdRapbs = SetterBulkRapbs(rapbsData)
            setSyncListIdRapbs(dataIdRapbs)

            const rkasParam = SetterRkasParam(rapbsData)

            setListSyncRkas(rkasParam)
            if (syncRkasPenjabSuccess && !syncRkasSuccess) {
              setApiSync(stepSyncApi[5])
            }
          }
        } else {
          failedSyncData()
        }
      } else {
        // if found undefined
        setFlagFoundUndefinedStepApi(true)
      }
    }
  }, [isSuccessStepApi, dataSyncRkasPenjab, isSuccessRkasPenjab])

  useEffect(() => {
    // post rkas detail

    if (isSuccessStepApi && syncRkasSuccess && dataSyncRkas && !isSuccessRkas) {
      // result data sync save to store
      if (dataSyncRkas !== undefined) {
        setFlagRkas(true)

        if (dataSyncRkas !== null) {
          if (dataSyncRkas.data === 1) {
            const rapbsDetailData = ipcRenderer.sendSync(
              IPC_RAPBS.GetListRapbsPeriodeByListRapbsId,
              syncListIdRapbs
            )
            if (
              rapbsDetailData !== undefined &&
              rapbsDetailData.value != null
            ) {
              const rkasDetailParam = MapperRkasDetailParam(
                rapbsDetailData.value
              )
              setListSyncRkasDetail(rkasDetailParam)
              if (syncRkasSuccess && !syncRkasDetailSuccess) {
                setApiSync(stepSyncApi[6])
              }
            } else {
              setFlagFoundUndefinedStepApi(true)
            }
          } else {
            failedSyncData()
          }
        }
      } else {
        // if found undefined
        setFlagFoundUndefinedStepApi(true)
      }
    }
  }, [isSuccessStepApi, dataSyncRkas, isSuccessRkas])

  useEffect(() => {
    // post rkas ptk
    if (
      isSuccessStepApi &&
      syncRkasDetailSuccess &&
      dataSyncRkasDetail &&
      !isSuccessRkasDetail
    ) {
      // result data sync save to store
      if (dataSyncRkasDetail !== undefined) {
        setFlagRkasDetail(true)

        if (dataSyncRkasDetail !== null) {
          // get rapbs ptk
          // neverthrow
          if (dataSyncRkasDetail.data === 1) {
            const rapbsPtkData = ipcRenderer.sendSync(
              IPC_PTK.GetRapbsPtkHonor,
              syncListIdRapbs
            )

            if (rapbsPtkData !== undefined && rapbsPtkData.value != null) {
              const rkasPtkParam = MapperRkasPtkParam(rapbsPtkData.value)

              setListSyncRkasPtk(rkasPtkParam)
              if (syncRkasDetailSuccess && !syncRkasPtkSuccess) {
                setApiSync(stepSyncApi[7])
              }
            } else {
              // if found undefined
              setFlagFoundUndefinedStepApi(true)
            }
          } else {
            failedSyncData()
          }
        }
      } else {
        // if found undefined
        setFlagFoundUndefinedStepApi(true)
      }
    }
  }, [
    isSuccessRkasDetail,
    isSuccessStepApi,
    dataSyncRkasDetail,
    syncListIdRapbs,
    syncRkasDetailSuccess,
    syncRkasPtkSuccess,
  ])

  useEffect(() => {
    // post rkas final
    if (
      isSuccessStepApi &&
      syncRkasPtkSuccess &&
      dataSyncRkasPtk &&
      !isSuccessRkasPtk
    ) {
      // valid step sync api rkas ptk flow
      if (dataSyncRkasPtk !== undefined) {
        if (dataSyncRkasPtk !== null) {
          setFlagRkasPtk(true)
          if (dataSyncRkasPtk?.data === 1) {
            if (!syncRkasFinalSuccess) {
              setApiSync(stepSyncApi[8])
            }
          } else {
            failedSyncData()
          }
        } else {
          // if found rkas ptk no response
          setFlagFoundUndefinedStepApi(true)
        }
      } else {
        // if found undefined
        setFlagFoundUndefinedStepApi(true)
      }
    }
  }, [
    isSuccessStepApi,
    dataSyncRkasPtk,
    isSuccessRkasPtk,
    syncRkasPtkSuccess,
    syncRkasFinalSuccess,
  ])

  useEffect(() => {
    // post rkas final
    // valid step sync api success flow
    if (syncRkasFinalSuccess) {
      setFlagRkasFinal(true)
      setIsSuccessStepSyncApi(true)
    }
    if (isSuccessStepApi && isSuccessRkasFinal && isSuccessStepSyncApi) {
      if (syncRkasFinalSuccess) {
        setPercentageSync(1)
        setChangeSyncStep(true)
      }
    }
  }, [
    isSuccessStepApi,
    syncRkasFinalSuccess,
    isSuccessRkasFinal,
    isSuccessStepSyncApi,
  ])

  ////////////////////////////////////////////////////////////////////////
  /**
   * Use Effect Pagu Sisa Dana and Data Central
   */

  useEffect(() => {
    if (!isPercentageCompleted) {
      if (percentageValidate == 1 && percentageSync == 1) {
        // valid set percentage flow
        setIsPercentageCompleted(true)
        setTimeout(() => {
          setPercentage(100)
        }, 1000)
      } else if (percentageValidate == 1 || percentageSync == 1) {
        setTimeout(() => {
          setPercentage(50)
        }, 2000)
      }
    }
  }, [percentageValidate, percentageSync])

  useEffect(() => {
    if (percentageValidate == 0) {
      if (!isAfterCheckSisaDana) {
        if (checkSisaDana() != 0) {
          // invalid sisa dana flow
          setIsAfterCheckSisaDana(true)
          const response =
            RESPONSE_PENGESAHAN.error_sisa_dana as ResponseMengulas
          directPage(response)
          setResponseMengulas(response)
          setAlertMengulas(true)
        } else {
          // success valid sisa dana flow
          setIsAfterCheckSisaDana(true)
          setIsSuccessCheckSisaDana(true)
          // set step api for data central
          setApi(stepApi[0])
        }
      }
    }
  }, [percentageValidate])

  useEffect(() => {
    if (!isChangeStep) {
      const sekolah = ipcRenderer.sendSync('sekolah:getSekolah')
      const tahunAktif = ipcRenderer.sendSync(
        'config:getConfig',
        APP_CONFIG.tahunAktif
      )

      const hddVol = ipcRenderer.sendSync('config:getConfig', APP_CONFIG.hddVol)

      const sekolahIdDecoded = ipcRenderer.sendSync(
        'utils:decodeUUID',
        sekolah.sekolahId
      )
      setNpsn(sekolah.npsn)
      setKoreg(sekolah.kodeRegistrasi)
      setTahunAktif(tahunAktif)
      setSekolahId(sekolahIdDecoded)
      setHddVol(hddVol)
    }
  }, [isChangeStep])

  // first step include info connection and get token
  useEffect(() => {
    if (!isFirstStep && infoConnection && !isChangeStep) {
      // valid info connection flow
      if (Number(infoConnection.data) === 1) {
        setApi(stepApi[1])
      } else {
        //TODO display error
      }
    }
  }, [infoConnection, isChangeStep])

  useEffect(() => {
    if (!isFirstStep && dataToken && !isChangeStep) {
      // result data token save to store
      if (dataToken !== undefined) {
        setFirstStep(true)

        // valid token flow
        setToken(dataToken?.data.access_token)

        const kodeLastUpdate = ipcRenderer.sendSync(
          'referensi:getRefKodeLastUpdate'
        )
        setLastUpdateKode(kodeLastUpdate)
        setApi(stepApi[2])
      }
    }
  }, [dataToken, isChangeStep])

  useEffect(() => {
    if (dataRefKode && !isChangeStep) {
      // valid ref kode flow
      if (dataRefKode !== undefined) {
        // setLastUpdateKode('')
        const rekeningLastUpdate = ipcRenderer.sendSync(
          'referensi:getRefRekeningLastUpdate'
        )
        setLastUpdateRekening(rekeningLastUpdate)
        setApi(stepApi[3])
      } else {
        // if found undefined
        setFlagFoundUndefinedStepApi(true)
      }
    }
  }, [dataRefKode, isChangeStep])

  useEffect(() => {
    if (dataRefRekening && !isChangeStep) {
      // valid ref rekening flow
      if (dataRefRekening !== undefined) {
        const barangLastUpdate = ipcRenderer.sendSync(
          'referensi:getRefBarangLastUpdate'
        )
        setLastUpdateBarang(barangLastUpdate)
        setApi(stepApi[4])
        setFlagStepApiFlowSuccess(true)
      } else {
        // if found undefined
        setFlagFoundUndefinedStepApi(true)
      }
    }
  }, [dataRefRekening, isChangeStep])

  useEffect(() => {
    if (dataRefBarang !== undefined) {
      setApi('')
    }
  }, [dataRefBarang])

  useEffect(() => {
    // failed sync err step api flow
    if (
      isInfoConnError ||
      isTokenError ||
      isGetRefBarangError ||
      isGetRefKodeError ||
      isGetRefRekeningError
    ) {
      // hit api referensi, check if resp is not empty, then show dialog
      const response = RESPONSE_PENGESAHAN.failed_sync_data as ResponseMengulas
      directPage(response)
      setResponseMengulas(response)
      removeCacheData()
      setAlertMengulas(true)
    }
  }, [
    isInfoConnError,
    isTokenError,
    isGetRefBarangError,
    isGetRefKodeError,
    isGetRefRekeningError,
  ])

  useEffect(() => {
    if (
      // failed sync err step sync api flow
      isInfoSyncConnError ||
      isSyncTokenError ||
      isSyncError ||
      isSyncAnggaranError ||
      isSyncRkasPenjabError ||
      isSyncRkasError ||
      isSyncRkasDetailError ||
      isSyncRkasPtkError ||
      isSyncRkasFinalError ||
      // special case when found undefined data from each step sync api
      isFoundUndefinedStepApi
    ) {
      const response = RESPONSE_PENGESAHAN.failed_sync_data as ResponseMengulas
      directPage(response)
      setResponseMengulas(response)
      removeCacheSyncData()
      setAlertMengulas(true)
    }
  }, [
    isInfoSyncConnError,
    isSyncTokenError,
    isSyncError,
    isSyncAnggaranError,
    isSyncRkasPenjabError,
    isSyncRkasError,
    isSyncRkasDetailError,
    isSyncRkasPtkError,
    isSyncRkasFinalError,
    isFoundUndefinedStepApi,
  ])

  ////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////
  /**
   * Use Effect main process:
   * - will run only after isSuccessCheckSisaDana true
   */

  useEffect(() => {
    if (isSuccessStepSyncApi && isChangeSyncStep) {
      if (isSuccessRkasFinal && dataSyncRkasFinal !== undefined) {
        if (Number(dataSyncRkasFinal.data) === 1) {
          // after success rkas final, update tanggal_pengajuan anggaran
          ipcRenderer.sendSync(
            IPC_ANGGARAN.UpdateTanggalPengajuan,
            idAnggaran,
            anggaranTanggalPengajuan
          )
          // success step sync api flow
          const response = RESPONSE_PENGESAHAN.success as ResponseMengulas
          setResponseMengulas(response)
          directPage(response)
          setAlertMengulas(true)
        } else {
          failedSyncData()
        }
      }
    }
  }, [
    anggaranTanggalPengajuan,
    dataSyncRkasFinal,
    isChangeSyncStep,
    isSuccessRkasFinal,
    isSuccessStepSyncApi,
  ])

  useEffect(() => {
    // check failed step api flow
    if (
      isAfterCheckSisaDana &&
      isSuccessCheckSisaDana &&
      isStepApiFlowSuccess &&
      !isChangeStep
    ) {
      let lenDataRefBarang = 0
      let lenDataRefKode = 0
      let lenDataRefRekening = 0

      let isDefinedRefBarang = false
      let isDefinedRefKode = false
      let isDefinedRefRekening = false

      if (dataRefBarang !== undefined) {
        lenDataRefBarang = Object.keys(dataRefBarang).length
        isDefinedRefBarang = true
      }
      if (dataRefKode !== undefined) {
        lenDataRefKode = Object.keys(dataRefKode).length
        isDefinedRefKode = true
      }
      if (dataRefRekening !== undefined) {
        lenDataRefRekening = Object.keys(dataRefRekening).length
        isDefinedRefRekening = true
      }

      if (
        // if balikan ada datanya
        // update pengesahan.
        // selain itu, upsert ke tabel ref tersebut
        (isDefinedRefKode && lenDataRefKode > 0) ||
        (isDefinedRefRekening && lenDataRefRekening > 0) ||
        (isDefinedRefBarang && lenDataRefBarang > 0)
      ) {
        if (lenDataRefKode) {
          ipcRenderer.sendSync('referensi:addBulkRefKode', dataRefKode?.data)
        }

        if (lenDataRefRekening) {
          ipcRenderer.sendSync(
            'referensi:addBulkRefRekening',
            dataRefRekening?.data
          )
        }

        if (lenDataRefBarang) {
          ipcRenderer.sendSync(
            'referensi:addBulkRefBarang',
            dataRefBarang?.data
          )
        }
        const res = ipcRenderer.sendSync(
          IPC_KK.getListValidasiReferensiPeriode,
          idAnggaran
        )
        let isErrorDataSentral = false

        if (res?.value != null && res?.value.length > 0) {
          const data = res.value.filter((r: any) => r.isValidate > 0)
          isErrorDataSentral = data.length > 0
        }

        if (isErrorDataSentral) {
          ipcRenderer.sendSync(
            IPC_ANGGARAN.updateIsPengesahan,
            idAnggaran,
            STATUS_INVALID_PENGESAHAN.invalidDataCentral
          )

          const response =
            RESPONSE_PENGESAHAN.error_data_sentral as ResponseMengulas
          directPage(response)
          setResponseMengulas(response)
          removeCacheData()
          setAlertMengulas(true)
        } else {
          removeToken()
          setIsSuccessStepApi(true)
          setPercentageValidate(1)
          setApiSync(stepSyncApi[0])
        }
      } else if (
        // undefined all
        !isDefinedRefKode &&
        !isDefinedRefRekening &&
        !isDefinedRefBarang
      ) {
        //failed step data flow before step sync api
        const response =
          RESPONSE_PENGESAHAN.failed_sync_data as ResponseMengulas
        directPage(response)
        setResponseMengulas(response)
        removeCacheSyncData()
        setChangeStep(true)
        setAlertMengulas(true)
      } else {
        // success step api flow
        removeToken()
        setIsSuccessStepApi(true)
        setPercentageValidate(1)
        // process step sync api

        // setFlagSyncInfoConnection(true)
        setApiSync(stepSyncApi[0])
      }
    }
  }, [
    dataRefBarang,
    dataRefRekening,
    dataRefKode,
    isAfterCheckSisaDana,
    isSuccessCheckSisaDana,
    isChangeStep,
  ])

  ////////////////////////////////////////////////////////////////////////
  return (
    <SyncDialogComponent
      title="Mengirim RKAS..."
      percentage={percentage}
      isOpen={true}
      setIsOpen={closeModal}
    />
  )
}

export default SyncMengulasKertasKerjaView
