import React, { Fragment, useRef } from "react";
import { NavLink } from "react-router-dom";

const Login = () => {
  const enteredEmailRef = useRef(null);
  const enteredPasswordRef = useRef(null);
  const loginSubmitHandler = (e) => {
    e.preventDefault();
    const emailInput = enteredEmailRef.current.value;
    const passwordInput = enteredPasswordRef.current.value;
  };

  return (
    <Fragment>
      <div>
        <form onSubmit={loginSubmitHandler}>
          <div>
            <label htmlFor="email">Email</label>
            <input ref={enteredEmailRef} required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input ref={enteredPasswordRef} required />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
          <p>
            Create New account <NavLink to="/signup">SignUp</NavLink>
          </p>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
