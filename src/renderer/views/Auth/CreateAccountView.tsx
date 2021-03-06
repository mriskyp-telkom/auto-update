import React, { FC, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'

import AuthLayout from 'renderer/views/Layout/AuthLayout'

import SyncDialogComponent from 'renderer/components/Dialog/SyncDialogComponent'
import InputComponent from 'renderer/components/Form/InputComponent'
import InputPasswordComponent from 'renderer/components/Form/InputPasswordComponent'

import AlertFailedSyncData from 'renderer/views/AlertFailedSyncData'
import AlertNoConnection from 'renderer/views/AlertNoConnection'
import AlertLostConnection from 'renderer/views/AlertLostConnection'

import { Button } from '@wartek-id/button'

import {
  FormResetAccountData,
  FormResetAccountType,
} from 'renderer/types/forms/LoginType'

import { AuthStates, useAuthStore } from 'renderer/stores/auth'
import { AppStates, useAppStore } from 'renderer/stores/app'

import { APP_CONFIG } from 'renderer/constants/appConfig'
import { EMAIL_ERROR_REGISTERED } from 'renderer/constants/errorForm'

import { useAPIInfoConnection } from 'renderer/apis/utils'
import { useAPIRegistration } from 'renderer/apis/registration'
import { useAPIGetToken } from 'renderer/apis/token'
import { useAPIGetSekolah } from 'renderer/apis/sekolah'
import {
  useAPIGetReferensi,
  useAPIGetReferensiWilayah,
} from 'renderer/apis/referensi'

import { sendEventRegistrasi2 } from 'renderer/utils/analytic/auth-util'
import { btnFormDisabled } from 'renderer/utils/form-validation'

import filter from 'lodash/filter'

import { RegisterData } from 'main/types/Pengguna'

const ipcRenderer = window.require('electron').ipcRenderer

const stepApi = [
  'infoConnection',
  'registration',
  'getToken',
  'sekolah',
  'wilayah',
  'referensiKode',
  'referensiRekening',
  'referensiBarang',
]

const CreateAccountView: FC = () => {
  const navigate = useNavigate()
  const { q_mode } = useParams()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [kodeWilayah, setKodeWilayah] = useState('')
  const [api, setApi] = useState('')
  const [isSync, setIsSync] = useState(false)
  const [hddVol, setHddVol] = useState('')
  const [lastUpdateKode, setLastUpdateKode] = useState('')
  const [lastUpdateRekening, setLastUpdateRekening] = useState('')
  const [lastUpdateBarang, setLastUpdateBarang] = useState('')

  const npsn = useAuthStore((state: AuthStates) => state.npsn)
  const koreg = useAuthStore((state: AuthStates) => state.koreg)
  const tahunAktif = useAuthStore((state: AuthStates) => state.tahunAktif)
  const setTahunAktif = useAuthStore((state: AuthStates) => state.setTahunAktif)
  const setAlertNoConnection = useAppStore(
    (state: AppStates) => state.setAlertNoConnection
  )
  const setAlertLostConnection = useAppStore(
    (state: AppStates) => state.setAlertLostConnection
  )
  const setAlertFailedSyncData = useAppStore(
    (state: AppStates) => state.setAlertFailedSyncData
  )
  const setToken = useAppStore((state: AppStates) => state.setToken)

  const formMethods = useForm<FormResetAccountData>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      password_confirmation: '',
    },
  })

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    setFocus,
    getValues,
    clearErrors,
    formState: { errors },
  } = formMethods

  const {
    data: infoConnection,
    isError: isInfoConnError,
    remove: removeInfoConnection,
  } = useAPIInfoConnection({
    retry: 0,
    enabled: api === stepApi[0],
  })
  const {
    data: registration,
    isError: isRegistrationError,
    remove: removeRegistration,
  } = useAPIRegistration(
    {
      username: email,
      password,
      npsn,
      koreg,
      hdd_vol: hddVol,
    },
    {
      retry: 0,
      enabled: api === stepApi[1],
    }
  )
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
        api === stepApi[2] && npsn !== '' && tahunAktif !== '' && koreg !== '',
    }
  )

  const {
    data: sekolah,
    isError: isSekolahError,
    remove: removeSekolah,
  } = useAPIGetSekolah({
    retry: 0,
    enabled: api === stepApi[3],
  })

  const {
    data: wilayah,
    isError: isWilayahError,
    remove: removeWilayah,
  } = useAPIGetReferensiWilayah(
    {
      kodeWilayah,
    },
    {
      retry: 0,
      enabled: api === stepApi[4],
    }
  )

  const {
    data: kode,
    isError: isGetRefKodeError,
    remove: removeRefKode,
  } = useAPIGetReferensi(
    { referensi: 'kode', lastUpdate: lastUpdateKode },
    { enabled: api === stepApi[4] && lastUpdateKode !== '', retry: 0 }
  )
  const {
    data: rekening,
    isError: isGetRefRekeningError,
    remove: removeRefRekening,
  } = useAPIGetReferensi(
    { referensi: 'rekening', lastUpdate: lastUpdateRekening },
    { enabled: api === stepApi[5] && lastUpdateRekening !== '' }
  )
  const {
    data: barang,
    isError: isGetRefBarangError,
    remove: removeRefBarang,
  } = useAPIGetReferensi(
    { referensi: 'barang', lastUpdate: lastUpdateBarang },
    { enabled: api === stepApi[6] && lastUpdateBarang !== '' }
  )

  const removeCacheData = () => {
    removeInfoConnection()
    removeRegistration()
    removeToken()
    removeSekolah()
    removeWilayah()
    removeRefKode()
    removeRefRekening()
    removeRefBarang()
  }

  const goToDashboard = () => {
    ipcRenderer.sendSync('token:createSession', email)
    setIsSync(false)
    removeCacheData()
    sendEventRegistrasi2(getValues('email'), 'sukses')
    navigate('/anggaran')
  }

  const failedSyncData = () => {
    setIsSync(false)
    setApi('')
    removeCacheData()
    setAlertFailedSyncData(true)
  }

  const handleClearError = (name: FormResetAccountType) => {
    clearErrors(name)
  }

  const onSubmit = async (data: FormResetAccountData) => {
    setAlertNoConnection(false)
    setAlertLostConnection(false)
    setAlertFailedSyncData(false)

    if (data.password !== data.password_confirmation) {
      setError('password_confirmation', {
        type: 'manual',
        message: 'Password tidak sesuai',
      })
      sendEventRegistrasi2(getValues('email'), 'password_tidak_sesuai')
      return
    }
    if (!navigator.onLine) {
      setAlertNoConnection(true)
      return
    }
    setEmail(data.email)
    setPassword(data.password)
    setApi(stepApi[0])
    setIsSync(true)
  }

  const onError = (error: any) => {
    const isError = filter(error, ['type', 'required']).length > 0
    if (isError) {
      sendEventRegistrasi2(getValues('email'), 'kolom_kosong')
    }
  }

  useEffect(() => {
    const ipcHddVol = ipcRenderer.sendSync(
      'config:getConfig',
      APP_CONFIG.hddVol
    )
    const barangLastUpdate = ipcRenderer.sendSync(
      'referensi:getRefBarangLastUpdate'
    )
    const rekeningLastUpdate = ipcRenderer.sendSync(
      'referensi:getRefRekeningLastUpdate'
    )
    const kodeLastUpdate = ipcRenderer.sendSync(
      'referensi:getRefKodeLastUpdate'
    )
    setLastUpdateBarang(barangLastUpdate)
    setLastUpdateKode(kodeLastUpdate)
    setLastUpdateRekening(rekeningLastUpdate)
    setHddVol(ipcHddVol)
    setFocus('email')
  }, [])

  useEffect(() => {
    if (infoConnection !== undefined) {
      if (infoConnection?.data === 1) {
        setApi(stepApi[1])
      } else {
        removeCacheData()
        setIsSync(false)
        setApi('')
        setAlertFailedSyncData(true)
      }
    }
  }, [infoConnection])

  useEffect(() => {
    if (registration !== undefined) {
      if (registration?.data.status_code === 1) {
        setTahunAktif(registration?.data?.tahun_aktif)
        setApi(stepApi[2])
      } else if (registration?.data.status_code === 2) {
        setError('email', {
          type: 'manual',
          message: EMAIL_ERROR_REGISTERED,
        })
        sendEventRegistrasi2(getValues('email'), 'email_terdaftar')
        failedSyncData()
      } else {
        failedSyncData()
      }
    }
  }, [registration])

  useEffect(() => {
    if (dataToken !== undefined) {
      setToken(dataToken?.data.access_token)
      setApi(stepApi[3])
    }
  }, [dataToken])

  useEffect(() => {
    if (sekolah !== undefined) {
      const data: RegisterData = {
        registrasi: registration?.data,
        sekolah: sekolah?.data,
        kode_registrasi: koreg,
        password: password,
        email: email,
      }

      setKodeWilayah(sekolah?.data?.kode_wilayah)
      const ipcRegistration = ipcRenderer.sendSync('user:registration', data)

      if (ipcRegistration === 1) {
        setApi(stepApi[4])
      } else {
        failedSyncData()
      }
    }
  }, [sekolah])

  useEffect(() => {
    if (wilayah !== undefined) {
      ipcRenderer.sendSync('referensi:addWilayah', wilayah?.data)
      setApi(stepApi[5])
    }
  }, [wilayah])

  useEffect(() => {
    if (kode !== undefined) {
      ipcRenderer.send('referensi:addBulkRefKode', kode?.data)
      setApi(stepApi[6])
    }
  }, [kode])

  useEffect(() => {
    if (rekening !== undefined) {
      ipcRenderer.send('referensi:addBulkRefRekening', rekening?.data)
      setApi(stepApi[7])
    }
  }, [rekening])

  useEffect(() => {
    if (barang !== undefined) {
      ipcRenderer.send('referensi:addBulkRefBarang', barang?.data)
      goToDashboard()
    }
  }, [barang])

  useEffect(() => {
    if (
      isInfoConnError ||
      isRegistrationError ||
      isTokenError ||
      isSekolahError
    ) {
      failedSyncData()
    }
  }, [isInfoConnError, isRegistrationError, isTokenError, isSekolahError])

  useEffect(() => {
    if (
      isWilayahError ||
      isGetRefBarangError ||
      isGetRefRekeningError ||
      isGetRefKodeError
    ) {
      goToDashboard()
    }
  }, [
    isWilayahError,
    isGetRefBarangError,
    isGetRefRekeningError,
    isGetRefKodeError,
  ])

  useEffect(() => {
    if (q_mode === 'reset') {
      setValue('email', 'yasmin@gmail.com', { shouldValidate: true })
    }
  }, [setValue])

  return (
    <AuthLayout>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div>
            <div className="text-base pb-1 font-normal text-gray-900">
              Email
            </div>
            <InputComponent
              type="email"
              name="email"
              placeholder="Masukkan email yang terdaftar di sekolah"
              errors={errors}
              register={register}
              setError={setError}
              handleClearError={handleClearError}
              required={true}
              isDisabled={q_mode === 'reset'}
            />
          </div>
          <div className="pt-5">
            <div className="text-base pb-1 font-normal text-gray-900">
              Password
            </div>
            <InputPasswordComponent
              name="password"
              errors={errors}
              register={register}
              setError={setError}
              handleClearError={handleClearError}
            />
          </div>
          <div className="pt-5">
            <div className="text-base pb-1 font-normal text-gray-900">
              Konfirmasi Password
            </div>
            <InputPasswordComponent
              name="password_confirmation"
              errors={errors}
              register={register}
              setError={setError}
              handleClearError={handleClearError}
            />
          </div>
          <div className="grid justify-items-end pt-[50px] pb-[20px]">
            <Button
              className="px-[72px]"
              color="blue"
              size="lg"
              variant="solid"
              type="submit"
              disabled={btnFormDisabled(errors)}
            >
              Daftar
            </Button>
          </div>
          <div className="text-blue-700 text-[12px] text-right">
            <b>???Daftar???</b> membutuhkan koneksi internet
          </div>
        </form>
      </FormProvider>
      <SyncDialogComponent
        title="Mencoba masuk ke ARKAS..."
        percentage={50}
        isOpen={isSync}
        setIsOpen={setIsSync}
      />
      <AlertNoConnection
        onSubmit={handleSubmit(onSubmit)}
        onCancel={() => setAlertNoConnection(false)}
      />
      <AlertLostConnection
        onSubmit={handleSubmit(onSubmit)}
        onCancel={() => setAlertLostConnection(false)}
      />
      <AlertFailedSyncData
        onSubmit={handleSubmit(onSubmit)}
        onCancel={() => setAlertFailedSyncData(false)}
      />
    </AuthLayout>
  )
}

export default CreateAccountView
