import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { authSliceActions } from "../store/AuthSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "./SignUp.css";

const SignUp = () => {
  const [isLoading, setIsloading] = useState(false);
  const enteredEmailInputRef = useRef(null);
  const enteredPasswordInputRef = useRef(null);
  const enteredConfirmPasswordInputRef = useRef(null);

  const dispatch = useDispatch();
  const redirect = useNavigate("");
  const signupSubmitHandler = async (e) => {
    e.preventDefault();
    const inputEmail = enteredEmailInputRef.current.value;
    const inputPassword = enteredPasswordInputRef.current.value;
    const inputCnfPassword = enteredConfirmPasswordInputRef.current.value;
    const validatePassword = () => {
      if (inputPassword !== inputCnfPassword) {
        return "Password do not match";
      }
      return "";
    };

    const error = validatePassword();
    if (error) {
      alert(error);
    } else {
      try {
        setIsloading(true);
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA9tmpySXBMWFICtTw8m1zuKe7l3K1eNmg",
          {
            method: "POST",
            body: JSON.stringify({
              email: inputEmail,
              password: inputPassword,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setIsloading(false);
        const responseData = await response.json();
        const token = !!responseData.idToken;
        if (token) {
          alert("You have signedUp successfully");
          redirect("/");
        } else {
          alert("SignUp failed");
        }

        dispatch(authSliceActions.login(responseData.idToken));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="signUpForm">
      <form onSubmit={signupSubmitHandler}>
        <div  className="form-control_1">
          <label htmlFor="email">Email</label>
          <input ref={enteredEmailInputRef} required />
        </div>
        <div  className="form-control_1">
          <label htmlFor="password">Password</label>
          <input ref={enteredPasswordInputRef} required />
        </div>
        <div  className="form-control_1">
          <label htmlFor="cnfpassword">Confirm Password</label>
          <input ref={enteredConfirmPasswordInputRef} required />
        </div>
        <div>
          {!isLoading &&  <Button type="submit" variant="contained">
                  SignUp
                </Button>
          
          }
          {isLoading && <p>sending request</p>}
          <p>
            Already have an account? <NavLink to="/login">Login</NavLink>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
