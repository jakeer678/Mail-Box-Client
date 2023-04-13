import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { authSliceActions } from "../store/AuthSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const redirect = useNavigate("");
  const logout = () => {
    dispatch(authSliceActions.logout());
    redirect("/login");
  };

  return (
    <Fragment>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <button onClick={logout}>
              <NavLink to="/login">Logout</NavLink>
            </button>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Navbar;
