import React from "react";

const InboxMail = (props) => {
  return (
    <div className="">
      <p>{props.from}</p>
      <p>{props.subjectMail}</p>
      <p>{props.messsage}</p>
    </div>
  );
};

export default InboxMail;
