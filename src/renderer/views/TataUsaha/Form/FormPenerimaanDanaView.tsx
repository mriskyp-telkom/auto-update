import { IPC_KK } from 'global/ipc'
import { SaveBkuRequest } from 'global/types/TataUsahaTypes'
import React, { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import FormDialogComponent from 'renderer/components/Dialog/FormDialogComponent'
import InputComponent from 'renderer/components/Form/InputComponent'
import DatePickerComponent from 'renderer/components/Form/DatePickerComponent'
import SelectComponent from 'renderer/components/Form/SelectComponent'
import AlertDialogComponent from 'renderer/components/Dialog/AlertDialogComponent'

import syncToIpcMain from 'renderer/configs/ipc'

import { TataUsahaStates, useTataUsahaStore } from 'renderer/stores/tata-usaha'

import { FormPenerimaanDanaData } from 'renderer/types/forms/TataUsahaType'

import { TIME_DELAY_SCREEN } from 'renderer/constants/app'

const FormPenerimaanDanaView: FC = () => {
  const navigate = useNavigate()
  const { q_id_anggaran } = useParams()

  // TO DO
  const tahunAnggaran = 2021

  const [openModalForm, setOpenModalForm] = useState(true)
  const [openModalConfirmation, setOpenModalConfirmation] = useState(false)
  const [openModalSuccess, setOpenModalSuccess] = useState(false)

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

  const openModalView = (modal: 'form' | 'confirmation' | 'success') => {
    if (modal === 'form') {
      setOpenModalForm(true)
      setOpenModalConfirmation(false)
      setOpenModalSuccess(false)
    }
    if (modal === 'confirmation') {
      setOpenModalForm(false)
      setOpenModalConfirmation(true)
      setOpenModalSuccess(false)
    }
    if (modal === 'success') {
      setOpenModalForm(false)
      setOpenModalConfirmation(false)
      setOpenModalSuccess(true)
    }
  }

  const onSubmit = async () => {
    //TODO
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
      openModalView('success')
    }
  }

  const handleSelectPeriode = () => {
    // handle
  }

  useEffect(() => {
    if (openModalSuccess) {
      setTimeout(() => {
        closeModal()
      }, TIME_DELAY_SCREEN)
    }
  }, [openModalSuccess])

  return (
    <>
      <FormDialogComponent
        width={720}
        title="Konfirmasi Penerimaan Dana"
        subtitle="Data diambil dari BOS Salur. Pastikan detail sesuai dengan yang tertera di rekening."
        isOpen={openModalForm}
        btnSubmitText="Konfirmasi"
        onCancel={closeModal}
        onSubmit={handleSubmit(() => openModalView('confirmation'))}
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
      <AlertDialogComponent
        type="warning"
        icon="text_snippet"
        title={`Aktifkan BKU Tahun Anggaran ${tahunAnggaran}?`}
        desc="Setelah BKU diaktifkan, nominal penerimaan dana yang Anda masukkan tidak dapat diedit kecuali Anda menghapus BKU."
        isOpen={openModalConfirmation}
        btnCancelText="Kembali"
        btnActionText="Aktifkan BKU"
        onCancel={() => openModalView('form')}
        onSubmit={onSubmit}
      />
      <AlertDialogComponent
        type="success"
        icon="done"
        title={`BKU Tahun ${tahunAnggaran} Sudah Aktif!`}
        isOpen={openModalSuccess}
        hideBtnCancel={true}
        hideBtnAction={true}
      />
    </>
  )
}

export default FormPenerimaanDanaView
