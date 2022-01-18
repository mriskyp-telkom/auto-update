import React, { FC } from "react";
import { HashRouter, Link, Route, Routes } from "react-router-dom";

import { Button } from "@wartek-id/button";

import HomeApp from "./app/HomeApp";
import AboutApp from "./app/AboutApp";

const App: FC = () => {
  return (
    <HashRouter>
      <div className="App">
        <div className="menu">
          <Link to="/">
            <Button
              color="blue"
              size="md"
              variant="solid"
            >
              Home
            </Button>
          </Link>
          <Link to="/about">
            <Button
              color="blue"
              size="md"
              variant="solid"
            >
              About
            </Button>
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
