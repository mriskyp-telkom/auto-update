import React, { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Button } from '@wartek-id/button'
import { Icon } from '@wartek-id/icon'

import AlertDialogComponent from 'renderer/components/Dialog/AlertDialogComponent'
import SyncDialogComponent from 'renderer/components/Dialog/SyncDialogComponent'

import { AnggaranStates, useAnggaranStore } from 'renderer/stores/anggaran'
import { useAPIGetToken } from 'renderer/apis/token'
import { useAPICheckHDDVol, useAPIInfoConnection } from 'renderer/apis/utils'
import { AuthStates, useAuthStore } from 'renderer/stores/auth'
import { AppStates, useAppStore } from 'renderer/stores/app'
import { useAPIGetConfigAll, useAPIGetConfigPagu } from 'renderer/apis/config'
import { useAPIGetSekolah } from 'renderer/apis/sekolah'
import { useAPIGetPtkLast } from 'renderer/apis/ptk'
import {
  useAPIGetReferensi,
  useAPIGetReferensiWilayah,
} from 'renderer/apis/referensi'
import { APP_CONFIG } from 'renderer/constants/appConfig'
import { ID_SUMBER_DANA } from 'renderer/constants/anggaran'
import AlertNoConnection from 'renderer/views/AlertNoConnection'
import AlertFailedSyncData from 'renderer/views/AlertFailedSyncData'

import { copyKertasKerja } from 'renderer/utils/copy-writing'

const ipcRenderer = window.require('electron').ipcRenderer

const stepApi = [
  'infoConnection',
  'getToken',
  'checkHddVol',
  'configAll',
  'sekolah',
  'ptkLast',
  'wilayah',
  'refKode',
  'refRekening',
  'refBarang',
  'configPagu',
]

interface CreateKertasKerjaProps {
  idSumberDana: number
}

