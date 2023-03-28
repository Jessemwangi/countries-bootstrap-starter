import { useEffect, useState } from "react";
import { Col, Container, Spinner } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { auth, logInWithEmailAndPassword } from "../auth/Firebase";
import { toast } from "react-toastify";

const Login = () => {
  const init = {
    email: "",
    password: "",
  };
  const [userData, setUserData] = useState({});
  const [user, loading, error] = useAuthState(auth);
  console.log(user)
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    e.preventDefault();
    setUserData({ ...userData, [e.target.name]: e.target.value });
    console.log(userData);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (!userData.email || userData.password) {
      toast.warn("Invalid username or Email, Empty Login details", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      logInWithEmailAndPassword(userData.email, userData.password);
    }
  };
  useEffect(() => {
    if (user) navigate("/countries");
  }, [navigate, user]);

  return loading ? (
    <Container fluid>
      <Col className="mt-5 text-center">
        <Spinner animation="border" variant="info" />
      </Col>
    </Container>
  ) : (
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
            name="email"
            onChange={handleOnChange}
            value={userData.email}
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
            onChange={handleOnChange}
            value={userData.password}
            placeholder="Password"
          />
        </div>
        <button onClick={handleLogin} className="btn mt-3">
          Login
        </button>
      </form>
      <div className="text-center fs-6">
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export { Login };