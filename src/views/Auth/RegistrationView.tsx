import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import AuthLayout from 'views/Layout/AuthLayout'

import AlertDialogComponent from 'components/Dialog/AlertDialogComponent'
import SyncDialogComponent from 'components/Dialog/SyncDialogComponent'
import InputComponent from 'components/Form/InputComponent'

import { Button } from '@wartek-id/button'
import { Tooltip } from '@wartek-id/tooltip'
import { Icon } from '@wartek-id/icon'

import { onlyNumberRegex } from 'constants/regex'

import { FormRegisterData } from 'types/LoginType'

const RegistrationView: FC = () => {
  const navigate = useNavigate()

  const [isSync, setIsSync] = useState(false)
  const [openModalInfo, setOpenModalInfo] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, submitCount },
  } = useForm<FormRegisterData>({
    mode: 'onChange',
  })

  const onSubmit = async (data: FormRegisterData) => {
    if (data.npsn === '01234567') {
      setError('npsn', {
        type: 'manual',
        message: 'NPSN Anda sudah terdaftar di perangkat lain',
      })
      setOpenModalInfo(true)
      return
    }

    if (data.npsn === '12345678') {
      setError('npsn', {
        type: 'manual',
        message: 'NPSN tidak terdaftar',
      })
      return
    }

    if (data.activation_code === 'JIF89K') {
      setError('activation_code', {
        type: 'manual',
        message: 'Kode aktivasi salah',
      })
      return
    }

    setIsSync(true)
    setTimeout(() => {
      setIsSync(false)
      navigate('/create-account/new')
    }, 3000)
  }

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="text-[14px] pb-1 font-normal text-gray-900">NPSN</div>
          <InputComponent
            type="text"
            name="npsn"
            placeholder="Masukkan NPSN sekolah"
            errors={errors}
            register={register}
            required={true}
            registerOption={{
              pattern: {
                value: onlyNumberRegex,
                message: 'Isi dengan format angka',
              },
              maxLength: {
                value: 8,
                message: 'NPSN harus terdiri dari 8 angka',
              },
              minLength: {
                value: 8,
                message: 'NPSN harus terdiri dari 8 angka',
              },
            }}
          />
        </div>
        <div className="pt-5">
          <div className="flex items-center text-[14px] pb-1 font-normal text-gray-900">
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
          <InputComponent
            type="text"
            name="activation_code"
            placeholder="Masukkan kode aktivasi"
            errors={errors}
            register={register}
            required={true}
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
            Daftar
          </Button>
        </div>
        <div className="text-blue-700 text-[12px] text-right">
          <b>“Daftar”</b> membutuhkan koneksi internet
        </div>
      </form>
      <SyncDialogComponent
        title="Mengirim Data..."
        percentage={50}
        isOpen={isSync}
        setIsOpen={setIsSync}
      />
      <AlertDialogComponent
        type="warning"
        icon="priority_high"
        title="NPSN Anda sudah terdaftar di perangkat lain"
        desc="Anda hanya bisa menggunakan ARKAS di 1 perangkat. Gunakan perangkat yang biasa dipakai untuk masuk ke ARKAS, atau hubungi dinas pendidikan setempat untuk menghapus perangkat lama dan mengaktifkan perangkat ini."
        isOpen={openModalInfo}
        hideBtnCancel={true}
        btnActionText="Saya Mengerti"
        onSubmit={() => setOpenModalInfo(false)}
      />
    </AuthLayout>
  )
}

export default RegistrationView