const CreateKertasKerjaView: FC<CreateKertasKerjaProps> = (
  props: CreateKertasKerjaProps
) => {
  const navigate = useNavigate()
  const location = useLocation()

  const [isSync, setIsSync] = useState(false)
  const [openModalFailed, setOpenModalFailed] = useState(false)
  const [api, setApi] = useState('')
  const [hddVol, setHddVol] = useState('')
  const [hddVolOld, setHddVolOld] = useState('')
  const [kodeWilayah, setKodeWilayah] = useState('')
  const [lastUpdatePtk, setLastUpdatePtk] = useState('')
  const [lastUpdateKode, setLastUpdateKode] = useState('')
  const [lastUpdateRekening, setLastUpdateRekening] = useState('')
  const [lastUpdateBarang, setLastUpdateBarang] = useState('')
  const [alertDesc, setAlertDesc] = useState('')

  const npsn = useAuthStore((state: AuthStates) => state.npsn)
  const tahunAktif = useAuthStore((state: AuthStates) => state.tahunAktif)
  const koreg = useAuthStore((state: AuthStates) => state.koreg)

  const setNpsn = useAuthStore((state: AuthStates) => state.setNpsn)
  const setTahunAktif = useAuthStore((state: AuthStates) => state.setTahunAktif)
  const setKoreg = useAuthStore((state: AuthStates) => state.setKoreg)

  const isMultipleDevice = useAuthStore(
    (state: AuthStates) => state.isMultipleDevice
  )
  const setMultipleDevice = useAuthStore(
    (state: AuthStates) => state.setMultipleDevice
  )
  const setToken = useAppStore((state: AppStates) => state.setToken)

  const setPaguTemp = useAnggaranStore(
    (state: AnggaranStates) => state.setPaguTemp
  )
  const setPenanggungJawabTemp = useAnggaranStore(
    (state: AnggaranStates) => state.setPenanggungJawabTemp
  )
  const setAlertNoConnection = useAppStore(
    (state: AppStates) => state.setAlertNoConnection
  )
  const setAlertFailedSyncData = useAppStore(
    (state: AppStates) => state.setAlertFailedSyncData
  )

  const {
    data: infoConnection,
    isError: isInfoConnError,
    remove: removeInfoConnection,
  } = useAPIInfoConnection({
    retry: 0,
    enabled: api === stepApi[0],
  })
  const {
    // if run only if there are changes. refer to this
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
      enabled: api === stepApi[2] && hddVol !== '' && hddVolOld !== '',
    }
  )

  const {
    data: dataConfigAll,
    isError: isGetConfigError,
    remove: removeConfigAll,
  } = useAPIGetConfigAll({
    enabled: api === stepApi[3],
    retry: 0,
  })

  const {
    data: dataSekolah,
    isError: isSekolahError, // react query alias
    remove: removeSekolah,
  } = useAPIGetSekolah({
    retry: 0,
    enabled: api === stepApi[4],
  })

  const {
    data: dataPtk,
    isError: isPtkError,
    remove: removePtk,
  } = useAPIGetPtkLast(lastUpdatePtk, {
    retry: 0,
    enabled: api === stepApi[5],
  })

  const {
    data: dataWilayah,
    isError: isWilayahError,
    remove: removeWilayah,
  } = useAPIGetReferensiWilayah(
    {
      kodeWilayah,
    },
    {
      retry: 0,
      enabled: api === stepApi[6],
    }
  )

  const {
    data: dataRefKode,
    isError: isGetRefKodeError,
    remove: removeRefKode,
  } = useAPIGetReferensi(
    { referensi: 'kode', lastUpdate: lastUpdateKode },
    { enabled: api === stepApi[7] && lastUpdateKode !== '', retry: 0 }
  )
  const {
    data: dataRefRekening,
    isError: isGetRefRekeningError,
    remove: removeRefRekening,
  } = useAPIGetReferensi(
    { referensi: 'rekening', lastUpdate: lastUpdateRekening },
    { enabled: api === stepApi[8] && lastUpdateRekening !== '' }
  )
  const {
    data: dataRefBarang,
    isError: isGetRefBarangError,
    remove: removeRefBarang,
  } = useAPIGetReferensi(
    { referensi: 'barang', lastUpdate: lastUpdateBarang },
    { enabled: api === stepApi[9] && lastUpdateBarang !== '' }
  )

  const {
    data: dataPagu,
    isError: isGetPaguError,
    remove: removePagu,
  } = useAPIGetConfigPagu(
    { idSumberData: props.idSumberDana, isRevisi: 0 },
    { enabled: api === stepApi[10] }
  )

  const removeCacheData = () => {
    removeInfoConnection()
    removeToken()
    removeCheckHddVol()
    removeConfigAll()
    removeSekolah()
    removePtk()
    removeWilayah()
    removeRefKode()
    removeRefRekening()
    removeRefBarang()
    removePagu()
  }

  const failedSyncData = () => {
    setIsSync(false)
    setApi('')
    removeCacheData()
    setAlertFailedSyncData(true)
  }
  useEffect(() => {
    // if return [] only render 1

    const sekolah = ipcRenderer.sendSync('sekolah:getSekolah')
    const tahunAktif = ipcRenderer.sendSync(
      'config:getConfig',
      APP_CONFIG.tahunAktif
    )
    const ipcHddVol = ipcRenderer.sendSync(
      'config:getConfig',
      APP_CONFIG.hddVol
    )
    let ipcHddVolOld = ipcRenderer.sendSync(
      'config:getConfig',
      APP_CONFIG.hddVolOld
    )
    if (ipcHddVolOld === '') {
      ipcHddVolOld = ipcHddVol
      ipcRenderer.sendSync(
        'config:setConfig',
        APP_CONFIG.hddVolOld,
        ipcHddVolOld
      )
    }
    setHddVol(ipcHddVol)
    setHddVolOld(ipcHddVolOld)
    setNpsn(sekolah.npsn)
    setKoreg(sekolah.kodeRegistrasi)
    setTahunAktif(tahunAktif)
  }, [])

  useEffect(() => {
    if (infoConnection !== undefined) {
      if (Number(infoConnection.data) === 1) {
        setApi(stepApi[1])
      } else {
        failedSyncData()
      }
    }
  }, [infoConnection])

  useEffect(
    () => {
      if (dataToken !== undefined) {
        setToken(dataToken?.data.access_token)
        setApi(stepApi[2])
      }
    },
    // run if token change
    [dataToken]
  )

  useEffect(() => {
    if (dataHDDVol !== undefined) {
      if (Number(dataHDDVol.data) === 1) {
        setApi(stepApi[3])
      } else {
        setApi('')
        removeCacheData()
        setIsSync(false)
        ipcRenderer.send('config:setConfig', APP_CONFIG.koregInvalid, '1')
        setMultipleDevice(true)
      }
    }
  }, [dataHDDVol])

  useEffect(() => {
    if (dataConfigAll !== undefined) {
      ipcRenderer.send('config:setBulkConfig', dataConfigAll?.data)
      setApi(stepApi[4])
    }
  }, [dataConfigAll])

  useEffect(() => {
    if (dataSekolah !== undefined) {
      ipcRenderer.send('sekolah:addSekolah', dataSekolah?.data)
      const ptkLastUpdate = ipcRenderer.sendSync('ptk:getPtkLastUpdate')
      setKodeWilayah(dataSekolah?.data?.kode_wilayah)
      setPenanggungJawabTemp(dataSekolah?.data)
      setLastUpdatePtk(ptkLastUpdate)
      setApi(stepApi[5])
    }
  }, [dataSekolah])

  useEffect(() => {
    if (dataPtk !== undefined) {
      ipcRenderer.send('ptk:addBulkPtk', dataPtk?.data)
      setApi(stepApi[6])
    }
  }, [dataPtk])

  useEffect(() => {
    if (dataWilayah !== undefined) {
      ipcRenderer.sendSync('referensi:addWilayah', dataWilayah?.data)
      const kodeLastUpdate = ipcRenderer.sendSync(
        'referensi:getRefKodeLastUpdate'
      )
      setLastUpdateKode(kodeLastUpdate)
      setApi(stepApi[7])
    }
  }, [dataWilayah])

  useEffect(() => {
    if (dataRefKode !== undefined) {
      ipcRenderer.send('referensi:addBulkRefKode', dataRefKode?.data)
      const rekeningLastUpdate = ipcRenderer.sendSync(
        'referensi:getRefRekeningLastUpdate'
      )
      setLastUpdateRekening(rekeningLastUpdate)
      setApi(stepApi[8])
    }
  }, [dataRefKode])

  useEffect(() => {
    if (dataRefRekening !== undefined) {
      ipcRenderer.send('referensi:addBulkRefRekening', dataRefRekening?.data)
      const barangLastUpdate = ipcRenderer.sendSync(
        'referensi:getRefBarangLastUpdate'
      )
      setLastUpdateBarang(barangLastUpdate)
      setApi(stepApi[9])
    }
  }, [dataRefRekening])

  useEffect(() => {
    if (dataRefBarang !== undefined) {
      ipcRenderer.send('referensi:addBulkRefBarang', dataRefBarang?.data)
      setApi(stepApi[10])
    }
  }, [dataRefBarang])

  useEffect(() => {
    if (dataPagu !== undefined) {
      setIsSync(false)
      setApi('')
      removeCacheData()
      if (dataPagu?.data?.sumber_dana_id === ID_SUMBER_DANA.BOS_REGULER) {
        if (dataPagu?.data?.volume <= 0) {
          setAlertDesc(
            `Anda tidak bisa membuat ${copyKertasKerja()} dari sumber dana BOS Reguler karena belum ada pencatatan penerimaan dana dari BOSSalur. Silakan hubungi dinas setempat jika ada kesalahan.`
          )
          setOpenModalFailed(true)
        } else {
          setPaguTemp(dataPagu?.data)
          navigate('/form/penanggung-jawab/create', {
            state: { backgroundLocation: location },
          })
        }
      }
    }
  }, [dataPagu])

  useEffect(() => {
    if (
      isInfoConnError ||
      isTokenError ||
      isCheckHddVolError ||
      isGetConfigError ||
      isSekolahError ||
      isPtkError ||
      isWilayahError ||
      isGetRefKodeError ||
      isGetRefRekeningError ||
      isGetRefBarangError ||
      isGetPaguError
    ) {
      failedSyncData()
    }
  }, [
    isInfoConnError,
    isTokenError,
    isCheckHddVolError,
    isGetConfigError,
    isSekolahError,
    isPtkError,
    isWilayahError,
    isGetRefKodeError,
    isGetRefRekeningError,
    isGetRefBarangError,
    isGetPaguError,
  ])

  const onClickCreate = () => {
    setAlertNoConnection(false)
    setAlertFailedSyncData(false)
    if (!navigator.onLine) {
      setAlertNoConnection(true)
      return
    }
    setIsSync(true)
    setApi(stepApi[0])
  }

  const onSubmitConfirm = () => {
    setMultipleDevice(false)
    navigate('/registration')
    //dologout
  }

  return (
    <div>
      <Button
        className="mt-3"
        color="black"
        size="md"
        variant="solid"
        onClick={onClickCreate}
      >
        <Icon
          as="i"
          color="default"
          fontSize="default"
          style={{ color: '#ffffff' }}
        >
          add
        </Icon>
        Buat {copyKertasKerja()}
      </Button>
      <AlertDialogComponent
        type="failed"
        icon="close"
        title="Maaf, sumber dana tidak ditemukan"
        desc={alertDesc}
        isOpen={openModalFailed}
        hideBtnCancel={true}
        btnActionText="Tutup"
        onSubmit={() => setOpenModalFailed(false)}
      />
      <AlertDialogComponent
        type="failed"
        icon="priority_high"
        title="Akun anda teridentifikasi pada perangkat lain"
        desc="Silahkan input ulang NPSN dan kode aktivasi untuk dapat melanjutkan menggunakan ARKAS pada komputer ini. Data yang sudah Anda masukkan tidak akan hilang."
        isOpen={isMultipleDevice}
        btnCancelText="Batal"
        btnActionText="Registrasi Ulang"
        onCancel={() => setMultipleDevice(false)}
        onSubmit={onSubmitConfirm}
      />
      <AlertNoConnection
        onSubmit={onClickCreate}
        onCancel={() => setAlertNoConnection(false)}
      />

      <AlertFailedSyncData
        onSubmit={onClickCreate}
        onCancel={() => setAlertFailedSyncData(false)}
      />
      <SyncDialogComponent
        title="Sinkronisasi Data..."
        percentage={0}
        isOpen={isSync}
        setIsOpen={setIsSync}
      />
    </div>
  )
}

export default CreateKertasKerjaView
