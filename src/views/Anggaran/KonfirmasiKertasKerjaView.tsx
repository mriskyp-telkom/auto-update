import React, { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Input } from '@wartek-id/input'
// import { numberUtils } from '@wartek-id/fe-toolbox'

import FormDialogComponent from 'components/Dialog/FormDialogComponent'

import { KonfirmasiKertasKerjaData } from 'types/AnggaranType'
import { AnggaranStates, useAnggaranStore } from 'stores/anggaran'

const KonfirmasiKertasKerjaView: FC = () => {
  const navigate = useNavigate()

  const confirmKertasKerja = useAnggaranStore(
    (state: AnggaranStates) => state.confirmKertasKerja
  )
  const setConfirmKertasKerja = useAnggaranStore(
    (state: AnggaranStates) => state.setConfirmKertasKerja
  )

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<KonfirmasiKertasKerjaData>({
    mode: 'onChange',
  })

  const onSubmit = async (data: KonfirmasiKertasKerjaData) => {
    console.log(data)
    navigate('/anggaran/menyusun')
  }

  const onCancel = () => {
    setConfirmKertasKerja(false)
  }

  useEffect(() => {
    // setValue('nominal', `Rp ${numberUtils.delimit(300000000, '.')}`, {
    //   shouldValidate: true,
    // })
  }, [setValue])

  return (
    <FormDialogComponent
      width={720}
      title="Dana Pagu BOS Reguler"
      subtitle="Nominal diambil dari BOS Salur dan dihitung sesuai ketentuan Permendikbud terbaru. Pastikan data jumlah murid di Dapodik sudah diperbarui."
      isOpen={confirmKertasKerja}
      onCancel={onCancel}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <div className="pr-7">
          <div className="text-[14px] pb-1 font-normal text-gray-900">
            Nominal Penerimaan
          </div>
          <Input
            type="text"
            placeholder="Masukkan nominal penerimaan"
            id="nominal"
            name="nominal"
            isInvalid={!!errors.nominal}
            errorMessage={errors?.nominal?.message}
            {...register('nominal', {
              required: 'Wajib diisi.',
            })}
          />
          <div className="pt-1 text-[12px] text-gray-600">
            (jumlah murid) x (nominal BOS per daerah)
          </div>
        </div>
      </div>
    </FormDialogComponent>
  )
}

export default KonfirmasiKertasKerjaView
