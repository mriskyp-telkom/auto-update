import React, { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import InputComponent from 'renderer/components/Form/InputComponent'
import AlertDialogComponent from 'renderer/components/Dialog/AlertDialogComponent'
import FormDialogComponent from 'renderer/components/Dialog/FormDialogComponent'

import KonfirmasiKertasKerjaView from './KonfirmasiPaguView'

import { FormCreateKertasKerjaData } from 'renderer/types/AnggaranType'

import { AnggaranStates, useAnggaranStore } from 'renderer/stores/anggaran'

interface FormPenanggungJawabProps {
  mode: 'create' | 'update'
}
const FormPenanggungJawabView: FC<FormPenanggungJawabProps> = (
  props: FormPenanggungJawabProps
) => {
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
  const penanggungJawabTemp = useAnggaranStore(
    (state: AnggaranStates) => state.penanggungJawabTemp
  )
  const penanggungJawab = useAnggaranStore(
    (state: AnggaranStates) => state.penanggungJawab
  )
  const setPenanggungJawab = useAnggaranStore(
    (state: AnggaranStates) => state.setPenanggungJawab
  )

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormCreateKertasKerjaData>({
    mode: 'onChange',
  })

  useEffect(() => {
    const penjab =
      props.mode === 'create' ? penanggungJawabTemp : penanggungJawab

    if (penjab != null) {
      setValue('nama_kepala_sekolah', penjab.kepsek, {
        shouldValidate: true,
      })
      setValue('nama_bendahara', penjab.bendahara, {
        shouldValidate: true,
      })
      setValue('nama_komite', penjab.komite, {
        shouldValidate: true,
      })
      setValue('nip_kepala_sekolah', formatNIP(penjab.nip_kepsek), {
        shouldValidate: true,
      })
      setValue('nip_bendahara', formatNIP(penjab.nip_bendahara), {
        shouldValidate: true,
      })
      setValue('email_komite', penjab.email_komite, {
        shouldValidate: true,
      })
    }
  }, [setValue, penanggungJawabTemp, penanggungJawab])

  const onSubmit = async (data: FormCreateKertasKerjaData) => {
    setCreateKertasKerja(false)
    const penjab = {
      sekolah_id: penanggungJawabTemp.sekolah_id,
      kepsek: data.nama_kepala_sekolah,
      bendahara: data.nama_bendahara,
      komite: data.nama_komite,
      nip_kepsek: data.nip_kepala_sekolah,
      nip_bendahara: data.nip_bendahara,
      nip_komite: penanggungJawabTemp.nip_komite,
      email_kepsek: penanggungJawabTemp.email_kepsek,
      email_bendahara: penanggungJawabTemp.email_bendahara,
      email_komite: data.email_komite,
      telepon_kepsek: penanggungJawabTemp.telepon_kepsek,
      telepon_bendahara: penanggungJawabTemp.telepon_bendahara,
    }

    setPenanggungJawab(penjab)
    if (props.mode === 'create') {
      setConfirmKertasKerja(true)
    }
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
        btnSubmitText={props.mode === 'create' ? 'Lanjutkan' : 'Perbarui'}
        isOpen={createKertasKerja}
        onCancel={onCancel}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div className="flex pb-5">
            <div className="flex-1 pr-7">
              <div className="text-base pb-1 font-normal text-gray-900">
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
              <div className="text-base pb-1 font-normal text-gray-900">
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
              <div className="text-base pb-1 font-normal text-gray-900">
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
              <div className="text-base pb-1 font-normal text-gray-900">
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
              <div className="text-base pb-1 font-normal text-gray-900">
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
              <div className="text-base pb-1 font-normal text-gray-900">
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

export default FormPenanggungJawabView
