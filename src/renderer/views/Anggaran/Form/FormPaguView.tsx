import React, { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { numberUtils } from '@wartek-id/fe-toolbox'

import FormDialogComponent from 'renderer/components/Dialog/FormDialogComponent'
import InputComponent from 'renderer/components/Form/InputComponent'

import { KonfirmasiKertasKerjaData } from 'renderer/types/datas/AnggaranType'
import { AnggaranStates, useAnggaranStore } from 'renderer/stores/anggaran'

const KonfirmasiPaguView: FC = () => {
  const navigate = useNavigate()

  const [amount, setAmount] = useState(0)

  const [allowEdit, setAllowEdit] = useState(false)

  const paguTemp = useAnggaranStore((state: AnggaranStates) => state.paguTemp)
  const setPagu = useAnggaranStore((state: AnggaranStates) => state.setPagu)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<KonfirmasiKertasKerjaData>({
    mode: 'onChange',
  })

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
  )
}

export default KonfirmasiPaguView
