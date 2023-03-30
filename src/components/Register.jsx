import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../auth/Firebase";
import { Col, Container, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const Register = () => {
    const init={
name:"",
email:"",
password:"",
    }
    const [userData, setUserData] = useState({init});
    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate();

    const validateEmail = (email) => {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$/;
      return regex.test(email);
    };

    const register = (e) => {
        e.preventDefault();
         if(userData.name && userData.email && userData.password) {
          if (validateEmail(userData.email)) {
            registerWithEmailAndPassword(userData.name, userData.email, userData.password)
          } else {
            toast.warn(
              "Invalid Email, email format should be : johndoe@domain.com",
              {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              }
            );
          }
         }else
         {
          toast.error("Invalid username or Email, Empty Login details", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
         }
    }

    const handleOnChange = (e) => {
        e.preventDefault();
        setUserData({...userData, [e.target.name]:e.target.value})
       
    }

    useEffect(() => {
        if(loading) return;
        if(user) navigate("/countries");
        if(error){ alert("there was an error") ; return}
    },[user, loading, navigate, error])

    return (
      loading ? (
        <Container fluid>
          <Col className="mt-5 text-center">
            <Spinner animation="border" variant="info" />
          </Col>
        </Container>
      ) :(
<div className="wrapper">
      <div className="logo">
        <img
          src="https://cdn.pixabay.com/photo/2016/11/29/21/57/white-male-1871403_1280.jpg"
          alt=""
        />
      </div>
      <div className="text-center mt-4 name">Login</div>
      <form className="p-3 mt-3" onSubmit={register}> 
      <div className="form-field d-flex align-items-center">
          <span className="far fa-user"></span>
          <input
        type="text"
        value={userData.name}
        name="name"
        onChange={handleOnChange}
        placeholder = "Full Name"
        />
        </div>
        <div className="form-field d-flex align-items-center">
          <span className="far fa-user"></span>
          <input
            type="email"
            name="email"          onChange={handleOnChange}
            value={userData.email}
            id="userName"
            placeholder="Email"
          />
        </div>
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-key"></span>
          <input
            type="password"
            name="password"
            id="pwd"
            value={userData.password}
            onChange={handleOnChange}
            placeholder="Password"
          />
        </div>
        <button type="submit"
          onClick={register}
          className="btn mt-3"
        >
          Register
        </button>
      </form>
      <div className="text-center fs-6">
        Have an account? <Link to="/Login">Login</Link>
      </div>
    </div>
    ))
}

export { Register };
