import React, { FC, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import AuthLayout from 'views/Layout/AuthLayout'

import SyncDialogComponent from 'components/Dialog/SyncDialogComponent'
import InputComponent from 'components/Form/InputComponent'
import InputPasswordComponent from 'components/Form/InputPasswordComponent'

import { Button } from '@wartek-id/button'

import { FormResetAccountData } from 'types/LoginType'

const CreateAccountView: FC = () => {
  const navigate = useNavigate()
  const { mode } = useParams()

  const [isSync, setIsSync] = useState(false)

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
    console.log(data)
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
          <InputComponent
            type="email"
            name="email"
            placeholder="Masukkan email yang terdaftar di sekolah"
            errors={errors}
            register={register}
            required={true}
            isDisabled={mode === 'reset' ? true : false}
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
        <div className="pt-5">
          <div className="text-[14px] pb-1 font-normal text-gray-900">
            Konfirmasi Password
          </div>
          <InputPasswordComponent
            name="password_confirmation"
            errors={errors}
            register={register}
          />
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
