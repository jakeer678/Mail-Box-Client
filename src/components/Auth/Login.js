import React, { Fragment, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { authSliceActions } from "../store/AuthSlice";
import Button from '@mui/material/Button';
import './Login.css'



const Login = () => {
  const [isLoading, setIsloading] = useState(false);
  const enteredEmailRef = useRef(null);
  const enteredPasswordRef = useRef(null);
  const dispatch = useDispatch();
  const redirect = useNavigate("");
  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    const emailInput = enteredEmailRef.current.value;
    const passwordInput = enteredPasswordRef.current.value;

    try {
      setIsloading(true);
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA9tmpySXBMWFICtTw8m1zuKe7l3K1eNmg",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailInput,
            password: passwordInput,
            returnSecureToken: true,
          }),
        }
      );
      setIsloading(false);
      const responseData = await response.json();
      const token = responseData.idToken;
      if (token) {
        alert("Login successfull");
        redirect("/");
      } else {
        alert("Login failed");
      }
      localStorage.setItem("email", responseData.email);
      dispatch(authSliceActions.login(responseData.idToken));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className="form_1">
      <h3>Login</h3>
        <form onSubmit={loginSubmitHandler}>
          <div>
            <input ref={enteredEmailRef} required className="form-control" placeholder="Email" />
          </div>
          <div>
            <input ref={enteredPasswordRef} required className="form-control" placeholder="Password"/>
          </div>
          <div>
            {!isLoading && <Button type='submit' variant="contained">Login</Button>}
            {isLoading && <p>sending request</p>}
          </div>
          <p>
            Don't have an account? <NavLink to="/signup" className="forgot_pas1">SignUp</NavLink>
          </p>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
