import React, { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Checkbox } from '@wartek-id/checkbox'

import FormDialogComponent from 'renderer/components/Dialog/FormDialogComponent'
import SelectComponent from 'renderer/components/Form/SelectComponent'
import DatePickerComponent from 'renderer/components/Form/DatePickerComponent'
import InputSearchComponent from 'renderer/components/Form/InputSearchComponent'
import InputComponent from 'renderer/components/Form/InputComponent'

import {
  FormTambahPembelanjaanData,
  FormTambahPembelanjaanType,
} from 'renderer/types/forms/TataUsahaType'

const transactionTypeList = ['Tunai', 'Non Tunai']
const formSteps = ['Bukti Belanja', 'Detail Barang/Jasa', 'Perhitungan Pajak']

const FormTambahPembelanjaanView: FC = () => {
  const navigate = useNavigate()

  const formMethods = useForm<FormTambahPembelanjaanData>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  })

  const {
    register,
    setError,
    clearErrors,
    formState: { errors },
  } = formMethods

  const closeModal = () => {
    navigate(-1)
  }

  const handleSelectType = () => {
    //handle
  }

  const handleClearError = (name: FormTambahPembelanjaanType) => {
    clearErrors(name)
  }

  return (
    <>
      <FormProvider {...formMethods}>
        <FormDialogComponent
          width={960}
          title="Isi Detail Pembelanjaan"
          subtitle="Isi detail pembelanjaan barang/jasa yang terdapat dalam 1 nota."
          isOpen={true}
          btnAlertSubmitText="Kembali Isi Penerimaan Dana"
          btnSubmitText="Konfirmasi"
          onCancel={closeModal}
          onSubmit={null}
          steps={formSteps}
        >
          <div>
            <div className="flex pb-5">
              <div className="flex-grow pr-6">
                <div className="text-base pb-1 font-normal text-gray-900">
                  Jenis Transaksi
                </div>
                <SelectComponent
                  name="transaction_type"
                  options={transactionTypeList}
                  register={register}
                  selected={transactionTypeList[0]}
                  handleSelect={handleSelectType}
                />
              </div>
              <div className="flex-grow">
                <div className="text-base pb-1 font-normal text-gray-900">
                  Tanggal Pelunasan
                </div>
                <DatePickerComponent
                  name="payment_date"
                  placeholder="Masukkan tanggal pembelanjaan ini dilunasi"
                  required={true}
                />
              </div>
            </div>
            <Checkbox className="pb-5" value="1" labelPosition="center">
              Pembelanjaan ini tidak memiliki badan usaha (perusahaan, PT, CV,
              UD, firma, dll)
            </Checkbox>
            <div className="pb-5">
              <div className="text-base pb-1 font-normal text-gray-900">
                Nama Badan Usaha
              </div>
              <InputSearchComponent
                name="store_name"
                width={900}
                placeholder="Nama toko tempat Anda membeli barang/jasa"
                errors={errors}
                register={register}
                required={true}
                defaultValue=""
                onClick={() => {
                  //handle
                }}
                dataOptions={[]}
              />
            </div>
            <div className="pb-5">
              <div className="text-base pb-1 font-normal text-gray-900">
                Alamat Badan Usaha
              </div>
              <InputComponent
                type="name"
                name="store_address"
                placeholder="Nama jalan/blok, kelurahan, kecamatan, dan provinsi tempat Anda membeli barang/jasa"
                errors={errors}
                register={register}
                setError={setError}
                handleClearError={handleClearError}
                required={true}
              />
            </div>
            <div className="pb-5">
              <div className="text-base pb-1 font-normal text-gray-900">
                Nomor Telepon
              </div>
              <InputComponent
                type="name"
                name="store_telephone"
                placeholder="Nomor kontak toko/pemilik usaha yang bisa dihubungi"
                errors={errors}
                register={register}
                setError={setError}
                handleClearError={handleClearError}
                required={true}
              />
            </div>
            <div className="pb-5">
              <div className="text-base pb-1 font-normal text-gray-900">
                NPWP Badan Usaha
              </div>
              <InputComponent
                type="name"
                name="store_npwp"
                placeholder="NPWP toko/pemilik usaha"
                errors={errors}
                register={register}
                setError={setError}
                handleClearError={handleClearError}
                required={true}
              />
            </div>
            <Checkbox value="1" labelPosition="center">
              Badan usaha ini tidak memiliki NPWP
            </Checkbox>
          </div>
          <div>
            <Checkbox value="1" labelPosition="center">
              Badan usaha ini tidak memiliki NPWP
            </Checkbox>
          </div>
          <div></div>
        </FormDialogComponent>
      </FormProvider>
    </>
  )
}

export default FormTambahPembelanjaanView
