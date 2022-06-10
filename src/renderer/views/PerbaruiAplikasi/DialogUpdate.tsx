import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AlertDialogComponent from 'renderer/components/Dialog/AlertDialogComponent'
import {
  ALERT_UPDATE,
  RESPONSE_UPDATE,
} from 'renderer/constants/perbaruiAplikasi'

const DialogUpdate: FC = () => {
  const navigate = useNavigate()
  const { q_response } = useParams()

  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCancel = () => {
    navigate(-1)
  }

  const handleSubmit = () => {
    switch (response) {
      case RESPONSE_UPDATE.ready:
        setLoading(true)
        break
      case RESPONSE_UPDATE.success:
      case RESPONSE_UPDATE.already_updated:
      default:
        navigate(-1)
        break
    }
  }

  useEffect(() => {
    setResponse(q_response)
  }, [])

  return (
    <AlertDialogComponent
      type={ALERT_UPDATE[response]?.type}
      icon={ALERT_UPDATE[response]?.icon}
      title={ALERT_UPDATE[response]?.title}
      desc={ALERT_UPDATE[response]?.desc}
      isOpen={!loading}
      btnCancelText={ALERT_UPDATE[response]?.btnCancelText}
      btnActionText={ALERT_UPDATE[response]?.btnActionText}
      onCancel={handleCancel}
      onSubmit={handleSubmit}
      hideBtnCancel={ALERT_UPDATE[response]?.hideBtnCancel}
    />
  )
}

export default DialogUpdate
