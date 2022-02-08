import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import AuthLayout from 'views/Layout/AuthLayout'

import SyncDialogComponent from 'components/Dialog/SyncDialogComponent'

import ResetAccountLinkView from './ResetAccountLinkView'

import { Button } from '@wartek-id/button'
import { Input, InputGroup, InputRightAddon } from '@wartek-id/input'
import { Icon } from '@wartek-id/icon'

import { emailRegex } from 'constants/regex'

import { FormLoginData } from 'types/LoginType'
const ipcRenderer = window.require('electron').ipcRenderer

const LoginView: FC = () => {
  const navigate = useNavigate()

  const [isSync, setIsSync] = useState(false)
  const [visibilityPassword, setVisibilityPassword] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, submitCount },
  } = useForm<FormLoginData>({
    mode: 'onChange',
  })

  const onSubmit = async (data: FormLoginData) => {
    const ipc = ipcRenderer.sendSync('user:checkUsername', data.email)
    console.log(ipc)
    if (data.email === 'yasmin@gmail.com') {
      setError('email', {
        type: 'manual',
        message: 'Email tidak terdaftar',
      })
      return
    }

    if (data.password === '12345678') {
      setError('password', {
        type: 'manual',
        message: 'Password salah',
      })
      return
    }

    setIsSync(true)
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
          <Input
            type="text"
            placeholder="Masukkan email yang terdaftar di sekolah"
            id="email"
            name="email"
            isInvalid={!!errors.email}
            errorMessage={errors?.email?.message}
            {...register('email', {
              required: 'Wajib diisi.',
              pattern: {
                value: emailRegex,
                message: 'Masukkan email dengan contoh format arini@yahoo.com',
              },
            })}
          />
        </div>
        <div className="pt-5">
          <div className="text-[14px] pb-1 font-normal text-gray-900">
            Password
          </div>
          <InputGroup>
            <Input
              type={visibilityPassword ? 'text' : 'password'}
              placeholder="Masukkan password"
              id="password"
              name="password"
              isInvalid={!!errors.password}
              errorMessage={errors?.password?.message}
              {...register('password', {
                required: 'Wajib diisi.',
                minLength: {
                  value: 8,
                  message: 'Minimal 8 karakter',
                },
              })}
            />
            <InputRightAddon>
              <Icon
                as="i"
                color="default"
                fontSize="default"
                onClick={() => setVisibilityPassword(!visibilityPassword)}
                className="pointer-events-initial"
              >
                {visibilityPassword ? 'visibility' : 'visibility_off'}
              </Icon>
            </InputRightAddon>
          </InputGroup>
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
