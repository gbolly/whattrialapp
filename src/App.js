import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";

import { getFromStore, getCookie } from "./utilities/storage-helpers";
import AuthContext from "./context/authContext";
import WhatNav from "./components/Navbar";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import "./App.scss";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    getUser();
    getAuth();
  }, [userEmail, isAuthenticated]);

  const getUser = async () => {
    const currentUser = await getFromStore("userEmail");
    setUserEmail(currentUser);
  };

  const getAuth = async () => {
    const csrftoken = await getCookie("csrftoken");
    if (csrftoken) {
      setIsAuthenticated(true);
    }
  }

  return (
    <div className="app">
      <AuthContext.Provider
        value={{isAuthenticated, userEmail, setIsAuthenticated, setUserEmail}}
      >
        <BrowserRouter>
          <WhatNav />
          <Container>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
            </Routes>
          </Container>
        </BrowserRouter>
        </AuthContext.Provider>
    </div>
  );
}

export default App;
