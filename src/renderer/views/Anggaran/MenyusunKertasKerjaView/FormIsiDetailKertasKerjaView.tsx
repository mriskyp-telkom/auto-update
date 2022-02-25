import React, { FC } from 'react'
import { useForm } from 'react-hook-form'

import FormDialogComponent from 'renderer/components/Dialog/FormDialogComponent'
import InputSearchComponent from 'renderer/components/Form/InputSearchComponent'
import InputComponent from 'renderer/components/Form/InputComponent'

import { Icon } from '@wartek-id/icon'
import { Button } from '@wartek-id/button'

import { FormIsiKertasKerjaData } from 'renderer/types/AnggaranType'

import { AnggaranStates, useAnggaranStore } from 'renderer/stores/anggaran'

import styles from './index.module.css'

import clsx from 'clsx'

const FormIsiDetailKertasKerjaView: FC = () => {
  const isiKertasKerja = useAnggaranStore(
    (state: AnggaranStates) => state.isiKertasKerja
  )
  const setIsiKertasKerja = useAnggaranStore(
    (state: AnggaranStates) => state.setIsiKertasKerja
  )

  const {
    register,
    handleSubmit,
    // setValue,
    formState: { errors },
  } = useForm<FormIsiKertasKerjaData>({
    mode: 'onChange',
  })

  const onSubmit = async (data: FormIsiKertasKerjaData) => {
    console.log(data)
    setIsiKertasKerja(false)
  }

  const onCancel = () => {
    setIsiKertasKerja(false)
  }

  return (
    <div>
      <Button
        color="white"
        size="md"
        variant="solid"
        className="mr-3"
        onClick={() => setIsiKertasKerja(true)}
      >
        <Icon as="i" color="default" fontSize="default">
          add
        </Icon>
        Tambah Kegiatan
      </Button>
      <FormDialogComponent
        width={960}
        title="Isi Detail Anggaran Kegiatan"
        isOpen={isiKertasKerja}
        onCancel={onCancel}
        onSubmit={handleSubmit(onSubmit)}
      >
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
            required={true}
          />
        </div>
        <div className="mb-5">
          <div className="text-base pb-1 font-normal text-gray-900">
            Rekening Belanja
          </div>
          <InputSearchComponent
            width={888}
            name="rekening_belanja"
            placeholder="Belanja Makanan dan Minuman pada Fasilitas Pelayanan Urusan Pendidikan"
            errors={errors}
            register={register}
            required={true}
            isDisabled={true}
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
                required={true}
                isDisabled={true}
              />
            </span>
            <span className="flex-none w-[289px]">
              <div className="text-base pb-1 font-normal text-gray-900">
                Harga Satuan yang Dianggarkan
              </div>
              <InputComponent
                type="text"
                name="harga_satuan"
                placeholder="Berapa perkiraan harganya?"
                errors={errors}
                register={register}
                required={true}
                isDisabled={true}
              />
            </span>
          </div>
          <div className="mb-5">Dianggarkan untuk Bulan</div>
          <div className="grid grid-cols-2 gap-x-[40px] gap-y-[20px]">
            <div className="border rounded border-solid border-gray-500 py-3 px-4 text-base">
              <div className="flex justify-between shadow pb-[6px] ">
                <span>Januari</span>
                <span>Rp 0</span>
              </div>
              <div className="flex mt-[14px]">
                <span className="flex-none pr-6">
                  <InputComponent
                    type="text"
                    name="jumlah"
                    placeholder="Jumlah"
                    errors={errors}
                    register={register}
                    required={true}
                    isDisabled={true}
                  />
                </span>
                <span className="flex-grow">
                  <InputSearchComponent
                    width={255}
                    name="satuan"
                    placeholder="Satuan"
                    errors={errors}
                    register={register}
                    required={true}
                    isDisabled={true}
                  />
                </span>
              </div>
            </div>
            <div
              className={clsx(
                styles.borderDashed,
                'grid place-content-center cursor-pointer'
              )}
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
          </div>
        </div>
      </FormDialogComponent>
    </div>
  )
}

export default FormIsiDetailKertasKerjaView
