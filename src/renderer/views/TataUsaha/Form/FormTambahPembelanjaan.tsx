import React, { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import FormDialogComponent from 'renderer/components/Dialog/FormDialogComponent'

const FormTambahPembelanjaanView: FC = () => {
  const navigate = useNavigate()

  const formMethods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  })

  const closeModal = () => {
    navigate(-1)
  }

  return (
    <>
      <FormProvider {...formMethods}>
        <FormDialogComponent
          width={720}
          title="Isi Detail Pembelanjaan"
          subtitle="Isi detail pembelanjaan barang/jasa yang terdapat dalam 1 nota."
          isOpen={true}
          btnAlertSubmitText="Kembali Isi Penerimaan Dana"
          btnSubmitText="Konfirmasi"
          onCancel={closeModal}
          onSubmit={null}
        >
          <div>
            <div className="pb-5">
              <div className="text-base pb-1 font-normal text-gray-900">
                Periode Penerimaan
              </div>
            </div>
          </div>
        </FormDialogComponent>
      </FormProvider>
    </>
  )
}

export default FormTambahPembelanjaanView
