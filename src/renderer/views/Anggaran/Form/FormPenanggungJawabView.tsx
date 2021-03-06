import React, { FC, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

import InputComponent from 'renderer/components/Form/InputComponent'
import FormDialogComponent from 'renderer/components/Dialog/FormDialogComponent'

import {
  FormPenanggungJawabData,
  FormPenanggungJawabType,
} from 'renderer/types/forms/AnggaranType'

import { AnggaranStates, useAnggaranStore } from 'renderer/stores/anggaran'

import syncToIPCMain from 'renderer/configs/ipc'

import { ERROR_LENGTH } from 'renderer/constants/errorForm'

import { btnFormDisabled } from 'renderer/utils/form-validation'
import { formatNIP, formattingToNumber } from 'renderer/utils/number-formatting'

import { IPC_ANGGARAN, IPC_PENJAB } from 'global/ipc'

const NIP_ERROR_LENGTH = ERROR_LENGTH('NIP', 18)

const FormPenanggungJawabView: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { q_mode, q_id_anggaran } = useParams()

  const [dataPenjab, setDataPenjab] = useState(null)

  const penanggungJawab = useAnggaranStore(
    (state: AnggaranStates) => state.penanggungJawab
  )

  const penanggungJawabTemp = useAnggaranStore(
    (state: AnggaranStates) => state.penanggungJawabTemp
  )

  const setPenanggungJawab = useAnggaranStore(
    (state: AnggaranStates) => state.setPenanggungJawab
  )

  const formMethods = useForm<FormPenanggungJawabData>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  })

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = formMethods

  const handleClearError = (name: FormPenanggungJawabType) => {
    clearErrors(name)
  }

  const handleSetValue = (penjab: any) => {
    if (penjab != null) {
      reset({
        nama_kepala_sekolah: penjab.kepsek,
        nama_bendahara: penjab.bendahara,
        nama_komite: penjab.komite,
        nip_kepala_sekolah: formatNIP(penjab.nip_kepsek),
        nip_bendahara: formatNIP(penjab.nip_bendahara),
        email_komite: penjab.nip_komite,
      })
    }
  }

  const onSubmit = async (data: FormPenanggungJawabData) => {
    const idPenjab = q_mode === 'create' ? null : dataPenjab.id_penjab

    const penjab = {
      id_penjab: idPenjab,
      sekolah_id: dataPenjab.sekolah_id,
      kepsek: data.nama_kepala_sekolah,
      bendahara: data.nama_bendahara,
      komite: data.nama_komite,
      nip_kepsek: formattingToNumber(data.nip_kepala_sekolah),
      nip_bendahara: formattingToNumber(data.nip_bendahara),
      nip_komite: data.email_komite,
      email_kepsek: dataPenjab.email_kepsek,
      email_bendahara: dataPenjab.email_bendahara,
      email_komite: data.email_komite,
      telepon_kepsek: dataPenjab.telepon_kepsek,
      telepon_bendahara: dataPenjab.telepon_bendahara,
    }

    if (q_mode === 'create') {
      setPenanggungJawab(penjab)
      navigate('/form/pagu', {
        state: location.state,
      })
    }

    if (q_mode === 'update') {
      syncToIPCMain('penjab:updatePenjab', penjab)
      closeModal()
    }
  }

  const closeModal = () => {
    navigate(-1)
  }

  const handleMinLengthNip = (v: any) => {
    const fixed = v === '' || v.replaceAll('.', '').length === 18

    return fixed || NIP_ERROR_LENGTH
  }

  const handleBlurNip = (e: any, name: FormPenanggungJawabType) => {
    const maskValue = e.target.value
    const value = maskValue.replaceAll('.', '')

    if (value !== '' && value.length !== 18) {
      setError(name, {
        type: 'manual',
        message: NIP_ERROR_LENGTH,
      })
      return
    }

    handleClearError(name)
  }

  const handleChangeNip = (e: any, name: FormPenanggungJawabType) => {
    const maskValue = e.target.value
    const value = maskValue.replaceAll('.', '')

    setValue(name, formatNIP(value))

    if (
      value !== '' &&
      value.length === 18 &&
      errors[name]?.message === NIP_ERROR_LENGTH
    ) {
      handleClearError(name)
      return
    }
  }

  useEffect(() => {
    let penjab = {}

    if (q_mode === 'create') {
      penjab = penanggungJawab === null ? penanggungJawabTemp : penanggungJawab
    }

    if (q_mode === 'update' && q_id_anggaran !== undefined) {
      const id_anggaran = decodeURIComponent(q_id_anggaran)

      const dataAnggaran = syncToIPCMain(
        IPC_ANGGARAN.getAnggaranById,
        id_anggaran
      )

      const dataPenjab = syncToIPCMain(
        IPC_PENJAB.getPenjabById,
        dataAnggaran.idPenjab
      )

      penjab = {
        id_penjab: dataAnggaran.idPenjab,
        sekolah_id: dataPenjab.sekolahId,
        kepsek: dataPenjab.ks,
        bendahara: dataPenjab.bendahara,
        komite: dataPenjab.komite,
        nip_kepsek: dataPenjab.nipKs,
        nip_bendahara: dataPenjab.nipBendahara,
        nip_komite: dataPenjab.nipKomite,
        email_kepsek: dataPenjab.emailKs,
        email_bendahara: dataPenjab.emailBendahara,
        email_komite: dataPenjab.emailKomite,
        telepon_kepsek: dataPenjab.telpKs,
        telepon_bendahara: dataPenjab.telpBendahara,
      }
    }

    handleSetValue(penjab)
    setDataPenjab(penjab)
  }, [])

  return (
    <div>
      <FormProvider {...formMethods}>
        <FormDialogComponent
          width={960}
          title="Isi Data Penanggung Jawab"
          subtitle="Data kepala sekolah dan bendahara terisi otomatis dari Dapodik."
          btnSubmitText={q_mode === 'create' ? 'Lanjutkan' : 'Perbarui'}
          isOpen={true}
          onCancel={closeModal}
          onSubmit={handleSubmit(onSubmit)}
          isSubmitDisabled={btnFormDisabled(errors)}
        >
          <div>
            <div className="flex pb-5">
              <div className="flex-1 pr-7">
                <div className="text-base pb-1 font-normal text-gray-900">
                  Nama Kepala Sekolah
                </div>
                <InputComponent
                  type="name"
                  name="nama_kepala_sekolah"
                  placeholder="Masukkan nama kepala sekolah"
                  errors={errors}
                  register={register}
                  setError={setError}
                  handleClearError={handleClearError}
                  required={true}
                />
              </div>
              <div className="flex-1 pr-7">
                <div className="text-base pb-1 font-normal text-gray-900">
                  Nama Bendahara
                </div>
                <InputComponent
                  type="name"
                  name="nama_bendahara"
                  placeholder="Masukkan nama bendahara"
                  errors={errors}
                  register={register}
                  setError={setError}
                  handleClearError={handleClearError}
                  required={true}
                />
              </div>
              <div className="flex-1">
                <div className="text-base pb-1 font-normal text-gray-900">
                  Nama Komite
                </div>
                <InputComponent
                  type="alphabet"
                  name="nama_komite"
                  placeholder="Masukkan nama komite"
                  errors={errors}
                  register={register}
                  setError={setError}
                  handleClearError={handleClearError}
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
                    validate: {
                      minMaxLength: (v) => handleMinLengthNip(v),
                    },
                    onBlur: (e) => handleBlurNip(e, 'nip_kepala_sekolah'),
                    onChange: (e) => handleChangeNip(e, 'nip_kepala_sekolah'),
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
                    validate: {
                      minMaxLength: (v) => handleMinLengthNip(v),
                    },
                    onBlur: (e) => handleBlurNip(e, 'nip_bendahara'),
                    onChange: (e) => handleChangeNip(e, 'nip_bendahara'),
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
                  setError={setError}
                  handleClearError={handleClearError}
                  required={true}
                />
              </div>
            </div>
          </div>
        </FormDialogComponent>
      </FormProvider>
    </div>
  )
}

export default FormPenanggungJawabView
