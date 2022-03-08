import React, { FC, useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import AlertDialogComponent from 'renderer/components/Dialog/AlertDialogComponent'
import FormDialogComponent from 'renderer/components/Dialog/FormDialogComponent'
import InputWithInfoComponent from 'renderer/components/Form/InputWithInfoComponent'
import InputSearchComponent from 'renderer/components/Form/InputSearchComponent'
import InputComponent from 'renderer/components/Form/InputComponent'

import { Icon } from '@wartek-id/icon'

import {
  FormIsiKertasKerjaType,
  FormIsiKertasKerjaData,
  AnggaranBulanData,
} from 'renderer/types/AnggaranType'

import { DATA_BULAN } from 'renderer/constants/general'
import {
  headerKegiatan,
  optionsKegiatan,
  headerRekeningBelanja,
  optionsRekeningBelanja,
  headerUraian,
  optionsUraian,
  headerSatuan,
  optionsSatuan,
  headerHarga,
  optionsHarga,
} from 'renderer/constants/table'

import { numberUtils } from '@wartek-id/fe-toolbox'

import { AnggaranStates, useAnggaranStore } from 'renderer/stores/anggaran'

import styles from './index.module.css'

import clsx from 'clsx'

import mapKeys from 'lodash/mapKeys'

const initialFormDisable = {
  kegiatan: false,
  rekening_belanja: true,
  uraian: true,
  harga_satuan: true,
  harga_per_month: true,
}

const FormDetailKertasKerjaView: FC = () => {
  const navigate = useNavigate()
  const { mode } = useParams()

  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [openModalSuccess, setOpenModalSuccess] = useState(false)
  const [openModalConfirmCancel, setOpenModalConfirmCancel] = useState(false)
  const [urutanBulan, setUrutanBulan] = useState(0)
  const [formDisable, setFormDisable] = useState(initialFormDisable)

  const tempDetailKertasKerja = useAnggaranStore(
    (state: AnggaranStates) => state.tempDetailKertasKerja
  )

  const setTempDetailKertasKerja = useAnggaranStore(
    (state: AnggaranStates) => state.setTempDetailKertasKerja
  )

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormIsiKertasKerjaData>({
    mode: 'onChange',
    defaultValues: {
      kegiatan: '',
      rekening_belanja: '',
      uraian: '',
      harga_satuan: '',
      anggaran_bulan: [
        {
          jumlah: null,
          satuan: null,
          bulan: DATA_BULAN[urutanBulan],
        },
      ],
    },
  })

  const { fields, append } = useFieldArray({
    control,
    name: 'anggaran_bulan',
  })

  const closeModal = () => {
    setTempDetailKertasKerja(null)
    navigate(-1)
  }

  const onSubmit = async (data: FormIsiKertasKerjaData) => {
    console.log(data)
    closeModal()
  }

  const onConfirmCancel = () => {
    setOpenModalConfirmCancel(false)
    closeModal()
    reset()
    setFormDisable(initialFormDisable)
    setUrutanBulan(0)
  }

  const handleClick = (data: {
    id: number
    name: FormIsiKertasKerjaType
    value: string
  }) => {
    setValue(data.name, data.value, { shouldDirty: true, shouldValidate: true })

    if (data.name === 'kegiatan') {
      setFormDisable({
        ...formDisable,
        rekening_belanja: false,
      })
    }
    if (data.name === 'rekening_belanja') {
      setFormDisable({
        ...formDisable,
        uraian: false,
      })
    }
    if (data.name === 'uraian') {
      setFormDisable({
        ...formDisable,
        harga_satuan: false,
      })
    }
  }

  const handleCancel = () => {
    if (isDirty) {
      setOpenModalConfirmCancel(true)
    } else {
      closeModal()
    }
  }

  const handleDelete = () => {
    setOpenModalDelete(false)
    setOpenModalSuccess(true)
    setTimeout(() => {
      setOpenModalSuccess(false)
      closeModal()
    }, 3000)
  }

  const handleTambahBulan = () => {
    if (urutanBulan === DATA_BULAN.length - 1) {
      return
    }
    const next = urutanBulan + 1
    append({ jumlah: null, satuan: null, bulan: DATA_BULAN[next] })
    setUrutanBulan(next)
  }

  const FormHargaPerMonth = (props: {
    index: number
    field: AnggaranBulanData
  }) => {
    const { field } = props
    return (
      <div
        key={field.bulan}
        className="border rounded border-solid border-gray-500 py-3 px-4 text-base"
      >
        <div className="flex justify-between shadow pb-[6px] ">
          <span className="capitalize-first">{field.bulan}</span>
          <span>Rp 0</span>
        </div>
        <div className="flex mt-[14px]">
          <span className="flex-none w-[97px] mr-6">
            <InputComponent
              className="text-base"
              type="text"
              name={`anggaran_bulan.${props.index}.jumlah`}
              placeholder="Jumlah"
              errors={errors}
              register={register}
              required={true}
              isDisabled={formDisable.harga_per_month}
            />
          </span>
          <span className="flex-grow">
            <InputSearchComponent
              width={255}
              name={`anggaran_bulan.${props.index}.satuan`}
              placeholder="Satuan"
              errors={errors}
              register={register}
              onClick={handleClick}
              required={true}
              headers={headerSatuan}
              headerShow={false}
              dataOptions={optionsSatuan}
              isDisabled={formDisable.harga_per_month}
            />
          </span>
        </div>
      </div>
    )
  }

  useEffect(() => {
    if (mode === 'update' && tempDetailKertasKerja === null) {
      closeModal()
    }
    if (mode === 'update' && tempDetailKertasKerja !== null) {
      mapKeys(tempDetailKertasKerja, (value, key: FormIsiKertasKerjaType) => {
        setValue(key, value, { shouldValidate: true })
      })
      setFormDisable({
        kegiatan: false,
        rekening_belanja: false,
        uraian: false,
        harga_satuan: false,
        harga_per_month: false,
      })
    }
  }, [])

  return (
    <div>
      <FormDialogComponent
        width={960}
        maxHeight={550}
        icon={mode !== 'update' && 'add'}
        title="Isi Detail Anggaran Kegiatan"
        isOpen={true}
        isDelete={mode === 'update'}
        btnSubmitText={mode === 'update' ? 'Perbarui' : 'Masukkan ke Anggaran'}
        btnCancelText={mode === 'update' && 'Tutup'}
        onDelete={() => setOpenModalDelete(true)}
        onCancel={handleCancel}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div className="mb-5">
            <div className="text-base pb-1 font-normal text-gray-900">
              Kegiatan
            </div>
            <InputSearchComponent
              width={888}
              name="kegiatan"
              placeholder="Apa kegiatan yang ingin Anda anggarkan?"
              errors={errors}
              register={register}
              onClick={handleClick}
              required={true}
              headers={headerKegiatan}
              dataOptions={optionsKegiatan}
            />
          </div>
          <div className="mb-5">
            <div className="text-base pb-1 font-normal text-gray-900">
              Rekening Belanja
            </div>
            <InputSearchComponent
              width={888}
              name="rekening_belanja"
              placeholder="Apa jenis rekening belanja yang ingin Anda anggarkan untuk kegiatan tersebut?"
              errors={errors}
              register={register}
              onClick={handleClick}
              required={true}
              isDisabled={formDisable.rekening_belanja}
              headers={headerRekeningBelanja}
              dataOptions={optionsRekeningBelanja}
            />
          </div>
          <div className="p-4 rounded border border-solid	border-gray-300 text-base">
            <div className="flex mb-5">
              <span className="flex-grow pr-6">
                <div className="text-base pb-1 font-normal text-gray-900">
                  Uraian
                </div>
                <InputSearchComponent
                  width={543}
                  name="uraian"
                  placeholder="Apa detail barang atau jasanya? (mis. papan tulis, honor narasumber)"
                  errors={errors}
                  register={register}
                  onClick={handleClick}
                  required={true}
                  isDisabled={formDisable.uraian}
                  headers={headerUraian}
                  dataOptions={optionsUraian}
                />
              </span>
              <span className="flex-none w-[289px]">
                <div className="text-base pb-1 font-normal text-gray-900">
                  Harga Satuan yang Dianggarkan
                </div>
                <InputWithInfoComponent
                  width={289}
                  name="harga_satuan"
                  placeholder="Berapa perkiraan harganya?"
                  errors={errors}
                  register={register}
                  required={true}
                  isDisabled={formDisable.harga_satuan}
                  headers={headerHarga}
                  dataOptions={optionsHarga}
                  registerOption={{
                    validate: {
                      positive: (value) => {
                        if (
                          value.replace(/[^,\d]/g, '').toString().length < 2
                        ) {
                          return 'Harga satuan minimal 2 digit angka'
                        }
                      },
                      lessThanTen: (value) => {
                        if (parseInt(value.replace(/[^,\d]/g, '')) < 20000) {
                          return 'Harga kurang dari batas bawah SSH'
                        }
                      },
                      moreThan: (value) => {
                        if (parseInt(value.replace(/[^,\d]/g, '')) > 100000) {
                          return 'Harga melebihi batas atas SSH'
                        }
                      },
                    },
                    onChange: (e) => {
                      const numb = e.target.value
                        .replace(/[^,\d]/g, '')
                        .toString()
                      if (numb !== null) {
                        setValue(
                          'harga_satuan',
                          `Rp ${numberUtils.delimit(numb, '.')}`
                        )
                      }
                      setFormDisable({
                        ...formDisable,
                        harga_per_month: false,
                      })
                    },
                  }}
                />
              </span>
            </div>
            <div className="mb-5">Dianggarkan untuk Bulan</div>
            <div className="grid grid-cols-2 gap-x-[40px] gap-y-[20px]">
              {fields.map((field, index) => {
                return (
                  <FormHargaPerMonth key={index} index={index} field={field} />
                )
              })}
              {fields.length <= DATA_BULAN.length - 1 && (
                <div
                  className={clsx(
                    styles.borderDashed,
                    'grid place-content-center cursor-pointer p-11'
                  )}
                  onClick={handleTambahBulan}
                >
                  <div className="flex items-center">
                    <Icon
                      as="i"
                      color="default"
                      fontSize="default"
                      className="mr-2"
                      style={{ fontSize: '15px' }}
                    >
                      add
                    </Icon>
                    Tambah Bulan
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </FormDialogComponent>
      <AlertDialogComponent
        type="failed"
        icon="exit_to_app"
        title="Keluar dari halaman ini?"
        desc="Jika Anda keluar, data yang baru saja Anda isi akan hilang."
        isOpen={openModalConfirmCancel}
        btnCancelText="Keluar"
        btnActionText="Kembali Mengisi"
        onCancel={onConfirmCancel}
        onSubmit={() => setOpenModalConfirmCancel(false)}
        layer={2}
      />
      <AlertDialogComponent
        type="failed"
        icon="delete"
        title="Hapus Kegiatan?"
        desc="Setelah Anda hapus, kegiatan ini tidak bisa dikembalikan."
        isOpen={openModalDelete}
        btnCancelText="Batal"
        btnActionText="Ya, Hapus"
        onCancel={() => setOpenModalDelete(false)}
        onSubmit={handleDelete}
        layer={2}
      />
      <AlertDialogComponent
        type="success"
        icon="done"
        title="Anggaran Kegiatan Diperbarui!"
        isOpen={openModalSuccess}
        hideBtnCancel={true}
        hideBtnAction={true}
        layer={2}
      />
    </div>
  )
}

export default FormDetailKertasKerjaView
