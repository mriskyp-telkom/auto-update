import React, { FC, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import AuthLayout from 'views/Layout/AuthLayout'

import SyncDialogComponent from 'components/Dialog/SyncDialogComponent'

import { Button } from '@wartek-id/button'
import { Input, InputGroup, InputRightAddon } from '@wartek-id/input'
import { Icon } from '@wartek-id/icon'

import { emailRegex } from 'constants/regex'

import { FormResetAccountData } from 'types/LoginType'

const CreateAccountView: FC = () => {
  const navigate = useNavigate()
  const { mode } = useParams()

  const [isSync, setIsSync] = useState(false)
  const [visibilityPassword, setVisibilityPassword] = useState(false)
  const [visibilityPasswordConfirm, setVisibilityPasswordConfirm] =
    useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isValid, submitCount },
  } = useForm<FormResetAccountData>({
    mode: 'onChange',
  })

  const onSubmit = async (data: FormResetAccountData) => {
    if (mode === 'new' && data.email === 'yasmin@gmail.com') {
      setError('email', {
        type: 'manual',
        message: 'Email sudah terdaftar',
      })
      return
    }

    if (data.password !== data.password_confirmation) {
      setError('password_confirmation', {
        type: 'manual',
        message: 'Password tidak sesuai',
      })
      return
    }

    setIsSync(true)
    setTimeout(() => {
      setIsSync(false)
      navigate('/dashboard')
    }, 3000)
  }

  useEffect(() => {
    if (mode === 'reset') {
      setValue('email', 'yasmin@gmail.com', { shouldValidate: true })
    }
  }, [setValue])

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
            isDisabled={mode === 'reset' ? true : false}
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
        <div className="pt-5">
          <div className="text-[14px] pb-1 font-normal text-gray-900">
            Konfirmasi Password
          </div>
          <InputGroup>
            <Input
              type={visibilityPasswordConfirm ? 'text' : 'password'}
              placeholder="Masukkan password"
              id="password_confirmation"
              name="password_confirmation"
              isInvalid={!!errors.password_confirmation}
              errorMessage={errors?.password_confirmation?.message}
              {...register('password_confirmation', {
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
                onClick={() =>
                  setVisibilityPasswordConfirm(!visibilityPasswordConfirm)
                }
                className="pointer-events-initial"
              >
                {visibilityPasswordConfirm ? 'visibility' : 'visibility_off'}
              </Icon>
            </InputRightAddon>
          </InputGroup>
        </div>
        <div className="grid justify-items-end pt-[50px] pb-[20px]">
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
          <b>“Daftar”</b> membutuhkan koneksi internet
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

export default CreateAccountView
