import React, { FC, useState } from 'react'

import { Button } from '@wartek-id/button'
import { Icon } from '@wartek-id/icon'

import AlertDialogComponent from 'components/Dialog/AlertDialogComponent'
import SyncDialogComponent from 'components/Dialog/SyncDialogComponent'
import FormDialogComponent from 'components/Dialog/FormDialogComponent'

import FormKertasKerjaView from './FormKertasKerjaView'

const CreateKertasKerjaView: FC = () => {
  const [isSync, setIsSync] = useState(false)
  const [openModalFailed, setOpenModalFailed] = useState(false)
  const [openModalForm, setOpenModalForm] = useState(false)

  const onClickCreate = () => {
    setIsSync(true)
    setTimeout(() => {
      setIsSync(false)
      // setOpenModalFailed(true)
      setOpenModalForm(true)
    }, 3000)
  }

  return (
    <div>
      <Button color="black" size="md" variant="solid" onClick={onClickCreate}>
        <Icon
          as="i"
          color="default"
          fontSize="default"
          style={{ color: '#ffffff' }}
        >
          add
        </Icon>
        Buat Kertas Kerja
      </Button>
      <AlertDialogComponent
        type="failed"
        icon="close"
        title="Maaf, sumber dana tidak ditemukan"
        desc="Anda tidak bisa membuat Kertas Kerja dari sumber dana BOS Reguler karena belum ada pencatatan penerimaan dana dari BOSSalur. Silakan hubungi dinas setempat jika ada kesalahan."
        isOpen={openModalFailed}
        hideBtnCancel={true}
        btnActionText="Tutup"
        setIsOpen={setOpenModalFailed}
        onSubmit={() => setOpenModalFailed(false)}
      />
      <SyncDialogComponent
        title="Sinkronisasi Data..."
        percentage={50}
        isOpen={isSync}
        setIsOpen={setIsSync}
      />
      <FormDialogComponent
        width={960}
        title="Isi Data Penanggung Jawab"
        subtitle="Data kepala sekolah dan bendahara terisi otomatis dari Dapodik."
        content={<FormKertasKerjaView />}
        isOpen={openModalForm}
        setIsOpen={setOpenModalForm}
      />
    </div>
  )
}

export default CreateKertasKerjaView
