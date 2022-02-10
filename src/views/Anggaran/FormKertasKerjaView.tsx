import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Input } from '@wartek-id/input'

import AlertDialogComponent from 'components/Dialog/AlertDialogComponent'
import FormDialogComponent from 'components/Dialog/FormDialogComponent'

import KonfirmasiKertasKerjaView from './KonfirmasiKertasKerjaView'

import { FormCreateKertasKerjaData } from 'types/AnggaranType'
import { AnggaranStates, useAnggaranStore } from 'stores/anggaran'

import { emailRegex } from 'constants/regex'

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
              <Input
                type="text"
                placeholder="Masukkan nama kepala sekolah"
                id="nama_kepala_sekolah"
                name="nama_kepala_sekolah"
                isInvalid={!!errors.nama_kepala_sekolah}
                errorMessage={errors?.nama_kepala_sekolah?.message}
                {...register('nama_kepala_sekolah', {
                  required: 'Wajib diisi.',
                })}
              />
            </div>
            <div className="flex-1 pr-7">
              <div className="text-[14px] pb-1 font-normal text-gray-900">
                Nama Bendahara
              </div>
              <Input
                type="text"
                placeholder="Masukkan nama bendahara"
                id="nama_bendahara"
                name="nama_bendahara"
                isInvalid={!!errors.nama_bendahara}
                errorMessage={errors?.nama_bendahara?.message}
                {...register('nama_bendahara', {
                  required: 'Wajib diisi.',
                })}
              />
            </div>
            <div className="flex-1">
              <div className="text-[14px] pb-1 font-normal text-gray-900">
                Nama Komite
              </div>
              <Input
                type="text"
                placeholder="Masukkan nama komite"
                id="nama_komite"
                name="nama_komite"
                isInvalid={!!errors.nama_komite}
                errorMessage={errors?.nama_komite?.message}
                {...register('nama_komite', {
                  required: 'Wajib diisi.',
                })}
              />
            </div>
          </div>
          <div className="flex">
            <div className="flex-1 pr-7">
              <div className="text-[14px] pb-1 font-normal text-gray-900">
                NIP Kepala Sekolah (Opsional)
              </div>
              <Input
                type="text"
                placeholder="Masukkan nip kepala sekolah"
                id="nip_kepala_sekolah"
                name="nip_kepala_sekolah"
                isInvalid={!!errors.nip_kepala_sekolah}
                errorMessage={errors?.nip_kepala_sekolah?.message}
                {...register('nip_kepala_sekolah', {
                  onChange: (e) => {
                    setValue('nip_kepala_sekolah', formatNIP(e.target.value))
                  },
                })}
              />
            </div>
            <div className="flex-1 pr-7">
              <div className="text-[14px] pb-1 font-normal text-gray-900">
                NIP Bendahara (Opsional)
              </div>
              <Input
                type="text"
                placeholder="Masukkan nip bendahara"
                id="nip_bendahara"
                name="nip_bendahara"
                isInvalid={!!errors.nip_bendahara}
                errorMessage={errors?.nip_bendahara?.message}
                {...register('nip_bendahara', {
                  onChange: (e) => {
                    setValue('nip_bendahara', formatNIP(e.target.value))
                  },
                })}
              />
            </div>
            <div className="flex-1">
              <div className="text-[14px] pb-1 font-normal text-gray-900">
                Email Komite
              </div>
              <Input
                type="text"
                placeholder="Masukkan email komite"
                id="email_komite"
                name="email_komite"
                isInvalid={!!errors.email_komite}
                errorMessage={errors?.email_komite?.message}
                {...register('email_komite', {
                  required: 'Wajib diisi.',
                  pattern: {
                    value: emailRegex,
                    message:
                      'Masukkan email dengan contoh format arini@yahoo.com',
                  },
                })}
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
