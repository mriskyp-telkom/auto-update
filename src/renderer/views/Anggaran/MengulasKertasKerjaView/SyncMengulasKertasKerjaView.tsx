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

import { ID_SUMBER_DANA, RESPONSE_PENGESAHAN } from 'renderer/constants/anggaran'

import { ParamPengajuanAnggaran, ResponseMengulas } from 'renderer/types/AnggaranType'
import { ParamInitSync } from 'renderer/types/InitSyncType'

import { IPC_ANGGARAN, IPC_PENJAB, IPC_PENGGUNA } from 'global/ipc'

import { useAPIInitSync } from 'renderer/apis/initSync'
import { useAPIPostAnggaran, useAPIPostPenjab, useAPIPostRkas, useAPIPostRkasDetail, useAPIPostRkasFinal, useAPIPostRkasPtk } from 'renderer/apis/pengajuan'
import { dateToString } from 'renderer/utils/date-formatting'
import { decodeUUID } from 'renderer/utils/string-formatting'
import { FORMAT_TANGGAL_PENGAJUAN, FORMAT_TANGGAL_SYNC } from 'renderer/constants/general'
import { ParamPengajuanPenjab } from 'renderer/types/PenjabType'
import { Anggaran } from 'main/models/Anggaran'
// import { useAPIInitSync } from 'renderer/apis/initSync'

const ipcRenderer = window.require('electron').ipcRenderer

const stepApi = [
  'infoConnection', // [0]
  'getToken',
  'refKode',
  'refRekening',
  'refBarang',
  'initSync', // [5]
  'postAnggaran',
  'postPenjab',
  'postRkas',
  'postRkasDetail',
  'postRkasPtk', // [10]
  'finalRkas',
]

const TypeSessionPengesahan = '2', TypeSessionPergeseran = '3', TypeSessionPerubahan = '5'

