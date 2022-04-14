import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import SyncDialogComponent from 'renderer/components/Dialog/SyncDialogComponent'

import { TataUsahaStates, useTataUsahaStore } from 'renderer/stores/tata-usaha'

const SyncAktivasiBKUView: FC = () => {
  const navigate = useNavigate()

  const setIsActivationBKUFailed = useTataUsahaStore(
    (state: TataUsahaStates) => state.setIsActivationBKUFailed
  )

  const closeModal = () => {
    navigate(-1)
  }

  useEffect(() => {
    setTimeout(() => {
      setIsActivationBKUFailed(true)
      closeModal()
    }, 3000)
  }, [])

  return (
    <SyncDialogComponent
      title="Sinkronisasi Data..."
      percentage={50}
      isOpen={true}
      setIsOpen={closeModal}
    />
  )
}

export default SyncAktivasiBKUView
