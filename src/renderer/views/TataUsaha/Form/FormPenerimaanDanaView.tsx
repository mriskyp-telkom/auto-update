import { IPC_ANGGARAN, IPC_KK } from 'global/ipc'
import { SaveBkuRequest } from 'global/types/TataUsaha'
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

import {
  FormPenerimaanDanaData,
  FormPenanggungJawabType,
} from 'renderer/types/forms/TataUsahaType'

import { TIME_DELAY_SCREEN } from 'renderer/constants/app'

import { numberUtils } from '@wartek-id/fe-toolbox'

const FormPenerimaanDanaView: FC = () => {
  const navigate = useNavigate()
  const { q_id_anggaran } = useParams()

  const [defaultValue, setDefaultValue] = useState<FormPenerimaanDanaData>(null)
  const [formDisable, setFormDisable] = useState(true)

  const [openModalConfirmation, setOpenModalConfirmation] = useState(false)
  const [openModalSuccess, setOpenModalSuccess] = useState(false)
  const [openModalKeluar, setOpenModalKeluar] = useState(false)
  const [tahunAnggaran, setTahunAnggaran] = useState('')

  const periodeSalurList = useTataUsahaStore(
    (state: TataUsahaStates) => state.periodeSalurList
  )

  const setIsFocused = useTataUsahaStore(
    (state: TataUsahaStates) => state.setIsFocused
  )

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    setError,
    clearErrors,
    formState: { errors, isDirty },
  } = useForm<FormPenerimaanDanaData>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  })

  const handleClearError = (name: FormPenanggungJawabType) => {
    clearErrors(name)
  }

  const closeModal = () => {
    navigate('/tata-usaha')
  }

  const handleCloseForm = () => {
    if (isDirty) {
      setOpenModalKeluar(true)
    } else {
      closeModal()
    }
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
    setValue('periode', value)
  }

  const handleSelectTanggal = (value: Date) => {
    setValue('tanggal_penerimaan', value)
  }

  useEffect(() => {
    if (openModalSuccess) {
      setTimeout(() => {
        setIsFocused(true)
        closeModal()
      }, TIME_DELAY_SCREEN)
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
        periode: periodeSalurList[0].label,
        tanggal_penerimaan: date,
        nominal: `Rp ${numberUtils.delimit(periodeSalurList[0].total, '.')}`,
      }

      setDefaultValue(data)
      reset(data)
    }
  }, [])

  return (
    <>
      <FormDialogComponent
        width={720}
        title="Konfirmasi Penerimaan Dana"
        subtitle={
          formDisable
            ? 'Data diambil secara otomatis dari BOS Salur.'
            : 'Masukkan detail sesuai dengan yang tertera di rekening.'
        }
        isOpen={true}
        btnSubmitText="Konfirmasi"
        onCancel={handleCloseForm}
        onSubmit={handleSubmit(() => setOpenModalConfirmation(true))}
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
              isDisabled={formDisable}
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
                defaultValue={defaultValue?.tanggal_penerimaan}
                register={register}
                errors={errors}
                handleSelect={handleSelectTanggal}
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
      <AlertDialogComponent
        type="failed"
        icon="exit_to_app"
        title="Keluar dari halaman ini?"
        desc="Jika Anda keluar, data yang baru saja Anda isi akan hilang."
        isOpen={openModalKeluar}
        btnCancelText="Keluar"
        btnActionText="Kembali Isi Penerimaan Dana"
        onCancel={closeModal}
        onSubmit={() => setOpenModalKeluar(false)}
        layer={2}
      />
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
