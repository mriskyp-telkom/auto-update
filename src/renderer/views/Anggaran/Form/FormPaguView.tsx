import React, { FC, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { numberUtils } from '@wartek-id/fe-toolbox'

import FormDialogComponent from 'renderer/components/Dialog/FormDialogComponent'
import InputComponent from 'renderer/components/Form/InputComponent'

import { FormPaguData } from 'renderer/types/forms/AnggaranType'
import { AnggaranStates, useAnggaranStore } from 'renderer/stores/anggaran'

const FormPaguView: FC = () => {
  const navigate = useNavigate()

  const [amount, setAmount] = useState(0)

  const [allowEdit, setAllowEdit] = useState(false)

  const paguTemp = useAnggaranStore((state: AnggaranStates) => state.paguTemp)
  const setPagu = useAnggaranStore((state: AnggaranStates) => state.setPagu)

  const formMethods = useForm<FormPaguData>({
    mode: 'onChange',
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = formMethods

  const closeModal = () => {
    navigate(-1)
  }

  const onSubmit = async () => {
    setPagu({
      sekolah_id: paguTemp.sekolah_id,
      sumber_dana_id: paguTemp.sumber_dana_id,
      allow_edit: paguTemp.allow_edit,
      volume: paguTemp.volume,
      harga_satuan: paguTemp.harga_satuan,
      jumlah: amount,
    })
    navigate('/anggaran/menyusun/create')
  }

  useEffect(() => {
    if (paguTemp != null) {
      setValue('nominal', `Rp ${numberUtils.delimit(paguTemp.jumlah, '.')}`, {
        shouldValidate: true,
      })
      setAllowEdit(paguTemp.allow_edit)
      setAmount(paguTemp.jumlah)
    }
  }, [setValue, paguTemp])

  return (
    <FormProvider {...formMethods}>
      <FormDialogComponent
        width={720}
        title="Dana Pagu BOS Reguler"
        subtitle="Nominal diambil dari BOS Salur dan dihitung sesuai ketentuan Permendikbud terbaru. Pastikan data jumlah murid di Dapodik sudah diperbarui."
        isOpen={true}
        onCancel={closeModal}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div className="pr-7">
            <div className="text-base pb-1 font-normal text-gray-900">
              Nominal Penerimaan
            </div>
            <InputComponent
              type="text"
              name="nominal"
              placeholder="Masukkan nominal penerimaan"
              errors={errors}
              register={register}
              required={true}
              registerOption={{
                onChange: (e) => {
                  const numb = e.target.value.replace(/[^,\d]/g, '').toString()
                  setAmount(numb)
                  if (numb !== null) {
                    setValue('nominal', `Rp ${numberUtils.delimit(numb, '.')}`)
                  }
                },
              }}
              isDisabled={!allowEdit}
            />
            <div className="pt-1 text-[12px] text-gray-600">
              (jumlah murid) x (nominal BOS per daerah)
            </div>
          </div>
        </div>
      </FormDialogComponent>
    </FormProvider>
  )
}

export default FormPaguView
