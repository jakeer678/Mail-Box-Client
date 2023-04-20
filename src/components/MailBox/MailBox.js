import React, { useEffect, useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Button from "@mui/material/Button";
import "./MailBox.css";
import { addmail } from "../store/mailActions";


const MailBox = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const editorHandler = (editorState) => {
    setEditorState(editorState);
  };
  const sendingMailRef = useRef();
  const subjectMailRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mailData = {
      fromMail: localStorage.getItem("email"),
      tomail: sendingMailRef.current.value,
      subjectMail: subjectMailRef.current.value,
      messsage: editorState.getCurrentContent().getPlainText(),
      read: false,
    };
    addmail(mailData);
  };

  return (
    <div className="formContainer">
      <div>
        <input
          type="email"
          ref={sendingMailRef}
          required
          placeholder="To"
          className="emailSending"
        />
      </div>

      <div>
        <input
          type="text"
          ref={subjectMailRef}
          required
          className="emailSending"
          placeholder="subject"
        />
      </div>
      <Editor editorState={editorState} onEditorStateChange={editorHandler} placeholder="compose"/>
      <div  className="btn">
        <Button onClick={handleSubmit} type="submit" variant="contained">
          Send mail
        </Button>
      </div>
    </div>
  );
};

export default MailBox;
