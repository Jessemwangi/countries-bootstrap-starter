import { useEffect, useState } from "react";
import {Col, Container, Spinner } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { auth, logInWithEmailAndPassword } from "../auth/Firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  console.log(user);
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/countries");

  }, [user, loading]);

  return (
    loading ? (
        <Container fluid>
        <Col className="mt-5 text-center">
          <Spinner animation="border" variant="info" />
          </Col>
          </Container>
          ):(
    <div className="wrapper">
      <div className="logo">
        <img
          src="https://cdn.pixabay.com/photo/2020/12/08/16/56/eye-5814965_1280.jpg"
          alt=""
        />
      </div>
      <div className="text-center mt-4 name">Login</div>
      <form className="p-3 mt-3">
        <div className="form-field d-flex align-items-center">
          <span className="far fa-user"></span>
          <input
          autoComplete="username email"
            type="email"
            name="userName"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="userName"
            placeholder="Email"
          />
        </div>
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-key"></span>
          <input
          autoComplete="password"
            type="password"
            name="password"
            id="pwd"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button
          onClick={() => logInWithEmailAndPassword(email, password)}
          className="btn mt-3"
        >
          Login
        </button>
      </form>
      <div className="text-center fs-6">
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </div>)
  );
};

export { Login };
