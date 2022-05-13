import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { AnggaranStates, useAnggaranStore } from 'renderer/stores/anggaran'
import { AppStates, useAppStore } from 'renderer/stores/app'
import { AuthStates, useAuthStore } from 'renderer/stores/auth'

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

import {
  ParamRkasDetailType,
  ParamRkasPenjabType,
  ParamRkasPtkType,
  ParamRkasType,
} from 'renderer/types/apis/RkasType'
import { TIME_DELAY_SCREEN } from 'renderer/constants/app'

import { copyKertasKerja } from 'renderer/utils/copy-writing'

const ipcRenderer = window.require('electron').ipcRenderer

const stepApi = [
  'infoConnection',
  'getToken',
  'refKode',
  'refRekening',
  'refBarang',
]

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

  const idAnggaran = decodeURIComponent(q_id_anggaran)

  const navigate = useNavigate()
  const [api, setApi] = useState('')
  const [apiSync, setApiSync] = useState('')

  const npsn = useAuthStore((state: AuthStates) => state.npsn)
  const tahunAktif = useAuthStore((state: AuthStates) => state.tahunAktif)
  const koreg = useAuthStore((state: AuthStates) => state.koreg)

  const setNpsn = useAuthStore((state: AuthStates) => state.setNpsn)
  const setTahunAktif = useAuthStore((state: AuthStates) => state.setTahunAktif)
  const setKoreg = useAuthStore((state: AuthStates) => state.setKoreg)
  const setAlertMengulas = useAnggaranStore(
    (state: AnggaranStates) => state.setAlertMengulas
  )

  const setResponseMengulas = useAnggaranStore(
    (state: AnggaranStates) => state.setResponseMengulas
  )

  const setToken = useAppStore((state: AppStates) => state.setToken)

  const [sekolahId, setSekolahId] = useState(null)
  const [hddVol, setHddVol] = useState(null)
  const [anggaran, setAnggaran] = useState(null)
  const [percentage, setPercentage] = useState(0)

  const [lastUpdateKode, setLastUpdateKode] = useState('')
  const [lastUpdateRekening, setLastUpdateRekening] = useState('')
  const [lastUpdateBarang, setLastUpdateBarang] = useState('')

  const [typeSession, setTypeSession] = useState('')
  const [versi, setVersi] = useState('')
  const [dateTimeLocal] = useState('')
  const [listAnggaran, setListAnggaran] = useState<ParamAnggaranType[]>(null)
  const [listRkasPenjab, setListRkasPenjab] =
    useState<ParamRkasPenjabType[]>(null)
  const [listRkas, setListRkas] = useState<ParamRkasType[]>(null)
  const [listIdRapbs, setListIdRapbs] = useState<string[]>(null)
  const [listRkasDetail, setListRkasDetail] =
    useState<ParamRkasDetailType[]>(null)
  const [listRkasPtk, setListRkasPtk] = useState<ParamRkasPtkType[]>(null)
  const [tanggalPengajuan, setTanggalPengajuan] = useState(null)

  const closeModal = () => {
    navigate(-1)
  }

  const {
    data: infoConnection,
    isError: isInfoConnError,
    remove: removeInfoConnection,
  } = useAPIInfoConnection({
    retry: 0,
    enabled: api === stepApi[0],
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
        api === stepApi[1] && npsn !== '' && tahunAktif !== '' && koreg !== '',
    }
  )

  const {
    data: dataRefKode,
    isError: isGetRefKodeError,
    remove: removeRefKode,
  } = useAPIGetReferensi(
    { referensi: 'kode', lastUpdate: lastUpdateKode },
    {
      enabled: api === stepApi[2] && lastUpdateKode !== '',
      retry: 0,
    }
  )
  const {
    data: dataRefRekening,
    isError: isGetRefRekeningError,
    remove: removeRefRekening,
  } = useAPIGetReferensi(
    { referensi: 'rekening', lastUpdate: lastUpdateRekening },
    {
      enabled: api === stepApi[3] && lastUpdateRekening !== '',
    }
  )

  const {
    data: dataRefBarang,
    isError: isGetRefBarangError,
    remove: removeRefBarang,
  } = useAPIGetReferensi(
    { referensi: 'barang', lastUpdate: lastUpdateBarang },
    { enabled: api === stepApi[4] && lastUpdateBarang !== '' }
  )

  const {
    data: infoSyncConnection,
    isError: isInfoSyncConnError,
    remove: removeInfoSyncConnection,
  } = useAPIInfoConnection({
    retry: 0,
    enabled: apiSync === stepSyncApi[0],
  })

  const {
    data: dataSyncToken,
    isError: isSyncTokenError,
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
        koreg !== '',
    }
  )

  const {
    data: dataSync,
    isError: isSyncError,
    remove: removeSync,
  } = useAPISync(
    {
      tahun: tahunAktif,
      kode_registrasi: koreg,
      date_time_local: dateTimeLocal,
      sekolah_id: sekolahId,
      versi: versi,
      type_session: typeSession,
      hdd_vol: hddVol,
      npsn: npsn,
    },
    {
      retry: 0,
      enabled: apiSync === stepSyncApi[2] && typeSession !== '' && versi !== '',
    }
  )

  const {
    data: dataSyncAnggaran,
    isError: isSyncAnggaranError,
    remove: removeSyncAnggaran,
  } = useAPIAnggaranSync(listAnggaran, {
    retry: 0,
    enabled: apiSync === stepSyncApi[3] && listAnggaran != null,
  })

  const {
    data: dataSyncRkasPenjab,
    isError: isSyncRkasPenjabError,
    remove: removeSyncRkasPenjab,
  } = useAPIRKASPenjabSync(listRkasPenjab, {
    retry: 0,
    enabled: apiSync === stepSyncApi[4] && listRkasPenjab != null,
  })

  const {
    data: dataSyncRkas,
    isError: isSyncRkasError, // alias for isError
    remove: removeSyncRkas,
  } = useAPIRKASSync(listRkas, {
    retry: 0,
    enabled: apiSync === stepSyncApi[5] && listRkas != null,
  })

  const {
    data: dataSyncRkasDetail,
    isError: isSyncRkasDetailError,
    remove: removeSyncRkasDetail,
  } = useAPIRKASDetailSync(listRkasDetail, {
    retry: 0,
    enabled: apiSync === stepSyncApi[6] && listRkasDetail != null,
  })

  const {
    data: dataSyncRkasPtk,
    isError: isSyncRkasPtkError,
    remove: removeSyncRkasPtk,
  } = useAPIRKASPtkSync(listRkasPtk, {
    retry: 0,
    enabled: apiSync === stepSyncApi[7] && listRkasPtk != null,
  })

  const {
    data: dataSyncRkasFinal,
    isError: isSyncRkasFinalError,
    isSuccess: syncRkasFinalSuccess,
    remove: removeSyncRkasFinal,
  } = useAPIRKASFinalSync(null, {
    retry: 0,
    enabled: apiSync === stepSyncApi[8],
  })

  const directPage = (response: ResponseMengulas) => {
    if (response === RESPONSE_PENGESAHAN.success) {
      closeModal()
    } else {
      navigate(`/anggaran/menyusun/update/${encodeURIComponent(q_id_anggaran)}`)
    }
  }

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

  const failedSyncData = () => {
    setApi('')
    setApiSync('')
    const response = RESPONSE_PENGESAHAN.failed_sync_data as ResponseMengulas
    directPage(response)
    setResponseMengulas(response)
    removeCacheData()
    removeCacheSyncData()
    setAlertMengulas(true)
  }

  const checkSisaDana = () => {
    const pagu = ipcRenderer.sendSync(IPC_ANGGARAN.getPagu, idAnggaran)
    const sisaPagu = pagu?.sisa
    return sisaPagu
  }

  useEffect(() => {
    setPercentage(0)
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
    setPercentage(8)
    if (checkSisaDana() != 0) {
      ipcRenderer.sendSync(
        IPC_ANGGARAN.updateIsPengesahan,
        idAnggaran,
        STATUS_INVALID_PENGESAHAN.invalidSisaDana
      )
      const response = RESPONSE_PENGESAHAN.error_sisa_dana as ResponseMengulas
      directPage(response)
      setResponseMengulas(response)
      setAlertMengulas(true)
    } else {
      setApi(stepApi[0])
    }
  }, [])

  useEffect(() => {
    if (infoConnection != null && api === stepApi[0]) {
      if (Number(infoConnection.data) === 1) {
        setApi(stepApi[1])
        setPercentage(16)
      } else {
        failedSyncData()
      }
    }
  }, [infoConnection, api])

  useEffect(() => {
    if (dataToken !== undefined && api === stepApi[1]) {
      setToken(dataToken?.data.access_token)

      const kodeLastUpdate = ipcRenderer.sendSync(
        'referensi:getRefKodeLastUpdate'
      )
      setLastUpdateKode(kodeLastUpdate)
      setPercentage(32)
      setApi(stepApi[2])
    }
  }, [dataToken, api])

  useEffect(() => {
    if (dataRefKode !== undefined) {
      const rekeningLastUpdate = ipcRenderer.sendSync(
        'referensi:getRefRekeningLastUpdate'
      )
      setLastUpdateRekening(rekeningLastUpdate)
      setApi(stepApi[3])
      setPercentage(37)
    }
  }, [dataRefKode])

  useEffect(() => {
    if (dataRefRekening !== undefined) {
      const barangLastUpdate = ipcRenderer.sendSync(
        'referensi:getRefBarangLastUpdate'
      )
      setLastUpdateBarang(barangLastUpdate)
      setApi(stepApi[4])
      setPercentage(42)
    }
  }, [dataRefRekening])

  useEffect(() => {
    if (dataRefBarang !== undefined) {
      setApi('')
    }
  }, [dataRefBarang])

  useEffect(() => {
    if (
      dataRefKode != null &&
      dataRefRekening != null &&
      dataRefBarang != null
    ) {
      if (dataRefKode?.data?.length > 0) {
        ipcRenderer.sendSync('referensi:addBulkRefKode', dataRefKode?.data)
      }
      if (dataRefRekening?.data?.length > 0) {
        ipcRenderer.sendSync(
          'referensi:addBulkRefRekening',
          dataRefRekening?.data
        )
      }
      if (dataRefBarang?.data?.length > 0) {
        ipcRenderer.sendSync('referensi:addBulkRefBarang', dataRefBarang?.data)
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
        ipcRenderer.sendSync(IPC_ANGGARAN.updateIsPengesahan, idAnggaran, 0)
        removeToken()
        setApiSync(stepSyncApi[0])
        setPercentage(50)
      }
    }
  }, [dataRefKode, dataRefRekening, dataRefBarang])

  useEffect(() => {
    if (infoSyncConnection && apiSync === stepSyncApi[0]) {
      if (Number(infoSyncConnection.data) === 1) {
        setApiSync(stepSyncApi[1])
        setPercentage(58)
      } else {
        failedSyncData()
      }
    }
  }, [infoSyncConnection, apiSync])

  useEffect(() => {
    if (dataSyncToken !== undefined && apiSync === stepSyncApi[1]) {
      setToken(dataSyncToken?.data.access_token)
      setVersi(APP_VERSION)
      setTypeSession(TYPE_SESSION.pengajuanKK)
      setApiSync(stepSyncApi[2])
      setPercentage(64)
    }
  }, [dataSyncToken, apiSync])

  useEffect(() => {
    if (dataSync !== undefined) {
      const anggaranData = ipcRenderer.sendSync(
        IPC_ANGGARAN.getAnggaranById,
        idAnggaran
      )
      const param: ParamAnggaranType[] = []

      if (anggaranData !== undefined && anggaranData !== null) {
        const tanggalPengajuan = new Date()
        anggaranData.tanggalPengajuan = tanggalPengajuan
        const anggaranParam = SetterAnggaranParam(anggaranData)
        param.push(anggaranParam)
        setAnggaran(anggaranData)
        setTanggalPengajuan(tanggalPengajuan)
        setListAnggaran(param)
        setApiSync(stepSyncApi[3])
        setPercentage(72)
      }
    }
  }, [dataSync])

  useEffect(() => {
    if (dataSyncAnggaran !== undefined) {
      if (Number(dataSyncAnggaran.data) === 1) {
        const penjabData = ipcRenderer.sendSync(
          IPC_PENJAB.getPenjabById,
          anggaran.idPenjab
        )
        if (penjabData !== undefined && penjabData !== null) {
          const param: ParamRkasPenjabType[] = []
          const rkasPenjabParam = SetterRkasPenjabParam(penjabData)
          param.push(rkasPenjabParam)
          setListRkasPenjab(param)
          setApiSync(stepSyncApi[4])
          setPercentage(80)
        }
      } else {
        failedSyncData()
      }
    }
  }, [dataSyncAnggaran])

  useEffect(() => {
    if (dataSyncRkasPenjab !== undefined && dataSyncRkasPenjab !== null) {
      if (dataSyncRkasPenjab?.data === 1) {
        const rapbsData = ipcRenderer.sendSync(
          IPC_RAPBS.GetRapbsByAnggaranId,
          idAnggaran
        )

        if (rapbsData !== undefined && rapbsData !== null) {
          const dataIdRapbs = SetterBulkRapbs(rapbsData)
          setListIdRapbs(dataIdRapbs)
          const rkasParam = SetterRkasParam(rapbsData)

          setListRkas(rkasParam)
          setApiSync(stepSyncApi[5])
          setPercentage(86)
        }
      } else {
        failedSyncData()
      }
    }
  }, [dataSyncRkasPenjab])

  useEffect(() => {
    if (dataSyncRkas !== undefined && dataSyncRkas !== null) {
      if (dataSyncRkas.data === 1) {
        const rapbsDetailData = ipcRenderer.sendSync(
          IPC_RAPBS.GetListRapbsPeriodeByListRapbsId,
          listIdRapbs
        )
        if (rapbsDetailData !== undefined && rapbsDetailData.value != null) {
          const rkasDetailParam = MapperRkasDetailParam(rapbsDetailData.value)
          setListRkasDetail(rkasDetailParam)
          setApiSync(stepSyncApi[6])
          setPercentage(90)
        }
      } else {
        failedSyncData()
      }
    }
  }, [dataSyncRkas])

  useEffect(() => {
    if (dataSyncRkasDetail !== undefined) {
      if (dataSyncRkasDetail.data === 1) {
        const rapbsPtkData = ipcRenderer.sendSync(
          IPC_PTK.GetRapbsPtkHonor,
          listIdRapbs
        )
        if (rapbsPtkData !== undefined && rapbsPtkData.value != null) {
          const rkasPtkParam = MapperRkasPtkParam(rapbsPtkData.value)
          setListRkasPtk(rkasPtkParam)
          setApiSync(stepSyncApi[7])
          setPercentage(94)
        }
      } else {
        failedSyncData()
      }
    }
  }, [dataSyncRkasDetail])

  useEffect(() => {
    if (dataSyncRkasPtk !== undefined && dataSyncRkasPtk !== null) {
      if (dataSyncRkasPtk?.data === 1) {
        if (!syncRkasFinalSuccess) {
          setApiSync(stepSyncApi[8])
          setPercentage(98)
        }
      } else {
        failedSyncData()
      }
    }
  }, [dataSyncRkasPtk])

  useEffect(() => {
    if (dataSyncRkasFinal !== undefined) {
      if (Number(dataSyncRkasFinal.data) === 1) {
        setPercentage(100)
      } else {
        failedSyncData()
      }
    }
  }, [tanggalPengajuan, dataSyncRkasFinal])

  useEffect(() => {
    if (percentage === 100) {
      //set delay redirect to form penerimaan dana
      setTimeout(() => {
        ipcRenderer.sendSync(
          IPC_ANGGARAN.UpdateTanggalPengajuan,
          idAnggaran,
          tanggalPengajuan
        )

        const response = RESPONSE_PENGESAHAN.success as ResponseMengulas
        setResponseMengulas(response)
        directPage(response)
        setAlertMengulas(true)
      }, TIME_DELAY_SCREEN)
    }
  }, [percentage])

  useEffect(() => {
    if (
      isInfoConnError ||
      isTokenError ||
      isGetRefBarangError ||
      isGetRefKodeError ||
      isGetRefRekeningError
    ) {
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
      isInfoSyncConnError ||
      isSyncTokenError ||
      isSyncError ||
      isSyncAnggaranError ||
      isSyncRkasPenjabError ||
      isSyncRkasError ||
      isSyncRkasDetailError ||
      isSyncRkasPtkError ||
      isSyncRkasFinalError
    ) {
      const response = RESPONSE_PENGESAHAN.failed_sync_data as ResponseMengulas
      setApi('')
      setApiSync('')
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
  ])

  return (
    <SyncDialogComponent
      title={`Mengirim ${copyKertasKerja()}...`}
      percentage={percentage}
      isOpen={true}
      setIsOpen={closeModal}
    />
  )
}

export default SyncMengulasKertasKerjaView
