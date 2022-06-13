import React, { FC, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { numberUtils } from '@wartek-id/fe-toolbox'

import FormDialogComponent from 'renderer/components/Dialog/FormDialogComponent'
import InputComponent from 'renderer/components/Form/InputComponent'
import DatePickerComponent from 'renderer/components/Form/DatePickerComponent'
import SelectComponent from 'renderer/components/Form/SelectComponent'
import AlertDialogComponent from 'renderer/components/Dialog/AlertDialogComponent'

import { TataUsahaStates, useTataUsahaStore } from 'renderer/stores/tata-usaha'

import {
  FormPenerimaanDanaData,
  FormPenerimaanDanaType,
} from 'renderer/types/forms/TataUsahaType'
import { SaveBkuRequest } from 'global/types/TataUsaha'

import { TIME_DELAY_SUCCESS_SCREEN } from 'renderer/constants/app'

import syncToIpcMain from 'renderer/configs/ipc'

import { IPC_ANGGARAN, IPC_KK } from 'global/ipc'

const FormPenerimaanDanaView: FC = () => {
  const navigate = useNavigate()
  const { q_id_anggaran } = useParams()

  const [defaultDate, setDefaultDate] = useState(null)
  const [formDisable, setFormDisable] = useState(true)

  const [openModalConfirmation, setOpenModalConfirmation] = useState(false)
  const [openModalSuccess, setOpenModalSuccess] = useState(false)

  const [tahunAnggaran, setTahunAnggaran] = useState('')

  const periodeSalurList = useTataUsahaStore(
    (state: TataUsahaStates) => state.periodeSalurList
  )

  const setIsFocused = useTataUsahaStore(
    (state: TataUsahaStates) => state.setIsFocused
  )

  const formMethods = useForm<FormPenerimaanDanaData>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  })

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = formMethods

  const handleClearError = (name: FormPenerimaanDanaType) => {
    clearErrors(name)
  }

  const closeModal = () => {
    navigate('/tata-usaha')
  }

  const onSubmit = async () => {
    //TODO
    const data = {
      periode: getValues('periode'),
      tanggal_penerimaan: getValues('tanggal_penerimaan'),
      nominal: getValues('nominal'),
    }

    const saveBkuRequest: SaveBkuRequest = {
      idAnggaran: q_id_anggaran,
      recieveDate: data.tanggal_penerimaan,
      recieveAmount: parseInt(data.nominal.replace(/[^,\d]/g, '').toString()),
      uraian: data.periode,
    }

    const res = syncToIpcMain(IPC_KK.aktivasiBku, saveBkuRequest)

    if (res?.error) {
      //TODO display if error occured when save data into local db
    } else {
      setOpenModalConfirmation(false)
      setOpenModalSuccess(true)
    }
  }

  const handleSelectPeriode = (value: string) => {
    const selectedPeriode = periodeSalurList.find((s) => s.label === value)
    if (selectedPeriode != null) {
      let date = new Date()
      if (selectedPeriode.tanggal != null && selectedPeriode.tanggal !== '') {
        date = new Date(selectedPeriode.tanggal)
      }

      setDefaultDate(date)
      setValue('periode', selectedPeriode.label, { shouldDirty: true })
      setValue(
        'nominal',
        `Rp ${numberUtils.delimit(selectedPeriode.total, '.')}`,
        { shouldDirty: true }
      )
    }
  }

  useEffect(() => {
    if (openModalSuccess) {
      setTimeout(() => {
        setIsFocused(true)
        closeModal()
      }, TIME_DELAY_SUCCESS_SCREEN)
    }
  }, [openModalSuccess])

  useEffect(() => {
    if (periodeSalurList.length > 0) {
      const anggaran = syncToIpcMain(
        IPC_ANGGARAN.getAnggaranById,
        q_id_anggaran
      )
      setTahunAnggaran(anggaran?.tahunAnggaran)
      let date = new Date(periodeSalurList[0].tanggal)
      if (periodeSalurList[0].tanggal === '') {
        date = new Date()
        setFormDisable(false)
      }

      // set defaultvalue
      const data = {
        periode: '',
        tanggal_penerimaan: date,
        nominal: `Rp ${numberUtils.delimit(periodeSalurList[0].total, '.')}`,
      }

      setDefaultDate(date)
      reset(data)
    }
  }, [])

  return (
    <>
      <FormProvider {...formMethods}>
        <FormDialogComponent
          width={720}
          title="Konfirmasi Penerimaan Dana"
          subtitle={
            formDisable
              ? 'Data diambil secara otomatis dari BOS Salur.'
              : 'Masukkan detail sesuai dengan yang tertera di rekening.'
          }
          isOpen={true}
          btnAlertSubmitText="Kembali Isi Penerimaan Dana"
          btnSubmitText="Konfirmasi"
          onCancel={closeModal}
          onSubmit={handleSubmit(() => setOpenModalConfirmation(true))}
        >
          <div>
            <div className="pb-5">
              <div className="text-base pb-1 font-normal text-gray-900">
                Periode Penerimaan
              </div>
              <SelectComponent
                name="periode"
                placeholder="Pilih tahap penerimaan dana"
                options={periodeSalurList.map((b: any) => b.label)}
                handleSelect={handleSelectPeriode}
                isDisabled={formDisable}
                required={true}
              />
            </div>
            <div className="flex">
              <div className="flex-grow pr-6">
                <div className="text-base pb-1 font-normal text-gray-900">
                  Tanggal Dana Diterima
                </div>
                <DatePickerComponent
                  name="tanggal_penerimaan"
                  placeholder="Pilih tanggal"
                  required={true}
                  defaultValue={defaultDate}
                  isDisabled={formDisable}
                />
              </div>
              <div className="flex-grow">
                <div className="text-base pb-1 font-normal text-gray-900">
                  Nominal Dana Diterima
                </div>
                <InputComponent
                  type="nominal"
                  name="nominal"
                  placeholder="Masukkan nominal"
                  register={register}
                  required={true}
                  errors={errors}
                  isDisabled={formDisable}
                  handleClearError={handleClearError}
                  setError={setError}
                  setValue={setValue}
                />
              </div>
            </div>
          </div>
        </FormDialogComponent>
      </FormProvider>
      <AlertDialogComponent
        type="warning"
        icon="text_snippet"
        title={`Aktifkan BKU Tahun Anggaran ${tahunAnggaran}?`}
        desc="Setelah BKU diaktifkan, nominal penerimaan dana yang Anda masukkan tidak dapat diedit kecuali Anda menghapus BKU."
        isOpen={openModalConfirmation}
        btnCancelText="Kembali"
        btnActionText="Aktifkan BKU"
        onCancel={() => setOpenModalConfirmation(false)}
        onSubmit={onSubmit}
        layer={2}
      />
      <AlertDialogComponent
        type="success"
        icon="done"
        title={`BKU Tahun ${tahunAnggaran} Sudah Aktif!`}
        isOpen={openModalSuccess}
        hideBtnCancel={true}
        hideBtnAction={true}
        layer={2}
      />
    </>
  )
}

export default FormPenerimaanDanaView
