import { IPC_ANGGARAN, IPC_CONFIG, IPC_SEKOLAH } from 'global/ipc'
import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useAPIGetToken } from 'renderer/apis/token'
import {
  useAPICheckHDDVol,
  useAPIInfoConnection,
  useAPISalur,
} from 'renderer/apis/utils'

import SyncDialogComponent from 'renderer/components/Dialog/SyncDialogComponent'
import { TIME_DELAY_SCREEN } from 'renderer/constants/app'
import { APP_CONFIG } from 'renderer/constants/appConfig'
import { AppStates, useAppStore } from 'renderer/stores/app'

import { TataUsahaStates, useTataUsahaStore } from 'renderer/stores/tata-usaha'
import { Penerimaan } from 'renderer/types/apis/UtilType'
import syncToIPCMain from 'renderer/configs/ipc'
import { SetConfigRequest } from 'global/types/Config'
import { AuthStates, useAuthStore } from 'renderer/stores/auth'

const stepApi = {
  infoConnection: 'infoConnection',
  checkHddVol: 'checkHddVol',
  getToken: 'getToken',
  salur: 'salur',
}

const SyncAktivasiBKUView: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { q_sumber_dana, q_id_anggaran } = useParams()

  const [api, setApi] = useState('')
  const [tahunAktif, setTahunAktif] = useState(null)
  const [hddVol, setHddVol] = useState(null)
  const [hddVolOld, setHddVolOld] = useState(null)
  const [tahunAnggaran, setTahunAnggaran] = useState(null)
  const [npsn, setNpsn] = useState('')
  const [koreg, setKoreg] = useState('')
  const [percentage, setPercentage] = useState(0)

  const setToken = useAppStore((state: AppStates) => state.setToken)

  const setIsActivationBKUFailed = useTataUsahaStore(
    (state: TataUsahaStates) => state.setIsActivationBKUFailed
  )

  const setAlertFailedSyncData = useAppStore(
    (state: AppStates) => state.setAlertFailedSyncData
  )

  const setAlertNoConnection = useAppStore(
    (state: AppStates) => state.setAlertNoConnection
  )

  const setAlertLostConnection = useAppStore(
    (state: AppStates) => state.setAlertLostConnection
  )

  const setPeriodeSalurList = useTataUsahaStore(
    (state: TataUsahaStates) => state.setPeriodeSalurList
  )

  const setMultipleDevice = useAuthStore(
    (state: AuthStates) => state.setMultipleDevice
  )

  const closeModal = () => {
    navigate(-1)
  }

  const {
    data: infoConnection,
    isError: isInfoConnError,
    remove: removeInfoConnection,
  } = useAPIInfoConnection({
    retry: 0,
    enabled: api === stepApi.infoConnection,
  })

  const {
    data: dataToken,
    isError: isTokenError,
    remove: removeToken,
  } = useAPIGetToken(
    {
      username: `${npsn}${tahunAktif}`,
      password: koreg,
    },
    {
      retry: 0,
      enabled:
        api === stepApi.getToken &&
        npsn !== '' &&
        tahunAktif !== '' &&
        koreg !== '',
    }
  )

  const {
    data: dataHDDVol,
    isError: isCheckHddVolError,
    remove: removeCheckHddVol,
  } = useAPICheckHDDVol(
    {
      hdd_vol: hddVol,
      hdd_vol_old: hddVolOld,
    },
    {
      retry: 0,
      enabled: api === stepApi.checkHddVol && hddVol !== '' && hddVolOld !== '',
    }
  )

  const {
    data: dataSalur,
    isError: isSalurError,
    remove: removeSalur,
  } = useAPISalur(
    {
      tahun: tahunAnggaran,
      sumberDana: parseInt(q_sumber_dana),
    },
    {
      enabled:
        tahunAnggaran != null && q_sumber_dana != null && api == stepApi.salur,
      retry: 0,
    }
  )

  const removeCacheData = () => {
    removeInfoConnection()
    removeToken()
    removeCheckHddVol()
    removeSalur()
  }

  const failedSyncData = () => {
    setApi('')
    removeCacheData()
    setAlertNoConnection(false)
    setAlertLostConnection(false)
    setAlertFailedSyncData(true)
    closeModal()
  }

  const lostConnectionSyncData = () => {
    setApi('')
    removeCacheData()
    closeModal()

    // lost connection
    setAlertFailedSyncData(false)
    setAlertNoConnection(false)
    setAlertLostConnection(true)
  }

  useEffect(() => {
    const tahunAktif = syncToIPCMain(
      IPC_CONFIG.getConfig,
      APP_CONFIG.tahunAktif
    )
    const hddVol = syncToIPCMain(IPC_CONFIG.getConfig, APP_CONFIG.hddVol)
    const hddVolOld = syncToIPCMain(IPC_CONFIG.getConfig, APP_CONFIG.hddVolOld)
    const anggaran = syncToIPCMain(IPC_ANGGARAN.getAnggaranById, q_id_anggaran)
    const sekolah = syncToIPCMain(IPC_SEKOLAH.getSekolah)
    setTahunAnggaran(anggaran.tahunAnggaran)
    setNpsn(sekolah.npsn)
    setKoreg(sekolah.kodeRegistrasi)
    setTahunAktif(tahunAktif)
    setHddVol(hddVol)
    setHddVolOld(hddVolOld)
    setApi(stepApi.infoConnection)
  }, [])

  useEffect(() => {
    if (infoConnection !== undefined) {
      if (Number(infoConnection.data) === 1) {
        setApi(stepApi.getToken)
        setPercentage(30)
      } else {
        failedSyncData()
      }
    }
  }, [infoConnection])

  useEffect(() => {
    if (dataToken !== undefined) {
      setToken(dataToken?.data.access_token)
      setApi(stepApi.checkHddVol)
      setPercentage(60)
    }
  }, [dataToken])

  useEffect(() => {
    if (dataHDDVol !== undefined) {
      if (Number(dataHDDVol.data) === 1) {
        setApi(stepApi.salur)
        setPercentage(80)
      } else {
        setApi('')
        removeCacheData()
        const dataKoregInvalid: SetConfigRequest = {
          varname: APP_CONFIG.koregInvalid,
          varvalue: '1',
        }
        syncToIPCMain(IPC_CONFIG.setConfig, dataKoregInvalid)
        setMultipleDevice(true)
        closeModal()
      }
    }
  }, [dataHDDVol])

  useEffect(() => {
    if (dataSalur !== undefined) {
      if (
        dataSalur?.data?.penerimaan != null &&
        dataSalur?.data?.penerimaan.length > 0
      ) {
        const periodeSalur: Penerimaan[] = dataSalur?.data?.penerimaan
        setPeriodeSalurList(periodeSalur)
        setPercentage(100)
      } else {
        setIsActivationBKUFailed(true)
        closeModal()
      }
    }
  }, [dataSalur])

  useEffect(() => {
    if (isInfoConnError || isTokenError || isSalurError || isCheckHddVolError) {
      if (!navigator.onLine) {
        lostConnectionSyncData()
      } else {
        failedSyncData()
      }
    }
  }, [isInfoConnError, isTokenError, isSalurError, isCheckHddVolError])

  useEffect(() => {
    if (percentage === 100) {
      //set delay redirect to form penerimaan dana
      setTimeout(() => {
        navigate(`/form/penerimaan-dana/${encodeURIComponent(q_id_anggaran)}`, {
          state: location.state,
        })
      }, TIME_DELAY_SCREEN)
      // }, 5000)
    }
  }, [percentage])

  return (
    <SyncDialogComponent
      title="Sinkronisasi Data..."
      percentage={percentage}
      isOpen={true}
      setIsOpen={closeModal}
    />
  )
}

export default SyncAktivasiBKUView
