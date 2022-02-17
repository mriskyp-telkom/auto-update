import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

import InputComponent from '../../components/Form/InputComponent'
import AlertDialogComponent from '../../components/Dialog/AlertDialogComponent'
import FormDialogComponent from '../../components/Dialog/FormDialogComponent'

import KonfirmasiKertasKerjaView from './KonfirmasiKertasKerjaView'

import { FormCreateKertasKerjaData } from '../../types/AnggaranType'
import { AnggaranStates, useAnggaranStore } from '../../stores/anggaran'

const FormKertasKerjaView: FC = () => {
  const [openModalConfirmCancel, setOpenModalConfirmCancel] = useState(false)

  const createKertasKerja = useAnggaranStore(
    (state: AnggaranStates) => state.createKertasKerja
  )
  const setCreateKertasKerja = useAnggaranStore(
    (state: AnggaranStates) => state.setCreateKertasKerja
  )
  const setConfirmKertasKerja = useAnggaranStore(
    (state: AnggaranStates) => state.setConfirmKertasKerja
  )

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormCreateKertasKerjaData>({
    mode: 'onChange',
  })

  const onSubmit = async (data: FormCreateKertasKerjaData) => {
    console.log(data)
    setCreateKertasKerja(false)
    setConfirmKertasKerja(true)
  }

  const onCancel = () => {
    setOpenModalConfirmCancel(true)
  }

  const onConfirmCancel = () => {
    setOpenModalConfirmCancel(false)
    setCreateKertasKerja(false)
  }

  const formatNIP = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{9})(\d)/, '$1.$2')
      .replace(/(\d{6})(\d)/, '$1.$2')
  }

  return (
    <div>
      <FormDialogComponent
        width={960}
        title="Isi Data Penanggung Jawab"
        subtitle="Data kepala sekolah dan bendahara terisi otomatis dari Dapodik."
        isOpen={createKertasKerja}
        onCancel={onCancel}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div className="flex pb-5">
            <div className="flex-1 pr-7">
              <div className="text-[14px] pb-1 font-normal text-gray-900">
                Nama Kepala Sekolah
              </div>
              <InputComponent
                type="text"
                name="nama_kepala_sekolah"
                placeholder="Masukkan nama kepala sekolah"
                errors={errors}
                register={register}
                required={true}
              />
            </div>
            <div className="flex-1 pr-7">
              <div className="text-[14px] pb-1 font-normal text-gray-900">
                Nama Bendahara
              </div>
              <InputComponent
                type="text"
                name="nama_bendahara"
                placeholder="Masukkan nama bendahara"
                errors={errors}
                register={register}
                required={true}
              />
            </div>
            <div className="flex-1">
              <div className="text-[14px] pb-1 font-normal text-gray-900">
                Nama Komite
              </div>
              <InputComponent
                type="text"
                name="nama_komite"
                placeholder="Masukkan nama komite"
                errors={errors}
                register={register}
                required={true}
              />
            </div>
          </div>
          <div className="flex">
            <div className="flex-1 pr-7">
              <div className="text-[14px] pb-1 font-normal text-gray-900">
                NIP Kepala Sekolah (Opsional)
              </div>
              <InputComponent
                type="text"
                name="nip_kepala_sekolah"
                placeholder="Masukkan NIP kepala sekolah"
                errors={errors}
                register={register}
                required={false}
                registerOption={{
                  onChange: (e) => {
                    setValue('nip_kepala_sekolah', formatNIP(e.target.value))
                  },
                }}
              />
            </div>
            <div className="flex-1 pr-7">
              <div className="text-[14px] pb-1 font-normal text-gray-900">
                NIP Bendahara (Opsional)
              </div>
              <InputComponent
                type="text"
                name="nip_bendahara"
                placeholder="Masukkan NIP bendahara"
                errors={errors}
                register={register}
                required={false}
                registerOption={{
                  onChange: (e) => {
                    setValue('nip_bendahara', formatNIP(e.target.value))
                  },
                }}
              />
            </div>
            <div className="flex-1">
              <div className="text-[14px] pb-1 font-normal text-gray-900">
                Email Komite
              </div>
              <InputComponent
                type="email"
                name="email_komite"
                placeholder="Masukkan email komite"
                errors={errors}
                register={register}
                required={true}
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
        isOpen={openModalConfirmCancel}
        btnCancelText="Ya, Batalkan"
        btnActionText="Kembali"
        onCancel={onConfirmCancel}
        onSubmit={() => setOpenModalConfirmCancel(false)}
        layer={2}
      />
      <KonfirmasiKertasKerjaView />
    </div>
  )
}

export default FormKertasKerjaView
