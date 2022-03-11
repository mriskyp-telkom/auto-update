import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import SyncDialogComponent from 'renderer/components/Dialog/SyncDialogComponent'

import { AnggaranStates, useAnggaranStore } from 'renderer/stores/anggaran'

import { RESPONSE_PENGESAHAN } from 'renderer/constants/anggaran'

import { ResponseMengulas } from 'renderer/types/AnggaranType'

const SyncMengulasKertasKerjaView: FC = () => {
  const navigate = useNavigate()

  const setAlertMengulas = useAnggaranStore(
    (state: AnggaranStates) => state.setAlertMengulas
  )

  const setResponseMengulas = useAnggaranStore(
    (state: AnggaranStates) => state.setResponseMengulas
  )

  const closeModal = () => {
    navigate(-1)
  }

  const directPage = (response: ResponseMengulas) => {
    if (response === RESPONSE_PENGESAHAN.success) {
      closeModal()
    } else {
      navigate('/anggaran/menyusun/update')
    }
  }

  useEffect(() => {
    setTimeout(() => {
      const response =
        RESPONSE_PENGESAHAN.error_data_sentral as ResponseMengulas
      directPage(response)
      setResponseMengulas(response)
      setAlertMengulas(true)
    }, 3000)
  })

  return (
    <SyncDialogComponent
      title="Mengirim Kertas Kerja..."
      subtitle="Pastikan Anda terkoneksi ke internet yang lancar."
      percentage={50}
      isOpen={true}
      setIsOpen={closeModal}
    />
  )
}

export default SyncMengulasKertasKerjaView
