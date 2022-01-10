import React, { FC } from "react";
import { HashRouter, Link, Route, Routes } from "react-router-dom";

import HomeApp from "./app/HomeApp";
import AboutApp from "./app/AboutApp";

const App: FC = () => {
  return (
    <HashRouter>
      <div className="App">
        <div className="menu">
          <Link to="/">
            <h2>Home</h2>
          </Link>
          <Link to="/about">
            <h2>About</h2>
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<HomeApp />} />
          <Route path="/about" element={<AboutApp />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
