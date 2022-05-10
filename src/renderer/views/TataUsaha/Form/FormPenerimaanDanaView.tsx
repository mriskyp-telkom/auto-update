import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import FormDialogComponent from 'renderer/components/Dialog/FormDialogComponent'
import InputComponent from 'renderer/components/Form/InputComponent'
import SelectComponent from 'renderer/components/Form/SelectComponent'
import { TataUsahaStates, useTataUsahaStore } from 'renderer/stores/tata-usaha'

import { FormPenerimaanDanaData } from 'renderer/types/forms/TataUsahaType'

const FormPenerimaanDanaView: FC = () => {
  const navigate = useNavigate()

  const periodeSalurList = useTataUsahaStore(
    (state: TataUsahaStates) => state.periodeSalurList
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormPenerimaanDanaData>({
    mode: 'onSubmit',
  })

  const closeModal = () => {
    navigate('/tata-usaha')
  }

  const onSubmit = async () => {
    //handle onsubmit
  }

  const handleSelectPeriode = () => {
    // handle
  }

  return (
    <FormDialogComponent
      width={720}
      title="Konfirmasi Penerimaan Dana"
      subtitle="Data diambil dari BOS Salur. Pastikan detail sesuai dengan yang tertera di rekening."
      isOpen={true}
      btnSubmitText="Konfirmasi"
      onCancel={closeModal}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <div className="pb-5">
          <div className="text-base pb-1 font-normal text-gray-900">
            Periode Penerimaan
          </div>
          <SelectComponent
            name="periode"
            options={periodeSalurList.map((b: any) => b.label)}
            register={register}
            selected={periodeSalurList[0]?.label}
            handleSelect={handleSelectPeriode}
          />
        </div>
        <div className="flex">
          <div className="flex-grow pr-6">
            <div className="text-base pb-1 font-normal text-gray-900">
              Tanggal Dana Diterima
            </div>
            <InputComponent
              type="text"
              name="nominal"
              placeholder=""
              register={register}
              errors={errors}
            />
          </div>
          <div className="flex-grow">
            <div className="text-base pb-1 font-normal text-gray-900">
              Nominal Dana Diterima
            </div>
            <InputComponent
              type="text"
              name="nominal"
              placeholder=""
              register={register}
              errors={errors}
            />
          </div>
        </div>
      </div>
    </FormDialogComponent>
  )
}

export default FormPenerimaanDanaView
