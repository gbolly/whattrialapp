import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

import { userSignUp } from "../../services/api";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = { email, password };
    const response = await userSignUp(data);
    if (response.status !== 201) {
      let errMsg = "An error occurred";
      setErr(errMsg);
    } else {
      navigate("/login");
    }
    setIsLoading(false);
  };

  return (
    <div className="formContainer">
      {err && <Alert variant="danger">{err}</Alert>}
      <h3 className="text-center py-2">CREATE ACCOUNT</h3>
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
            <Button className="button" onClick={handleSignUp} disabled={isLoading}>
              {isLoading && <Spinner animation="grow" />}
              CREATE ACCOUNT
            </Button>
          </Col>
        </Form.Group>
      </Form>
      <Link to="/login" className="float-end createAccount">Have an account? Login</Link>
    </div>
  )
};

export default SignupPage;
