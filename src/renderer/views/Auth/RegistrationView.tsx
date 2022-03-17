import React, { FC, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import AuthLayout from 'renderer/views/Layout/AuthLayout'

import AlertDialogComponent from 'renderer/components/Dialog/AlertDialogComponent'
import SyncDialogComponent from 'renderer/components/Dialog/SyncDialogComponent'
import InputComponent from 'renderer/components/Form/InputComponent'

import AlertLostConnection from 'renderer/views/AlertLostConnection'
import AlertNoConnection from 'renderer/views//AlertNoConnection'
import AlertFailedSyncData from 'renderer/views/AlertFailedSyncData'

import { Button } from '@wartek-id/button'
import { Tooltip } from '@wartek-id/tooltip'
import { Icon } from '@wartek-id/icon'

import { onlyNumberRegex } from 'renderer/constants/regex'
import { APP_CONFIG } from 'renderer/constants/appConfig'

import { sendEventRegistrasi1 } from 'renderer/utils/analytic/auth-util'

import { FormRegisterData } from 'renderer/types/LoginType'

import {
  useAPICheckActivation,
  useAPIInfoConnection,
} from 'renderer/apis/utils'

import { AuthStates, useAuthStore } from 'renderer/stores/auth'
import { AppStates, useAppStore } from 'renderer/stores/app'

import filter from 'lodash/filter'

const ipcRenderer = window.require('electron').ipcRenderer
const stepAPi = ['infoConnection', 'checkActivation']
const RegistrationView: FC = () => {
  const navigate = useNavigate()
  const ref = useRef(null)
  const [api, setApi] = useState('')
  const [isSync, setIsSync] = useState(false)
  const [openModalInfo, setOpenModalInfo] = useState(false)
  const [koregInvalid, setKoregInvalid] = useState('')
  const [hddVol, setHddVol] = useState('')
  const setNpsn = useAuthStore((state: AuthStates) => state.setNpsn)
  const setKoreg = useAuthStore((state: AuthStates) => state.setKoreg)
  const npsn = useAuthStore((state: AuthStates) => state.npsn)
  const koreg = useAuthStore((state: AuthStates) => state.koreg)

  const setAlertNoConnection = useAppStore(
    (state: AppStates) => state.setAlertNoConnection
  )
  const setAlertLostConnection = useAppStore(
    (state: AppStates) => state.setAlertLostConnection
  )
  const setAlertFailedSyncData = useAppStore(
    (state: AppStates) => state.setAlertFailedSyncData
  )

  const {
    data: checkActivationResult,
    isError,
    remove: removeCheckActivation,
  } = useAPICheckActivation(
    {
      npsn,
      koreg,
      hdd_vol: hddVol,
    },
    {
      retry: 0,
      enabled:
        npsn !== '' && koreg !== '' && hddVol !== '' && api === stepAPi[1],
    }
  )
  const {
    data: infoConnection,
    isError: isInfoConnError,
    remove: removeInfoConnection,
  } = useAPIInfoConnection({
    retry: 0,
    enabled: api === stepAPi[0],
  })

  const {
    register,
    handleSubmit,
    setError,
    getValues,
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
    if (infoConnection !== undefined) {
      const result = Number(infoConnection?.data)
      if (result === 1) {
        setApi(stepAPi[1])
      } else {
        removeInfoConnection()
        setIsSync(false)
        setApi('')
        setAlertFailedSyncData(true)
      }
    }
  }, [infoConnection])

  useEffect(() => {
    let response_status = ''
    let next_route = ''

    if (checkActivationResult !== undefined) {
      setIsSync(false)
      const result = Number(checkActivationResult?.data)
      removeInfoConnection()
      removeCheckActivation()
      if (result === 1) {
        ipcRenderer.sendSync('config:setConfig', APP_CONFIG.hddVolOld, hddVol)
        response_status = 'sukses'
        if (koregInvalid === '0' || koregInvalid === '') {
          next_route = '/create-account/new'
        } else {
          next_route = '/login'
        }
      } else {
        setNpsn('')
        setKoreg('')
        setApi('')
        if (result === 2) {
          response_status = 'kode_aktivasi_salah'
          setError('activation_code', {
            type: 'manual',
            message: 'Kode aktivasi salah',
          })
        } else if (result === 3) {
          response_status = 'multidevice_error'
          setOpenModalInfo(true)
        } else {
          response_status = 'npsn_tidak_terdaftar'
          setError('npsn', {
            type: 'manual',
            message:
              'NPSN tidak terdaftar di Dapodik. Silakan periksa kembali.',
          })
        }
      }
      if (response_status !== '') {
        sendEventRegistrasi1(getValues('npsn'), response_status)
      }
      if (next_route !== '') {
        navigate(next_route)
      }
    }
  }, [checkActivationResult])

  useEffect(() => {
    if (isError || isInfoConnError) {
      setIsSync(false)
      setAlertLostConnection(true)
    }
  }, [isError, isInfoConnError])

  const onSubmit = async (data: FormRegisterData) => {
    setAlertNoConnection(false)
    setAlertLostConnection(false)
    setAlertFailedSyncData(false)
    if (!navigator.onLine) {
      setAlertNoConnection(true)
      return
    }
    setIsSync(true)
    setNpsn(data.npsn)
    setKoreg(data.activation_code)
    setApi(stepAPi[0])
  }

  const onError = (error: any) => {
    const isError = filter(error, ['type', 'required']).length > 0
    if (isError) {
      sendEventRegistrasi1(getValues('npsn'), 'kolom_kosong')
    }
  }

  return (
    <AuthLayout>
      <form ref={ref} onSubmit={handleSubmit(onSubmit, onError)}>
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
      <AlertNoConnection
        onSubmit={handleSubmit(onSubmit)}
        onCancel={() => setAlertNoConnection(false)}
      />
      <AlertLostConnection
        onSubmit={handleSubmit(onSubmit)}
        onCancel={() => setAlertLostConnection(false)}
      />
      <AlertFailedSyncData
        onSubmit={handleSubmit(onSubmit)}
        onCancel={() => setAlertFailedSyncData(false)}
      />
    </AuthLayout>
  )
}

export default RegistrationView
