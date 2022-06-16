import React, { FC, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { Checkbox } from '@wartek-id/checkbox'

import AlertDialogComponent from 'renderer/components/Dialog/AlertDialogComponent'
import FormDialogComponent from 'renderer/components/Dialog/FormDialogComponent'
import SelectComponent from 'renderer/components/Form/SelectComponent'
import DatePickerComponent from 'renderer/components/Form/DatePickerComponent'
import InputSearchComponent from 'renderer/components/Form/InputSearchComponent'
import InputComponent from 'renderer/components/Form/InputComponent'

import { FormTambahPembelanjaanData } from 'renderer/types/forms/TataUsahaType'
import {
  GetLastTransactionDateRequest,
  GetTotalSaldoByPeriodeRequest,
  InformasiToko,
} from 'global/types/TataUsaha'

import syncToIpcMain from 'renderer/configs/ipc'

import { IPC_TATA_USAHA } from 'global/ipc'

import clsx from 'clsx'

const formSteps = ['Bukti Belanja', 'Detail Barang/Jasa', 'Perhitungan Pajak']

const FormTambahPembelanjaanView: FC = () => {
  const navigate = useNavigate()
  const { q_id_anggaran, q_id_periode } = useParams()

  const [tanggalPelunasan, setTanggalPelunasan] = useState(new Date())
  const [noStore, setNoStore] = useState(false)
  const [noNpwp, setNoNpwp] = useState(false)
  const [openModalConfirmNoStore, setOpenModalConfirmNoStore] = useState(false)
  const [listToko, setListToko] = useState([])
  const [transactionTypeList, setTransactionTypeList] = useState([])
  const formMethods = useForm<FormTambahPembelanjaanData>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  })

  const { setValue, handleSubmit } = formMethods

  const closeModal = () => {
    navigate(-1)
  }

  const handleSelectType = () => {
    //handle
  }

  const handleChangeNoStore = () => {
    if (noStore) {
      setNoStore(false)
    } else {
      setOpenModalConfirmNoStore(true)
    }
  }

  const closeModalConfirmNoStore = () => {
    setNoStore(true)
    setOpenModalConfirmNoStore(false)
  }

  const handleClick = (data: {
    id: string | number
    name: string
    value: string
  }) => {
    if (data.name === 'store_name') {
      if (data.id === '') {
        // tambah baru
        setListToko([
          ...listToko,
          {
            id: data.value,
            value: data.value,
          },
        ])
      }
      if (data.id !== '') {
        const detailToko = syncToIpcMain(
          IPC_TATA_USAHA.getInformasiToko,
          data.id
        )
        if (detailToko.value) {
          const toko = detailToko.value as InformasiToko
          setValue('store_address', toko.alamat, { shouldDirty: true })
          setValue('store_telephone', toko.telpon, { shouldDirty: true })
          if (toko.npwp != null && toko.npwp.charAt(0) !== ' ') {
            setValue('store_npwp', toko.npwp, { shouldDirty: true })
          }
        }
      }
    }
  }

  const handleChangeNpwp = () => {
    setValue('store_npwp', '', { shouldDirty: true })
    setNoNpwp(!noNpwp)
  }

  const onSubmit = () => {
    //handlesubmit
  }

  useEffect(() => {
    const request: GetLastTransactionDateRequest = {
      idAnggaran: q_id_anggaran,
      idPeriode: parseInt(q_id_periode),
    }

    const requestJenisTransaksi: GetTotalSaldoByPeriodeRequest = {
      idAnggaran: q_id_anggaran,
      idPeriode: parseInt(q_id_periode),
    }

    const result = syncToIpcMain(IPC_TATA_USAHA.getLastTransactionDate, request)
    const resultListToko = syncToIpcMain(IPC_TATA_USAHA.getListToko)
    const resultJenisTransaksi = syncToIpcMain(
      IPC_TATA_USAHA.getJenisTransaksiList,
      requestJenisTransaksi
    )
    if (resultListToko?.value) {
      setListToko(resultListToko.value)
    }
    if (resultJenisTransaksi?.value) {
      setTransactionTypeList(resultJenisTransaksi.value)
    }
    setTanggalPelunasan(new Date(result.value))
  }, [])

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
          onSubmit={handleSubmit(onSubmit)}
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
                  placeholder="Pilih tunai/nontunai"
                  options={transactionTypeList}
                  handleSelect={handleSelectType}
                  required={true}
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
                  defaultValue={tanggalPelunasan}
                />
              </div>
            </div>
            <Checkbox
              className="pb-5"
              labelPosition="center"
              onChange={handleChangeNoStore}
              checked={noStore}
              controlled
            >
              Pembelanjaan ini tidak memiliki badan usaha (perusahaan, PT, CV,
              UD, firma, dll)
            </Checkbox>
            <div className={clsx(noStore && 'hidden')}>
              <div className="pb-5">
                <div className="text-base pb-1 font-normal text-gray-900">
                  Nama Toko/Badan Usaha
                </div>
                <InputSearchComponent
                  name="store_name"
                  width={900}
                  maxHeight={250}
                  placeholder="Nama toko tempat Anda membeli barang/jasa"
                  required={true}
                  headers={[{ key: 'value', show: true, width: '100%' }]}
                  onClick={handleClick}
                  dataOptions={listToko}
                  headerShow={false}
                  enableAdd={true}
                />
              </div>
              <div className="pb-5">
                <div className="text-base pb-1 font-normal text-gray-900">
                  Alamat Toko/Badan Usaha
                </div>
                <InputComponent
                  type="name"
                  name="store_address"
                  placeholder="Nama jalan/blok, kelurahan, kecamatan, dan provinsi tempat Anda membeli barang/jasa"
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
                  required={true}
                />
              </div>
              <div className="pb-5">
                <div className="text-base pb-1 font-normal text-gray-900">
                  NPWP Toko/Badan Usaha
                </div>
                <InputComponent
                  type="name"
                  name="store_npwp"
                  placeholder="NPWP toko/pemilik usaha"
                  required={true}
                  isDisabled={noNpwp}
                />
              </div>
              <Checkbox
                labelPosition="center"
                onChange={handleChangeNpwp}
                checked={noNpwp}
              >
                Toko/badan usaha ini tidak memiliki NPWP
              </Checkbox>
            </div>
          </div>
          <div></div>
          <div></div>
        </FormDialogComponent>
      </FormProvider>
      <AlertDialogComponent
        type="warning"
        icon="priority_high"
        title="Apa pembelanjaan ini tanpa toko/badan usaha?"
        desc="Hanya pembelanjaan jasa yang boleh tidak memiliki detail toko/badan usaha."
        isOpen={openModalConfirmNoStore}
        btnActionText="Ya, Lanjut"
        btnCancelText="Batal"
        onCancel={() => setOpenModalConfirmNoStore(false)}
        onSubmit={closeModalConfirmNoStore}
        layer={2}
      />
    </>
  )
}

export default FormTambahPembelanjaanView
