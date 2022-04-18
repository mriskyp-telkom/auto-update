import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import SyncDialogComponent from 'renderer/components/Dialog/SyncDialogComponent'

import { AnggaranStates, useAnggaranStore } from 'renderer/stores/anggaran'

import { RESPONSE_CEK_STATUS } from 'renderer/constants/anggaran'

import { ResponseCekStatus } from 'renderer/types/AnggaranType'

const SyncCekStatusKKView: FC = () => {
  const navigate = useNavigate()

  const setResponseCekStatus = useAnggaranStore(
    (state: AnggaranStates) => state.setResponseCekStatus
  )

  const closeModal = () => {
    setResponseCekStatus(RESPONSE_CEK_STATUS.approved as ResponseCekStatus)
    navigate(-1)
  }

  useEffect(() => {
    setTimeout(() => {
      closeModal()
    }, 3000)
  }, [])

  return (
    <SyncDialogComponent
      title="Cek Status Terbaru..."
      percentage={50}
      isOpen={true}
      setIsOpen={closeModal}
    />
  )
}

export default SyncCekStatusKKView
