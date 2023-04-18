import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MailBox.css";
import { mailSliceActions } from "../store/mailBoxSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Inbox = () => {
  const dispatch = useDispatch();
  const mails = useSelector((state) => state.mailBox.mails);
  const naviigate = useNavigate();
  console.log(mails, "sasasanoor");
  const getData = async () => {
    const email = localStorage
      .getItem("email")
      .replace("@", "")
      .replace(".", "");
    console.log(email, "kkkk");

    try {
      const response = await fetch(
        `https://mailbox-2ed6d-default-rtdb.firebaseio.com/${email}.json`
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data ");
      }

      const data = await response.json();
      console.log(data, "ssss");
      let mailsData = [];
      for (let key in data) {
        mailsData.push({ id: key, ...data[key] });
      }
      console.log(mailsData, "ooooo");
      dispatch(mailSliceActions.mailSending(mailsData));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleMailClick = (item) => {
    if (!item.read) {
      dispatch(mailSliceActions.marksAsread(item.id));
    }
  };

  const handleNavigator = (item) => {
    console.log(item, "iiiiiiii");
    naviigate("/message", { state: item });
  };

  const deleteMails = async (id) => {
    const emailUrl = localStorage
      .getItem("email")
      .replace("@", "")
      .replace(".", "");
    try {
      const response = await axios.delete(
        `https://mailbox-2ed6d-default-rtdb.firebaseio.com/${emailUrl}/${id}.json`
      );

      const responseData = await response.data;
      console.log(responseData);
      getData();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mail-list">
      {mails.map((item) => (
        <div
          key={item.id}
          className={`mail-item ${item.read ? "read" : "unread"} `}
          onClick={() => handleMailClick(item)}
        >
          <div>{item.fromMail}</div>
          <div className="mail-title" onClick={() => handleNavigator(item)}>
            {item.subjectMail}
            <div className="mail-body">{item.messsage}</div>
          </div>

          <button onClick={() => deleteMails(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Inbox;
