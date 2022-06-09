import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AlertDialogComponent from 'renderer/components/Dialog/AlertDialogComponent'
import { ALERT_UPDATE } from 'renderer/constants/perbaruiAplikasi'

const DialogUpdate: FC = () => {
  const navigate = useNavigate()
  const { q_response } = useParams()

  const [response, setResponse] = useState('')

  const handleCancel = () => {
    navigate(-1)
  }

  const handleSubmit = () => {
    // TODO: handle each response
    navigate(-1)
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
      isOpen={true}
      btnCancelText={ALERT_UPDATE[response]?.btnCancelText}
      btnActionText={ALERT_UPDATE[response]?.btnActionText}
      onCancel={handleCancel}
      onSubmit={handleSubmit}
      hideBtnCancel={ALERT_UPDATE[response]?.hideBtnCancel}
    />
  )
}

export default DialogUpdate
