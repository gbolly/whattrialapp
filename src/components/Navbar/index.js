import React, { useContext } from "react"
import { Link, useNavigate } from 'react-router-dom';

import AuthContext from '../../context/authContext';
import { removeFromStore, removeCookie } from "../../utilities/storage-helpers";
import { userLogout } from "../../services/api";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import './styles.scss';

const WhatNav = () => {
  const { isAuthenticated, userEmail, setUserEmail, setIsAuthenticated } = useContext(AuthContext);
  let  navigate = useNavigate();
  
  const handleLogout = async () => {
    await userLogout();
    await removeCookie("csrftoken");
    await removeCookie("sessionid");
    await removeFromStore("userEmail");
    setUserEmail("");
    setIsAuthenticated(false);
    navigate("login");
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Link to="/" className="mt-3 text-decoration-none">
          <Navbar.Brand>
            <h3 className="pt-2 fw-bolder">what.</h3>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {isAuthenticated ? (
            <>
              <Navbar.Text className="mx-2">{userEmail}</Navbar.Text>
              <Link className="loginLink">
                <Button className="authBtn" onClick={handleLogout}>Logout</Button>
              </Link>
            </>
          ) : (
            <Link to="login" className="loginLink">
              <Button className="authBtn">Login</Button>
            </Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default WhatNav;
