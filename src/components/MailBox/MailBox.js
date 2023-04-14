import React, { useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch } from "react-redux";
import { addMailBox } from "../store/mailBoxActions";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const mailData = {
      fromMail: localStorage.getItem("email"),
      tomail: sendingMailRef.current.value,
      subjectMail: subjectMailRef.current.value,
      messsage: editorState.getCurrentContent().getPlainText(),
    };
    dispatch(addMailBox(mailData));
    sendingMailRef.current.value = "";
    subjectMailRef.current.value = "";
  };

  return (
    <div>
      <form>
        <div>
          <input type="email" ref={sendingMailRef} required placeholder="To"/>
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
