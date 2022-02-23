import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import SyncDialogComponent from 'renderer/components/Dialog/SyncDialogComponent'

import { AuthStates, useAuthStore } from 'renderer/stores/auth'

import { useAPIGetToken } from 'renderer/apis/token'

const SyncLoginView: FC = () => {
  const navigate = useNavigate()

  const syncLogin = useAuthStore((state: AuthStates) => state.syncLogin)

  const setSyncLogin = useAuthStore((state: AuthStates) => state.setSyncLogin)

  const { data: dataToken } = useAPIGetToken(
    {
      username: '103019252021',
      password: 'E2TS',
    },
    { enabled: syncLogin }
  )

  useEffect(() => {
    if (dataToken !== undefined) {
      console.log(dataToken?.data)
      setSyncLogin(false)
      navigate('/dashboard')
    }
  }, [dataToken])

  return (
    <SyncDialogComponent
      title="Mencoba masuk ke ARKAS..."
      percentage={50}
      isOpen={syncLogin}
      setIsOpen={setSyncLogin}
    />
  )
}

export default SyncLoginView
