import React, { FC, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { numberUtils } from '@wartek-id/fe-toolbox'

import FormDialogComponent from 'renderer/components/Dialog/FormDialogComponent'
import InputComponent from 'renderer/components/Form/InputComponent'
import DatePickerComponent from 'renderer/components/Form/DatePickerComponent'

import {
  FormPenarikanTunaiData,
  FormPenarikanTunaiType,
} from 'renderer/types/forms/TataUsahaType'

import { NOMINAL_TARIK_TUNAI_ERROR_MORE_THAN } from 'renderer/constants/errorForm'
import {
  CashWithdrawalRequest,
  GetTotalSaldoByPeriodeRequest,
} from 'global/types/TataUsaha'
import syncToIpcMain from 'renderer/configs/ipc'
import { IPC_TATA_USAHA } from 'global/ipc'
import { TataUsahaStates, useTataUsahaStore } from 'renderer/stores/tata-usaha'

const FormPenarikanTunaiView: FC = () => {
  const navigate = useNavigate()
  const { q_id_anggaran, q_id_periode } = useParams()
  const setIsFocused = useTataUsahaStore(
    (state: TataUsahaStates) => state.setIsFocused
  )

  const [saldo, setSaldo] = useState(0)

  const formMethods = useForm<FormPenarikanTunaiData>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  })

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = formMethods

  const closeModal = () => {
    navigate(-1)
  }

  const handleClearError = (name: FormPenarikanTunaiType) => {
    clearErrors(name)
  }

  const onSubmit = async (data: FormPenarikanTunaiData) => {
    const amount =
      data.nominal !== ''
        ? parseInt(data.nominal.replace(/[^,\d]/g, '').toString())
        : 0
    const cashWithdrawalRequest: CashWithdrawalRequest = {
      idAnggaran: q_id_anggaran,
      date: data.tanggal_tarik_tunai,
      amount: amount,
    }
    const res = syncToIpcMain(
      IPC_TATA_USAHA.cashWithdrawal,
      cashWithdrawalRequest
    )

    if (res.error) {
      //TODO display error when save data
    }
    setIsFocused(true)
    closeModal()
  }

  useEffect(() => {
    const payload: GetTotalSaldoByPeriodeRequest = {
      idAnggaran: q_id_anggaran,
      idPeriode: parseInt(q_id_periode),
    }
    const res = syncToIpcMain(IPC_TATA_USAHA.getTotalSaldoByPeriod, payload)
    if (res?.value) {
      setSaldo(res.value?.sisaBank)
    }
  }, [])

  return (
    <>
      <FormProvider {...formMethods}>
        <FormDialogComponent
          width={720}
          title="Penarikan Tunai"
          subtitle="Isi sesuai dengan detail yang tertera di slip penarikan dari bank."
          isOpen={true}
          btnSubmitText="Simpan"
          onCancel={closeModal}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex">
            <div className="flex-grow pr-6">
              <div className="text-base pb-1 font-normal text-gray-900">
                Tanggal Tarik Tunai
              </div>
              <DatePickerComponent
                name="tanggal_tarik_tunai"
                placeholder="Pilih tanggal"
                required={true}
              />
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between text-base pb-1 font-normal">
                <span className="text-gray-900">Nominal Penarikan</span>
                <span className="font-semibold text-blue-700">
                  Saldo : Rp {numberUtils.delimit(saldo, '.')}
                </span>
              </div>
              <InputComponent
                type="nominal"
                name="nominal"
                placeholder="Masukkan nominal tunai yang ditarik"
                register={register}
                required={true}
                errors={errors}
                handleClearError={handleClearError}
                setError={setError}
                setValue={setValue}
                registerOption={{
                  validate: {
                    moreThan: (v: any) => {
                      const value = v.replace(/[^,\d]/g, '').toString()

                      return (
                        parseInt(value) <= saldo ||
                        NOMINAL_TARIK_TUNAI_ERROR_MORE_THAN
                      )
                    },
                  },
                  onBlur: (e: any) => {
                    const value = e.target.value
                      .replace(/[^,\d]/g, '')
                      .toString()

                    if (parseInt(value) > saldo) {
                      setError('nominal', {
                        type: 'manual',
                        message: NOMINAL_TARIK_TUNAI_ERROR_MORE_THAN,
                      })
                      return
                    }
                    clearErrors('nominal')
                  },
                  onChange: (e: any) => {
                    const value = e.target.value
                      .replace(/[^,\d]/g, '')
                      .toString()

                    if (
                      parseInt(value) <= saldo &&
                      errors.nominal?.message ===
                        NOMINAL_TARIK_TUNAI_ERROR_MORE_THAN
                    ) {
                      clearErrors('nominal')
                      return
                    }
                  },
                }}
              />
            </div>
          </div>
        </FormDialogComponent>
      </FormProvider>
    </>
  )
}

export default FormPenarikanTunaiView
