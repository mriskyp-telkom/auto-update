import React, { FC } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'

import HeaderComponent from 'components/HeaderComponent'

import DashboardView from 'views/DashboardView'
import AboutView from 'views/AboutView'

import StatusAccountView from 'views/Auth/StatusAccountView'
import LoginView from 'views/Auth/LoginView'
import RegistrationView from 'views/Auth/RegistrationView'
import ResetAccountView from 'views/Auth/ResetAccountView'

const App: FC = () => {
  return (
    <HashRouter>
      <div className="App">
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="/account-status" element={<StatusAccountView />} />
          <Route path="/registration" element={<RegistrationView />} />
          <Route path="/reset-account" element={<ResetAccountView />} />
          <Route path="/about" element={<AboutView />} />
          <Route path="/dashboard" element={<DashboardView />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
