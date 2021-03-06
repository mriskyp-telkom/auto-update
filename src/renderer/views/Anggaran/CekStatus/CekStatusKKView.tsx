import React, { FC } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { Icon } from '@wartek-id/icon'
import { Button } from '@wartek-id/button'

interface CekStatusKKViewProps {
  idAnggaran: string
  page: 'dashboard' | 'banner'
}

const CekStatusKKView: FC<CekStatusKKViewProps> = (
  props: CekStatusKKViewProps
) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClickCekStatus = () => {
    navigate(
      '/sync/anggaran/cek-status/' + encodeURIComponent(props.idAnggaran),
      {
        state: { backgroundLocation: location },
      }
    )
  }

  return (
    <>
      {props.page === 'dashboard' && (
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
      )}
      {props.page === 'banner' && (
        <Button
          color="white"
          size="sm"
          variant="solid"
          className="mr-3"
          style={{ backgroundColor: 'unset' }}
          onClick={handleClickCekStatus}
        >
          Cek Status
        </Button>
      )}
    </>
  )
}

export default CekStatusKKView
