import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { FormProvider, useForm } from 'react-hook-form'

import AuthLayout from 'renderer/views/Layout/AuthLayout'
import ResetAccountLinkView from 'renderer/views/Auth/ResetAccountLinkView'

import InputComponent from 'renderer/components/Form/InputComponent'
import InputPasswordComponent from 'renderer/components/Form/InputPasswordComponent'
import AlertDialogComponent from 'renderer/components/Dialog/AlertDialogComponent'

import SyncLoginView from './SyncLoginView'

import { Button } from '@wartek-id/button'

import { FormLoginType, FormLoginData } from 'renderer/types/forms/LoginType'

import { AuthStates, useAuthStore } from 'renderer/stores/auth'

import { APP_CONFIG } from 'renderer/constants/appConfig'
import {
  EMAIL_ERROR_NOT_REGISTERED,
  PASSWORD_ERROR_WRONG,
} from 'renderer/constants/errorForm'

import { sendEventLogin } from 'renderer/utils/analytic/auth-util'
import { btnFormDisabled } from 'renderer/utils/form-validation'

import filter from 'lodash/filter'

const ipcRenderer = window.require('electron').ipcRenderer

const LoginView: FC = () => {
  const navigate = useNavigate()
  const setSyncLogin = useAuthStore((state: AuthStates) => state.setSyncLogin)
  const setNpsn = useAuthStore((state: AuthStates) => state.setNpsn)
  const setTahunAktif = useAuthStore((state: AuthStates) => state.setTahunAktif)
  const setKoreg = useAuthStore((state: AuthStates) => state.setKoreg)
  const setEmail = useAuthStore((state: AuthStates) => state.setEmail)
  const syncLogin = useAuthStore((state: AuthStates) => state.syncLogin)

  const isMultipleDevice = useAuthStore(
    (state: AuthStates) => state.isMultipleDevice
  )

  const setMultipleDevice = useAuthStore(
    (state: AuthStates) => state.setMultipleDevice
  )

  const formMethods = useForm<FormLoginData>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    getValues,
    clearErrors,
    formState: { errors },
  } = formMethods

  const handleClearError = (name: FormLoginType) => {
    clearErrors(name)
  }

  const onSubmit = async (data: FormLoginData) => {
    const ipcCheckUserName = ipcRenderer.sendSync(
      'user:checkUsername',
      data.email
    )

    if (!ipcCheckUserName) {
      setError('email', {
        type: 'manual',
        message: EMAIL_ERROR_NOT_REGISTERED,
      })
      sendEventLogin(getValues('email'), 'email_tidak_terdaftar')
      return
    }

    const ipcCheckUserPass = ipcRenderer.sendSync(
      'user:checkUserPass',
      data.email,
      data.password
    )

    if (!ipcCheckUserPass) {
      setError('password', {
        type: 'manual',
        message: PASSWORD_ERROR_WRONG,
      })
      sendEventLogin(getValues('email'), 'password_salah')
      return
    }

    const sekolah = ipcRenderer.sendSync('sekolah:getSekolah')
    const tahunAktif = ipcRenderer.sendSync(
      'config:getConfig',
      APP_CONFIG.tahunAktif
    )

    setEmail(data.email)
    setNpsn(sekolah.npsn)
    setTahunAktif(tahunAktif)
    setKoreg(sekolah.kodeRegistrasi)
    setSyncLogin(true)
  }

  const onError = (error: any) => {
    const isError = filter(error, ['type', 'required']).length > 0
    if (isError) {
      sendEventLogin(getValues('email'), 'kolom_kosong')
    }
  }

  const onSubmitConfirm = () => {
    setMultipleDevice(false)
    sendEventLogin(getValues('email'), 'multidevice_error')
    navigate('/registration')
  }

  useEffect(() => {
    setFocus('email')
  }, [])

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
          <ResetAccountLinkView />
          <div className="grid justify-items-end pb-[20px]">
            <Button
              className="px-[72px]"
              color="blue"
              size="lg"
              variant="solid"
              type="submit"
              disabled={btnFormDisabled(errors)}
            >
              Masuk
            </Button>
          </div>
          <div className="text-blue-700 text-[12px] text-right">
            <b>???Reset Akun???</b> membutuhkan koneksi internet
          </div>
        </form>
      </FormProvider>
      {syncLogin ? <SyncLoginView /> : ''}
      <AlertDialogComponent
        type="failed"
        icon="priority_high"
        title="Akun anda teridentifikasi pada perangkat lain"
        desc="Silakan input ulang NPSN dan kode aktivasi untuk dapat melanjutkan menggunakan ARKAS pada komputer ini. Data yang sudah Anda masukkan tidak akan hilang."
        isOpen={isMultipleDevice}
        btnCancelText="Batal"
        btnActionText="Registrasi Ulang"
        onCancel={() => setMultipleDevice(false)}
        onSubmit={onSubmitConfirm}
      />
    </AuthLayout>
  )
}

export default LoginView
