import { IPC_KK } from 'global/ipc'
import { SaveBkuRequest } from 'global/types/TataUsahaTypes'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import FormDialogComponent from 'renderer/components/Dialog/FormDialogComponent'
import InputComponent from 'renderer/components/Form/InputComponent'
import DatePickerComponent from 'renderer/components/Form/DatePickerComponent'
import SelectComponent from 'renderer/components/Form/SelectComponent'
import syncToIpcMain from 'renderer/configs/ipc'
import { TataUsahaStates, useTataUsahaStore } from 'renderer/stores/tata-usaha'

import { FormPenerimaanDanaData } from 'renderer/types/forms/TataUsahaType'

const FormPenerimaanDanaView: FC = () => {
  const navigate = useNavigate()
  const { q_id_anggaran } = useParams()
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
    //TODO
    saveBku()
  }

  const saveBku = () => {
    const saveBkuRequest: SaveBkuRequest = {
      idAnggaran: q_id_anggaran,
      recieveDate: new Date(),
      recieveAmount: 123,
      uraian: '',
    }
    const res = syncToIpcMain(IPC_KK.aktivasiBku, saveBkuRequest)
    if (res?.error) {
      //TODO display if error occured when save data into local db
    } else {
      closeModal()
    }
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
            <DatePickerComponent />
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
