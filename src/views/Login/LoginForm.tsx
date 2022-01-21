import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button } from '@wartek-id/button'
import { Input, InputGroup } from '@wartek-id/input'

interface FormLoginData {
  email: string
  password: string
}

const LoginForm: FC = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, submitCount },
  } = useForm<FormLoginData>({
    mode: 'onChange',
  })

  const onSubmit = async (data: FormLoginData) => {
    console.log(data)
    navigate('/dashboard')
  }

  return (
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
            type="password"
            placeholder="Masukkan password"
            id="password"
            name="password"
            isInvalid={!!errors.password}
            {...register('password', {
              required: 'Wajib diisi.',
            })}
          />
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
  )
}

export default LoginForm
