import React, { FC } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'

import HeaderComponent from 'renderer/components/HeaderComponent'

import DashboardView from 'renderer/views/DashboardView'
import AboutView from 'renderer/views/AboutView'
import NotFoundView from 'renderer/views/NotFoundView'

import StatusAccountView from 'renderer/views/Auth/StatusAccountView'
import LoginView from 'renderer/views/Auth/LoginView'
import CreateAccountView from 'renderer/views/Auth/CreateAccountView'
import RegistrationView from 'renderer/views/Auth/RegistrationView'

import DashboardAnggaranView from 'renderer/views/Anggaran/DashboardAnggaranView'
import MenyusunAnggaranView from 'renderer/views/Anggaran/MenyusunAnggaranView'

const App: FC = () => {
  return (
    <HashRouter>
      <div className="App">
        <HeaderComponent />
        <Routes>
          <Route path="*" element={<NotFoundView />} />
          <Route path="/" element={<LoginView />} />
          <Route path="/registration" element={<RegistrationView />} />
          <Route path="/account-status" element={<StatusAccountView />} />
          <Route path="/create-account/:mode" element={<CreateAccountView />} />
          <Route path="anggaran">
            <Route index={true} element={<DashboardAnggaranView />} />
            <Route path="menyusun" element={<MenyusunAnggaranView />} />
          </Route>
          <Route path="/about" element={<AboutView />} />
          <Route path="/dashboard" element={<DashboardView />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
