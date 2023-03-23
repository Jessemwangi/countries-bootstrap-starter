import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../auth/Firebase";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate();

    const register = (e) => {
        e.preventDefault();
        console.log("registration")
        if(!name) alert("Please enter name");
        registerWithEmailAndPassword(name, email, password)
    }

    useEffect(() => {
        if(loading) return;
        if(user) navigate("/countries");
        if(error){ alert("there was an error") ; return}
    },[user, loading, navigate, error])

    return (

<div className="wrapper">
      <div className="logo">
        <img
          src="https://cdn.pixabay.com/photo/2016/11/29/21/57/white-male-1871403_1280.jpg"
          alt=""
        />
      </div>
      <div className="text-center mt-4 name">Login</div>
      <form className="p-3 mt-3">
      <div className="form-field d-flex align-items-center">
          <span className="far fa-user"></span>
          <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder = "Full Name"
        />
        </div>
        <div className="form-field d-flex align-items-center">
          <span className="far fa-user"></span>
          <input
            type="email"
            name="userName"            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button
          onClick={(e) => register}
          className="btn mt-3"
        >
          Login
        </button>
      </form>
      <div className="text-center fs-6">
        Have an account? <Link to="/Login">Login</Link>
      </div>
    </div>
    )
}

export { Register };
