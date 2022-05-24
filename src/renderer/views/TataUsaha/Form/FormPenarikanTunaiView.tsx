import React, { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import FormDialogComponent from 'renderer/components/Dialog/FormDialogComponent'
import InputComponent from 'renderer/components/Form/InputComponent'
import DatePickerComponent from 'renderer/components/Form/DatePickerComponent'

import {
  FormPenarikanTunaiData,
  FormPenarikanTunaiType,
} from 'renderer/types/forms/TataUsahaType'

const FormPenarikanTunaiView: FC = () => {
  const navigate = useNavigate()

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
    //TO DO
    console.error(data)
  }

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
              <div className="text-base pb-1 font-normal text-gray-900">
                Nominal Penarikan
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
              />
            </div>
          </div>
        </FormDialogComponent>
      </FormProvider>
    </>
  )
}

export default FormPenarikanTunaiView
