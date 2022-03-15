import React, { FC, useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from 'react-query'

import NotFoundView from 'renderer/views/NotFoundView'

import StatusAccountView from 'renderer/views/Auth/StatusAccountView'
import LoginView from 'renderer/views/Auth/LoginView'
import LogoutView from 'renderer/views/Auth/LogoutView'
import CreateAccountView from 'renderer/views/Auth/CreateAccountView'
import RegistrationView from 'renderer/views/Auth/RegistrationView'

import DashboardAnggaranView from 'renderer/views/Anggaran/DashboardAnggaranView'
import MenyusunKertasKerjaView from 'renderer/views/Anggaran/MenyusunKertasKerjaView'
import MengulasKertasKerjaView from 'renderer/views/Anggaran/MengulasKertasKerjaView'
import SyncMengulasKertasKerjaView from 'renderer/views/Anggaran/MengulasKertasKerjaView/SyncMengulasKertasKerjaView'

import FormDetailKertasKerjaView from 'renderer/views/Anggaran/FormDetailKertasKerjaView'

const ipcRenderer = window.require('electron').ipcRenderer

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const App: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const state = location.state as { backgroundLocation?: Location }

  useEffect(() => {
    const result = ipcRenderer.sendSync('user:checkLogin')

    switch (result) {
      case 1:
        navigate('/registration')
        break
      case 2:
        navigate('/login')
        break
      case 3:
        navigate('/registration')
        break
      case 4:
        navigate('/account-status')
        break
      case 5:
        navigate('/anggaran')
        break
      default:
        navigate('/registration')
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Routes location={state?.backgroundLocation || location}>
          <Route path="*" element={<NotFoundView />} />
          <Route path="/">
            <Route path="login" element={<LoginView />} />
            <Route path="registration" element={<RegistrationView />} />
            <Route path="account-status" element={<StatusAccountView />} />
            <Route
              path="create-account/:mode"
              element={<CreateAccountView />}
            />
            <Route path="anggaran">
              <Route index={true} element={<DashboardAnggaranView />} />
              <Route
                path="menyusun/:mode"
                element={<MenyusunKertasKerjaView />}
              />
              <Route path="mengulas" element={<MengulasKertasKerjaView />} />
            </Route>
          </Route>
        </Routes>
        {state?.backgroundLocation && (
          <Routes>
            <Route path="/">
              <Route
                path="form/kertas-kerja/:mode"
                element={<FormDetailKertasKerjaView />}
              />
              <Route
                path="sync/anggaran/mengulas"
                element={<SyncMengulasKertasKerjaView />}
              />
              <Route path="logout" element={<LogoutView />} />
            </Route>
          </Routes>
        )}
      </div>
    </QueryClientProvider>
  )
}

export default App
