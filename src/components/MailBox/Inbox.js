import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MailBox.css";
import { mailSliceActions } from "../store/mailBoxSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFetch } from "../RoutesPages/useFetch";

const Inbox = () => {
  const dispatch = useDispatch();
  const mails = useSelector((state) => state.mailBox.mails);

  const [mailCount, setMailCount] = useState(0);
  const naviigate = useNavigate();
  console.log(mails, "sasasanoor");

  const email = localStorage.getItem("email").replace("@", "").replace(".", "");
  console.log(email, "kkkk");
  const { data, loading } = useFetch(
    `https://mailbox-2ed6d-default-rtdb.firebaseio.com/${email}.json`
  );

if(loading) {
  return <p>Loading</p>
}

  // const getData = async () => {
  //   const email = localStorage
  //     .getItem("email")
  //     .replace("@", "")
  //     .replace(".", "");
  //   console.log(email, "kkkk");

  //   try {
  //     const response = await fetch(
  //       `https://mailbox-2ed6d-default-rtdb.firebaseio.com/${email}.json`
  //     );

  //     if (!response.ok) {
  //       throw new Error("Could not fetch cart data ");
  //     }

  //     const data = await response.json();
  //     console.log(data, "ssss");
  //     let mailsData = [];
  //     for (let key in data) {
  //       mailsData.push({ id: key, ...data[key] });
  //     }
  //     console.log(mailsData, "ooooo");
  //     dispatch(mailSliceActions.mailSending(mailsData));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
      // getData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleMailClick = async (item) => {
    const getEmailUrl = localStorage
      .getItem("email")
      .replace("@", "")
      .replace(".", "");
    if (!item.read) {
      try {
        await axios.patch(
          `https://mailbox-2ed6d-default-rtdb.firebaseio.com/${getEmailUrl}/${item.id}.json`,
          { read: true }
        );

        dispatch(mailSliceActions.marksAsRead(item.id));
        setMailCount(mailCount - 1);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleNavigator = (item) => {
    console.log(item, "iiiiiiii");
    naviigate("/message", { state: item });
  };

  // useEffect(() => {
  //   getData();
  //   const interval = setInterval(() => {
  //     getData();
  //   }, 2000);
  //   return () => clearInterval(interval);
  // }, []);

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
            <div>{item.subjectMail}</div>
            <div className="mail-body">{item.messsage}</div>
          </div>

          <button onClick={() => deleteMails(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Inbox;
