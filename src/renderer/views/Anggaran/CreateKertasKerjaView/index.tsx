import React, { FC, useEffect, useState } from 'react'

import { Button } from '@wartek-id/button'
import { Icon } from '@wartek-id/icon'

import AlertDialogComponent from 'renderer/components/Dialog/AlertDialogComponent'
import SyncDialogComponent from 'renderer/components/Dialog/SyncDialogComponent'

import FormKertasKerjaView from './FormPenanggungJawabView'
import { useNavigate } from 'react-router'

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

const ipcRenderer = window.require('electron').ipcRenderer

const stepAPi = [
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
  const setCreateKertasKerja = useAnggaranStore(
    (state: AnggaranStates) => state.setCreateKertasKerja
  )
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
    enabled: api === stepAPi[0],
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
        api === stepAPi[1] && npsn !== '' && tahunAktif !== '' && koreg !== '',
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
      enabled: api === stepAPi[2] && hddVol !== '' && hddVolOld !== '',
    }
  )

  const {
    data: dataConfigAll,
    isError: isGetConfigError,
    remove: removeConfigAll,
  } = useAPIGetConfigAll({
    enabled: api === stepAPi[3],
    retry: 0,
  })

  const {
    data: dataSekolah,
    isError: isSekolahError,
    remove: removeSekolah,
  } = useAPIGetSekolah({
    retry: 0,
    enabled: api === stepAPi[4],
  })

  const {
    data: dataPtk,
    isError: isPtkError,
    remove: removePtk,
  } = useAPIGetPtkLast(lastUpdatePtk, {
    retry: 0,
    enabled: api === stepAPi[5],
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
      enabled: api === stepAPi[6],
    }
  )

  const {
    data: dataRefKode,
    isError: isGetRefKodeError,
    remove: removeRefKode,
  } = useAPIGetReferensi(
    { referensi: 'kode', lastUpdate: lastUpdateKode },
    { enabled: api === stepAPi[7] && lastUpdateKode !== '', retry: 0 }
  )
  const {
    data: dataRefRekening,
    isError: isGetRefRekeningError,
    remove: removeRefRekening,
  } = useAPIGetReferensi(
    { referensi: 'rekening', lastUpdate: lastUpdateRekening },
    { enabled: api === stepAPi[8] && lastUpdateRekening !== '' }
  )
  const {
    data: dataRefBarang,
    isError: isGetRefBarangError,
    remove: removeRefBarang,
  } = useAPIGetReferensi(
    { referensi: 'barang', lastUpdate: lastUpdateBarang },
    { enabled: api === stepAPi[9] && lastUpdateBarang !== '' }
  )

  const {
    data: dataPagu,
    isError: isGetPaguError,
    remove: removePagu,
  } = useAPIGetConfigPagu(
    { idSumberData: props.idSumberDana, isRevisi: 0 },
    { enabled: api === stepAPi[10] }
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
    const sekolah = ipcRenderer.sendSync('sekolah:getSekolah')
    const tahunAktif = ipcRenderer.sendSync(
      'config:getConfig',
      APP_CONFIG.tahunAktif
    )
    const ipcHddVol = ipcRenderer.sendSync(
      'config:getConfig',
      APP_CONFIG.hddVol
    )
    const ipcHddVolOld = ipcRenderer.sendSync(
      'config:getConfig',
      APP_CONFIG.hddVolOld
    )
    setHddVol(ipcHddVol)
    setHddVolOld(ipcHddVolOld)
    setNpsn(sekolah.npsn)
    setKoreg(sekolah.kodeRegistrasi)
    setTahunAktif(tahunAktif)
  }, [])

  useEffect(() => {
    if (infoConnection !== undefined) {
      if (Number(infoConnection.data) === 1) {
        setApi(stepAPi[1])
      } else {
        failedSyncData()
      }
    }
  }, [infoConnection])

  useEffect(() => {
    if (dataToken !== undefined) {
      setToken(dataToken?.data.access_token)
      setApi(stepAPi[2])
    }
  }, [dataToken])

  useEffect(() => {
    if (dataHDDVol !== undefined) {
      if (Number(dataHDDVol.data) === 1) {
        setApi(stepAPi[3])
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
      setApi(stepAPi[4])
    }
  }, [dataConfigAll])

  useEffect(() => {
    if (dataSekolah !== undefined) {
      ipcRenderer.send('sekolah:addSekolah', dataSekolah?.data)
      const ptkLastUpdate = ipcRenderer.sendSync('ptk:getPtkLastUpdate')
      setKodeWilayah(dataSekolah?.data?.kode_wilayah)
      setPenanggungJawabTemp(dataSekolah?.data)
      setLastUpdatePtk(ptkLastUpdate)
      setApi(stepAPi[5])
    }
  }, [dataSekolah])

  useEffect(() => {
    if (dataPtk !== undefined) {
      ipcRenderer.send('ptk:addBulkPtk', dataPtk?.data)
      setApi(stepAPi[6])
    }
  }, [dataPtk])

  useEffect(() => {
    if (dataWilayah !== undefined) {
      ipcRenderer.sendSync('referensi:addWilayah', dataWilayah?.data)
      const kodeLastUpdate = ipcRenderer.sendSync(
        'referensi:getRefKodeLastUpdate'
      )
      setLastUpdateKode(kodeLastUpdate)
      setApi(stepAPi[7])
    }
  }, [dataWilayah])

  useEffect(() => {
    if (dataRefKode !== undefined) {
      ipcRenderer.send('referensi:addBulkRefKode', dataRefKode?.data)
      const rekeningLastUpdate = ipcRenderer.sendSync(
        'referensi:getRefRekeningLastUpdate'
      )
      setLastUpdateRekening(rekeningLastUpdate)
      setApi(stepAPi[8])
    }
  }, [dataRefKode])

  useEffect(() => {
    if (dataRefRekening !== undefined) {
      ipcRenderer.send('referensi:addBulkRefRekening', dataRefRekening?.data)
      const barangLastUpdate = ipcRenderer.sendSync(
        'referensi:getRefBarangLastUpdate'
      )
      setLastUpdateBarang(barangLastUpdate)
      setApi(stepAPi[9])
    }
  }, [dataRefRekening])

  useEffect(() => {
    if (dataRefBarang !== undefined) {
      ipcRenderer.send('referensi:addBulkRefBarang', dataRefBarang?.data)
      setApi(stepAPi[10])
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
            'Anda tidak bisa membuat Kertas Kerja dari sumber dana BOS Reguler karena belum ada pencatatan penerimaan dana dari BOSSalur. Silakan hubungi dinas setempat jika ada kesalahan.'
          )
          setOpenModalFailed(true)
        } else {
          setPaguTemp(dataPagu?.data)
          setCreateKertasKerja(true)
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
    setApi(stepAPi[0])
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
        Buat Kertas Kerja
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
        percentage={50}
        isOpen={isSync}
        setIsOpen={setIsSync}
      />
      <FormKertasKerjaView mode="create" />
    </div>
  )
}

export default CreateKertasKerjaView
