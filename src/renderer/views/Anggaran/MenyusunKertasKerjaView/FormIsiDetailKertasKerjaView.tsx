import React, { FC } from 'react'
import { useForm } from 'react-hook-form'

import FormDialogComponent from 'renderer/components/Dialog/FormDialogComponent'

import { Icon } from '@wartek-id/icon'
import { Button } from '@wartek-id/button'

import { FormCreateKertasKerjaData } from 'renderer/types/AnggaranType'

import { AnggaranStates, useAnggaranStore } from 'renderer/stores/anggaran'

const FormIsiDetailKertasKerjaView: FC = () => {
  const isiKertasKerja = useAnggaranStore(
    (state: AnggaranStates) => state.isiKertasKerja
  )
  const setIsiKertasKerja = useAnggaranStore(
    (state: AnggaranStates) => state.setIsiKertasKerja
  )

  const {
    // register,
    handleSubmit,
    // setValue,
    // formState: { errors },
  } = useForm<FormCreateKertasKerjaData>({
    mode: 'onChange',
  })

  const onSubmit = async (data: FormCreateKertasKerjaData) => {
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
        <div>Form</div>
      </FormDialogComponent>
    </div>
  )
}

export default FormIsiDetailKertasKerjaView
