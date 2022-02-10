import React, { FC, useState } from 'react'

import { Button } from '@wartek-id/button'
import { Icon } from '@wartek-id/icon'

import AlertDialogComponent from 'components/Dialog/AlertDialogComponent'
import SyncDialogComponent from 'components/Dialog/SyncDialogComponent'

import FormKertasKerjaView from './FormKertasKerjaView'

import { AnggaranStates, useAnggaranStore } from 'stores/anggaran'

const CreateKertasKerjaView: FC = () => {
  const [isSync, setIsSync] = useState(false)
  const [openModalFailed, setOpenModalFailed] = useState(false)

  const setCreateKertasKerja = useAnggaranStore(
    (state: AnggaranStates) => state.setCreateKertasKerja
  )

  const onClickCreate = () => {
    setIsSync(true)
    setTimeout(() => {
      setIsSync(false)
      // setOpenModalFailed(true)
      setCreateKertasKerja(true)
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
        onSubmit={() => setOpenModalFailed(false)}
      />
      <SyncDialogComponent
        title="Sinkronisasi Data..."
        percentage={50}
        isOpen={isSync}
        setIsOpen={setIsSync}
      />
      <FormKertasKerjaView />
    </div>
  )
}

export default CreateKertasKerjaView
