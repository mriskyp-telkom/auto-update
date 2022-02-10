import React, { FC } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'

import HeaderComponent from 'components/HeaderComponent'

import DashboardView from 'views/DashboardView'
import AboutView from 'views/AboutView'
import NotFoundView from 'views/NotFoundView'

import StatusAccountView from 'views/Auth/StatusAccountView'
import LoginView from 'views/Auth/LoginView'
import CreateAccountView from 'views/Auth/CreateAccountView'
import RegistrationView from 'views/Auth/RegistrationView'

import DashboardAnggaranView from 'views/Anggaran/DashboardAnggaranView'
import MenyusunAnggaranView from 'views/Anggaran/MenyusunAnggaranView'

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
