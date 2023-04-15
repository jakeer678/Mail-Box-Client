import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import InboxMail from "./InboxMail";

const Inbox = () => {
  const mails = useSelector((state) => state.mailBox.mails);
  console.log(mails, "sasasanoor");

  return (
    <div>
      {mails.map((item, index) => (
        <InboxMail
          key={index}
          from={item.fromMail}
          subjectMail={item.subjectMail}
          messsage={item.messsage}
        />
      ))}
    </div>
  );
};

export default Inbox;
