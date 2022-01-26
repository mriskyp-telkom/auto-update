import React, { FC, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import AuthLayout from 'views/Layout/AuthLayout'

import { Button } from '@wartek-id/button'
import { Input, InputGroup, InputRightAddon } from '@wartek-id/input'
import { Icon } from '@wartek-id/icon'

import { FormResetAccountData } from 'types/LoginType'

const ResetAccountForm: FC = () => {
  const [visibilityPassword, setVisibilityPassword] = useState(false)
  const [visibilityPasswordConfirm, setVisibilityPasswordConfirm] =
    useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, submitCount },
  } = useForm<FormResetAccountData>({
    mode: 'onChange',
  })

  const onSubmit = async (data: FormResetAccountData) => {
    console.log(data)
  }

  useEffect(() => {
    setValue('email', 'yasmin@gmail.com', { shouldValidate: true })
  }, [setValue])

  return (
    <AuthLayout>
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
            isDisabled
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
        <div className="pt-[20px]">
          <div className="text-[14px] pb-[4px] font-normal text-gray-900">
            Konfirmasi Password
          </div>
          <InputGroup>
            <Input
              type={visibilityPasswordConfirm ? 'text' : 'password'}
              placeholder="Masukkan password"
              id="password_confirmation"
              name="password_confirmation"
              isInvalid={!!errors.password_confirmation}
              {...register('password_confirmation', {
                required: 'Wajib diisi.',
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
                {visibilityPasswordConfirm ? 'visibility_off' : 'visibility'}
              </Icon>
            </InputRightAddon>
          </InputGroup>
          {errors.password_confirmation && (
            <div className="text-red-500 text-sm h-6">
              {errors?.password_confirmation?.message}
            </div>
          )}
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
    </AuthLayout>
  )
}

export default ResetAccountForm