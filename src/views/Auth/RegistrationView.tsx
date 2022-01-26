import React, { FC } from 'react'
import { useForm } from 'react-hook-form'

import AuthLayout from 'views/Layout/AuthLayout'

import { Button } from '@wartek-id/button'
import { Input, InputGroup } from '@wartek-id/input'
import { Tooltip } from '@wartek-id/tooltip'
import { Icon } from '@wartek-id/icon'

import { FormRegisterData } from 'types/LoginType'

const RegistrationView: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, submitCount },
  } = useForm<FormRegisterData>({
    mode: 'onChange',
  })

  const onSubmit = async (data: FormRegisterData) => {
    console.log(data)
  }

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="text-[14px] pb-[4px] font-normal text-gray-900">
            NSPN
          </div>
          <Input
            type="text"
            placeholder="Masukkan NSPN sekolah"
            id="nspn"
            name="nspn"
            isInvalid={!!errors.nspn}
            {...register('nspn', {
              required: 'Wajib diisi.',
            })}
          />
          {errors.nspn && (
            <div className="text-red-500 text-sm h-6">
              {errors?.nspn?.message}
            </div>
          )}
        </div>
        <div className="pt-[20px]">
          <div className="flex items-center text-[14px] pb-[4px] font-normal text-gray-900">
            Kode Aktivasi
            <Tooltip
              content="Kode aktivasi yang didapatkan dari dinas ketika aktivasi akun"
              maxWidth={362}
              placement="right-start"
              strategy="fixed"
              trigger="hover"
              offset={{ x: -12 }}
            >
              <Icon
                as="i"
                color="default"
                fontSize="small"
                style={{ fontSize: '14px' }}
                className="ml-1"
              >
                info
              </Icon>
            </Tooltip>
          </div>
          <InputGroup>
            <Input
              type="text"
              placeholder="Masukkan kode aktivasi"
              id="activation_code"
              name="activation_code"
              isInvalid={!!errors.activation_code}
              {...register('activation_code', {
                required: 'Wajib diisi.',
              })}
            />
          </InputGroup>
          {errors.activation_code && (
            <div className="text-red-500 text-sm h-6">
              {errors?.activation_code?.message}
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
            Daftar
          </Button>
        </div>
        <div className="text-blue-700 text-[12px] text-right">
          <b>“Daftar”</b> membutuhkan koneksi internet
        </div>
      </form>
    </AuthLayout>
  )
}

export default RegistrationView