const SyncMengulasKertasKerjaView: FC = () => {
  const { q_id_anggaran } = useParams()
  const idAnggaran = decodeURIComponent(q_id_anggaran)

  const [isSync, setIsSync] = useState(false)
  const navigate = useNavigate()
  const [api, setApi] = useState('')

  // attribute setter
  const [lastUpdateKode, setLastUpdateKode] = useState('')
  const [lastUpdateRekening, setLastUpdateRekening] = useState('')
  const [lastUpdateBarang, setLastUpdateBarang] = useState('')

  const npsn = useAuthStore((state: AuthStates) => state.npsn)
  const tahunAktif = useAuthStore((state: AuthStates) => state.tahunAktif)
  const koreg = useAuthStore((state: AuthStates) => state.koreg)

  const setNpsn = useAuthStore((state: AuthStates) => state.setNpsn)
  const setTahunAktif = useAuthStore((state: AuthStates) => state.setTahunAktif)
  const setKoreg = useAuthStore((state: AuthStates) => state.setKoreg)

  const versi = useAppStore((state: AppStates) => state.versi)
  const hddvol = useAppStore((state: AppStates) => state.hddvol)

  const setVersi = useAppStore((state: AppStates) => state.setVersi)
  const setHddvol = useAppStore((state: AppStates) => state.setHddvol)

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
  
  const setAlertNoConnection = useAppStore(
    (state: AppStates) => state.setAlertNoConnection
  )
  const setAlertLostConnection = useAppStore(
    (state: AppStates) => state.setAlertLostConnection
  )
  const setAlertFailedSyncData = useAppStore(
    (state: AppStates) => state.setAlertFailedSyncData
  )
  const setAlertFailedGetToken = useAppStore(
    (state: AppStates) => state.setAlertFailedGetToken
  )
  const setAlertFailedInitSync = useAppStore(
    (state: AppStates) => state.setAlertFailedInitSync
  )
  const setAlertFailedPostAnggaran = useAppStore(
    (state: AppStates) => state.setAlertFailedPostAnggaran
  )
  const setAlertFailedPostPenjab = useAppStore(
    (state: AppStates) => state.setAlertFailedPostPenjab
  )
  const setAlertFailedPostRkas = useAppStore(
    (state: AppStates) => state.setAlertFailedPostRkas
  )
  const setAlertFailedPostRkasDetail = useAppStore(
    (state: AppStates) => state.setAlertFailedPostRkasDetail
  )
  const setAlertFailedPostRkasPtk = useAppStore(
    (state: AppStates) => state.setAlertFailedPostRkasPtk
  )
  const setAlertFailedPostRkasFinal = useAppStore(
    (state: AppStates) => state.setAlertFailedPostRkasFinal
  )
  const setAlertMengulas = useAnggaranStore(
    (state: AnggaranStates) => state.setAlertMengulas
  )
  const setResponseMengulas = useAnggaranStore(
    (state: AnggaranStates) => state.setResponseMengulas
  )

  const setToken = useAppStore((state: AppStates) => state.setToken)
  
  const populateInitSync = () => {
    const sekolah = ipcRenderer.sendSync('sekolah:getSekolah')
    const param: ParamInitSync = {
      tahun: tahunAktif,
      kode_registrasi: sekolah.kodeRegistrasi,
      date_time_local: dateToString(new Date(), FORMAT_TANGGAL_SYNC),
      sekolah_id: sekolah.sekolahId,
      hdd_vol: hddvol,
      npsn: sekolah.npsn,
      versi: versi,
      type_session: TypeSessionPengesahan
    }
    return param
  }
  
  const currentDate = new Date()
  const populatePengajuanAnggaran = () => {
    const anggarans = ipcRenderer.sendSync(IPC_ANGGARAN.getAnggaranPengajuan, ID_SUMBER_DANA.BOS_REGULER)
    let params = new Array<ParamPengajuanAnggaran>()
    anggarans.forEach((anggaran: Anggaran) => {
      const param: ParamPengajuanAnggaran = {
        id_anggaran: idAnggaran,
        id_ref_sumber_dana: ID_SUMBER_DANA.BOS_REGULER,
        sekolah_id: anggaran.sekolahId,
        volume: anggaran.volume,
        harga_satuan: anggaran.hargaSatuan as number,
        jumlah: anggaran.jumlah as number,
        sisa_anggaran: anggaran.sisaAnggaran as number,
        is_pengesahan: anggaran.isPengesahan,
        tanggal_pengajuan: dateToString(currentDate, FORMAT_TANGGAL_PENGAJUAN),
        tanggal_pengesahan: dateToString(currentDate, FORMAT_TANGGAL_PENGAJUAN),
        is_approve: anggaran.isApprove,
        is_revisi: anggaran.isRevisi,
        alasan_penolakan: (anggaran.alasanPenolakan == null) ? '' : anggaran.alasanPenolakan,
        is_aktif: anggaran.isAktif,
        soft_delete: anggaran.softDelete,
        create_date: dateToString(anggaran.createDate, FORMAT_TANGGAL_PENGAJUAN),
        last_update: dateToString(anggaran.createDate, FORMAT_TANGGAL_PENGAJUAN),
        updater_id: '', //TODO: isi ini
        id_penjab: anggaran.idPenjab
      }
      params.push(param)
    });
    return params
  }

  const populatePengajuanPenjab = () => {
    const penjab = ipcRenderer.sendSync(
      IPC_PENJAB.getAktifPenjab,
      q_id_anggaran
    )
    const pengguna = ipcRenderer.sendSync(
      IPC_PENGGUNA.getPengguna
    )

    const param: ParamPengajuanPenjab = {
      id_penjab: penjab.idPenjab,
      sekolah_id: penjab.sekolahId,
      tanggal_mulai: dateToString(new Date(), FORMAT_TANGGAL_PENGAJUAN),
      tanggal_selesai: dateToString(new Date(), FORMAT_TANGGAL_PENGAJUAN),
      ks: penjab.ks,
      nip_ks: penjab.nipKs,
      email_ks: penjab.emailKs,
      telp_ks: penjab.TelpKs,
      bendahara: penjab.bendahara,
      nip_bendahara: penjab.nipBendahara,
      email_bendahara: penjab.emailBendahara,
      telp_bendahara: penjab.telpBendahara,
      komite: penjab.komite,
      nip_komite: penjab.nipKomite,
      soft_delete: penjab.softDelete,
      create_date: dateToString(new Date(), FORMAT_TANGGAL_PENGAJUAN),
      last_update: dateToString(new Date(), FORMAT_TANGGAL_PENGAJUAN),
      updater_id: pengguna.penggunaId
    }
    return param
  }


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

  const {
    data: initSync,
    isError: isInitSyncError,
    remove: removeInitSync,
  } = useAPIInitSync(
    populateInitSync(),
    {
      retry: 0,
      enabled: api === stepApi[2],
    }
  )

  const {
    data: anggaranResponse,
    isError: anggaranResponseError,
    remove: removeAnggaranResponse,
  } = useAPIPostAnggaran(
    populatePengajuanAnggaran(),
    {
      retry: 0,
      enabled: api === stepApi[3],
    }
  )

  const {
    data: penjabResponse,
    isError: penjabResponseError,
    remove: removePenjabResponse,
  } = useAPIPostPenjab(
    populatePengajuanPenjab(),
    {
      retry: 0,
      enabled: api === stepApi[4],
    }
  )

  // const {
  //   data: rkasResponse,
  //   isError: rkasResponseError,
  //   remove: removeRkasResponse,
  // } = useAPIPostRkas(
  //   populatePengajuanRkas(),
  //   {
  //     retry: 0,
  //     enabled: api === stepAPi[5],
  //   }
  // )

  // const {
  //   data: rkasDetailResponse,
  //   isError: rkasDetailResponseError,
  //   remove: removeRkasDetailResponse,
  // } = useAPIPostRkasDetail(
  //   populatePengajuanRkasDetail(),
  //   {
  //     retry: 0,
  //     enabled: api === stepAPi[6],
  //   }
  // )

  // const {
  //   data: rkasPtkResponse,
  //   isError: rkasPtkResponseError,
  //   remove: removeRkasPtkResponse,
  // } = useAPIPostRkasPtk(
  //   populatePengajuanRkasPtk(),
  //   {
  //     retry: 0,
  //     enabled: api === stepAPi[7],
  //   }
  // )

  // const {
  //   data: rkasFinalResponse,
  //   isError: rkasFinalResponseError,
  //   remove: removeRkasFinalResponse,
  // } = useAPIPostRkasFinal(
  //   {
  //     retry: 0,
  //     enabled: api === stepAPi[8],
  //   }
  // )

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

  useEffect(() => {
    if (checkSisaDana() != 0) {
      setApi(stepApi[0]) // put here just for test
    }
  }, [])

  useEffect(() => {
    // debugger
    if (infoConnection !== undefined) {
      const result = Number(infoConnection?.data)
      if (result === 1) {
        setApi(stepApi[1])
      } else {
        removeInfoConnection()
        setAlertNoConnection(true)
      }
    }
  }, [infoConnection])

  useEffect(() => {
    if (checkSisaDana() != 0) {
      const response = RESPONSE_PENGESAHAN.error_sisa_dana as ResponseMengulas
      directPage(response)
      setResponseMengulas(response)
      setAlertMengulas(true)
    } else {
      // if api info connection
      setApi(stepApi[0])
    }
  }, [])

  useEffect(() => {
    const sekolah = ipcRenderer.sendSync('sekolah:getSekolah')
    const tahunAktif = ipcRenderer.sendSync(
      'config:getConfig',
      APP_CONFIG.tahunAktif
    )
    const hddVol = ipcRenderer.sendSync(
      'config:getConfig',
      APP_CONFIG.hddVol
    )
    const versi = ipcRenderer.sendSync(
      'config:getConfig',
      APP_CONFIG.versionApp
    )

    setNpsn(sekolah.npsn)
    setKoreg(sekolah.kodeRegistrasi)
    setTahunAktif(tahunAktif)
    setVersi(versi)
    setHddvol(hddVol)
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
    // console.log('infoConnection')
    // console.log(infoConnection)
    // console.log(isInfoConnError)
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
    }
  }, [dataRefBarang, dataRefRekening, dataRefKode])

  
  useEffect(() => {
    //debugger
    if (initSync !== undefined) {
      const syncID = initSync?.data
      if (syncID !== undefined) {
        setApi(stepApi[3])
      } else {
        removeInitSync()
        setAlertFailedInitSync(true)
      }
    }
  }, [initSync])

  useEffect(() => {
    if (anggaranResponse !== undefined) {
      const resp = anggaranResponse?.data
      if (resp === 1) {
        setApi(stepApi[4])
      } else {
        removeAnggaranResponse()
        setAlertFailedPostAnggaran(true)
      }
    }
  }, [anggaranResponse])

  useEffect(() => {
    debugger
    if (penjabResponse !== undefined) {
      const resp = penjabResponse?.data
      if (resp === 1) {
        setApi(stepApi[5])
      } else {
        removePenjabResponse()
        setAlertFailedPostPenjab(true)
      }
    }
  }, [penjabResponse])

  // useEffect(() => {
  //   if (rkasResponse !== undefined) {
  //     const resp = rkasResponse?.data
  //     if (resp === 1) {
  //       setApi(stepAPi[6])
  //     } else {
  //       removeRkasResponse()
  //       setAlertFailedPostRkas(true)
  //     }
  //   }
  // }, [rkasResponse])

  // useEffect(() => {
  //   if (rkasDetailResponse !== undefined) {
  //     const resp = rkasDetailResponse?.data
  //     if (resp === 1) {
  //       setApi(stepAPi[7])
  //     } else {
  //       removeRkasDetailResponse()
  //       setAlertFailedPostRkasDetail(true)
  //     }
  //   }
  // }, [rkasDetailResponse])

  // useEffect(() => {
  //   if (rkasPtkResponse !== undefined) {
  //     const resp = rkasPtkResponse?.data
  //     if (resp === 1) {
  //       setApi(stepAPi[8])
  //     } else {
  //       removeRkasPtkResponse()
  //       setAlertFailedPostRkasPtk(true)
  //     }
  //   }
  // }, [rkasPtkResponse])

  // useEffect(() => {
  //   if (rkasFinalResponse !== undefined) {
  //     const resp = rkasFinalResponse?.data
  //     if (resp === 1) {
  //       //TODO: code after pengajuan success
  //     } else {
  //       removeRkasFinalResponse()
  //       setAlertFailedPostRkasFinal(true)
  //     }
  //   }
  // }, [rkasFinalResponse])

  return (
    <SyncDialogComponent
      title="Mengirim RKAS..."
      subtitle="Pastikan Anda terkoneksi ke internet yang lancar."
      percentage={50}
      isOpen={true}
      setIsOpen={closeModal}
    />
  )
}

export default SyncMengulasKertasKerjaView
