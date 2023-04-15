import React, { useEffect, useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch } from "react-redux";
import { mailSliceActions } from "../store/mailBoxSlice";

const MailBox = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const editorHandler = (editorState) => {
    setEditorState(editorState);
  };
  const sendingMailRef = useRef();
  const subjectMailRef = useRef();
  const dispatch = useDispatch();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mailData = {
      fromMail: localStorage.getItem("email"),
      tomail: sendingMailRef.current.value,
      subjectMail: subjectMailRef.current.value,
      messsage: editorState.getCurrentContent().getPlainText(),
    };

    const senderMail = mailData.fromMail.replace("@", "").replace(".", "");
    const recieverMail = mailData.tomail.replace("@", "").replace(".", "");
    try {
      const response = await fetch(
        `https://mailbox-2ed6d-default-rtdb.firebaseio.com/${senderMail}.json`,
        {
          method: "POST",
          body: JSON.stringify(mailData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (senderMail !== recieverMail) {
        const responseRecieve = await fetch(
          `https://mailbox-2ed6d-default-rtdb.firebaseio.com/${recieverMail}.json`,
          {
            method: "POST",
            body: JSON.stringify(mailData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (responseRecieve.ok) {
          alert("Email successfull sent");
        } else {
          alert("failed,Please try again!");
        }
      }
      const responseData = await response.json();
      console.log(responseData, "kkkkk");
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <form>
        <div>
          <input type="email" ref={sendingMailRef} required placeholder="To" />
        </div>

        <div>
          <input type="text" ref={subjectMailRef} required />
        </div>
        <div>
          <button onClick={handleSubmit}>Send Data</button>
        </div>
      </form>

      <Editor editorState={editorState} onEditorStateChange={editorHandler} />
    </div>
  );
};

export default MailBox;
