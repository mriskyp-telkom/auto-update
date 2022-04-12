import React, { FC, useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import AlertDialogComponent from 'renderer/components/Dialog/AlertDialogComponent'
import FormDialogComponent from 'renderer/components/Dialog/FormDialogComponent'
import InputWithInfoComponent from 'renderer/components/Form/InputWithInfoComponent'
import InputSearchComponent from 'renderer/components/Form/InputSearchComponent'
import InputComponent from 'renderer/components/Form/InputComponent'
import SelectComponent from 'renderer/components/Form/SelectComponent'

import { Icon } from '@wartek-id/icon'

import {
  FormIsiKertasKerjaType,
  FormIsiKertasKerjaData,
  AnggaranBulanData,
  DetailKegiatan,
  Ptk,
  Periode,
} from 'renderer/types/AnggaranType'

import { DATA_BULAN } from 'renderer/constants/general'
import {
  headerKegiatan,
  headerRekeningBelanja,
  headerUraian,
  headerPtk,
  headerSatuan,
  optionsSatuan,
  headerHarga,
} from 'renderer/constants/table'
import {
  ERROR_REQUIRED,
  HARGA_SATUAN_ERROR_LENGTH,
  HARGA_SATUAN_ERROR_LESS_THAN,
  HARGA_SATUAN_ERROR_MORE_THAN,
} from 'renderer/constants/errorForm'

import { numberUtils } from '@wartek-id/fe-toolbox'

import { AnggaranStates, useAnggaranStore } from 'renderer/stores/anggaran'

import styles from './index.module.css'

import clsx from 'clsx'

import { IPC_ANGGARAN, IPC_KK, IPC_PTK, IPC_REFERENSI } from 'global/ipc'
import { btnFormDisabled } from 'renderer/utils/form-validation'
import differenceWith from 'lodash/differenceWith'
import isEqual from 'lodash/isEqual'

const initialFormDisable = {
  kegiatan: false,
  rekening_belanja: true,
  uraian: true,
  harga_satuan: true,
  harga_per_month: true,
}

const ipcRenderer = window.require('electron').ipcRenderer

const InputUraian = (props: any) => {
  return props.dataOptions.length === 0 ? (
    <InputComponent {...props} type="text" />
  ) : (
    <InputSearchComponent {...props} />
  )
}

const InputHargaSatuan = (props: any) => {
  return props.dataOptions.length === 0 ? (
    <InputComponent {...props} type="text" />
  ) : (
    <InputWithInfoComponent {...props} />
  )
}

const FormKertasKerjaView: FC = () => {
  const navigate = useNavigate()
  const { q_mode, q_id_anggaran, q_id_rapbs } = useParams()

  const idAnggaran = decodeURIComponent(q_id_anggaran)
  const idRapbs = decodeURIComponent(q_id_rapbs)

  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [openModalSuccess, setOpenModalSuccess] = useState(false)
  const [openModalConfirmCancel, setOpenModalConfirmCancel] = useState(false)

  const [formDisable, setFormDisable] = useState(initialFormDisable)

  const [headerPopupUraian, setHeaderPopupUraian] = useState(headerUraian)
  const [optionsKegiatan, setOptionsKegiatan] = useState([])
  const [optionsRekening, setOptionsRekening] = useState([])
  const [optionsUraian, setOptionsUraian] = useState([])
  const [optionsHarga, setOptionsHarga] = useState([])

  const [selectedKegiatan, setSelectedKegiatan] = useState(null)
  const [selectedRekening, setSelectedRekening] = useState(null)
  const [selectedUraian, setSelectedUraian] = useState(null)

  const setTempDetailKertasKerja = useAnggaranStore(
    (state: AnggaranStates) => state.setTempDetailKertasKerja
  )
  const setIsFocused = useAnggaranStore(
    (state: AnggaranStates) => state.setIsFocused
  )

  const {
    register,
    unregister,
    handleSubmit,
    setValue,
    setError,
    setFocus,
    getValues,
    control,
    reset,
    clearErrors,
    formState: { errors, isDirty },
  } = useForm<FormIsiKertasKerjaData>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues: {
      kegiatan: '',
      rekening_belanja: '',
      uraian: '',
      harga_satuan: '',
      anggaran_bulan: [
        {
          id: DATA_BULAN[0]?.id,
          jumlah: null,
          satuan: null,
          bulan: DATA_BULAN[0]?.name,
        },
      ],
    },
  })

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'anggaran_bulan',
  })

  const constructData = () => {
    const data = {} as DetailKegiatan
    const anggaranBulan = getValues('anggaran_bulan')
    const anggaran = ipcRenderer.sendSync(
      IPC_ANGGARAN.getAnggaranById,
      idAnggaran
    )
    const volume = anggaranBulan.reduce((accumulator, bulan) => {
      return accumulator + parseInt(bulan.jumlah.toString())
    }, 0)
    data.idAnggaran = idAnggaran
    data.idRefTahunAnggaran = anggaran.tahunAnggaran
    data.idRefKode = selectedKegiatan.id
    data.kodeRekening = selectedRekening.kode
    data.idBarang = selectedUraian?.kode
    data.uraian =
      selectedUraian != null ? selectedUraian.uraian : getValues('uraian')
    data.hargaSatuan = parseInt(
      getValues('harga_satuan')
        .replace(/[^,\d]/g, '')
        .toString()
    )
    data.volume = volume
    data.jumlah = volume * data.hargaSatuan
    if (selectedKegiatan?.flag_honor === 1) {
      const ptk = {} as Ptk
      ptk.idPtk = selectedUraian.id
      ptk.nama = selectedUraian.uraian
      data.ptk = ptk
    }
    data.satuan = anggaranBulan[0].satuan
    data.periode = []
    anggaranBulan.forEach((bulan) => {
      const periode = {} as Periode
      const jumlah = parseInt(bulan.jumlah.toString())
      periode.hargaSatuan = data.hargaSatuan
      periode.idPeriode = bulan.id
      periode.volume = jumlah
      periode.jumlah = jumlah * data.hargaSatuan
      periode.satuan = bulan.satuan
      data.periode.push(periode)
    })
    return data
  }

  const closeModal = () => {
    setTempDetailKertasKerja(null)
    navigate(-1)
  }

  const onSubmit = async () => {
    const body = constructData()
    const res = ipcRenderer.sendSync(IPC_KK.addAnggaranDetailKegiatan, body)
    if (res.error) {
      // TODO: should display error modal
    } else {
      setIsFocused(true)
      closeModal()
    }
  }

  const onConfirmCancel = () => {
    setOpenModalConfirmCancel(false)
    closeModal()
    reset()
    setFormDisable(initialFormDisable)
  }

  const handleClick = (data: {
    id: string | number
    name: FormIsiKertasKerjaType
    value: string
  }) => {
    setValue(data.name, data.value, { shouldDirty: true })

    if (data.id.toString() === '' || data.value === '') {
      setFocus(data.name)
      return
    }

    clearErrors(data.name)

    if (data.name === 'kegiatan') {
      const dataKegiatan = optionsKegiatan.find((k: any) => k.id === data.id)
      setSelectedKegiatan(dataKegiatan)
      setValue('uraian', '')
      setValue('harga_satuan', '')
      setFocus('rekening_belanja')
      setFormDisable({
        ...formDisable,
        rekening_belanja: false,
        harga_satuan: true,
      })
      unregister('uraian')
    }

    if (data.name === 'rekening_belanja') {
      const dataRekening = optionsRekening.find(
        (k: any) => k.id.toString() === data.id.toString()
      )
      setSelectedRekening(dataRekening)
      setValue('uraian', '')
      setValue('harga_satuan', '')
      setFocus('uraian')
      setSelectedUraian(null)
      setFormDisable({
        ...formDisable,
        uraian: false,
        harga_satuan: true,
      })
      unregister('uraian')
    }
    if (data.name === 'uraian') {
      const dataUraian = optionsUraian.find(
        (k: any) => k.id.toString() === data.id.toString()
      )
      setSelectedUraian(dataUraian)
      setFocus('harga_satuan')
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

    // before
    const res = ipcRenderer.sendSync(IPC_KK.deleteRapbs, idRapbs)

    if (res.value.isDeleted) {
      // after
      setOpenModalSuccess(true)
      setTimeout(() => {
        setOpenModalSuccess(false)
        setIsFocused(true)
        closeModal()
      }, 3000)
    } else if (res.isError) {
      // TO DO:
    }
  }

  const handleTambahBulan = () => {
    const bulan = getMonthOptions()

    append({
      jumlah: null,
      satuan: null,
      bulan: bulan[0]?.name,
      id: bulan[0]?.id,
    })
  }

  const getMonthOptions = () => {
    const picked = getValues('anggaran_bulan').map((data) => {
      return {
        id: data.id,
        name: data.bulan,
      }
    })

    const unpicked = differenceWith(DATA_BULAN, picked, isEqual)

    return unpicked
  }

  useEffect(() => {
    if (selectedKegiatan != null && selectedRekening != null) {
      let uraian = null
      if (selectedKegiatan?.flag_honor === 1) {
        setHeaderPopupUraian(headerPtk)
        uraian = ipcRenderer.sendSync(IPC_PTK.getPtk)
      } else {
        setHeaderPopupUraian(headerUraian)
        uraian = ipcRenderer.sendSync(
          IPC_REFERENSI.getRefBarangByRekening,
          selectedRekening.kode
        )
      }
      setOptionsUraian(uraian)
    }
  }, [selectedKegiatan, selectedRekening])

  useEffect(() => {
    if (selectedUraian != null) {
      const harga = []
      if (
        selectedUraian.batas_atas != null &&
        selectedUraian.batas_bawah != null
      ) {
        harga.push({
          id: 1,
          batas_atas: selectedUraian.batas_atas,
          batas_bawah: selectedUraian.batas_bawah,
        })
      }
      setOptionsHarga(harga)
    }
  }, [selectedUraian])

  useEffect(() => {
    const kegiatan = ipcRenderer.sendSync(IPC_REFERENSI.getRefKode)
    const rekening = ipcRenderer.sendSync(IPC_REFERENSI.getRefRekening)
    setOptionsKegiatan(kegiatan)
    setOptionsRekening(rekening)

    if (q_mode === 'update') {
      const idRapbs = decodeURIComponent(q_id_rapbs)
      const res = ipcRenderer.sendSync(
        IPC_KK.getAnggaranDetailKegiatan,
        idRapbs
      )
      const anggaran = res.value.anggaran
      const periode = res.value.periode
      const rapbsPtk = res.value.rapbsPtk

      const dataKegiatan = kegiatan.find(
        (k: any) => k.id === anggaran.idRefKode
      )
      const dataRekBelanja = rekening.find(
        (r: any) => r.kode === anggaran.kodeRekening
      )

      setSelectedKegiatan(dataKegiatan)
      setSelectedRekening(dataRekBelanja)

      const uraian = { id: '', kode: '', uraian: '' }

      if (anggaran.idBarang != null && anggaran.idBarang !== '') {
        uraian.kode = anggaran.idBarang
        uraian.uraian = anggaran.uraian
      }
      if (rapbsPtk != null) {
        uraian.id = rapbsPtk.idPtk
        uraian.uraian = rapbsPtk.nama
      }

      setSelectedUraian(uraian)

      reset({
        kegiatan: anggaran.kegiatan,
        rekening_belanja: anggaran.rekeningBelanja,
        uraian: anggaran.uraian,
        harga_satuan: anggaran.hargaSatuan.toString(),
      })

      periode.map((per: any, index: number) => {
        const idx = DATA_BULAN.findIndex((b) => b.id == per.periode)
        update(index, {
          id: per.periode,
          jumlah: per.jumlah,
          satuan: per.satuan,
          bulan: DATA_BULAN[idx].name,
        })
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

  const FormHargaPerMonth = (props: {
    index: number
    field: AnggaranBulanData
  }) => {
    const { field } = props

    const [totalPerMonth, setTotalPerMonth] = useState(0)

    const getBulan = (bulan: string) => {
      return DATA_BULAN.find((bul) => bul.name === bulan)
    }

    const handleSelect = (value: string) => {
      const bulan = getBulan(value)
      update(props.index, {
        ...field,
        bulan: bulan.name,
        id: bulan.id,
      })
    }

    const handleDeleteMonth = () => {
      remove(props.index)
    }

    const countTotal = (jumlah: number) => {
      const harga_satuan =
        getValues('harga_satuan') !== ''
          ? parseInt(
              getValues('harga_satuan')
                .replace(/[^,\d]/g, '')
                .toString()
            )
          : 0

      setTotalPerMonth(harga_satuan * jumlah)
    }

    useEffect(() => {
      const jumlah = getValues(`anggaran_bulan.${props.index}.jumlah`)
      countTotal(jumlah)
    }, [getValues])

    return (
      <div className="flex relative">
        <div
          key={field.bulan}
          className="w-full border rounded border-solid border-gray-500 py-3 px-4 text-base"
        >
          <div className="flex justify-between shadow pb-[6px] ">
            <span>
              <SelectComponent
                name={`anggaran_bulan.${props.index}.bulan`}
                options={getMonthOptions().map((b: any) => b.name)}
                selected={field.bulan}
                register={register}
                handleSelect={handleSelect}
                disabled={getMonthOptions().length === 0}
              />
            </span>
            <span>Rp {numberUtils.delimit(totalPerMonth, '.')}</span>
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
                registerOption={{
                  onChange: (e) => {
                    const jumlah = e.target.value
                    countTotal(jumlah)
                  },
                }}
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
        {props.index > 0 && (
          <Icon
            as="i"
            color="default"
            fontSize="default"
            className="absolute -top-2 -right-3"
            onClick={handleDeleteMonth}
          >
            remove_circle
          </Icon>
        )}
      </div>
    )
  }

  return (
    <div>
      <FormDialogComponent
        width={960}
        maxHeight={550}
        icon={q_mode !== 'update' && 'add'}
        title="Isi Detail Anggaran Kegiatan"
        isOpen={true}
        isDelete={q_mode === 'update'}
        btnSubmitText={
          q_mode === 'update' ? 'Perbarui' : 'Masukkan ke Anggaran'
        }
        btnCancelText={q_mode === 'update' && 'Tutup'}
        onDelete={() => setOpenModalDelete(true)}
        onCancel={handleCancel}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitDisabled={btnFormDisabled(errors)}
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
              dataOptions={optionsRekening}
            />
          </div>
          <div className="p-4 rounded border border-solid	border-gray-300 text-base">
            <div className="flex mb-5">
              <span className="flex-grow pr-6">
                <div className="text-base pb-1 font-normal text-gray-900">
                  Uraian
                </div>
                <InputUraian
                  width={543}
                  name="uraian"
                  placeholder="Apa detail barang atau jasanya? (mis. papan tulis, honor narasumber)"
                  errors={errors}
                  register={register}
                  onClick={handleClick}
                  required={true}
                  isDisabled={formDisable.uraian}
                  headers={headerPopupUraian}
                  dataOptions={optionsUraian}
                  registerOption={{
                    onChange: (e: any) => {
                      const value = e.target.value
                      if (value !== '') {
                        setFormDisable({
                          ...formDisable,
                          harga_satuan: false,
                        })
                      }
                    },
                  }}
                />
              </span>
              <span className="flex-none w-[289px]">
                <div className="text-base pb-1 font-normal text-gray-900">
                  Harga Satuan yang Dianggarkan
                </div>
                <InputHargaSatuan
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
                      minLength: (v: any) => {
                        const value = v.replace(/[^,\d]/g, '').toString()

                        return value >= 10 || HARGA_SATUAN_ERROR_LENGTH
                      },
                      lessThan: (v: any) => {
                        if (optionsHarga.length > 0) {
                          const batas_bawah = optionsHarga[0]?.batas_bawah

                          const value = v.replace(/[^,\d]/g, '').toString()

                          return (
                            parseInt(value) >= batas_bawah ||
                            HARGA_SATUAN_ERROR_LESS_THAN
                          )
                        }
                      },
                      moreThan: (v: any) => {
                        if (optionsHarga.length > 0) {
                          const batas_atas = optionsHarga[0]?.batas_atas

                          const value = v.replace(/[^,\d]/g, '').toString()

                          return (
                            parseInt(value) <= batas_atas ||
                            HARGA_SATUAN_ERROR_MORE_THAN
                          )
                        }
                      },
                    },
                    onBlur: (e: any) => {
                      const batas_bawah = optionsHarga[0]?.batas_bawah
                      const batas_atas = optionsHarga[0]?.batas_atas

                      const value = e.target.value
                        .replace(/[^,\d]/g, '')
                        .toString()

                      if (value < 10) {
                        setError('harga_satuan', {
                          type: 'manual',
                          message: HARGA_SATUAN_ERROR_LENGTH,
                        })
                        return
                      }

                      if (optionsHarga.length > 0) {
                        if (parseInt(value) < batas_bawah) {
                          setError('harga_satuan', {
                            type: 'manual',
                            message: HARGA_SATUAN_ERROR_LESS_THAN,
                          })
                          return
                        }

                        if (parseInt(value) > batas_atas) {
                          setError('harga_satuan', {
                            type: 'manual',
                            message: HARGA_SATUAN_ERROR_MORE_THAN,
                          })
                          return
                        }
                      }

                      clearErrors('harga_satuan')
                    },
                    onChange: (e: any) => {
                      const batas_bawah = optionsHarga[0]?.batas_bawah
                      const batas_atas = optionsHarga[0]?.batas_atas

                      const value = e.target.value
                        .replace(/[^,\d]/g, '')
                        .toString()

                      if (value !== null) {
                        setValue(
                          'harga_satuan',
                          `Rp ${numberUtils.delimit(value, '.')}`
                        )
                      }

                      if (
                        value !== '' &&
                        errors.harga_satuan?.message === ERROR_REQUIRED
                      ) {
                        clearErrors('harga_satuan')
                        return
                      }

                      if (
                        value >= 10 &&
                        errors.harga_satuan?.message ===
                          HARGA_SATUAN_ERROR_LENGTH
                      ) {
                        clearErrors('harga_satuan')
                        return
                      }

                      if (
                        parseInt(value) >= batas_bawah &&
                        errors.harga_satuan?.message ===
                          HARGA_SATUAN_ERROR_LESS_THAN
                      ) {
                        clearErrors('harga_satuan')
                        return
                      }

                      if (
                        parseInt(value) <= batas_atas &&
                        errors.harga_satuan?.message ===
                          HARGA_SATUAN_ERROR_MORE_THAN
                      ) {
                        clearErrors('harga_satuan')
                        return
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
        btnActionText="Kembali Isi Kegiatan"
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

export default FormKertasKerjaView