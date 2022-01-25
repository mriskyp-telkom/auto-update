import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import LoginLayout from 'views/Layout/LoginLayout'

import { Button } from '@wartek-id/button'
import { Input, InputGroup, InputRightAddon } from '@wartek-id/input'
import { Icon } from '@wartek-id/icon'

import { emailRegex } from 'constants/regex'

import { FormLoginData } from 'types/LoginType'

const LoginView: FC = () => {
  const navigate = useNavigate()

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
    if (!emailRegex.test(data.email)) {
      setError('email', {
        type: 'manual',
        message: 'Masukkan email dengan format nama@domain.com',
      })
      return
    }

    if (data.email === 'yasmin@dummy.com') {
      setError('email', {
        type: 'manual',
        message: 'Email tidak terdaftar',
      })
      return
    }

    if (data.password === '1234') {
      setError('password', {
        type: 'manual',
        message: 'Password salah',
      })
      return
    }

    navigate('/dashboard')
  }

  return (
    <LoginLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="text-[14px] pb-[4px] font-normal text-gray-900">
            Email
          </div>
          <Input
            type="text"
            placeholder="Masukkan email yang terdaftar di sekolah"
            id="email"
            name="email"
            isInvalid={!!errors.email}
            {...register('email', {
              required: 'Wajib diisi.',
            })}
          />
          {errors.email && (
            <div className="text-red-500 text-sm h-6">
              {errors?.email?.message}
            </div>
          )}
        </div>
        <div className="pt-[20px]">
          <div className="text-[14px] pb-[4px] font-normal text-gray-900">
            Password
          </div>
          <InputGroup>
            <Input
              type={visibilityPassword ? 'text' : 'password'}
              placeholder="Masukkan password"
              id="password"
              name="password"
              isInvalid={!!errors.password}
              {...register('password', {
                required: 'Wajib diisi.',
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
                {visibilityPassword ? 'visibility_off' : 'visibility'}
              </Icon>
            </InputRightAddon>
          </InputGroup>
          {errors.password && (
            <div className="text-red-500 text-sm h-6">
              {errors?.password?.message}
            </div>
          )}
        </div>
        <div className="text-[16px] pt-[8px] pb-[50px] font-normal">
          Lupa Password? <span className="text-blue-700">Reset Akun</span>
        </div>
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
    </LoginLayout>
  )
}

export default LoginView
