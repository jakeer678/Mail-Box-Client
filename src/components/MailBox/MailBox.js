import React, { useEffect, useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import "./MailBox.css";
import { addmail } from "../store/mailActions";
import "./MailBox.css";

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
