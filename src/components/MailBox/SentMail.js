import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailSliceActions } from "../store/mailBoxSlice";
import { useNavigate } from "react-router-dom";
import "./MailBox.css";

const SentMail = () => {
  const dispatch = useDispatch();
  const mails = useSelector((state) => state.mailBox.mails);
  const naviigate = useNavigate();
  const emailUrl = localStorage
    .getItem("email")
    .replace("@", "")
    .replace(".", "");
  const fetchMails = async () => {
    try {
      const response = await axios.get(
        `https://mailbox-2ed6d-default-rtdb.firebaseio.com/${emailUrl}.json`
      );
      const fetchResponse = response.data;
      console.log(fetchResponse);
      let mails = [];
      for (let key in fetchResponse) {
        mails.push({ id: key, ...fetchResponse[key] });
        dispatch(mailSliceActions.mailSending(mails));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMails();
  }, []);
  const handleNavigator = (item) => {
    console.log(item, "iiiiiiii");
    naviigate("/message", { state: item });
  };
  const handleMailClick = (item) => {
    if (!item.read) {
      dispatch(mailSliceActions.marksAsread(item.id));
    }
  };
  return (
    <div>
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
        </div>
      ))}
    </div>
  );
};

export default SentMail;
