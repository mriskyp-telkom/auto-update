import { IPC_ANGGARAN, IPC_CONFIG } from 'global/ipc'
import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useAPISalur } from 'renderer/apis/utils'

import SyncDialogComponent from 'renderer/components/Dialog/SyncDialogComponent'
import { TIME_DELAY_SCREEN } from 'renderer/constants/app'
import { APP_CONFIG } from 'renderer/constants/appConfig'
import { AppStates, useAppStore } from 'renderer/stores/app'

import { TataUsahaStates, useTataUsahaStore } from 'renderer/stores/tata-usaha'
import { Penerimaan } from 'renderer/types/apis/UtilType'
import syncToIPCMain from 'renderer/configs/ipc'
import { SetConfigRequest } from 'global/types/Config'
import { AuthStates, useAuthStore } from 'renderer/stores/auth'
import useInitApi from 'renderer/utils/hooks/useInitApi'

const SyncAktivasiBKUView: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const initApi = useInitApi()
  const { q_sumber_dana, q_id_anggaran } = useParams()

  const [initDone, setInitDone] = useState(false)
  const [tahunAnggaran, setTahunAnggaran] = useState(null)
  const [percentage, setPercentage] = useState(0)

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
    data: dataSalur,
    isError: isSalurError,
    remove: removeSalur,
  } = useAPISalur(
    {
      tahun: tahunAnggaran,
      sumberDana: parseInt(q_sumber_dana),
    },
    {
      enabled: tahunAnggaran != null && q_sumber_dana != null,
      retry: 0,
    }
  )

  const setDefaultAktivasiBKUAlert = () => {
    setAlertNoConnection(false)
    setAlertLostConnection(false)
    setAlertFailedSyncData(false)
  }

  // const lostConnectionSyncData = () => {
  //   setTahunAnggaran(null)
  //   removeSalur()
  //   closeModal()

  //   setDefaultAktivasiBKUAlert()
  //   setAlertLostConnection(true)
  // }

  const noConnectionSyncData = () => {
    setTahunAnggaran(null)
    removeSalur()
    closeModal()

    setDefaultAktivasiBKUAlert()
    setAlertNoConnection(true)
  }

  const failedSyncData = () => {
    setTahunAnggaran(null)
    removeSalur()

    setDefaultAktivasiBKUAlert()
    setAlertFailedSyncData(true)
    closeModal()
  }

  useEffect(() => {
    if (initApi != null) {
      const { data, isSuccess, isError } = initApi
      if (isSuccess && !initDone) {
        setInitDone(true)
        setPercentage(50)
        if (Number(data.infoConnection.data) !== 1) {
          failedSyncData()
        } else if (Number(data.dataHDDVol.data) !== 1) {
          const dataKoregInvalid: SetConfigRequest = {
            varname: APP_CONFIG.koregInvalid,
            varvalue: '1',
          }
          syncToIPCMain(IPC_CONFIG.setConfig, dataKoregInvalid)
          setMultipleDevice(true)
          closeModal()
        } else {
          const anggaran = syncToIPCMain(
            IPC_ANGGARAN.getAnggaranById,
            q_id_anggaran
          )
          setTahunAnggaran(anggaran.tahunAnggaran)
        }
      }
      if (isError) {
        if (!navigator.onLine) {
          noConnectionSyncData()
        } else {
          failedSyncData()
        }
      }
    }
  }, [initApi])

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
    if (isSalurError) {
      if (!navigator.onLine) {
        noConnectionSyncData()
      } else {
        failedSyncData()
      }
    }
  }, [isSalurError])

  useEffect(() => {
    if (percentage === 100) {
      // set delay redirect to form penerimaan dana
      setTimeout(() => {
        navigate(`/form/penerimaan-dana/${encodeURIComponent(q_id_anggaran)}`, {
          state: location.state,
        })
      }, TIME_DELAY_SCREEN)
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
