import React from "react";
import { Fragment } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "../RoutesPages/Home";
import Navbar from "../Navbar/Navbar";
import SignUp from "../Auth/SignUp";
import Login from "../Auth/Login";
import MailBox from "../MailBox/MailBox";
import Inbox from "../MailBox/Inbox";

const RoutesApp = () => {
  return (
    <Fragment>
      <Routes>
        <Route
          element={
            <div>
              <Navbar />
              <Outlet />
            </div>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mailbox" element={<MailBox />} />
          <Route path="/inbox" element={<Inbox />} />
        </Route>
      </Routes>
    </Fragment>
  );
};

export default RoutesApp;
