import React from "react";
import { useLocation } from "react-router-dom";
import "./Navbar.css";

const Message = () => {
  const loaction = useLocation();
  console.log(loaction, "oooooooooooooo");
  return (
    <div className="list_items">
      <p>{loaction.state.fromMail}</p>
      <p>{loaction.state.subjectMail}</p>
      <p>{loaction.state.messsage}</p>
    </div>
  );
};

export default Message;
