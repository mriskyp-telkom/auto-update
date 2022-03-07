import React, { FC, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from 'react-query'

import DashboardView from 'renderer/views/DashboardView'
import AboutView from 'renderer/views/AboutView'
import NotFoundView from 'renderer/views/NotFoundView'

import StatusAccountView from 'renderer/views/Auth/StatusAccountView'
import LoginView from 'renderer/views/Auth/LoginView'
import CreateAccountView from 'renderer/views/Auth/CreateAccountView'
import RegistrationView from 'renderer/views/Auth/RegistrationView'

import DashboardAnggaranView from 'renderer/views/Anggaran/DashboardAnggaranView'
import MenyusunKertasKerjaView from 'renderer/views/Anggaran/MenyusunKertasKerjaView'
import MengulasKertasKerjaView from 'renderer/views/Anggaran/MengulasKertasKerjaView'

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
  const [firstPage, setFirstPage] = useState(null)

  const location = useLocation()
  const state = location.state as { backgroundLocation?: Location }

  useEffect(() => {
    const result = ipcRenderer.sendSync('user:checkLogin')
    switch (result) {
      case 1:
        setFirstPage(<RegistrationView />)
        break
      case 2:
        setFirstPage(<LoginView />)
        break
      case 3:
        setFirstPage(<RegistrationView />)
        break
      case 4:
        setFirstPage(<StatusAccountView />)
        break
      case 5:
        setFirstPage(<DashboardView />)
        break
      default:
        setFirstPage(<RegistrationView />)
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Routes location={state?.backgroundLocation || location}>
          <Route path="*" element={<NotFoundView />} />
          <Route path="/" element={firstPage} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/registration" element={<RegistrationView />} />
          <Route path="/account-status" element={<StatusAccountView />} />
          <Route path="/create-account/:mode" element={<CreateAccountView />} />
          <Route path="anggaran">
            <Route index={true} element={<DashboardAnggaranView />} />
            <Route path="menyusun" element={<MenyusunKertasKerjaView />} />
            <Route path="mengulas" element={<MengulasKertasKerjaView />} />
          </Route>
          <Route path="/about" element={<AboutView />} />
          <Route path="/dashboard" element={<DashboardView />} />
        </Routes>
        {state?.backgroundLocation && (
          <Routes>
            <Route
              path="/form/kertas-kerja/:mode"
              element={<FormDetailKertasKerjaView />}
            />
          </Routes>
        )}
      </div>
    </QueryClientProvider>
  )
}

export default App
