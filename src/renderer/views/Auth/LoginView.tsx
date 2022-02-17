import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import AuthLayout from '../Layout/AuthLayout'

import InputComponent from '../../components/Form/InputComponent'
import SyncDialogComponent from '../../components/Dialog/SyncDialogComponent'
import InputPasswordComponent from '../../components/Form/InputPasswordComponent'

import ResetAccountLinkView from './ResetAccountLinkView'

import { Button } from '@wartek-id/button'

import sendEvent from '../../configs/analytics'

import { FormLoginData } from '../../types/LoginType'

const ipcRenderer = window.require('electron').ipcRenderer

const LoginView: FC = () => {
  const navigate = useNavigate()

  const [isSync, setIsSync] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, submitCount },
  } = useForm<FormLoginData>({
    mode: 'onChange',
  })

  const onSubmit = async (data: FormLoginData) => {
    sendEvent({
      category: 'Login',
      action: 'CLICK_LOGIN',
      customDimension1: data.email,
    })
    const ipcCheckUserName = ipcRenderer.sendSync(
      'user:checkUsername',
      data.email
    )
    if (!ipcCheckUserName) {
      setError('email', {
        type: 'manual',
        message: 'Email tidak terdaftar',
      })
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
        message: 'Password salah',
      })
      return
    }
    setIsSync(true)
    ipcRenderer.sendSync('token:createSession', data.email)
    setTimeout(() => {
      setIsSync(false)
      navigate('/dashboard')
    }, 3000)
  }

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="text-[14px] pb-1 font-normal text-gray-900">
            Email
          </div>
          <InputComponent
            type="email"
            name="email"
            placeholder="Masukkan email yang terdaftar di sekolah"
            errors={errors}
            register={register}
            required={true}
          />
        </div>
        <div className="pt-5">
          <div className="text-[14px] pb-1 font-normal text-gray-900">
            Password
          </div>
          <InputPasswordComponent
            name="password"
            errors={errors}
            register={register}
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
            disabled={!isValid && submitCount > 0}
          >
            Masuk
          </Button>
        </div>
        <div className="text-blue-700 text-[12px] text-right">
          <b>“Reset Akun”</b> membutuhkan koneksi internet
        </div>
      </form>
      <SyncDialogComponent
        title="Mencoba masuk ke ARKAS..."
        percentage={50}
        isOpen={isSync}
        setIsOpen={setIsSync}
      />
    </AuthLayout>
  )
}

export default LoginView
