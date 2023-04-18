import React from "react";
import { Fragment } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "../RoutesPages/Home";
import Navbar from "../Navbar/Navbar";
import SignUp from "../Auth/SignUp";
import Login from "../Auth/Login";
import MailBox from "../MailBox/MailBox";
import Inbox from "../MailBox/Inbox";
import Message from "../Navbar/Message";
import SentMail from "../MailBox/SentMail";

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
          <Route path="/message" element={<Message />} />
          <Route path="/sentmail" element={<SentMail />} />
        </Route>
      </Routes>
    </Fragment>
  );
};

export default RoutesApp;
