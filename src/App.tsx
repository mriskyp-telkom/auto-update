import React, { FC } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'

import HeaderComponent from './components/HeaderComponent'

import DashboardView from './views/DashboardView'
import AboutView from './views/AboutView'
import LoginView from './views/Login/LoginView'

const App: FC = () => {
  return (
    <HashRouter>
      <div className="App">
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="/about" element={<AboutView />} />
          <Route path="/dashboard" element={<DashboardView />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
