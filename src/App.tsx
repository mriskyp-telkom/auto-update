import React, { FC } from 'react'
import { HashRouter, Link, Route, Routes } from 'react-router-dom'

import { Button } from '@wartek-id/button'

import HomeView from 'views/HomeView'
import AboutView from 'views/AboutView'

const App: FC = () => {
  return (
    <HashRouter>
      <div className="App">
        <img src="./assets/logo-arkas.png" />
        <div className="menu">
          <Link to="/">
            <Button color="blue" size="md" variant="solid">
              Home
            </Button>
          </Link>
          <Link to="/about">
            <Button color="blue" size="md" variant="solid">
              About
            </Button>
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/about" element={<AboutView />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
