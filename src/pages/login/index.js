import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

import { userLogin } from "../../services/api";
import { saveToStore } from "../../utilities/storage-helpers";
import AuthContext from "../../context/authContext";

import "./styles.scss";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUserEmail, setIsAuthenticated, isAuthenticated, userEmail } = useContext(AuthContext);

  let navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && userEmail.length) {
      navigate("/");
    }
  }, [isAuthenticated, userEmail, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = { email, password };
    const response = await userLogin(data);
    if (response.status !== 202) {
      alert("Error occured");
    } else {
      const authUser = response.data;
      setUserEmail(authUser);
      setIsAuthenticated(true);
      await saveToStore("userEmail", authUser);
      navigate("/");
    }
    setIsLoading(false);
  };

  return (
    <div className="formContainer">
      <h3 className="text-center py-2">Login</h3>
      <Form className="loginForm">
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Col>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
          <Col>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 text-center">
          <Col>
            <Button className="button" onClick={handleLogin} disabled={isLoading}>
              {isLoading && <Spinner animation="grow" />}
              SIGN IN
            </Button>
          </Col>
        </Form.Group>
      </Form>
      <Link to="/signup" className="float-end createAccount">Create an account</Link>
    </div>
  )
};

export default LoginPage;
