import React, { FC, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import AuthLayout from '../Layout/AuthLayout'

import AlertDialogComponent from 'renderer/components/Dialog/AlertDialogComponent'
import SyncDialogComponent from 'renderer/components/Dialog/SyncDialogComponent'
import InputComponent from 'renderer/components/Form/InputComponent'

import { Button } from '@wartek-id/button'
import { Tooltip } from '@wartek-id/tooltip'
import { Icon } from '@wartek-id/icon'

import { onlyNumberRegex } from 'renderer/constants/regex'

import { FormRegisterData } from 'renderer/types/LoginType'
import { useAPICheckActivation } from 'renderer/apis/utils'
import { AuthStates, useAuthStore } from 'renderer/stores/auth'
import { APP_CONFIG } from '../../constants/appConfig'

const ipcRenderer = window.require('electron').ipcRenderer

const RegistrationView: FC = () => {
  const navigate = useNavigate()
  const ref = useRef(null)
  const [isSync, setIsSync] = useState(false)
  const [openModalInfo, setOpenModalInfo] = useState(false)
  const [openModalNoConnection, setOpenModalNoConnection] = useState(false)
  const [openModalConnectionTrouble, setOpenModalConnectionTrouble] =
    useState(false)
  const [koregInvalid, setKoregInvalid] = useState('')

  const setNpsn = useAuthStore((state: AuthStates) => state.setNpsn)
  const setKoreg = useAuthStore((state: AuthStates) => state.setKoreg)
  const npsn = useAuthStore((state: AuthStates) => state.npsn)
  const koreg = useAuthStore((state: AuthStates) => state.koreg)
  const [hddVol, setHddVol] = useState('')
  const { data: checkActivationResult, isError } = useAPICheckActivation(
    {
      npsn,
      koreg,
      hdd_vol: hddVol,
    },
    {
      retry: 0,
      enabled: npsn !== '' && koreg !== '' && hddVol !== '',
    }
  )

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, submitCount },
  } = useForm<FormRegisterData>({
    mode: 'onChange',
  })

  useEffect(() => {
    const ipcHddVol = ipcRenderer.sendSync(
      'config:getConfig',
      APP_CONFIG.hddVol
    )
    const ipcKoregInvalid = ipcRenderer.sendSync(
      'config:getConfig',
      APP_CONFIG.koregInvalid
    )
    setKoregInvalid(ipcKoregInvalid)
    setHddVol(ipcHddVol)
  }, [])

  useEffect(() => {
    if (checkActivationResult !== undefined) {
      setIsSync(false)
      const result = Number(checkActivationResult.data)
      if (result === 1) {
        if (koregInvalid === '0') {
          navigate('/create-account/new')
        } else {
          navigate('/login')
        }
      } else if (result === 2) {
        setNpsn('')
        setKoreg('')
        setError('activation_code', {
          type: 'manual',
          message: 'Kode aktivasi salah',
        })
      } else {
        setNpsn('')
        setKoreg('')
        setError('npsn', {
          type: 'manual',
          message: 'NPSN Anda sudah terdaftar di perangkat lain',
        })
        setOpenModalInfo(true)
      }
    }
  }, [checkActivationResult])

  useEffect(() => {
    if (isError) {
      setOpenModalConnectionTrouble(true)
    }
  }, [isError])

  const onSubmit = async (data: FormRegisterData) => {
    if (!navigator.onLine) {
      setOpenModalNoConnection(true)
      return
    }
    setOpenModalNoConnection(false)
    setOpenModalConnectionTrouble(false)
    setNpsn(data.npsn)
    setKoreg(data.activation_code)
    setIsSync(true)
  }

  return (
    <AuthLayout>
      <form ref={ref} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="text-base pb-1 font-normal text-gray-900">NPSN</div>
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
          <div className="flex items-center text-base pb-1 font-normal text-gray-900">
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
      <AlertDialogComponent
        type="info"
        icon="wifi_off"
        title="Tidak Ada Koneksi Internet"
        desc="Koneksikan perangkat Anda lalu sinkronisasi ulang."
        isOpen={openModalNoConnection}
        hideBtnCancel={false}
        btnCancelText="Kembali"
        btnActionText="Sinkronisasi Ulang"
        onCancel={() => setOpenModalNoConnection(false)}
        onSubmit={handleSubmit(onSubmit)}
      />

      <AlertDialogComponent
        type="info"
        icon="wifi_off"
        title="Koneksi Internet Terputus"
        desc="Perikas kembalik koneksi internet Anda lalu sinkronisasi ulang."
        isOpen={openModalConnectionTrouble}
        hideBtnCancel={false}
        btnCancelText="Kembali"
        btnActionText="Sinkronisasi Ulang"
        onCancel={() => setOpenModalConnectionTrouble(false)}
        onSubmit={handleSubmit(onSubmit)}
      />
    </AuthLayout>
  )
}

export default RegistrationView
