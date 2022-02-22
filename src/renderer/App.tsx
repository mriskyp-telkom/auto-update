import React, { FC } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <div className="App">
          <Routes>
            <Route path="*" element={<NotFoundView />} />
            <Route path="/" element={<LoginView />} />
            <Route path="/registration" element={<RegistrationView />} />
            <Route path="/account-status" element={<StatusAccountView />} />
            <Route
              path="/create-account/:mode"
              element={<CreateAccountView />}
            />
            <Route path="anggaran">
              <Route index={true} element={<DashboardAnggaranView />} />
              <Route path="menyusun" element={<MenyusunKertasKerjaView />} />
            </Route>
            <Route path="/about" element={<AboutView />} />
            <Route path="/dashboard" element={<DashboardView />} />
          </Routes>
        </div>
      </HashRouter>
    </QueryClientProvider>
  )
}

export default App
