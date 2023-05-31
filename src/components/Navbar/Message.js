import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Message = () => {
  const loaction = useLocation();
  console.log(loaction, "oooooooooooooo");
  return (
    <div className="list_items">
      <div className="messageList">
        <div>
          <AccountCircleIcon />
        </div>
        <p>
          <NavLink to="/mailbox" style={{ color: "white" }}>
            {loaction.state.fromMail}
          </NavLink>
        </p>
      </div>
      <p>{loaction.state.tomail}</p>
      <p>{loaction.state.subjectMail}</p>
      <p>Message--{loaction.state.messsage}</p>
    </div>
  );
};

export default Message;
