import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext, useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { contextStore } from "../UseContext/ContextStore";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { addmail } from "../store/mailActions";
import "./MailBox.css";

export default function AlertDialog() {
  const [editorState, setEditorState] = useState();

  const { open, handleClose } = useContext(contextStore);

  const editorHandler = (editorState) => {
    setEditorState(editorState);
  };
  const sendingMailRef = useRef();
  const subjectMailRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const mailData = {
      fromMail: localStorage.getItem("email"),
      tomail: sendingMailRef.current.value,
      subjectMail: subjectMailRef.current.value,
      messsage: editorState.getCurrentContent().getPlainText(),
    };
    addmail(mailData);
    sendingMailRef.current.value = "";
    subjectMailRef.current.value = "";
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
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

            <Editor
              editorState={editorState}
              onEditorStateChange={editorHandler}
              placeholder="compose"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <div>
            <Button type="submit" onClick={handleSubmit}>
              Send
            </Button>
          </div>
          <Button onClick={handleClose}>cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
