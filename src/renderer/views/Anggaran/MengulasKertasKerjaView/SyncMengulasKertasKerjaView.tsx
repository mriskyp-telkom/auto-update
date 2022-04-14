import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { AuthStates, useAuthStore } from 'renderer/stores/auth'
import { AppStates, useAppStore } from 'renderer/stores/app'
import { APP_CONFIG } from 'renderer/constants/appConfig'

import { useAPIGetToken } from 'renderer/apis/token'
import { useAPIInfoConnection } from 'renderer/apis/utils'
import { useAPIGetReferensi } from 'renderer/apis/referensi'

import SyncDialogComponent from 'renderer/components/Dialog/SyncDialogComponent'

import { AnggaranStates, useAnggaranStore } from 'renderer/stores/anggaran'

import { RESPONSE_PENGESAHAN } from 'renderer/constants/anggaran'

import { ResponseMengulas } from 'renderer/types/AnggaranType'

import { IPC_ANGGARAN } from 'global/ipc'

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
// const stepSyncApi = [
//   'infoConnection',
//   'getToken',
//   // 'init',
//   // 'anggaran'
// ]

const SyncMengulasKertasKerjaView: FC = () => {
  const { q_id_anggaran } = useParams()
  // ambil rapbs dari id anggaran
  const idAnggaran = decodeURIComponent(q_id_anggaran)

  const navigate = useNavigate()
  const [api, setApi] = useState('')

  const npsn = useAuthStore((state: AuthStates) => state.npsn)
  const tahunAktif = useAuthStore((state: AuthStates) => state.tahunAktif)
  const koreg = useAuthStore((state: AuthStates) => state.koreg)

  const setNpsn = useAuthStore((state: AuthStates) => state.setNpsn)
  const setTahunAktif = useAuthStore((state: AuthStates) => state.setTahunAktif)
  const setKoreg = useAuthStore((state: AuthStates) => state.setKoreg)

  //////////////////////////////////////////////////////////////////////
  /**
   * const pagu sisa dana and data central
   */
  const [percentage, setPercentage] = useState(0)
  const [percentageSisaDana, setPercentageSisaDana] = useState(0)
  const [percentageDataCentral, setPercentageDataCentral] = useState(0)
  const [isPercentageCompleted, setIsPercentageCompleted] = useState(false)

  // attribute setter
  const [lastUpdateKode, setLastUpdateKode] = useState('')
  const [lastUpdateRekening, setLastUpdateRekening] = useState('')
  const [lastUpdateBarang, setLastUpdateBarang] = useState('')
  ////////////////////////////////////////////////////////////////////////

  const removeCacheData = () => {
    removeInfoConnection()
    removeToken()
    removeRefKode()
    removeRefRekening()
    removeRefBarang()
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
    enabled: api === stepApi[0],
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
        api === stepApi[1] && npsn !== '' && tahunAktif !== '' && koreg !== '',
    }
  )

  const {
    // read from api to sync from endpoint
    data: dataRefKode,
    isError: isGetRefKodeError, // alias for isError
    remove: removeRefKode,
  } = useAPIGetReferensi(
    { referensi: 'kode', lastUpdate: lastUpdateKode },
    { enabled: api === stepApi[2] && lastUpdateKode !== '', retry: 0 }
  )
  const {
    // read from api to sync from endpoint
    data: dataRefRekening,
    isError: isGetRefRekeningError, // alias for isError
    remove: removeRefRekening,
  } = useAPIGetReferensi(
    { referensi: 'rekening', lastUpdate: lastUpdateRekening },
    { enabled: api === stepApi[3] && lastUpdateRekening !== '' }
  )
  const {
    // read from api to sync from endpoint
    data: dataRefBarang,
    isError: isGetRefBarangError, // alias for isError
    remove: removeRefBarang,
  } = useAPIGetReferensi(
    { referensi: 'barang', lastUpdate: lastUpdateBarang },
    { enabled: api === stepApi[4] && lastUpdateBarang !== '' }
  )

  const directPage = (response: ResponseMengulas) => {
    if (response === RESPONSE_PENGESAHAN.success) {
      closeModal()
    } else {
      navigate(`/anggaran/menyusun/update/${q_id_anggaran}`)
    }
  }

  // use renderer when reading from sql lite
  const checkSisaDana = () => {
    const pagu = ipcRenderer.sendSync(IPC_ANGGARAN.getPagu, idAnggaran)
    return pagu?.sisa
  }

  ////////////////////////////////////////////////////////////////////////
  /**
   * Use Effect Pagu Sisa Dana and Data Central
   */

  useEffect(() => {
    if (!isPercentageCompleted) {
      if (percentageSisaDana == 1 && percentageDataCentral == 1) {
        setIsPercentageCompleted(true)
        setTimeout(() => {
          setPercentage(100)
        }, 1000)
      } else if (percentageSisaDana == 1 || percentageDataCentral == 1) {
        setTimeout(() => {
          setPercentage(50)
        }, 2000)
      }
    }
  }, [percentageDataCentral, percentageSisaDana])

  useEffect(() => {
    if (percentageSisaDana == 0) {
      if (checkSisaDana() != 0) {
        const response = RESPONSE_PENGESAHAN.error_sisa_dana as ResponseMengulas
        directPage(response)
        setResponseMengulas(response)
        setAlertMengulas(true)
      } else {
        // if api info connection
        setPercentageSisaDana(1)
        setPercentage(50)
        setApi(stepApi[0])
      }
    }
  }, [percentageSisaDana])

  useEffect(() => {
    const sekolah = ipcRenderer.sendSync('sekolah:getSekolah')
    const tahunAktif = ipcRenderer.sendSync(
      'config:getConfig',
      APP_CONFIG.tahunAktif
    )

    setNpsn(sekolah.npsn)
    setKoreg(sekolah.kodeRegistrasi)
    setTahunAktif(tahunAktif)
  }, [])

  useEffect(() => {
    if (infoConnection) {
      // get token
      setApi(stepApi[1])
    }
  }, [infoConnection])

  useEffect(() => {
    if (dataToken) {
      // result data token save to store
      if (dataToken !== undefined) {
        setToken(dataToken?.data.access_token)

        const kodeLastUpdate = ipcRenderer.sendSync(
          'referensi:getRefKodeLastUpdate'
        )
        setLastUpdateKode(kodeLastUpdate)
        setApi(stepApi[2])
      }
    }
  }, [dataToken])

  useEffect(() => {
    if (dataRefKode) {
      // result data token save to store
      if (dataRefKode !== undefined) {
        const rekeningLastUpdate = ipcRenderer.sendSync(
          'referensi:getRefRekeningLastUpdate'
        )
        setLastUpdateRekening(rekeningLastUpdate)
        setApi(stepApi[3])
      }
    }
  }, [dataRefKode])

  useEffect(() => {
    if (dataRefRekening) {
      // result data token save to store
      if (dataRefRekening !== undefined) {
        const barangLastUpdate = ipcRenderer.sendSync(
          'referensi:getRefBarangLastUpdate'
        )
        setLastUpdateBarang(barangLastUpdate)
        setApi(stepApi[4])
      }
    }
  }, [dataRefRekening])

  useEffect(() => {
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

  ////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////
  /**
   * Use Effect main process:
   *
   */
  useEffect(() => {
    if (
      (dataRefKode && Object.keys(dataRefKode).length > 0) ||
      (dataRefRekening && Object.keys(dataRefRekening).length > 0) ||
      (dataRefBarang && Object.keys(dataRefBarang).length > 0)
    ) {
      // hit api referensi, check if resp is not empty, then show dialog
      const response =
        RESPONSE_PENGESAHAN.error_data_sentral as ResponseMengulas
      directPage(response)
      setResponseMengulas(response)
      removeCacheData()
      setAlertMengulas(true)
    } else {
      setPercentageDataCentral(1)

      // click

      // setelah success dan kasih timeout 2 detik
      // navigate('/anggaran')
    }
  }, [dataRefBarang, dataRefRekening, dataRefKode])

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
