import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import AlertDialogComponent from 'renderer/components/Dialog/AlertDialogComponent'

import { Icon } from '@wartek-id/icon'
import { Button } from '@wartek-id/button'

import { AlertType } from 'renderer/types/ComponentType'

import { ALERT_CEK_STATUS } from 'renderer/constants/anggaran'

import { AnggaranStates, useAnggaranStore } from 'renderer/stores/anggaran'

const CekStatusKKView: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [alert, setAlert] = useState(false)

  const responseCekStatus = useAnggaranStore(
    (state: AnggaranStates) => state.responseCekStatus
  )

  const setResponseCekStatus = useAnggaranStore(
    (state: AnggaranStates) => state.setResponseCekStatus
  )

  const handleClickCekStatus = () => {
    navigate('/sync/anggaran/cek-status', {
      state: { backgroundLocation: location },
    })
  }

  const handleCloseAlert = () => {
    setAlert(false)
    setResponseCekStatus(null)
  }

  useEffect(() => {
    if (responseCekStatus !== null) {
      setAlert(true)
    }
  }, [responseCekStatus])

  return (
    <>
      <Button
        color="white"
        size="sm"
        variant="solid"
        className="font-normal mr-10"
        style={{ fontSize: '12px' }}
        onClick={handleClickCekStatus}
      >
        <Icon
          as="i"
          color="default"
          fontSize="small"
          className="mr-1"
          style={{ fontSize: '16px' }}
        >
          refresh
        </Icon>
        Cek Status Terbaru
      </Button>
      {responseCekStatus !== null && (
        <AlertDialogComponent
          type={ALERT_CEK_STATUS[responseCekStatus].type as AlertType}
          icon={ALERT_CEK_STATUS[responseCekStatus].icon}
          title={ALERT_CEK_STATUS[responseCekStatus].title}
          desc={ALERT_CEK_STATUS[responseCekStatus].desc}
          isOpen={alert}
          btnCancelText={ALERT_CEK_STATUS[responseCekStatus].btnCancelText}
          btnActionText={ALERT_CEK_STATUS[responseCekStatus].btnActionText}
          onCancel={handleCloseAlert}
          onSubmit={handleCloseAlert}
        />
      )}
    </>
  )
}

export default CekStatusKKView
